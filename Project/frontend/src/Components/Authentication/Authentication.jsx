import React, { useEffect, useState } from "react";
import image from "../../Assets/new.png";
import "./auth.css";
import { useHistory } from "react-router-dom";

export default function Authentication() {
  const [mode, setMode] = useState("SignIn");

  const handleEvent = (text) => {
    setMode(text);
    setAlertMessage("")
  };
  useEffect(()=>{
   localStorage.setItem("CurrentUser" , '');
  },[])
  const [firstname, setFirstname] = useState();
  const [lastname, setLastname] = useState();
  const [contact, setContact] = useState();
  const [email, setEmail] = useState();
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [role, setRole] = useState();

  const [alertMessage, setAlertMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(null);

  const history = useHistory();

  const handleSubmission = async (e) => {
    e.preventDefault();

    if (mode === "SignIn") {
      try {
        const response = await fetch("https://lavender-iron-azimuth.glitch.me/getusers");
        const users = await response.json();

        const user = users.find(
          (user) => user.Username === username && user.Password === password
        );

        if (user) {
          localStorage.setItem("CurrentUser" , JSON.stringify(user));
          if (user.Role === "admin") {
            history.push("/home");
          } else if (user.Role === "guest") {
            history.push("/guest");
          }
        } else {
          setAlertMessage("Invalid credentials. Please try again.");
          setIsSuccess(false);
        }
      } catch (error) {
        console.error("Error:", error);
        setAlertMessage("Error checking credentials.");
        setIsSuccess(false);
      }
    } else if (mode === "SignUp") {
      try {
        const data = {
          firstName: firstname,
          lastName: lastname,
          contact,
          email,
          username,
          password,
          role,
        };

        const response = await fetch("https://lavender-iron-azimuth.glitch.me/adduser", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });

        if (response.ok) {
          setAlertMessage("User registered successfully.");
          setIsSuccess(true);
          setFirstname("");
          setLastname("");
          setContact("");
          setEmail("");
          setUsername("");
          setPassword("");
          setRole("");
        } else {
          setAlertMessage("Error registering user.");
          setIsSuccess(false);
        }
      } catch (error) {
        console.error("Error:", error);
        setAlertMessage("Error registering user.");
        setIsSuccess(false);
      }
    }
  };
  return (
    <div>
      <div className="maincontainer">
        <div className="header-container">
          <img src={image} alt="Hotel Air Logo" />
          <p>Hotel Air</p>
        </div>

         {/* Display Alert Message */}
         {alertMessage  &&  (
          <div className={`alert ${isSuccess ? "alert-success" : "alert-danger"}`}>
            {alertMessage}
          </div>
        )}

        {/* Conditional rendering based on mode */}
        {mode === "SignUp" && (
          <div className="form-group">
            <div className="name-group">
              <div className="name-input">
                <label>First Name</label>
                <input
                  className="form-control"
                  name="firstName"
                  type="text"
                  required
                  value={firstname}
                  onChange={(e) => setFirstname(e.target.value)}
                />
              </div>
              <div className="name-input">
                <label>Last Name</label>
                <input
                  className="form-control"
                  name="lastName"
                  type="text"
                  required
                  value={lastname}
                  onChange={(e) => setLastname(e.target.value)}
                />
              </div>
            </div>
            <div style={{ marginBottom: "20px" }}>
              <label>Contact</label>
              <input
                className="form-control"
                name="contact"
                type="text"
                required
                value={contact}
                onChange={(e) => setContact(e.target.value)}
              />
            </div>
            <div>
              <label>Email</label>
              <input
                className="form-control"
                name="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
            <label style={{marginTop:"20px"}}>Role</label>
            <div className="role-checkboxes">
                <label>
                <input
                    type="checkbox"
                    name="role"
                    value="admin"
                    checked={role === "admin"}
                    onChange={(e) => setRole(e.target.checked ? "admin" : "")}
                />
                Admin
                </label>
                <label>
                <input
                    type="checkbox"
                    name="role"
                    value="guest"
                    checked={role === "guest"}
                    onChange={(e) => setRole(e.target.checked ? "guest" : "")}
                />
                Guest
                </label>
            </div>
</div>



          </div>
        )}

        <div className="form-group">
          <label>Username</label>
          <input
            className="form-control"
            name="username"
            type="text"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            className="form-control"
            name="password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button className="mbtn" onClick={handleSubmission}>
          {mode === "SignIn" ? "Log In" : "Sign Up"}
        </button>

        <div>
          <p>
            {mode === "SignIn" ? (
              <>
                New to HotelAir{" "}
                <a href="#" onClick={() => handleEvent("SignUp")}>
                  Sign Up Here
                </a>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <a href="#" onClick={() => handleEvent("SignIn")}>
                  Log In Here
                </a>
              </>
            )}
          </p>
          <p>
            © 2024 <a href="#">HotelAir</a>, All Rights Reserved.
          </p>
        </div>
      </div>
    </div>
  );
}
