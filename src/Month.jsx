import React, { useState } from "react";
import moment from "moment";

const Month = ({ onMonthChange }) => {
    const [selectedMonth, setSelectedMonth] = useState(moment().month() + 1);
    const monthNames = moment.months();

    const handleMonthChange = (e) => {
        const month = parseInt(e.target.value);
        setSelectedMonth(month);
        onMonthChange(month); // Call the parent component's callback function
    };

    return (
        <select value={selectedMonth} onChange={handleMonthChange}>
            {monthNames.map((month, index) => (
                <option key={index} value={index + 1}>
                    {month}
                </option>
            ))}
        </select>
    );
};

export default Month;
