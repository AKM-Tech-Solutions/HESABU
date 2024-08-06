import React, { useState } from "react";
import "./cssFiles/Profile.css";
import profileImage from "../data/avatar.jpg";

const Profile = () => {
  // function to get user details from firebase

  const [user, setUser] = useState({
    username: "JohnDoe",
    email: "johndoe@example.com",
    imageUrl: profileImage,
  });

  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    username: user.username,
    email: user.email,
    image: null, // For image upload
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    setFormData({
      ...formData,
      image: e.target.files[0],
    });
  };

  const handleSave = () => {
    // Update user state with new data
    setUser({
      ...user,
      username: formData.username,
      email: formData.email,
      imageUrl: formData.image
        ? URL.createObjectURL(formData.image)
        : user.imageUrl,
    });
    setEditMode(false);
  };

  const handleCancel = () => {
    setFormData({
      username: user.username,
      email: user.email,
      image: null,
    });
    setEditMode(false);
  };

  return (
    <div className="profile-container">
      <div className="profile-header">
        <img src={user.imageUrl} alt="Profile" className="profile-image" />
        <div className="profile-details">
          {editMode ? (
            <div>
              <label>
                Username:
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                />
              </label>
              <label>
                Email:
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </label>
              <label>
                Profile Image:
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </label>
              <button
                style={{
                  marginTop: "10px",
                  padding: "10px 20px",
                  border: "none",
                  borderRadius: "5px",
                  color: "white",
                  backgroundColor: "#007bff",
                  cursor: "pointer",
                  gap: "10px",
                }}
                onClick={handleSave}
              >
                Save
              </button>
              <button
                style={{
                  marginTop: "10px",
                  padding: "10px 20px",
                  border: "none",
                  borderRadius: "5px",
                  color: "white",
                  backgroundColor: "#6c757d",
                  cursor: "pointer",
                }}
                onClick={handleCancel}
              >
                Cancel
              </button>
            </div>
          ) : (
            <div>
              <h1 className="profile-username">{user.username}</h1>
              <p className="profile-email">{user.email}</p>
              <button
                style={{
                  marginTop: "10px",
                  padding: "10px 20px",
                  border: "none",
                  borderRadius: "5px",
                  color: "white",
                  backgroundColor: "#007bff",
                  cursor: "pointer",
                }}
                onClick={() => setEditMode(true)}
              >
                Edit Profile
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
