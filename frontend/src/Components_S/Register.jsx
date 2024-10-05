/*
import React, { useState } from "react";
import Axios from "axios";
import { Button, Checkbox, Form, Input, message } from "antd";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";


const Register = () => {

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [number, setNumber] = useState('');
  const [address, setAddress] = useState('');
  const [password, setPassword] = useState('');

  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate()

  const handleSubmit = (values) => {
    
    Axios.post("http://localhost:5000/auth/register", { 
      username: values.username,
      email: values.email,
      number:values.number,
      address:values.address,
      password:values.password, 
    }).then(response => {
      if (response.data.status){
        navigate('/login')
      }
      else{
        message.error("Email is already exists");
      }
    }).catch(err =>{
      console.log(err)
    })
  }


  const validatePassword = (_, value) => {
    if (value && value !== password) {
      return Promise.reject(new Error("Please Match your Password"));
    }
    return Promise.resolve();
  };


  return (


       <div>
    <div className="Registercontainer">
      <div className="register-main-box">
        <h2 className="ren">Sign Up!</h2>

        <Form
          name="normal_login"
          className="login-form"
          initialValues={{
            remember: true,
          }}
          onFinish={handleSubmit}
        >
          <Form.Item
            label="User Name"
            name="username"
            rules={[
              { required: true, message: "Please enter your User name!" },
            ]}
          >
            <Input
              name="username"
              size="large"
              placeholder={"User Name"}
              className="username"
              onChange={(e) => setUsername(e.target.value)}
            />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
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
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Item>

          <Form.Item
            label="Phone Number"
            name="number"
            className="number"
            rules={[
              { required: true, message: "Please enter your phone number!" },
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
              onChange={(e) => setNumber(e.target.value)}
            />
          </Form.Item>

          <Form.Item
            label="Address"
            name="address"
            className={address ? "input-item input-item-active" : "input-item"}
            rules={[{ required: true, message: "Please enter your Address!" }]}
          >
            <Input
              name="address"
              size="large"
              placeholder="Address"
              className="Address"
              onChange={(e) => setAddress(e.target.value)}
            />
          </Form.Item>

          <div className="form-row">
            <Form.Item
              label="Password"
              name="password"
              rules={[
                { required: true, message: "Please provide a password!" },
                {
                  min: 8,
                  max: 15,
                  message: "Password must be at least 8 characters long!",
                },
              ]}
            >
              <Input.Password
                name="password"
                size="large"
                placeholder={"Password"}
                className="password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Item>

            <Form.Item
              label="Confirm Password"
              name="confirmPassword"
              dependencies={["password"]}
              rules={[
                { required: true, message: "Please confirm your password!" },
                { validator: validatePassword },
              ]}
            >
              <Input.Password
                size="large"
                placeholder="Confirm Password"
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </Form.Item>
          </div>

          <Button classNames = "sub123" type="primary" htmlType="submit" className="submit">
            Register
          </Button>

          <div className="login-register">
            <p>
              Already have an Account?
              <Link to="/login" className="log-link">
                Log In
              </Link>
            </p>
          </div>
        </Form>
      </div>
    </div>
    <br/>
 </div>
  );
};
  

export default Register
*/

