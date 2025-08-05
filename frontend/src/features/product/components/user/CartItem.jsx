const CartItem = ({ item, onQtyChange, onRemove }) => {
  return (
    <div className="relative  flex items-start gap-4 border-b py-4 max-w-[600px]">
      <button
        onClick={() => onRemove(item)}
        className="absolute top-2 right-2 text-red-500 text-xl font-bold hover:scale-110 transition"
        title="Remove item"
      >
        ×
      </button>
      <img
        src={item.productImage}
        alt={item.productName}
        className="w-24 h-24 rounded"
      />
      <div className="flex-1">
        <h3 className="text-lg font-semibold">{item.productName}</h3>

        <p className="text-sm text-gray-500 capitalize">
          {item.colorName} &bull; {item.storage}
        </p>
        <p className="mt-1 font-medium">${item.priceAfterDiscount}</p>

        <div className="mt-2 flex items-center gap-2">
          <select
            value={item.quantity}
            onChange={(e) =>
              onQtyChange({
                productId: item.product,
                colorName: item.colorName,
                storage: item.storage,
                quantity: Number(e.target.value),
              })
            }
            className="border px-2 py-1 rounded"
          >
            {Array.from({ length: 10 }, (_, i) => i + 1).map((num) => (
              <option key={num} value={num} disabled={num > item.stock}>
                {num > item.stock ? `${num} (Out of Stock)` : num}
              </option>
            ))}

            {/* Show user's current quantity if it's now more than stock */}
            {item.quantity > item.stock && (
              <option value={item.quantity}>
                {item.quantity} (Out of Stock)
              </option>
            )}
          </select>
        </div>

        <div className="mt-2 text-sm">
          {item.stock === 0 ? (
            <p className="text-red-600">✗ Out of stock</p>
          ) : item.quantity > item.stock ? (
            <p className="text-red-600">✗ Only {item.stock} left in stock</p>
          ) : (
            <p className="text-green-600">✓ In stock</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartItem;
