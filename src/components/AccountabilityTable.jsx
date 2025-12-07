import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const AccountabilityTable = ({ data, onDayClick }) => {
    const [viewMode, setViewMode] = useState('full'); // 'full' | 'monthly'
    const [currentDate, setCurrentDate] = useState(new Date());

    // Helper: Get Day of Year (1-366)
    const getDayOfYear = (date) => {
        const start = new Date(date.getFullYear(), 0, 0);
        const diff = date - start;
        const oneDay = 1000 * 60 * 60 * 24;
        return Math.floor(diff / oneDay);
    };

    const todayIndex = getDayOfYear(new Date());
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();

    // Navigation handlers
    const changeMonth = (delta) => {
        const newDate = new Date(currentDate);
        newDate.setMonth(newDate.getMonth() + delta);
        setCurrentDate(newDate);
    };

    // Generate days based on view mode
    let startDay = 1;
    let endDay = 365; // Simple 365 for now, leap year todo

    if (viewMode === 'monthly') {
        const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
        const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0);
        startDay = getDayOfYear(firstDayOfMonth);
        endDay = getDayOfYear(lastDayOfMonth);
    }

    const days = [];
    for (let i = startDay; i <= endDay; i++) {
        const dayKey = i.toString();
        const status = data[dayKey]; // 'studied', 'skipped', etc.

        // Logic for styling
        let className = "day-cell";

        if (status) {
            className += ` ${status}`;
        } else if (i < todayIndex) {
            // Auto-mark past days as skipped if no data exists
            className += " skipped";
        }

        if (i === todayIndex) {
            className += " current-day";
        } else if (i > todayIndex) {
            className += " disabled-day"; // Future days disabled
        }

        days.push(
            <div
                key={i}
                className={className}
                onClick={(e) => onDayClick(i, e)}
            >
                <span className="day-number">{i}</span>
            </div>
        );
    }

    return (
        <div className="grid-wrapper glass-panel">
            {/* Controls */}
            <div className="grid-controls">
                <div className="toggle-group">
                    <button
                        className={viewMode === 'full' ? 'active-toggle' : ''}
                        onClick={() => setViewMode('full')}
                    >
                        Full Year
                    </button>
                    <button
                        className={viewMode === 'monthly' ? 'active-toggle' : ''}
                        onClick={() => setViewMode('monthly')}
                    >
                        Monthly
                    </button>
                </div>

                {viewMode === 'monthly' && (
                    <div className="nav-group">
                        <button onClick={() => changeMonth(-1)}><ChevronLeft size={16} /></button>
                        <span className="nav-title">
                            {currentDate.toLocaleDateString('en-US', { month: 'long' })}
                        </span>
                        <button
                            onClick={() => changeMonth(1)}
                            disabled={new Date().getMonth() === currentMonth && new Date().getFullYear() === currentYear}
                        >
                            <ChevronRight size={16} />
                        </button>
                    </div>
                )}
            </div>

            {/* Grid */}
            <div className="grid-365">
                {days}
            </div>
        </div>
    );
};

export default AccountabilityTable;
