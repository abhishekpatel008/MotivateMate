const InventorySection = ({ inventory, onUseItem }) => {
    return (
        <div className="bg-white p-6 rounded-xl shadow-sm">
            <h2 className="text-lg font-bold mb-4">🎒 My Inventory</h2>
            <div className="flex gap-4 overflow-x-auto pb-2">
                {inventory.length === 0 ? (
                    <p className="text-gray-400 text-sm">Inventory is empty. Go shopping!</p>
                ) : (
                    inventory.map(item => (
                        <button
                            key={item.id}
                            onClick={() => onUseItem(item.id)}
                            className="text-center border p-3 rounded-xl hover:bg-purple-50 transition min-w-[80px]"
                        >
                            <div className="text-3xl mb-1">{item.ShopItem?.image_url || '📦'}</div>
                            <div className="text-xs font-bold text-gray-600">x{item.quantity}</div>
                        </button>
                    ))
                )}
            </div>
        </div>
    );
};

export default InventorySection;