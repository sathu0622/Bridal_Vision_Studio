/*
import React, { useState } from "react";
import Axios from "axios";
import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, Modal, message } from "antd";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";


const Login = () =>{

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate()

  Axios.defaults.withCredentials = true;
  
  const handleSubmit = (values) => {
    
    Axios.post('http://localhost:5000/auth/login', { 
    email: values.email, 
    password: values.password,

    }).then(response => {
      if (response.data.status){
        sessionStorage.setItem('userEmail', email);
        console.log(response.data.status)
        console.log(email)
        // window.location.reload();

        if (email == 'sathushan622@gmail.com' ){
          navigate('/add-product')
        }
        else{
          navigate('/view-product');
        }
      }else{
        message.error("Your password or email is incorrect");
      }
    }).catch(err =>{
      console.log(err)
      message.error("Your email is incorrect");
    })
  }


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
  
    <div className="loginForm">

      
     
      <Form

        name="normal_login"
        className="login-form"
        initialValues={{
          remember: true,
        }}
        onFinish={handleSubmit}
      >

        <h3 className="namel">LOGIN</h3>
        <Form.Item
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
            prefix={<MailOutlined className="site-form-item-icon" />}
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your Password!",
            },
          ]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Log in
          </Button>


          <p>
          <br />
            Don't have an Account? &nbsp; &nbsp; &nbsp; &nbsp;  
            <Link to="/register" className="register-link">
              Sign Up
            </Link>
          </p>
<br />

          <p>
            If you are an Employee? &nbsp; &nbsp; &nbsp; &nbsp; 
            <Link to="/elogin" className="register-link">
              Employee Login
            </Link>
          </p>
        </Form.Item>
      </Form>
    </div>
    </div>
  );
};
  


export default Login;
*/

/*
import React, { useState } from "react";
import Axios from "axios";
import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { Button, Form, Input, message } from "antd";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  Axios.defaults.withCredentials = true;

  const handleSubmit = (values) => {
    Axios.post("http://localhost:5000/auth/login", {
      email: values.email,
      password: values.password,
    })
      .then((response) => {
        if (response.data.status) {
          sessionStorage.setItem("userEmail", email);

          if (email === "sathushan622@gmail.com") {
            navigate("/add-product");
          } else {
            navigate("/view-product");
          }
        } else {
          message.error("Your password or email is incorrect");
        }
      })
      .catch((err) => {
        console.log(err);
        message.error("Your email is incorrect");
      });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h3 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          LOGIN
        </h3>
        <Form
          name="login_form"
          className="space-y-4"
          initialValues={{ remember: true }}
          onFinish={handleSubmit}
        >
          <Form.Item
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
              prefix={<MailOutlined className="text-gray-500" />}
              placeholder="Email"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[
              { required: true, message: "Please input your Password!" },
            ]}
          >
            <Input
              prefix={<LockOutlined className="text-gray-500" />}
              type="password"
              placeholder="Password"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="w-full red-400 border-2 p-8 border-red-400 rounded-md hover:bg-red-400 text-white font-semibold py-2 rounded-md"
            >
              Log in
            </Button>
          </Form.Item>

          <div className="text-center mt-4">
            <p>
              Don't have an account?{" "}
              <Link to="/register" className="text-blue-500 hover:underline">
                Sign Up
              </Link>
            </p>
          </div>

        </Form>
      </div>
    </div>
  );
};

export default Login;
*/

import React, { useState } from "react";
import Axios from "axios";
import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { Button, Form, Input, message } from "antd";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  Axios.defaults.withCredentials = true;

  const handleSubmit = (values) => {
    Axios.post("http://localhost:5000/auth/login", {
      email: values.email,
      password: values.password,
    })
      .then((response) => {
        if (response.data.status) {
          sessionStorage.setItem("userEmail", email);
          console.log(response.data.status);
          console.log(email);

          if (email === "sathushan622@gmail.com") {
            navigate("/add-product");
          } else {
            navigate("/view-product");
          }
        } else {
          message.error("Your password or email is incorrect");
        }
      })
      .catch((err) => {
        console.log(err);
        message.error("Your email is incorrect");
      });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
    <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
      
        <Form
          name="normal_login"
          className="flex flex-col gap-4"
          initialValues={{
            remember: true,
          }}
          onFinish={handleSubmit}
        >
          <h3 className="text-2xl font-semibold text-center text-gray-800 mb-6">LOGIN</h3>

          <Form.Item
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
              prefix={<MailOutlined />}
              placeholder="Email"
              className="w-full p-2 border-b border-black outline-none text-lg"
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your Password!" }]}
          >
            <Input
              prefix={<LockOutlined />}
              type="password"
              placeholder="Password"
              className="w-full p-2 border-b border-black outline-none text-lg"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Item>

          <Button
            type="primary"
            htmlType="submit"
            className="w-full bg-purple-600 text-white rounded-md w-full p-8 mt-2 cursor-pointer py-2 rounded-md"
          >
            Log in
          </Button>

          <div className="text-center mt-4">
          <p className="text-gray-500 mt-4">
            Don't have an Account? &nbsp;
            <Link to="/register" className="text-purple-600">
              Sign Up
            </Link>
          </p>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Login;


