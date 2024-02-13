import React, { useState } from "react";
import "./mix.css";
import { NavLink,useNavigate } from "react-router-dom";


function Login() {
  const [passShow, setPassShow] = useState(false);

  const [inpVal, setInpVal] = useState({
    email: "",
    Password: "",
  });

  // console.log(inpVal);

  const history = useNavigate();

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

  const loginUser =async (e)=>{
    e.preventDefault();

    const {email, Password} = inpVal;

    
     if (email === "") {
      alert("Please Enter Your Email");
    } else if (!email.includes("@g")) {
      alert("Please Enter Valid Email");
    } else if (Password === "") {
      alert("Please Enter Your Password");
    } else if (Password.length < 6) {
      alert("Password Must be 6 Char");
    } else {
      // console.log("user Login succesfully done");

      const data = await fetch(`http://localhost:8009/login`,{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({
           email, Password
        })
      });
      const res = await data.json()
      console.log(res);

      if (res.status == 201) {
        localStorage.setItem("usersdatatoken",res.result.token)
        history("/dash")
        setInpVal({...inpVal, email:"", Password:""})   //for input value remove
      } 


    }
  };

  return (
    <>
      <section>
        <div className="form_data">
          <div className="form_heading">
            <h1>Welcome Back, Log In</h1>
            <p>Hi, we are you glad you are back. Please login.</p>
          </div>
          <form>
            <div className="form_input">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                value={inpVal.email}
                onChange={setVal}
                id="email"
                placeholder="Enter Your Email Address"
              />
            </div>
            <div className="form_input">
              <label htmlFor="Password">Password</label>
              <div className="two">
                <input
                  type={!passShow ? "password" : "text"}
                  name="Password"
                  value={inpVal.Password}
                  onChange={setVal}
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
            <button className="btn" onClick={loginUser}>Login</button>
            <p>
              Don't have an Account? <NavLink to="/register">Sign Up</NavLink>{" "}
            </p>
          </form>
        </div>
      </section>
    </>
  );
}

export default Login;
