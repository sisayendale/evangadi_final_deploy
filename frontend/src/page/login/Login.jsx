import React, { useRef, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import style from "../../page/style.module.css";
import Header from "../header/Header";
import axios from "../../axios/axiosConfig";
import Footer from "../footer/Footer";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function Login() {
  const navigate = useNavigate();
  const emailDom = useRef();
  const passwordDom = useRef();
  const [errors, setErrors] = useState({});
  const [loginError, setLoginError] = useState("");
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: value ? "" : `${name} is required`,
    }));
  };

  const handleFocus = (e) => {
    const { name } = e.target;
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  async function handleSubmit(e) {
    e.preventDefault();

    const emailValue = emailDom.current.value;
    const passwordValue = passwordDom.current.value;

    let newErrors = {};
    if (!emailValue) newErrors.email = "Email is required";
    if (!passwordValue) newErrors.password = "Password is required";

    setErrors(newErrors);
    setLoginError("");

    if (Object.keys(newErrors).length > 0) {
      return;
    }
console.log(emailValue, passwordValue);
    try {
      const { data } = await axios.post("/users/login", {
        email: emailValue,
        password: passwordValue,
      });
      setLoginSuccess(true);
      localStorage.setItem("token", data.token);
      setTimeout(() => navigate("/"), 2000);
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setLoginError(error.response.data.msg);
      } else {
        setLoginError("Something went wrong. Please try again.");
      }
    }
  }

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <section>
      <div>
        <Header />
      </div>
      <section className={style.all_container}>
        <div className={style.container}>
          <form className={style.register} onSubmit={handleSubmit} action="">
            <br />
            <br />
            <br />
            <br />
            <br />
            <div className={style.user_register1}>
              <h2>Login to your account</h2>
              <br />
              <p>
                Don't have an account?{" "}
                <Link className={style.link} to="/register">
                  Create a new account
                </Link>
              </p>
              <br />
            </div>
            <div className={style.user_register}>
              {loginError && (
                <h3
                  style={{
                    color: "red",
                    textAlign: "center",
                    marginBottom: "10px",
                  }}
                >
                  {loginError}
                </h3>
              )}
              {loginSuccess && (
                <h3
                  style={{
                    color: "rgb(72, 215, 72)",
                    textAlign: "center",
                    marginBottom: "10px",
                  }}
                >
                  Login successful. Redirecting...
                </h3>
              )}
              <input
                ref={emailDom}
                type="text"
                name="email"
                placeholder="Email"
                style={{ backgroundColor: errors.email ? "#ffebee" : "white" }}
                onBlur={handleBlur}
                onFocus={handleFocus}
              />
              <br />
              <br />
              <div className={style.password_container}>
                <input
                  ref={passwordDom}
                  type={passwordVisible ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  style={{
                    backgroundColor: errors.password ? "#ffebee" : "white",
                  }}
                  onBlur={handleBlur}
                  onFocus={handleFocus}
                />
                <span
                  className={style.password_toggle_icon}
                  onClick={togglePasswordVisibility}
                >
                  {passwordVisible ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
              <br />
              <br />
              <div className={style.user_register1}>
                <button className={style.button} type="submit">
                  Submit
                </button>
              </div>
            </div>
            <br />
            <div className={style.user_register1}>
              <Link className={style.link} to="/register">
                Create an account?
              </Link>
            </div>
          </form>
          <div className={style.howitworks}>
            <Link className={style.link} to="/about">
              About
            </Link>
            <h1 style={{ fontSize: "45px", color: "#611B00" }}>
              Evangadi Networks
            </h1>
            <p>
              No matter what stage of life you are in, whether you’re just
              starting elementary school or being promoted to CEO of a Fortune
              500 company, you have much to offer to those who are trying to
              follow in your footsteps.
            </p>
            <p>
              Whether you are willing to share your knowledge or you are just
              looking to meet mentors of your own, please start by joining the
              network here.
            </p>
            <br />
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat
              vitae facilis excepturi. Blanditiis, odio minus fugiat commodi
              voluptatum consectetur aut tenetur?
            </p>
            <br />
            <button className={style.button}>How it works</button>
          </div>
        </div>
      </section>
      <Footer />
    </section>
  );
}

export default Login;
