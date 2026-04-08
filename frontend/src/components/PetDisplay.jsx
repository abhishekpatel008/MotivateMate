const PetDisplay = ({ pet, pointAnimation, activeAnimation }) => {
    const getPetEmoji = () => {
        const emojis = { dog: '🐶', cat: '🐱', owl: '🦉' };
        return emojis[pet?.type] || '🐾';
    };

    const getAnimationClass = () => {
        if (activeAnimation) return activeAnimation;
        if (pet?.energy < 30) return 'pet-sleep'; // From animations.css
        return 'animate-bounce'; // Default Tailwind bounce
    };
    return (
        <div className="bg-white p-8 rounded-xl shadow-md text-center h-fit sticky top-24">
            <div className={`text-8xl mb-4 ${getAnimationClass()}`}>{getPetEmoji()}</div>
            <h2 className="text-2xl font-bold text-purple-700 mb-1">{pet?.name || 'Pet'}</h2>
            <p className="text-sm text-gray-500 mb-4">Level {pet?.level || 1}</p>

            {pointAnimation && (
                <div className="text-green-500 font-bold animate-pulse">
                    +{pointAnimation} points! ✨
                </div>
            )}

            <div className="mt-6 space-y-4 text-left">
                {/* Hunger Stat */}
                <div>
                    <div className="flex justify-between text-xs font-bold capitalize mb-1">
                        <span className="flex items-center gap-1">
                            {pet?.hunger < 30 ? '🍽️ Hungry' : pet?.hunger > 70 ? '😋 Full' : '🍖 Hunger'}
                        </span>
                        <span className={pet?.hunger < 30 ? 'text-orange-500' : pet?.hunger > 70 ? 'text-green-500' : 'text-gray-600'}>
                            {pet?.hunger || 0}%
                        </span>
                    </div>
                    <div className="w-full bg-gray-200 h-2.5 rounded-full overflow-hidden">
                        <div
                            className={`h-full transition-all duration-500 ${pet?.hunger < 30 ? 'bg-orange-500' : pet?.hunger > 70 ? 'bg-green-500' : 'bg-purple-600'
                                }`}
                            style={{ width: `${pet?.hunger || 0}%` }}
                        />
                    </div>
                    {pet?.hunger < 30 && (
                        <p className="text-xs text-orange-500 mt-1 animate-pulse">⚠️ Your pet is hungry! Feed it soon.</p>
                    )}
                </div>

                {/* Happiness Stat */}
                <div>
                    <div className="flex justify-between text-xs font-bold capitalize mb-1">
                        <span className="flex items-center gap-1">
                            {pet?.happiness < 30 ? '😢 Sad' : pet?.happiness > 70 ? '😊 Happy' : '😐 Happiness'}
                        </span>
                        <span className={pet?.happiness < 30 ? 'text-orange-500' : pet?.happiness > 70 ? 'text-green-500' : 'text-gray-600'}>
                            {pet?.happiness || 0}%
                        </span>
                    </div>
                    <div className="w-full bg-gray-200 h-2.5 rounded-full overflow-hidden">
                        <div
                            className={`h-full transition-all duration-500 ${pet?.happiness < 30 ? 'bg-orange-500' : pet?.happiness > 70 ? 'bg-green-500' : 'bg-yellow-500'
                                }`}
                            style={{ width: `${pet?.happiness || 0}%` }}
                        />
                    </div>
                    {pet?.happiness < 30 && (
                        <p className="text-xs text-orange-500 mt-1 animate-pulse">💔 Your pet is sad! Play with it.</p>
                    )}
                    {pet?.happiness > 80 && (
                        <p className="text-xs text-green-500 mt-1">🎉 Your pet is overjoyed! Keep it up!</p>
                    )}
                </div>

                {/* Energy Stat */}
                <div>
                    <div className="flex justify-between text-xs font-bold capitalize mb-1">
                        <span className="flex items-center gap-1">
                            {pet?.energy < 30 ? '😴 Tired' : pet?.energy > 70 ? '⚡ Energetic' : '🔋 Energy'}
                        </span>
                        <span className={pet?.energy < 30 ? 'text-orange-500' : pet?.energy > 70 ? 'text-green-500' : 'text-gray-600'}>
                            {pet?.energy || 0}%
                        </span>
                    </div>
                    <div className="w-full bg-gray-200 h-2.5 rounded-full overflow-hidden">
                        <div
                            className={`h-full transition-all duration-500 ${pet?.energy < 30 ? 'bg-orange-500' : pet?.energy > 70 ? 'bg-green-500' : 'bg-blue-500'
                                }`}
                            style={{ width: `${pet?.energy || 0}%` }}
                        />
                    </div>
                    {pet?.energy < 30 && (
                        <p className="text-xs text-orange-500 mt-1 animate-pulse">😴 Your pet is tired! Let it rest.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PetDisplay;