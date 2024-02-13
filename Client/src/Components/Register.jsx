import React from "react";
import { useState } from "react";
import { NavLink } from "react-router-dom";

function Register() {
  const [passShow, setPassShow] = useState(false);
  const [cPassShow, setCPassShow] = useState(false);

  const [inpVal, setInpVal] = useState({
    fname: "",
    email: "",
    Password: "",
    cPassword: "",
  });

  const setVal = (e) => {
    // console.log(e.target.value);
    const { name, value } = e.target;

    setInpVal(() => {
      return {
        ...inpVal,
        [name]: value,
      };
    });
  };

  const addUserData = async (e) => {
    e.preventDefault();

    const { fname, email, Password, cPassword } = inpVal;

    if (fname === "") {
      alert("Please Enter Your Name");
    } else if (email === "") {
      alert("Please Enter Your Email");
    } else if (!email.includes("@g")) {
      alert("Please Enter Valid Email");
    } else if (Password === "") {
      alert("Please Enter Your Password");
    } else if (Password.length < 6) {
      alert("Password Must be 6 Char");
    } else if (cPassword === "") {
      alert("Enter Your Confirm Password");
    } else if (cPassword.length < 6) {
      alert("Password Must be 6 Char");
    } else if (Password !== cPassword) {
      alert("Password and Confirm Password not match");
    } else {
      // console.log("user registration succesfully done");

      const data = await fetch(`http://localhost:8009/register`,{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({
          fname, email, Password, cPassword
        })
      });
      const res = await data.json()
      // console.log(res.status);

      if (res.status == 201) {
        alert("user registration successfully");
        setInpVal({...inpVal,fname:"",email:"",Password:"",cPassword:""})   //for input value remove
      }
    }
  };

  return (
    <>
      <section>
        <div className="form_data">
          <div className="form_heading">
            <h1>Sign Up</h1>
            <p style={{ textAlign: "center" }}>
              We are glad that you will be using Project Cloud to manage <br />
              your tasks! We hope that you will get like it.
            </p>
          </div>
          <form>
            <div className="form_input">
              <label htmlFor="fname">Name</label>
              <input
                type="text"
                onChange={setVal}
                value={inpVal.fname}
                name="fname"
                id="fname"
                placeholder="Enter Your Name"
              />
            </div>
            <div className="form_input">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                onChange={setVal}
                value={inpVal.email}
                name="email"
                id="email"
                placeholder="Enter Your Email Address"
              />
            </div>
            <div className="form_input">
              <label htmlFor="Password">Password</label>
              <div className="two">
                <input
                  type={!passShow ? "password" : "text"}
                  onChange={setVal}
                  value={inpVal.Password}
                  name="Password"
                  id="Password"
                  placeholder="Enter Your Password"
                />
                <div
                  className="showpass"
                  onClick={() => setPassShow(!passShow)}
                >
                  {!passShow ? "Show" : "Hide"}
                </div>
              </div>
            </div>
            <div className="form_input">
              <label htmlFor="Password">Confirm Password</label>
              <div className="two">
                <input
                  type={!cPassShow ? "password" : "text"}
                  onChange={setVal}
                  value={inpVal.cPassword}
                  name="cPassword"
                  id="cPassword"
                  placeholder="Confirm Password"
                />
                <div
                  className="showpass"
                  onClick={() => setCPassShow(!cPassShow)}
                >
                  {!cPassShow ? "Show" : "Hide"}
                </div>
              </div>
            </div>
            <button className="btn" onClick={addUserData}>
              Sign Up
            </button>
            <p>
              Already have an Account? <NavLink to={"/"}>Log In </NavLink>
            </p>
          </form>
        </div>
      </section>
    </>
  );
}

export default Register;
