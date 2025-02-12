import React, { useEffect, useState } from "react";
import "./styles.css";
import Input from "../../components/Input";
import Button from "../../components/Button";
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
  const navigate = useNavigate();
  const token = sessionStorage.getItem("authToken");
  // useEffect(() => {
  //   if (token) {
  //     navigate("/dashboard");
  //   }
  // }, []);

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
            toast.success("Successfully created user ! Please Login !");
            // createDoc(user)
            // navigate("/dashboard");
          }
        } catch (error) {
          setLoading(false);
          toast.error(error.response.data);
        }

        // createUserWithEmailAndPassword( email, password)
        //   .then((userCredential) => {
        //     // Signed up
        //     // const user = userCredential.user;
        //     // console.log(user);
        //     // toast.success("user created successfully!")
        //     setLoading(false)
        //     setName("");
        //     setEmail("")
        //     setConfirmPassword("")
        //     setPassword("")
        //     // createDoc(user)
        //     navigate('/dashboard')
        //     // ...
        //   })
        //   .catch((error) => {
        //     const errorCode = error.code;
        //     const errorMessage = error.message;
        //     // toast.error(errorMessage)
        //     setLoading(false)
        //     // ..
        //   });
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
