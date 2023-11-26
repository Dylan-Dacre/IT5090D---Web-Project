import React from "react";
import "./Calendar.css";

const Calendar = () => {
  const daysOfWeek = ["S", "M", "T", "W", "T", "F", "S"];
  const currentDate = new Date();
  const currentDay = currentDate.getDay();

  const previousSunday = new Date(currentDate);
  previousSunday.setDate(currentDate.getDate() - currentDay);

  const nextSevenDays = Array.from({ length: 7 }, (_, index) =>
    new Date(
      previousSunday.getFullYear(),
      previousSunday.getMonth(),
      previousSunday.getDate() + index
    ).getDate()
  );

  return (
    <div className="calendar">
      <div className="days-of-week">
        {daysOfWeek.map((day, index) => (
          <div key={index}>{day}</div>
        ))}
      </div>
      <div className="days">
        {nextSevenDays.map((day, index) => (
          <div
            key={index}
            className={index === currentDay ? "current-day" : ""}
          >
            {day}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
