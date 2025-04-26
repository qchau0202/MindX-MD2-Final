import React, { useEffect, useState } from "react";
import { Modal, Form, Input, Button, Upload, message } from "antd";
import {
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { updateUserProfile } from "../../services/api";
import { useAuth } from "../../contexts/AuthContext";

const ProfileEditModal = ({ visible, onClose, user }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [avatarUrl, setAvatarUrl] = useState(user?.avatar || null);
  const { updateUser } = useAuth();

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      console.log("Submitting values:", values);
      const response = await updateUserProfile(values);
      messageApi.destroy(); // Xóa thông báo cũ
      if (response.data.success) {
        messageApi.open({
          type: "success",
          content: "Profile updated successfully!",
        });
        updateUser({
          ...user,
          ...values,
        });
        form.resetFields(); // Reset form sau khi thành công
        onClose(); // Đóng modal
      } else {
        messageApi.open({
          type: "error",
          content: response.data.message || "Failed to update profile.",
        });
      }
    } catch (error) {
      console.error("Update profile error:", error);
      messageApi.destroy();
      messageApi.open({
        type: "error",
        content: error.message || "An error occurred.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    form.resetFields();
    onClose();
  };

  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("You can only upload JPG/PNG files!");
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error("Image must be smaller than 2MB!");
    }
    return isJpgOrPng && isLt2M;
  };

  const handleAvatarChange = (info) => {
    if (info.file.status === "done") {
      setAvatarUrl(info.file.response.url);
      message.success(`${info.file.name} uploaded successfully`);
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} upload failed.`);
    }
  };

  useEffect(() => {
    if (visible && user) {
      form.setFieldsValue({
        name: user.name,
        email: user.email,
        phone: user.phone || "",
        address: user.address || "",
      });
      setAvatarUrl(user.avatar);
    }
  }, [visible, user, form]);

  return (
    <div>
      {contextHolder}
      <Modal
        open={visible}
        title={
          <div className="flex items-center space-x-3">
            <div className="bg-blue-100 p-2 rounded-lg">
              <UserOutlined className="text-blue-600 text-xl" />
            </div>
            <span className="text-xl font-bold">Edit Your Profile</span>
          </div>
        }
        onCancel={handleCancel}
        footer={null}
        width={800}
        className="profile-edit-modal"
        centered
      >
        <div className="p-2">
          <Form
            form={form}
            layout="vertical"
            onFinish={handleSubmit}
            initialValues={{
              name: user?.name || "",
              email: user?.email || "",
              phone: user?.phone || "",
              address: user?.address || "",
            }}
          >
            <div className="flex justify-center mb-6">
              <Upload
                name="avatar"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                // action="/api/upload"
                beforeUpload={beforeUpload}
                onChange={handleAvatarChange}
              >
                {avatarUrl ? (
                  <img
                    src={avatarUrl}
                    alt="avatar"
                    style={{ width: "100%", borderRadius: "50%" }}
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center">
                    <UploadOutlined className="text-blue-500 text-2xl" />
                    <div className="mt-2 text-gray-600">Upload Photo</div>
                  </div>
                )}
              </Upload>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Form.Item
                name="name"
                label="Full Name"
                rules={[{ required: true, message: "Please enter your name" }]}
              >
                <Input
                  prefix={<UserOutlined className="text-gray-400" />}
                  placeholder="Enter your full name"
                  className="rounded-lg py-2"
                />
              </Form.Item>

              <Form.Item
                name="email"
                label="Email"
                rules={[
                  { required: true, message: "Please enter your email" },
                  { type: "email", message: "Please enter a valid email" },
                ]}
              >
                <Input
                  prefix={<MailOutlined className="text-gray-400" />}
                  placeholder="Enter your email"
                  className="rounded-lg py-2"
                />
              </Form.Item>

              <Form.Item
                name="phone"
                label="Phone Number"
                rules={[{ message: "Please enter a valid phone number" }]}
              >
                <Input
                  prefix={<PhoneOutlined className="text-gray-400" />}
                  placeholder="Enter your phone number"
                  className="rounded-lg py-2"
                />
              </Form.Item>
            </div>

            <Form.Item
              name="address"
              label="Address"
              rules={[{ required: true, message: "Please enter your address" }]}
            >
              <Input
                placeholder="Enter your address"
                className="rounded-lg py-2"
              />
            </Form.Item>

            <div className="flex justify-end space-x-3 mt-6">
              <Button onClick={handleCancel} className="rounded-lg px-6">
                Cancel
              </Button>
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 border-none rounded-lg px-6"
              >
                Save Changes
              </Button>
            </div>
          </Form>
        </div>
      </Modal>
    </div>
  );
};

export default ProfileEditModal;