-- 1. Add mechanics columns to profiles
ALTER TABLE profiles 
ADD COLUMN IF NOT EXISTS active_theme text DEFAULT 'default',
ADD COLUMN IF NOT EXISTS xp_boost_expires_at timestamp with time zone;

-- 2. Create function to purchase theme (prevents duplicates)
CREATE OR REPLACE FUNCTION purchase_theme(p_item_id text, p_cost int)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_user_id uuid;
  v_coins int;
BEGIN
  v_user_id := auth.uid();
  
  -- Check if already owns it
  IF EXISTS (SELECT 1 FROM user_inventory WHERE user_id = v_user_id AND item_id = p_item_id) THEN
    RETURN FALSE; -- Already owned
  END IF;

  -- Check balance
  SELECT coins INTO v_coins FROM profiles WHERE id = v_user_id;
  IF v_coins < p_cost THEN
    RETURN FALSE; -- Insufficient funds
  END IF;

  -- Deduct coins
  UPDATE profiles SET coins = coins - p_cost WHERE id = v_user_id;
  
  -- Add to inventory
  INSERT INTO user_inventory (user_id, item_id, item_type)
  VALUES (v_user_id, p_item_id, 'theme');

  RETURN TRUE;
END;
$$;

-- 3. Create function to activate boost
-- 3. Create function to activate boost
-- Note: Order changed to match potential client-side alphabetical sorting quirks if any, though named params should handle it.
DROP FUNCTION IF EXISTS activate_xp_boost(int, int);
CREATE OR REPLACE FUNCTION activate_xp_boost(p_cost int, p_duration_hours int)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_user_id uuid;
  v_coins int;
BEGIN
  v_user_id := auth.uid();

  -- Check balance
  SELECT coins INTO v_coins FROM profiles WHERE id = v_user_id;
  IF v_coins < p_cost THEN
    RETURN FALSE;
  END IF;

  -- Deduct coins
  UPDATE profiles SET coins = coins - p_cost WHERE id = v_user_id;
  
  -- Set expiration (extends if already active, or starts now)
  UPDATE profiles 
  SET xp_boost_expires_at = GREATEST(COALESCE(xp_boost_expires_at, now()), now()) + (p_duration_hours || ' hours')::interval
  WHERE id = v_user_id;

  RETURN TRUE;
END;
$$;

-- Force schema cache reload
NOTIFY pgrst, 'reload schema';

-- 4. Dev Helper: Grant Coins (For Testing)
CREATE OR REPLACE FUNCTION grant_coins(p_amount int)
RETURNS int
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_new_balance int;
BEGIN
  UPDATE profiles 
  SET coins = coins + p_amount 
  WHERE id = auth.uid()
  RETURNING coins INTO v_new_balance;
  
  RETURN v_new_balance;
END;
$$;
