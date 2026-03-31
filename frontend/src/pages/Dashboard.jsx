import { useState, useEffect, useCallback } from 'react';
import {
    getTasks,
    completeTask,
    createTask,
    getPet,
    getCurrentUser,
    applyItemToPet,
    getUserInventory
} from '../services/api';
import Header from '../components/Header';
import TaskSection from '../components/TaskSection';
import InventorySection from '../components/InventorySection';
import PetDisplay from '../components/PetDisplay';
import CalendarView from '../components/CalendarView';
import AddTaskModal from '../components/AddTaskModal';
import ShopModal from '../components/ShopModal';
import AchievementsModal from '../components/AchievementsModal';

function Dashboard({ user, setUser }) {
    const [pet, setPet] = useState(null);
    const [tasks, setTasks] = useState([]);
    const [inventory, setInventory] = useState([]);
    const [isShopOpen, setIsShopOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [pointAnimation, setPointAnimation] = useState(null);
    const [showAddTask, setShowAddTask] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);
    const [isAchievementsOpen, setIsAchievementsOpen] = useState(false);
    const [newTask, setNewTask] = useState({
        title: '',
        description: '',
        priority: 'medium',
        difficulty: 'medium',
        due_date: ''
    });

    const loadDashboard = useCallback(async () => {
        try {
            const [userData, petData, tasksData, invData] = await Promise.all([
                getCurrentUser().catch(() => null),
                getPet().catch(() => null),
                getTasks().catch(() => []),
                getUserInventory().catch(() => [])
            ]);

            setInventory(invData || []);
            if (petData) setPet(petData);
            setTasks(tasksData || []);
            if (userData) {
                const actualUser = userData.user || userData;
                setUser(actualUser);
                localStorage.setItem('storedUser', JSON.stringify(actualUser));
            }
        } catch (error) {
            alert(error);
        } finally {
            setLoading(false);
        }
    }, [setUser]);

    useEffect(() => {
        loadDashboard();
    }, [loadDashboard]);

    const handleCreateTask = async (e) => {
        e.preventDefault();
        if (!newTask.title.trim()) return;
        
        // If date is selected from calendar, auto-fill due_date
        const taskData = {
            ...newTask,
            due_date: newTask.due_date || (selectedDate ? selectedDate.toISOString().split('T')[0] : '')
        };
        
        try {
            await createTask(taskData);
            setNewTask({ title: '', description: '', priority: 'medium', difficulty: 'medium', due_date: '' });
            setShowAddTask(false);
            setSelectedDate(null);
            loadDashboard();
        } catch (error) {
            alert(error);
        }
    };

    const handleComplete = async (id) => {
        try {
            const res = await completeTask(id);
            if (res.success) {
                setPointAnimation(res.points_worth);
                setTimeout(() => setPointAnimation(null), 2000);
                loadDashboard();
            }
        } catch (err) {
            console.error("Completion error:", err);
        }
    };

    const handleUseItem = async (invId) => {
        try {
            await applyItemToPet(invId);
            loadDashboard();
        } catch (err) {
            alert(err.message);
        }
    };

    const handleDateClick = (date) => {
        setSelectedDate(date);
        setNewTask({ ...newTask, due_date: date.toISOString().split('T')[0] });
        setShowAddTask(true);
    };

    const handleLogout = () => {
        localStorage.clear();
        window.location.href = '/login';
    };

    if (loading) {
        return <div className="p-10 text-center text-purple-600 font-bold">Loading MotivateMate...</div>;
    }

    return (
        <div className="min-h-screen bg-gray-100">
           <Header
    user={user}
    onShopClick={() => setIsShopOpen(true)}
    onAchievementsClick={() => setIsAchievementsOpen(true)}
    onLogout={handleLogout}
/>

            <main className="container mx-auto p-6">
                {/* Two column layout */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Left Column: Tasks and Inventory */}
                    <div className="lg:col-span-2 space-y-6">
                        <TaskSection
                            tasks={tasks}
                            onComplete={handleComplete}
                            onAddTaskClick={() => setShowAddTask(true)}
                        />
                        <InventorySection
                            inventory={inventory}
                            onUseItem={handleUseItem}
                        />
                    </div>

                    {/* Right Column: Pet Display */}
                    <div>
                        <PetDisplay pet={pet} pointAnimation={pointAnimation} />
                    </div>
                </div>

                {/* Full Width Calendar Section */}
                <div className="mt-6">
                    <CalendarView
                        tasks={tasks}
                        onDateClick={handleDateClick}
                    />
                </div>
            </main>

            <ShopModal
                isOpen={isShopOpen}
                onClose={() => setIsShopOpen(false)}
                userPoints={user?.points || 0}
                onPurchaseSuccess={loadDashboard}
            />

            <AddTaskModal
                isOpen={showAddTask}
                onClose={() => {
                    setShowAddTask(false);
                    setSelectedDate(null);
                }}
                newTask={newTask}
                setNewTask={setNewTask}
                onCreateTask={handleCreateTask}
            />

            <AchievementsModal
    isOpen={isAchievementsOpen}
    onClose={() => setIsAchievementsOpen(false)}
    userId={user?.id}
/>

        </div>
    );
}

export default Dashboard;