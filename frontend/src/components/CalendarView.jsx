import { useState } from 'react';

const CalendarView = ({ tasks }) => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(null);

    const getDaysInMonth = (year, month) => {
        return new Date(year, month + 1, 0).getDate();
    };

    const getFirstDayOfMonth = (year, month) => {
        return new Date(year, month, 1).getDay();
    };

    const getTasksForDate = (date) => {
        const dateStr = date.toDateString();
        return tasks.filter(task => {
            if (!task.due_date) return false;
            const taskDate = new Date(task.due_date).toDateString();
            return taskDate === dateStr;
        });
    };

    const handleDateClick = (date) => {
        setSelectedDate(date);
    };

    const closeTaskList = () => {
        setSelectedDate(null);
    };

    const changeMonth = (delta) => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + delta, 1));
        setSelectedDate(null);  // Clear selected date when changing month
    };

    const renderCalendar = () => {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        const daysInMonth = getDaysInMonth(year, month);
        const firstDay = getFirstDayOfMonth(year, month);
        const today = new Date().toDateString();

        const days = [];
        // Empty cells for days before month starts
        for (let i = 0; i < firstDay; i++) {
            days.push(<div key={`empty-${i}`} className="h-24 bg-gray-50 rounded-lg border border-gray-100"></div>);
        }

        // Cells for each day of the month
        for (let day = 1; day <= daysInMonth; day++) {
            const date = new Date(year, month, day);
            const dateStr = date.toDateString();
            const isToday = dateStr === today;
            const isSelected = selectedDate?.toDateString() === dateStr;
            const dayTasks = getTasksForDate(date);
            const hasTasks = dayTasks.length > 0;

            days.push(
                <div
                    key={day}
                    onClick={() => handleDateClick(date)}
                    className={`
                        h-24 p-2 rounded-lg border cursor-pointer transition-all hover:shadow-md
                        ${isToday ? 'bg-purple-50 border-purple-500 border-2' : 'bg-white border-gray-200 hover:bg-purple-50'}
                        ${isSelected ? 'ring-2 ring-purple-400 bg-purple-50' : ''}
                        ${hasTasks ? 'shadow-sm' : ''}
                    `}
                >
                    <div className="flex justify-between items-start">
                        <span className={`font-semibold text-sm ${isToday ? 'text-purple-600' : 'text-gray-700'}`}>
                            {day}
                        </span>
                        {hasTasks && (
                            <span className="bg-purple-100 text-purple-600 text-xs px-1.5 py-0.5 rounded-full">
                                {dayTasks.length}
                            </span>
                        )}
                    </div>
                    <div className="mt-1 space-y-0.5">
                        {dayTasks.slice(0, 2).map(task => (
                            <div key={task.id} className="text-xs truncate text-gray-600">
                                {task.completed ? '✓ ' : '• '}{task.title}
                            </div>
                        ))}
                        {dayTasks.length > 2 && (
                            <div className="text-xs text-gray-400">+{dayTasks.length - 2} more</div>
                        )}
                    </div>
                </div>
            );
        }

        return days;
    };

    const selectedDateTasks = selectedDate ? getTasksForDate(selectedDate) : [];

    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'];
    const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    return (
        <div className="bg-white rounded-xl shadow-sm p-6">
            {/* Calendar Header */}
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-800">📅 Task Calendar</h2>
                <div className="flex gap-2">
                    <button
                        onClick={() => changeMonth(-1)}
                        className="px-3 py-1 bg-gray-100 rounded-lg hover:bg-gray-200 transition"
                    >
                        ←
                    </button>
                    <span className="text-lg font-semibold min-w-[160px] text-center">
                        {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                    </span>
                    <button
                        onClick={() => changeMonth(1)}
                        className="px-3 py-1 bg-gray-100 rounded-lg hover:bg-gray-200 transition"
                    >
                        →
                    </button>
                </div>
            </div>

            {/* Weekday Headers */}
            <div className="grid grid-cols-7 gap-2 mb-2">
                {weekDays.map(day => (
                    <div key={day} className="text-center text-sm font-semibold text-gray-500 py-2">
                        {day}
                    </div>
                ))}
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-2">
                {renderCalendar()}
            </div>

            {/* <========= TASKS FOR SELECTED DATE SECTION ========= */}
            {selectedDate && (
                <div className="mt-6 pt-4 border-t">
                    <div className="flex justify-between items-center mb-3">
                        <h3 className="font-bold text-lg text-gray-800">
                            📋 Tasks for {selectedDate.toLocaleDateString(undefined, {
                                weekday: 'long',
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                            })}
                        </h3>
                        <button
                            onClick={closeTaskList}
                            className="text-gray-400 hover:text-gray-600 text-sm"
                        >
                            ✕ Close
                        </button>
                    </div>

                    {selectedDateTasks.length === 0 ? (
                        <p className="text-gray-500 text-center py-4">
                            No tasks scheduled for this day. 🎉
                        </p>
                    ) : (
                        <div className="space-y-2">
                            {selectedDateTasks.map(task => (
                                <div
                                    key={task.id}
                                    className={`flex items-center justify-between p-3 rounded-lg border
                                        ${task.completed ? 'bg-gray-50 border-gray-200' : 'bg-white border-gray-200 hover:shadow-md'}`}
                                >
                                    <div className="flex items-center gap-3 flex-1">
                                        <span className={`text-lg ${task.completed ? 'line-through text-gray-400' : 'text-gray-700'}`}>
                                            {task.title}
                                        </span>
                                        <span className={`text-xs px-2 py-1 rounded-full font-bold uppercase
                                            ${task.priority === 'urgent' ? 'bg-red-100 text-red-700' :
                                                task.priority === 'high' ? 'bg-orange-100 text-orange-700' :
                                                    task.priority === 'medium' ? 'bg-blue-100 text-blue-700' :
                                                        'bg-gray-100 text-gray-700'}`}>
                                            {task.priority}
                                        </span>
                                        {task.difficulty && (
                                            <span className="text-xs text-gray-500">
                                                ⚡ {task.difficulty}
                                            </span>
                                        )}
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <span className="font-bold text-purple-600">
                                            ⭐ {task.points_worth} pts
                                        </span>
                                        {!task.completed && (
                                            <span className="text-xs text-gray-400">
                                                Not completed
                                            </span>
                                        )}
                                        {task.completed && (
                                            <span className="text-xs text-green-500">
                                                ✅ Completed
                                            </span>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default CalendarView;