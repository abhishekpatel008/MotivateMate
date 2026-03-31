import { useState, useEffect } from 'react';
import { getAchievementProgress } from '../services/api';

const AchievementsModal = ({ isOpen, onClose }) => {
    const [achievements, setAchievements] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (isOpen) {
            loadAchievements();
        }
    }, [isOpen]);

    const loadAchievements = async () => {
        setLoading(true);
        try {
            const data = await getAchievementProgress();
            setAchievements(data);
        } catch (error) {
            console.error('Failed to load achievements:', error);
        } finally {
            setLoading(false);
        }
    };

    const getBadgeIcon = (name) => {
        const icons = {
            'First Step': '🎯',
            'Task Master': '🏆',
            'Productivity Guru': '👑',
            'Point Collector': '💰',
            'Point Millionaire': '💎',
            'Weekly Warrior': '⚔️',
            'Monthly Champion': '🌟',
            'Pet Lover': '🐱',
            'Pet Master': '🐉'
        };
        return icons[name] || '🏅';
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black -opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 w-[600px] max-h-[80vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold text-purple-600">🏆 Achievements</h2>
                    <button onClick={onClose} className="bg-purple-600 text-white px-4 py-2 rounded-lg text-sm font-bold shadow-sm hover:bg-purple-700 hover:shadow-md transition"> Close ✕ </button>
                </div>

                {loading ? (
                    <p className="text-center py-10 text-gray-500">Loading achievements...</p>
                ) : (
                    <div className="grid grid-cols-1 gap-3">
                        {achievements.map(ach => (
                            <div
                                key={ach.id}
                                className={`p-4 rounded-lg border transition-all ${ach.earned ? 'bg-purple-50 border-purple-300' : 'bg-gray-50 border-gray-200'}`}
                            >
                                <div className="flex items-center gap-4">
                                    <div className="text-4xl">{getBadgeIcon(ach.name)}</div>
                                    <div className="flex-1">
                                        <div className="flex justify-between items-center mb-1">
                                            <h3 className={`font-bold ${ach.earned ? 'text-purple-700' : 'text-gray-700'}`}>
                                                {ach.name}
                                            </h3>
                                            {ach.earned ? (
                                                <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                                                    ✅ Earned
                                                </span>
                                            ) : (
                                                <span className="text-xs text-gray-400">
                                                    {ach.current_value}/{ach.criteria_value}
                                                </span>
                                            )}
                                        </div>
                                        <p className="text-sm text-gray-500 mb-2">{ach.description}</p>
                                        {!ach.earned && (
                                            <div className="w-full bg-gray-200 rounded-full h-2">
                                                <div
                                                    className="bg-purple-500 rounded-full h-2 transition-all"
                                                    style={{ width: `${ach.progress_percent}%` }}
                                                />
                                            </div>
                                        )}
                                        {ach.earned && (
                                            <p className="text-xs text-green-600">+{ach.reward_points} points awarded!</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default AchievementsModal;