// components/CartItem.jsx
const CartItem = ({ item, onQtyChange, onRemove }) => {
  return (
    <div className="flex items-start gap-4 border-b py-4">
      <img src={item.productImage} alt={item.productName} className="w-24 h-24 rounded" />
      <div className="flex-1">
        <h3 className="text-lg font-semibold">{item.productName}</h3>
        {/* <p className="text-sm text-gray-600">Color: {item.colorName}</p> */}
        <p className="text-sm text-gray-500 capitalize">
          {item.colorName} &bull; {item.storage}
        </p>
        <p className="mt-1 font-medium">${item.priceAfterDiscount}</p>

        <div className="mt-2 flex items-center gap-2">
          <select
            value={item.quantity}
            onChange={(e) => onQtyChange(item._id, Number(e.target.value))}
            className="border px-2 py-1 rounded"
          >
            {Array.from({ length: item.stock }, (_, i) => i + 1).map((num) => (
              <option key={num} value={num}>
                {num}
              </option>
            ))}
          </select>
          <button onClick={() => onRemove(item._id)} className="text-red-500">
            ×
          </button>
        </div>

        <div className="mt-2 text-sm">
          {item.stock > 0 ? (
            <p className="text-green-600">✓ In stock</p>
          ) : (
            <p className="text-yellow-600">🕒 Ships in 3–4 weeks</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartItem;
