/*
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Upload, message, Button, Modal, Form, Input } from "antd";
import { useNavigate } from "react-router-dom";


const Profile = () => {
  const [data, setData] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);

  // const userEmail = sessionStorage.getItem('email');
  const userEmail = sessionStorage.getItem("userEmail");

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [address, setAddress] = useState("");

  const navigate = useNavigate();

  const getCustomerDetails = () => {
    axios
      .get("http://localhost:5000/auth/getCustomerDetails", {
        params: {
          userEmail: userEmail,
        },
      })
      .then((response) => {
        setData(response.data.response);
      })
      .catch((error) => {
        console.error("Axios Error: ", error);
      });
  };

  useEffect(() => {
    getCustomerDetails();
  }, []);

  const uploadButton = (
    <div>
      <div className="upload-icon"></div>
      <div className="ant-upload-text">Upload</div>
    </div>
  );

  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("You can only upload JPG/PNG file!");
    }
    return isJpgOrPng;
  };

  const handleChange = (info) => {
    if (info.file.status === "done") {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, (imageUrl) => setImageUrl(imageUrl));
    }
  };

  const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result));
    reader.readAsDataURL(img);
  };

  const handleUpdate = () => {
    axios
      .put("http://localhost:5000/auth/updateCustomerDetails", {
        username: username || data.username,
        email: email || data.email,
        number: number || data.number,
        address: address || data.address,
      })
      .then((response) => {
        console.log("Updated successfully:", response.data);
        getCustomerDetails();
        setIsModalOpen(false);
        message.success("Successfully updated customer details"); // Add success message
      })
      .catch((error) => {
        console.error("Update failed:", error);
        message.error("Failed to update customer details"); // Add error message
      });
  };

  const handleDelete = () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete your account?"
    );
    if (confirmDelete) {
      axios
        .delete("http://localhost:5000/auth/deleteCustomerDetails", {
          data: {
            userEmail: userEmail,
          },
        })
        .then((response) => {
          console.log("Deleted successfully:", response.data);
          sessionStorage.removeItem("email");
          navigate("/login");
        })
        .catch((error) => {
          console.error("Deletion failed:", error);
          // You may want to display an error message to the user if the deletion fails
        });
    }
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <div className="customerProfile_Top">
        <div className="customerProfile">
          <h3>My Account</h3>
          <div className="avatar-container">
          </div>
          {data ? (
            <div className="user-details-table">
              <table>
                <tbody>
                  <tr>
                    <td>User Name</td>
                    <td>{data?.username}</td>
                  </tr>
                  <tr>
                    <td>E-mail</td>
                    <td>{data?.email}</td>
                  </tr>
                  <tr>
                    <td>Address</td>
                    <td>{data?.address}</td>
                  </tr>
                  <tr>
                    <td>Phone No</td>
                    <td>{data?.number}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          ) : (

            <p>Loading...</p>
          )}

          <div className="button-container">
            <Button type="primary" onClick={showModal}>
              Update
            </Button>
            <Modal
              title="USER PROFILE"
              open={isModalOpen}
              onOk={handleOk}
              onCancel={handleCancel}
            >
              <Form onFinish={handleUpdate}>
                <Form.Item
                  label="User Name"
                  rules={[
                    { required: true, message: "Please enter your User name!" },
                  ]}
                >
                  <Input
                    name="username"
                    size="large"
                    placeholder="User Name"
                    className="username"
                    value={username || data?.username} // Set value to either the state value or the data value
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </Form.Item>

                <Form.Item
                  label="Email"
                  rules={[
                    { required: true, message: "Please enter your Email!" },
                    {
                      pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                      message: "Please enter a valid email address!",
                    },
                  ]}
                >
                  <Input
                    className="email"
                    placeholder="Email"
                    value={email || data?.email} // Set value to either the state value or the data value
                    onChange={(e) => setEmail(e.target.value)}
                    disabled
                  />
                </Form.Item>

                <Form.Item
                  label="Phone Number"
                  className="number"
                  rules={[
                    {
                      required: true,
                      message: "Please enter your phone number!",
                    },
                    {
                      pattern: /^(0)[0-9]{9}$/,
                      message: "Please enter a valid phone number!",
                    },
                  ]}
                >
                  <Input
                    name="number"
                    className="number"
                    placeholder="Phone Number"
                    value={number || data?.number} // Set value to either the state value or the data value
                    onChange={(e) => setNumber(e.target.value)}
                  />
                </Form.Item>

                <Form.Item
                  label="Address"
                  className={
                    address ? "input-item input-item-active" : "input-item"
                  }
                  rules={[
                    { required: true, message: "Please enter your Address!" },
                  ]}
                >
                  <Input
                    name="address"
                    size="large"
                    placeholder="Address"
                    className="Address"
                    value={address || data?.address} // Set value to either the state value or the data value
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </Form.Item>

                <Button type="primary" htmlType="submit" className="submit">
                  Update
                </Button>
              </Form>
            </Modal>

            <Button type="danger" onClick={handleDelete} className="xcs">
              Delete
            </Button>
          </div>
        </div>
      </div>


      <div
        style={{
            marginTop :"30px",
            marginBottom :"30px",
            marginLeft:"500px",
          paddingTop: "30px",
          paddingBottom: "30px",
          textAlign: "center",
        }}
      >
      </div>
    </div>
  );
};

export default Profile;
*/

