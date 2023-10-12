import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Nav from "../components/Nav";

const Signup = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [isRegisterSuccessful, setIsRegisterSuccessful] = useState(false);

  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      console.error("Passwords do not match!");
      return;
    }

    try {
      const response = await axios.post(
        `http://localhost:8000/signup`,
        formData
      );
      const success = response.status === 201;
      if (success) {
        setIsLoginSuccessful(true);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (isRegisterSuccessful) {
      navigate("/");
    }
  }, [isRegisterSuccessful]);

  return (
    <>
      <div className="login">
        <Nav />
        <div className="login_body">
          <div className="login_text">Create Account</div>
          <div className="login_box">
            <div className={"form2"}>
              <form
                className={"register-form"}
                onSubmit={handleSubmit}
                id="registerForm"
              >
                <label className={"label-form"} htmlFor={"email"}>
                  E-mail
                </label>
                <input
                  type="text"
                  name="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                />
                <label className={"label-form"} htmlFor={"password"}>
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  value={formData.password}
                  onChange={handleChange}
                />
                <label className={"label-form"} htmlFor={"confirmPassword"}>
                  Confirm Password
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  id="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
              </form>
            </div>
          </div>
          <div className="btns">
            <button
              className={"login-btn"}
              type={"button"}
              onClick={() => navigate("/login")}
            >
              Log In
            </button>
            <button className={"submit"} type={"submit"} onClick={handleSubmit}>
              Register
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
