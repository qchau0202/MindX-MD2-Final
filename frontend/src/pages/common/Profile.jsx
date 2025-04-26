import React, { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate, Routes, Route } from "react-router-dom";
import ProfileNavigation from "../../components/profile/ProfileNavigation";
import ProfileOverview from "../../components/profile/ProfileOverview";
import ProfileEditModal from "../../components/profile/ProfileEditModal";
import Orders from "../../pages/common/Orders";
import getStatusColor from "../../utils/getStatusColor";

const Profile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const statusStyle = getStatusColor(user.role);

  const handleEditProfile = () => {
    setIsEditModalVisible(true);
  };

  const handleModalClose = () => {
    setIsEditModalVisible(false);
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      <div>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          <div className="col-span-1">
            <ProfileNavigation
              onEditProfile={handleEditProfile}
              onLogout={handleLogout}
            />
          </div>
          <div className="col-span-1 md:col-span-4">
            <Routes>
              <Route
                path="/"
                element={
                  <ProfileOverview
                    user={user}
                    onEditProfile={handleEditProfile}
                    statusStyle={statusStyle}
                  />
                }
              />
              <Route path="/orders" element={<Orders />} />
            </Routes>
          </div>
        </div>

        <ProfileEditModal
          visible={isEditModalVisible}
          onClose={handleModalClose}
          user={user}
        />
      </div>
    </div>
  );
};

export default Profile;