import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../services/Auth";
import axios from "axios";
import Nav from "../components/Nav";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isLoginSuccessful, setIsLoginSuccessful] = useState(false);
  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);

  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `http://localhost:8000/login`,
        formData
      );
      const success = response.status === 201;
      if (success) {
        setIsLoginSuccessful(true);
        setIsAuthenticated(true);
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
    if (isLoginSuccessful) {
      navigate("/");
    }
  }, [isLoginSuccessful]);

  return (
    <>
      <div className="login">
        <Nav />
        <div className="login_bigbox">
          <div className="login_body">
            <div className="login_text">Log in</div>
            <div className="login_box">
              <div className={"form2"}>
                <form
                  className={"register-form"}
                  onSubmit={handleSubmit}
                  id="myForm"
                >
                  <label className={"label-form"} htmlFor={"email"}>
                    E-mail
                  </label>
                  <input
                    name={"email"}
                    id={"email"}
                    value={formData.email}
                    onChange={handleChange}
                  />
                  <label className={"label-form"} htmlFor={"password"}>
                    Password
                  </label>
                  <input
                    type={"password"}
                    id={"password"}
                    name={"password"}
                    value={formData.password}
                    onChange={handleChange}
                  />
                </form>
              </div>
            </div>
            <div className="btns">
              <button
                className={"signup"}
                type={"button"}
                onClick={() => navigate("/signup")}
              >
                Sign Up
              </button>
              <button
                className={"submit"}
                type={"submit"}
                onClick={handleSubmit}
              >
                Log in
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
