const PetDisplay = ({ pet, pointAnimation }) => {
    const getPetEmoji = () => {
        const emojis = { dog: '🐶', cat: '🐱', owl: '🦉' };
        return emojis[pet?.type] || '🐾';
    };

    return (
        <div className="bg-white p-8 rounded-xl shadow-md text-center h-fit sticky top-24">
            <div className="text-8xl mb-4 animate-bounce">{getPetEmoji()}</div>
            <h2 className="text-2xl font-bold text-purple-700 mb-1">{pet?.name || 'Pet'}</h2>
            <p className="text-sm text-gray-500 mb-4">Level {pet?.level || 1}</p>

            {pointAnimation && (
                <div className="text-green-500 font-bold animate-pulse">
                    +{pointAnimation} points! ✨
                </div>
            )}

            <div className="mt-6 space-y-4 text-left">
                {['hunger', 'happiness', 'energy'].map(stat => (
                    <div key={stat}>
                        <div className="flex justify-between text-xs font-bold capitalize mb-1">
                            <span>{stat}</span>
                            <span>{pet?.[stat] || 0}%</span>
                        </div>
                        <div className="w-full bg-gray-200 h-2.5 rounded-full overflow-hidden">
                            <div
                                className="bg-purple-600 h-full transition-all duration-500"
                                style={{ width: `${pet?.[stat] || 0}%` }}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PetDisplay;