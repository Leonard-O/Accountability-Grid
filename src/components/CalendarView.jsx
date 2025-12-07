import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const CalendarView = ({ data, onDayClick }) => {
    const [currentDate, setCurrentDate] = useState(new Date());

    // Helper: Get Day of Year (1-366)
    const getDayOfYear = (date) => {
        const start = new Date(date.getFullYear(), 0, 0);
        const diff = date - start;
        const oneDay = 1000 * 60 * 60 * 24;
        return Math.floor(diff / oneDay);
    };

    const todayIndex = getDayOfYear(new Date());

    const changeMonth = (delta) => {
        const newDate = new Date(currentDate);
        newDate.setMonth(newDate.getMonth() + delta);
        setCurrentDate(newDate);
    };

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    // Calendar generation logic
    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);
    const startDayOfWeek = firstDayOfMonth.getDay(); // 0 (Sun) - 6 (Sat)
    const daysInMonth = lastDayOfMonth.getDate();

    const calendarDays = [];

    // Empty slots for start of month
    for (let i = 0; i < startDayOfWeek; i++) {
        calendarDays.push(<div key={`empty-${i}`} className="weekday-empty"></div>);
    }

    // Days
    for (let d = 1; d <= daysInMonth; d++) {
        const date = new Date(year, month, d);
        const dayIndex = getDayOfYear(date);
        const status = data[dayIndex.toString()];

        let className = "calendar-day day-cell";
        if (status) className += ` ${status}`;

        if (dayIndex === todayIndex) {
            className += " current-day";
        } else if (dayIndex > todayIndex || (year > new Date().getFullYear())) {
            className += " disabled-day";
        }

        calendarDays.push(
            <div
                key={dayIndex}
                className={className}
                onClick={() => onDayClick(dayIndex)}
            >
                {d}
            </div>
        );
    }

    const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    return (
        <div className="calendar-wrapper glass-panel">
            <div className="calendar-header">
                <button onClick={() => changeMonth(-1)}><ChevronLeft size={20} /></button>
                <span className="calendar-title">
                    {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                </span>
                <button onClick={() => changeMonth(1)}><ChevronRight size={20} /></button>
            </div>

            <div className="calendar-grid">
                {weekdays.map(d => (
                    <div key={d} className="weekday-label">{d}</div>
                ))}
                {calendarDays}
            </div>
        </div>
    );
};

export default CalendarView;
