import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';


const CalendarSlotPicker = ({ selectedDate, selectedTime, onDateSelect, onTimeSelect }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date(2026, 0, 15));

  const generateCalendarDays = () => {
    const year = currentMonth?.getFullYear();
    const month = currentMonth?.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay?.getDate();
    const startingDayOfWeek = firstDay?.getDay();

    const days = [];
    for (let i = 0; i < startingDayOfWeek; i++) {
      days?.push(null);
    }
    for (let day = 1; day <= daysInMonth; day++) {
      days?.push(new Date(year, month, day));
    }
    return days;
  };

  const timeSlots = [
    { time: '09:00 AM', available: true },
    { time: '09:30 AM', available: true },
    { time: '10:00 AM', available: false },
    { time: '10:30 AM', available: true },
    { time: '11:00 AM', available: true },
    { time: '11:30 AM', available: true },
    { time: '02:00 PM', available: true },
    { time: '02:30 PM', available: true },
    { time: '03:00 PM', available: false },
    { time: '03:30 PM', available: true },
    { time: '04:00 PM', available: true },
    { time: '04:30 PM', available: true }
  ];

  const handlePrevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  const isDateAvailable = (date) => {
    if (!date) return false;
    const today = new Date(2026, 0, 15);
    today?.setHours(0, 0, 0, 0);
    return date >= today;
  };

  const isDateSelected = (date) => {
    if (!date || !selectedDate) return false;
    return date?.toDateString() === selectedDate?.toDateString();
  };

  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className="space-y-24 md:space-y-32">
      <div className="bg-card rounded-lg p-20 md:p-24 lg:p-32 shadow-elevation-1 border border-border">
        <div className="flex items-center justify-between mb-20 md:mb-24">
          <h3 className="text-base md:text-lg font-heading font-semibold text-foreground">
            Select Date
          </h3>
          <div className="flex items-center space-x-8">
            <button
              onClick={handlePrevMonth}
              className="p-8 rounded-lg hover:bg-muted transition-smooth press-scale"
              aria-label="Previous month"
            >
              <Icon name="ChevronLeft" size={20} color="var(--color-foreground)" strokeWidth={2} />
            </button>
            <span className="text-sm md:text-base font-medium text-foreground min-w-[140px] md:min-w-[160px] text-center">
              {monthNames?.[currentMonth?.getMonth()]} {currentMonth?.getFullYear()}
            </span>
            <button
              onClick={handleNextMonth}
              className="p-8 rounded-lg hover:bg-muted transition-smooth press-scale"
              aria-label="Next month"
            >
              <Icon name="ChevronRight" size={20} color="var(--color-foreground)" strokeWidth={2} />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-7 gap-4 md:gap-8 mb-8">
          {dayNames?.map((day) => (
            <div key={day} className="text-center text-xs md:text-sm font-medium text-muted-foreground py-8">
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-4 md:gap-8">
          {generateCalendarDays()?.map((date, index) => (
            <button
              key={index}
              onClick={() => date && isDateAvailable(date) && onDateSelect(date)}
              disabled={!date || !isDateAvailable(date)}
              className={`aspect-square flex items-center justify-center rounded-lg text-sm md:text-base transition-smooth ${
                !date
                  ? 'invisible'
                  : isDateSelected(date)
                  ? 'bg-primary text-primary-foreground font-semibold shadow-elevation-1'
                  : isDateAvailable(date)
                  ? 'bg-card hover:bg-muted text-foreground press-scale'
                  : 'bg-muted/50 text-muted-foreground cursor-not-allowed'
              }`}
            >
              {date && date?.getDate()}
            </button>
          ))}
        </div>
      </div>
      {selectedDate && (
        <div className="bg-card rounded-lg p-20 md:p-24 lg:p-32 shadow-elevation-1 border border-border">
          <h3 className="text-base md:text-lg font-heading font-semibold text-foreground mb-16 md:mb-20">
            Available Time Slots
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-12 md:gap-16">
            {timeSlots?.map((slot, index) => (
              <button
                key={index}
                onClick={() => slot?.available && onTimeSelect(slot?.time)}
                disabled={!slot?.available}
                className={`p-12 md:p-16 rounded-lg text-sm md:text-base font-medium transition-smooth ${
                  selectedTime === slot?.time
                    ? 'bg-primary text-primary-foreground shadow-elevation-1'
                    : slot?.available
                    ? 'bg-muted hover:bg-muted/80 text-foreground press-scale'
                    : 'bg-muted/30 text-muted-foreground cursor-not-allowed line-through'
                }`}
              >
                {slot?.time}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CalendarSlotPicker;