import axios from "axios";
import React, { useEffect, useState } from "react";
import GroupDetails from "../components/GroupDetails";
import CreateGroupModal from "../components/CreateGroupModal";
import AddFriendModal from "../components/AddFriendModal";
import AddItemModal from "../components/AddItemModal";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const UserDashboard = () => {
  const [oweMessage, setOweMessage] = useState(null);
  const [groupItems, setGroupItems] = useState([]);
  const [groups, setGroups] = useState([]);
  const [showCreateGroup, setShowCreateGroup] = useState(false);
  const [showAddFriend, setShowAddFriend] = useState(false);
  const [showAddItem, setShowAddItem] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [selectedGroupForItem, setSelectedGroupForItem] = useState(null);
  const [loginuser, setLoginuser] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);
  const [newGroup, setNewGroup] = useState({
    roomName: "",
  });
  const [newFriend, setNewFriend] = useState({
    userEmail: "",
    roomName: "",
  });

  const navigate = useNavigate();

  async function getAllGroups() {
    let { data } = await axios.get(
      "http://localhost:8182/roomMates/getAllRoomDetails",
      { withCredentials: true },
    );
    console.log(data);
    setGroups(data);
  }

  // PUT API TO GET LOGIN USER DATA
  async function getloginuserData() {
    let { data } = await axios.get("http://localhost:8182/user/getUserName", {
      withCredentials: true,
    });
    setLoginuser(data);
  }

  async function getTotalPrice() {
    let { data } = await axios.get(
      "http://localhost:8182/user/getUserLoggedInAddedItemsSummation",
      { withCredentials: true },
    );
    console.log(data);
    setTotalPrice(data.totalSum);
  }

  useEffect(() => {
    getTotalPrice();
  }, [showAddItem]);

  const handleCreateGroup = async (e) => {
    e.preventDefault();
    if (newGroup.roomName.trim()) {
      try {
        let resp = await axios.post(
          "http://localhost:8182/roomMates/createRoom",
          newGroup,
          { withCredentials: true },
        );
        console.log(resp);
        getAllGroups();
        setNewGroup({ roomName: "" });
        setShowCreateGroup(false);
      } catch (error) {
        console.log(error);
        console.log("error while creating new group");
      }
    }
  };

  const handleAddFriend = async (e) => {
    e.preventDefault();

    // Ensure user is logged in first
    const accesstoken = sessionStorage.getItem("accesstoken");
    if (!accesstoken) {
      toast.error("You must be logged in to add a friend!");
      return;
    }

    if (newFriend.userEmail.trim() && newFriend.roomName.trim()) {
      try {
        let resp = await axios.get(
          `http://localhost:8182/roomMates/addRoomMates/${newFriend.userEmail}/${newFriend.roomName}`,
          { withCredentials: true },
        );
        console.log(resp);
        getAllGroups();
        setNewFriend({ userEmail: "", roomName: "" });
        setShowAddFriend(false);
      } catch (error) {
        toast.error(error.response.data.message);
        console.log("error while adding friend");
      }
    }
  };

  const handleAddItem = async (itemData, roomName) => {
    try {
      // TODO: Implement the API call to add item
      console.log("Adding item:", itemData);
      let userName = sessionStorage.getItem("useremail");
      let resp = await axios.post(
        `http://localhost:8182/items/addItems/${roomName}`,
        itemData,
        { withCredentials: true },
      );
      toast.success(`${itemData.itemsName} Added`);
      setShowAddItem(false);
      setSelectedGroupForItem(null);
      // 👇 Refresh owe info here
      // Refresh data
      fetchOweInfo(); // existing call
      fetchGroupItems();
    } catch (error) {
      console.log("error while adding item:", error);
    }
  };

  const logoutuser = async () => {
    try {
      let resp = await axios.get("http://localhost:8182/user/userLogout", {
        withCredentials: true,
      });
      console.log(resp);

      // Only remove the session if the response is successful
      if (resp.status === 200) {
        sessionStorage.removeItem("accesstoken");
        toast.success("Logout success");
        navigate("/login");
      } else {
        // If status is not 200, log it
        console.log("Logout failed with status: ", resp.status);
        toast.error("Logout failed, please try again.");
      }
    } catch (error) {
      console.error("Error during logout:", error);

      // Enhanced error handling
      if (error.response) {
        // Server responded with a status other than 200 range
        console.log("Error response: ", error.response);
        toast.error(
          `Logout failed: ${error.response.data.message || "Unknown error"}`,
        );
      } else if (error.request) {
        // Request was made, but no response received
        console.log("Error request: ", error.request);
        toast.error("Network error. Please check your internet connection.");
      } else {
        // Something happened in setting up the request
        console.log("Error message: ", error.message);
        toast.error(`Logout failed: ${error.message}`);
      }
    }
  };

  const fetchGroupItems = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:8182/items/groupItems",
        {
          withCredentials: true,
        },
      );
      setGroupItems(data.userItems);
    } catch (err) {
      console.error("Error fetching group items", err);
    }
  };

  const fetchOweInfo = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8182/owe/getOweUserByLoggedUserId",
        { withCredentials: true },
      );
      const data = response.data;

      // Format the message
      const message = `${data.borrowMessage}${data.money}₹${data.lendMessage}`;
      setOweMessage(message);
    } catch (error) {
      if (error.response?.status === 204) {
        setOweMessage("No one has borrowed money.");
      } else {
        console.error("Error fetching owe info:", error);
      }
    }
  };

  useEffect(() => {
    getAllGroups();
    getloginuserData();

    fetchOweInfo();
    fetchGroupItems();
  }, []);

 return (
  <>
    {/* Top Bar */}
    <div className="sticky top-0 z-10 bg-slate-800 text-white shadow">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row gap-3 sm:gap-0 justify-between items-start sm:items-center px-4 py-4">
        <h1 className="text-2xl sm:text-3xl font-bold">Dashboard</h1>
        <div className="flex gap-2">
          <button
            onClick={() => setShowCreateGroup(true)}
            className="bg-white text-purple-600 px-4 py-2 rounded-lg font-semibold hover:bg-purple-50 transition"
          >
            + Create Group
          </button>
          <button
            onClick={logoutuser}
            className="bg-red-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>
      </div>
    </div>

    <div className="min-h-screen bg-slate-100 p-4 sm:p-6">
      <div className="max-w-7xl mx-auto space-y-6">

        {/* Welcome + Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-xl shadow p-5 md:col-span-2">
            <h2 className="text-xl font-semibold text-gray-800">
              Welcome, <span className="text-purple-600">{loginuser?.name}</span>
            </h2>
            <p className="text-gray-500 mt-1">
              Manage your groups, friends, and expenses easily.
            </p>
          </div>
          <div className="bg-white rounded-xl shadow p-5">
            <p className="text-sm text-gray-500">Total Amount Added By You</p>
            <p className="text-2xl font-bold text-green-600">₹ {totalPrice}</p>
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {/* Groups Section */}
          <div className="md:col-span-2">
            <div className="bg-white rounded-xl shadow p-5">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Your Groups
              </h2>

              {groups?.length === 0 ? (
                <p className="text-gray-500 text-center py-6">
                  No groups yet. Create one to get started!
                </p>
              ) : (
                <div className="space-y-4">
                  {groups?.map((group) => (
                    <div
                      key={group.id}
                      className="border rounded-lg p-4 hover:shadow-md transition bg-slate-50"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-800">
                            {group.roomName}
                          </h3>
                          <p className="text-sm text-gray-600">
                            {group.description}
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            {group.users.length} members
                          </p>
                        </div>
                        <div className="flex gap-3">
                          <button
                            onClick={() => {
                              setSelectedGroupForItem(group);
                              setShowAddItem(true);
                            }}
                            className="text-green-600 hover:text-green-800 font-medium"
                          >
                            + Add Item
                          </button>
                          <button
                            onClick={() => setSelectedGroup(group)}
                            className="text-purple-600 hover:text-purple-800 font-medium"
                          >
                            View Details
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Add Friend Card */}
          <div>
            <div className="bg-white rounded-xl shadow p-5">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">
                Friends
              </h3>
              <button
                onClick={() => setShowAddFriend(true)}
                className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition"
              >
                + Add Friend
              </button>
            </div>
          </div>
        </div>

        {/* Owe Message */}
        {oweMessage && (
          <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 rounded-lg shadow-sm">
            <p className="font-medium">{oweMessage}</p>
          </div>
        )}

        {/* Group Items Table */}
        <div className="bg-white p-5 rounded-xl shadow">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            Group Items
          </h2>

          {groupItems.length === 0 ? (
            <p className="text-gray-500">No items found.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[500px] border-collapse">
                <thead>
                  <tr className="bg-gray-100 text-left">
                    <th className="px-4 py-2 border">Username</th>
                    <th className="px-4 py-2 border">Item Name</th>
                    <th className="px-4 py-2 border">Price</th>
                  </tr>
                </thead>
                <tbody>
                  {groupItems.map((item, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-4 py-2 border">{item.username}</td>
                      <td className="px-4 py-2 border">{item.itemname}</td>
                      <td className="px-4 py-2 border">₹{item.price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Modals (UNCHANGED) */}
      <CreateGroupModal
        show={showCreateGroup}
        onClose={() => setShowCreateGroup(false)}
        onSubmit={handleCreateGroup}
        newGroup={newGroup}
        setNewGroup={setNewGroup}
      />

      <AddFriendModal
        show={showAddFriend}
        onClose={() => setShowAddFriend(false)}
        onSubmit={handleAddFriend}
        newFriend={newFriend}
        setNewFriend={setNewFriend}
      />

      <AddItemModal
        show={showAddItem}
        onClose={() => {
          setShowAddItem(false);
          setSelectedGroupForItem(null);
        }}
        onSubmit={handleAddItem}
        group={selectedGroupForItem}
      />

      {selectedGroup && (
        <GroupDetails
          group={selectedGroup}
          onClose={() => setSelectedGroup(null)}
        />
      )}
    </div>
  </>
);
};

export default UserDashboard;