/*
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Upload, message, Button, Modal, Form, Input } from "antd";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [data, setData] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const userEmail = sessionStorage.getItem("userEmail");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [address, setAddress] = useState("");

  const navigate = useNavigate();

  const getCustomerDetails = () => {
    axios
      .get("http://localhost:5000/auth/getCustomerDetails", {
        params: {
          userEmail: userEmail,
        },
      })
      .then((response) => {
        setData(response.data.response);
      })
      .catch((error) => {
        console.error("Axios Error: ", error);
      });
  };

  useEffect(() => {
    getCustomerDetails();
  }, []);

  const uploadButton = (
    <div>
      <div className="upload-icon"></div>
      <div className="ant-upload-text">Upload</div>
    </div>
  );

  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("You can only upload JPG/PNG file!");
    }
    return isJpgOrPng;
  };

  const handleChange = (info) => {
    if (info.file.status === "done") {
      getBase64(info.file.originFileObj, (imageUrl) => setImageUrl(imageUrl));
    }
  };

  const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result));
    reader.readAsDataURL(img);
  };

  const handleUpdate = () => {
    axios
      .put("http://localhost:5000/auth/updateCustomerDetails", {
        username: username || data.username,
        email: email || data.email,
        number: number || data.number,
        address: address || data.address,
      })
      .then((response) => {
        console.log("Updated successfully:", response.data);
        getCustomerDetails();
        setIsModalOpen(false);
        message.success("Successfully updated customer details");
      })
      .catch((error) => {
        console.error("Update failed:", error);
        message.error("Failed to update customer details");
      });
  };

  const handleDelete = () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete your account?"
    );
    if (confirmDelete) {
      axios
        .delete("http://localhost:5000/auth/deleteCustomerDetails", {
          data: {
            userEmail: userEmail,
          },
        })
        .then((response) => {
          console.log("Deleted successfully:", response.data);
          sessionStorage.removeItem("email");
          navigate("/login");
        })
        .catch((error) => {
          console.error("Deletion failed:", error);
        });
    }
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white shadow-md rounded-lg p-6">
        <h3 className="text-2xl font-bold mb-4">My Account</h3>
        <div className="avatar-container mb-4">
          {imageUrl && <img src={imageUrl} alt="Avatar" className="w-24 h-24 rounded-full" />}
        </div>
        {data ? (
          <div className="user-details-table mb-4">
            <table className="w-full border-collapse">
              <tbody>
                <tr>
                  <td className="border-b py-2 font-medium">User Name</td>
                  <td className="border-b py-2">{data?.username}</td>
                </tr>
                <tr>
                  <td className="border-b py-2 font-medium">E-mail</td>
                  <td className="border-b py-2">{data?.email}</td>
                </tr>
                <tr>
                  <td className="border-b py-2 font-medium">Address</td>
                  <td className="border-b py-2">{data?.address}</td>
                </tr>
                <tr>
                  <td className="border-b py-2 font-medium">Phone No</td>
                  <td className="border-b py-2">{data?.number}</td>
                </tr>
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-500">Loading...</p>
        )}

        <div className="flex space-x-4">
          <Button type="primary" onClick={showModal}>
            Update
          </Button>
          <Modal
            title="USER PROFILE"
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
            footer={null}
          >
            <Form onFinish={handleUpdate} layout="vertical">
              <Form.Item
                label="User Name"
                rules={[{ required: true, message: "Please enter your User name!" }]}
              >
                <Input
                  name="username"
                  size="large"
                  placeholder="User Name"
                  className="username"
                  value={username || data?.username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </Form.Item>

              <Form.Item
                label="Email"
                rules={[
                  { required: true, message: "Please enter your Email!" },
                  {
                    pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                    message: "Please enter a valid email address!",
                  },
                ]}
              >
                <Input
                  className="email"
                  placeholder="Email"
                  value={email || data?.email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled
                />
              </Form.Item>

              <Form.Item
                label="Phone Number"
                rules={[
                  { required: true, message: "Please enter your phone number!" },
                  { pattern: /^(0)[0-9]{9}$/, message: "Please enter a valid phone number!" },
                ]}
              >
                <Input
                  name="number"
                  className="number"
                  placeholder="Phone Number"
                  value={number || data?.number}
                  onChange={(e) => setNumber(e.target.value)}
                />
              </Form.Item>

              <Form.Item
                label="Address"
                rules={[{ required: true, message: "Please enter your Address!" }]}
              >
                <Input
                  name="address"
                  size="large"
                  placeholder="Address"
                  className="Address"
                  value={address || data?.address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </Form.Item>

              <Button type="primary" htmlType="submit" className="w-full">
                Update
              </Button>
            </Form>
          </Modal>

          <Button type="danger" onClick={handleDelete}>
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
*/

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Upload, message, Button, Modal, Form, Input } from "antd";
import { useNavigate } from "react-router-dom";
import { PlusOutlined } from "@ant-design/icons";
import "./profile.css";

 
const Profile = () => {
  const [data, setData] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const userEmail = sessionStorage.getItem("userEmail");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [address, setAddress] = useState("");
 
  const navigate = useNavigate();
 
  const getCustomerDetails = () => {
    axios
      .get("http://localhost:5000/auth/getCustomerDetails", {
        params: {
          userEmail: userEmail,
        },
      })
      .then((response) => {
        setData(response.data.response);
      })
      .catch((error) => {
        console.error("Axios Error: ", error);
      });
  };
 
  useEffect(() => {
    getCustomerDetails();
  }, []);
 
  const uploadButton = (
<div>
<PlusOutlined />
<div style={{ marginTop: 8 }}>Upload</div>
</div>
  );
 
  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("You can only upload JPG/PNG file!");
    }
    return isJpgOrPng;
  };
 
  const handleChange = (info) => {
    if (info.file.status === "done") {
      getBase64(info.file.originFileObj, (imageUrl) => setImageUrl(imageUrl));
    }
  };
 
  const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result));
    reader.readAsDataURL(img);
  };
 
  const handleUpdate = () => {
    axios
      .put("http://localhost:5000/auth/updateCustomerDetails", {
        username: username || data.username,
        email: email || data.email,
        number: number || data.number,
        address: address || data.address,
      })
      .then((response) => {
        console.log("Updated successfully:", response.data);
        getCustomerDetails();
        setIsModalOpen(false);
        message.success("Successfully updated customer details");
      })
      .catch((error) => {
        console.error("Update failed:", error);
        message.error("Failed to update customer details");
      });
  };
 
  const handleDelete = () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete your account?"
    );
    if (confirmDelete) {
      axios
        .delete("http://localhost:5000/auth/deleteCustomerDetails", {
          data: {
            userEmail: userEmail,
          },
        })
        .then((response) => {
          console.log("Deleted successfully:", response.data);
          sessionStorage.removeItem("email");
          navigate("/login");
        })
        .catch((error) => {
          console.error("Deletion failed:", error);
        });
    }
  };
 
  const [isModalOpen, setIsModalOpen] = useState(false);
 
  const showModal = () => {
    setIsModalOpen(true);
  };
 
  const handleOk = () => {
    setIsModalOpen(false);
  };
 
  const handleCancel = () => {
    setIsModalOpen(false);
  };
 
  return (
<div className="container mx-auto p-4">
<div className="bg-white shadow-lg rounded-lg p-6 profile-card">
<h3 className="text-3xl font-bold mb-6 text-center">My Account</h3>
{/* <div className="avatar-container mb-6 text-center">
          {imageUrl ? (
<img src={ imageUrl || profDummy } alt="Avatar" className="w-24 h-24 rounded-full" />
          ) : (
<img
              src="https://via.placeholder.com/150"
              alt="Avatar"
              className="w-24 h-24 rounded-full"
            />
          )}
</div>
        {data ? ( */}
<div className="user-details-table mb-6">
<table className="w-full border-collapse">
<tbody>
<tr>
<td className="border-b py-2 font-semibold">Username</td>
<td className="border-b py-2">{data?.username}</td>
</tr>
<tr>
<td className="border-b py-2 font-semibold">Email</td>
<td className="border-b py-2">{data?.email}</td>
</tr>
<tr>
<td className="border-b py-2 font-semibold">Address</td>
<td className="border-b py-2">{data?.address}</td>
</tr>
<tr>
<td className="border-b py-2 font-semibold">Phone Number</td>
<td className="border-b py-2">{data?.number}</td>
</tr>
</tbody>
</table>
</div>
        {/* ) : (
<p className="text-gray-500">Loading...</p>
        )} */}
 
        <div className="flex space-x-4 justify-center">
<Button type="primary" onClick={showModal} className="profile-button">
            Update
</Button>
<Modal
            title="Edit Profile"
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
            footer={null}
>
<Form onFinish={handleUpdate} layout="vertical">
<Form.Item
                label="Username"
                rules={[{ required: true, message: "Please enter your username!" }]}
>
<Input
                  name="username"
                  size="large"
                  placeholder="Username"
                  className="username-input"
                  value={username || data?.username}
                  onChange={(e) => setUsername(e.target.value)}
                />
</Form.Item>
 
              <Form.Item
                label="Email"
                rules={[
                  { required: true, message: "Please enter your Email!" },
                  {
                    pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                    message: "Please enter a valid email address!",
                  },
                ]}
>
<Input
                  className="email-input"
                  placeholder="Email"
                  value={email || data?.email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled
                />
</Form.Item>
 
              <Form.Item
                label="Phone Number"
                rules={[
                  { required: true, message: "Please enter your phone number!" },
                  { pattern: /^(0)[0-9]{9}$/, message: "Please enter a valid phone number!" },
                ]}
>
<Input
                  name="number"
                  className="number-input"
                  placeholder="Phone Number"
                  value={number || data?.number}
                  onChange={(e) => setNumber(e.target.value)}
                />
</Form.Item>
 
              <Form.Item
                label="Address"
                rules={[{ required: true, message: "Please enter your Address!" }]}
>
<Input
                  name="address"
                  size="large"
                  placeholder="Address"
                  className="address-input"
                  value={address || data?.address}
                  onChange={(e) => setAddress(e.target.value)}
                />
</Form.Item>
 
              <Button type="primary" htmlType="submit" className="w-full">
                Save Changes
</Button>
</Form>
</Modal>
 
          <Button type="danger" onClick={handleDelete} className="profile-button">
            Delete Account
</Button>
</div>
</div>
</div>
  );
};
 
export default Profile;