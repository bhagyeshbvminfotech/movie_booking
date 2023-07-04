import React, { useState } from "react";
import moment from 'moment';
import SearchIcon from '@mui/icons-material/Search';
import './Cal.css';

const Calendar = () => {
    const months = moment.months();
    const currentYear = moment().year();
    const years = [];

    for (let year = currentYear; year >= currentYear - 100; year--) {
        years.push(year);
    }

    const renderYearOptions = () => {
        return years.map((year) => (
            <option key={year} value={year}>{year}</option>
        ));
    };

    const renderMonthOptions = () => {
        return months.map((month, index) => (
            <option key={index} value={index + 1}>{month}</option>
        ));
    };

    const [selectedMonth, setSelectedMonth] = useState(moment().month() + 1);
    const [selectedYear, setSelectedYear] = useState(currentYear);
    const [showResult, setShowResult] = useState(false);

    const handleSearch = () => {
        setShowResult(true);
    };

    const handleMonthChange = (e) => {
        setSelectedMonth(e.target.value);
        setShowResult(false);
    };

    const handleYearChange = (e) => {
        setSelectedYear(e.target.value);
        setShowResult(false);
    };

    const getMonthName = (monthValue) => {
        return months[monthValue - 1];
    };

    const generateCalendar = () => {
        const startDate = moment().year(selectedYear).month(selectedMonth - 1).startOf('month');
        const endDate = moment().year(selectedYear).month(selectedMonth - 1).endOf('month');
        const daysInMonth = endDate.date();
        const startDay = startDate.day();

        const calendar = [];
        let dayCounter = 1;

        for (let i = 0; i < 6; i++) {
            const week = [];
            for (let j = 0; j < 7; j++) {
                if ((i === 0 && j < startDay) || dayCounter > daysInMonth) {
                    week.push(<td key={`${i}-${j}`}></td>);
                } else {
                    week.push(<td key={`${i}-${j}`}>{dayCounter}</td>);
                    dayCounter++;
                }
            }
            calendar.push(<tr key={i}>{week}</tr>);
        }

        return calendar;
    };

    return (
        <div className="alldiv">
            <div className="calendar">
                <div className="header">
                    <select
                        value={selectedMonth}
                        onChange={handleMonthChange}
                    >
                        {renderMonthOptions()}
                    </select>
                    <select
                        value={selectedYear}
                        onChange={handleYearChange}
                    >
                        {renderYearOptions()}
                    </select>
                    <SearchIcon onClick={handleSearch} />
                </div>
                {showResult && selectedMonth && selectedYear ? (
                    <div>
                        <label className="monthandyour">{`${getMonthName(selectedMonth)} ${selectedYear}`}</label><br></br>
                        <label>Total Working Days:</label><br></br>
                        <label>Total Present Days:</label><br></br>
                        <div className="hintmange">
                            <div id="container1"></div>
                            <label>FullDay</label>
                            <div id="container2"></div>
                            <label>HalfDay</label>
                            <div id="container3"></div>
                            <label>absent</label>
                            <div id="container4"></div>
                            <label>Holiday</label>
                        </div>
                        <table>
                            <thead>
                            <tr>
                                <th>Sun</th>
                                <th>Mon</th>
                                <th>Tue</th>
                                <th>Wed</th>
                                <th>Thu</th>
                                <th>Fri</th>
                                <th>Sat</th>
                            </tr>
                            </thead>
                            <tbody>
                            {generateCalendar()}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    ""
                )}
            </div>
        </div>
    );
};

export default Calendar;