/*
import React, { useState } from "react";
import Axios from "axios";
import { Button, Form, Input, message } from "antd";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import './register.css';

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (values) => {
    Axios.post("http://localhost:5000/auth/register", {
      username: values.username,
      email: values.email,
      number: values.number,
      address: values.address,
      password: values.password,
    })
      .then((response) => {
        if (response.data.status) {
          navigate("/login");
        } else {
          message.error("Email already exists");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const validatePassword = (_, value) => {
    if (value && value !== password) {
      return Promise.reject(new Error("Passwords do not match"));
    }
    return Promise.resolve();
  };

  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="container bg-white p-6 rounded-md shadow-lg max-w-md text-center">
        <h2 className="text-2xl font-bold mb-5">Sign Up</h2>
        <br/>
        <Form
          name="register"
          className="flex flex-col gap-4"
          initialValues={{ remember: true }}
          onFinish={handleSubmit}
        >
        <div className="register-form">  
         <div style={{marginRight:'-40px'}}> 
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: "Please enter your Username!" }]}
          >
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Please enter your Email!" },
              {
                pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                message: "Please enter a valid email address!",
              },
            ]}
          >
          </Form.Item>

          <Form.Item
            label="Phone Number"
            name="number"
            rules={[
              { required: true, message: "Please enter your phone number!" },
              {
                pattern: /^(0)[0-9]{9}$/,
                message: "Please enter a valid phone number!",
              },
            ]}
          > 
          </Form.Item>

          <Form.Item
            label="Address"
            name="address"
            rules={[{ required: true, message: "Please enter your Address!" }]}
          > </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              { required: true, message: "Please provide a password!" },
              {
                min: 8,
                max: 15,
                message: "Password must be at least 8 characters long!",
              },
            ]}
          ></Form.Item>
          <Form.Item
            label="Confirm Password"
            name="confirmPassword"
            dependencies={["password"]}
            rules={[
              { required: true, message: "Please confirm your password!" },
              { validator: validatePassword },
            ]}
          ></Form.Item>

          </div>
          <div>

            <Input
              name="username"
              size="large"
              placeholder="Username"
              className="register-input-field"
              onChange={(e) => setUsername(e.target.value)}
            />

            <Input
              name="email"
              size="large"
              placeholder="Email"
              className="register-input-field"
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              name="number"
              size="large"
              placeholder="Phone Number"
              className="register-input-field"
              onChange={(e) => setNumber(e.target.value)}
            />
          
            <Input
              name="address"
              size="large"
              placeholder="Address"
              className="register-input-field"
              onChange={(e) => setAddress(e.target.value)}
            />
          
            <Input.Password
              name="password"
              size="large"
              placeholder="Password"
              className="register-input-field"
              onChange={(e) => setPassword(e.target.value)}
            />
          
            <Input.Password
              size="large"
              placeholder="Confirm Password"
              className="register-input-field"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            </div>
          </div>

          <Button
            type="primary"
            htmlType="submit"
            className="bg-purple-600 text-white rounded-md w-full p-2 mt-4"
          >
            Register
          </Button>

          <div className="mt-4 text-gray-500">
            Already have an Account?{" "}
            <Link to="/login" className="text-purple-600">
              Log In
            </Link>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Register;
*/

import React, { useState } from "react";
import Axios from "axios";
import { Button, Form, Input, message } from "antd";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import './register.css';
 
const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
 
  const navigate = useNavigate();
 
  const handleSubmit = (values) => {
    Axios.post("http://localhost:5000/auth/register", {
      username: values.username,
      email: values.email,
      number: values.number,
      address: values.address,
      password: values.password,
    })
      .then((response) => {
        if (response.data.status) {
          navigate("/login");
        } else {
          message.error("Email already exists");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
 
  const validatePassword = (_, value) => {
    if (value && value !== password) {
      return Promise.reject(new Error("Passwords do not match"));
    }
    return Promise.resolve();
  };
 
  return (
<div className="register-page">
<div className="register-container">
<h2 className="register-title">Sign Up</h2>
<Form
          name="register"
          layout="vertical"
          className="register-form"
          onFinish={handleSubmit}
>
<Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: "Please enter your Username!" }]}
>
<Input
              size="large"
              placeholder="Enter your username"
              onChange={(e) => setUsername(e.target.value)}
              className="register-input-field"
            />
</Form.Item>
 
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Please enter your Email!" },
              {
                pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                message: "Please enter a valid email address!",
              },
            ]}
>
<Input
              size="large"
              placeholder="Enter your email"
              onChange={(e) => setEmail(e.target.value)}
              className="register-input-field"
            />
</Form.Item>
 
          <Form.Item
            label="Phone Number"
            name="number"
            rules={[
              { required: true, message: "Please enter your phone number!" },
              {
                pattern: /^(0)[0-9]{9}$/,
                message: "Please enter a valid phone number!",
              },
            ]}
>
<Input
              size="large"
              placeholder="Enter your phone number"
              onChange={(e) => setNumber(e.target.value)}
              className="register-input-field"
            />
</Form.Item>
 
          <Form.Item
            label="Address"
            name="address"
            rules={[{ required: true, message: "Please enter your Address!" }]}
>
<Input
              size="large"
              placeholder="Enter your address"
              onChange={(e) => setAddress(e.target.value)}
              className="register-input-field"
            />
</Form.Item>
 
          <Form.Item
            label="Password"
            name="password"
            rules={[
              { required: true, message: "Please provide a password!" },
              {
                min: 8,
                max: 15,
                message: "Password must be between 8-15 characters!",
              },
            ]}
>
<Input.Password
              size="large"
              placeholder="Enter your password"
              onChange={(e) => setPassword(e.target.value)}
              className="register-input-field"
            />
</Form.Item>
 
          <Form.Item
            label="Confirm Password"
            name="confirmPassword"
            dependencies={["password"]}
            rules={[
              { required: true, message: "Please confirm your password!" },
              { validator: validatePassword },
            ]}
>
<Input.Password
              size="large"
              placeholder="Confirm your password"
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="register-input-field"
            />
</Form.Item>
 
          <Button
            type="primary"
            htmlType="submit"
            className="register-button"
>
            Register
</Button>
 
          <div className="register-footer">
            Already have an account?{" "}
<Link to="/login" className="login-link">
              Log In
</Link>
</div>
</Form>
</div>
</div>
  );
};
 
export default Register;