import React, { useEffect, useState } from "react";
import "./styles.css";
import Input from "../../components/Input/index.jsx";
import Button from "../../components/Button/index.jsx";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function Login() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [loginForm, setLoginForm] = useState(true);
  const emailRegex=/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  const passwordRegex=/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
  const navigate = useNavigate();
  const token = sessionStorage.getItem("authToken");
  useEffect(() => {
    if (token) {
      navigate("/dashboard");
    }
  }, []);

  async function loginWithEmail() {
    if (email !== "" && password !== "") {
      setLoading(true);
      try {
        const userLogginIn = await axios.post("https://thekanbanbugbackend.onrender.com/login", {
          username: email,
          password: password,
        });
        if (userLogginIn) {
          sessionStorage.setItem("authToken", userLogginIn.data.token);
          setLoading(false);
          setEmail("");
          setPassword("");
          navigate('/dashboard');
          toast.success("Successfully Logged In !");
        }
      } catch (error) {
        setLoading(false);
        toast.error(error.response.data);
      }
    } else {
      toast.error("Please Enter Email and Password");
      setLoading(false);
    }
  }
  async function signUpWithEmail() {
    if (
      name !== "" &&
      email !== "" &&
      password !== "" &&
      confirmPassword !== ""
    ) {
      if(!emailRegex.test(email)){
        toast.error("Please enter a valid username foreg example@example.com")
        return ;
      }
      if(!passwordRegex.test(password)){
        toast.error("Please enter a valid Password Must be minuimum length of 8 . At least one lowercase letter. At least one uppercase letter. At least one digit. At least one special character .")
        return ;
      }
      setLoading(true);
      if (password === confirmPassword) {
        try {
          const userCreated = await axios.post("https://thekanbanbugbackend.onrender.com/signup", {
            name: name,
            username: email,
            password: password,
          });
          if (userCreated) {
            setLoading(false);
            setName("");
            setEmail("");
            setConfirmPassword("");
            setPassword("");
            setLoginForm(true)
            toast.success("Successfully created user ! Please Login !");
          }
        } catch (error) {
          setLoading(false);
          toast.error(error.response.data);
        }
      } else {
        toast.error("password and confirm password don't match!");
        setLoading(false);
      }
    } else {
      toast.error("All fields are required!");
      setLoading(false);
    }
  }
  return (
    <div className="wrapper">
      {loginForm ? (
        <div className="signup-wrapper">
          <h2 className="title">
            Login on <span style={{ color: "var(--theme)" }}>KanbanBug.</span>
          </h2>
          <form>
            <Input
              type="email"
              label="Email"
              placeholder="JohnDoe@gmail.com"
              state={email}
              setState={setEmail}
            />
            <Input
              type="password"
              label="Password"
              placeholder="Example@123"
              state={password}
              setState={setPassword}
            />
            <Button
              onClick={loginWithEmail}
              disabled={loading}
              text={loading ? "Loading..." : "Login Using Email and Password"}
            />
            <p className="p-login" onClick={() => setLoginForm(false)}>
              or Don't Have An Account ? Click Here
            </p>
          </form>
        </div>
      ) : (
        <div className="signup-wrapper">
          <h2 className="title">
            Sign Up on <span style={{ color: "var(--theme)" }}>KanbanBug.</span>
          </h2>
          <form>
            <Input
              label="Full Name"
              placeholder="John Doe"
              state={name}
              setState={setName}
            />
            <Input
              type="email"
              label="Email"
              placeholder="JohnDoe@gmail.com"
              state={email}
              setState={setEmail}
            />
            <Input
              type="password"
              label="Password"
              placeholder="Example@123"
              state={password}
              setState={setPassword}
            />
            <Input
              type="password"
              label="Confirm Password"
              placeholder="Example@123"
              state={confirmPassword}
              setState={setConfirmPassword}
            />
            <Button
              onClick={signUpWithEmail}
              disabled={loading}
              text={loading ? "Loading..." : "Signup Using Email and Password"}
            />
            <p className="p-login" onClick={() => setLoginForm(true)}>
              or Have An Account Already ? Click Here
            </p>
          </form>
        </div>
      )}
    </div>
  );
}

export default Login;
