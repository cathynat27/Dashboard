// UserProfile.jsx
import React from "react";

const Profile = ({ user }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <h2 className="text-lg font-semibold mb-2">User Profile</h2>
      <div className="flex items-center space-x-4">
        <img
          src={user.avatar}
          alt="User Avatar"
          className="w-12 h-12 rounded-full"
        />
        <div>
          <p className="text-gray-800 font-semibold">{user.name}</p>
          <p className="text-gray-600">{user.email}</p>
          <p className="text-gray-500">{user.description}</p>

        </div>
      </div>
    </div>
  );
};

export default Profile;
