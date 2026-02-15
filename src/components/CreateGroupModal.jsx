import React from "react";

const CreateGroupModal = ({
  show,
  onClose,
  onSubmit,
  newGroup,
  setNewGroup,
}) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-[#000000d4] flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-xl p-6 w-96 transform transition-all duration-300">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Create New Group
        </h2>
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="groupName"
              className="block text-sm font-medium text-gray-700"
            >
              Group Name
            </label>
            <input
              type="text"
              id="groupName"
              value={newGroup.roomName}
              onChange={(e) => setNewGroup({ roomName: e.target.value })}
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Enter group name"
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
              className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-all duration-300"
            >
              Create Group
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateGroupModal;
