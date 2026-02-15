import React from "react";

const AddItemModal = ({ show, onClose, onSubmit, group }) => {
  const [itemData, setItemData] = React.useState({
    itemsName: "",
    price: "",
  });

  if (!show) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    onSubmit(itemData,group.roomName);



    setItemData({ itemsName: "", price: "" });
  };

  return (
    <div className="fixed inset-0 bg-[#000000d4] bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-xl p-6 w-96 transform transition-all duration-300">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Add Item to {group.roomName}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="itemName"
              className="block text-sm font-medium text-gray-700"
            >
              Item Name
            </label>
            <input
              type="text"
              id="itemName"
              value={itemData.itemsName}
              onChange={(e) =>
                setItemData({ ...itemData, itemsName: e.target.value })
              }
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Enter item name"
              required
            />
          </div>
          <div>
            <label
              htmlFor="itemPrice"
              className="block text-sm font-medium text-gray-700"
            >
              Price
            </label>
            <input
              type="number"
              id="itemPrice"
              value={itemData.price}
              onChange={(e) =>
                setItemData({ ...itemData, price: e.target.value })
              }
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Enter price"
              required
            />
          </div>

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:text-gray-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-all duration-300"
            >
              Add Item
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddItemModal;
