import React from "react";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import "./header.css";
import { useContext } from "react";
import { LoginContext } from "./ContextProvider/Context";
import { useNavigate } from "react-router-dom";

function Header() {
  const { loginData, setLoginData } = useContext(LoginContext);
  // console.log(loginData);

  const history = useNavigate();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const logoutuser = async ()=>{

    let token = localStorage.getItem("usersdatatoken") ;
                          
    
    const res = await fetch("http://localhost:8009/logout",{
      method:"GET",
      headers:{
        "Content-Type": "application/json",
        "Authorization":token,
        Accept:"application/json"
      },
      credentials:"include"
    });
    const data = await res.json();
    console.log(data);
    
    if (data.status == 201) {
      console.log("user logout");
    localStorage.removeItem("usersdatatoken")  
      setLoginData(false)
      history("/")

    }else{
      console.log("error");
    
    }
  }

  const goDash = ()=>{
    history("/dash");
  }

  const goError = () => {
    history("*");
  };

  return (
    <>
      <header>
        <nav>
          <h1>MU Cloud</h1>
          <div className="avtar">
            {loginData.ValidUserOne ? (
              <Avatar
                style={{
                  background: "#29ABB7",
                  fontWeight: "bold",
                  textTransform: "capitalize",
                }}
                onClick={handleClick} 
              >
                {loginData.ValidUserOne.fname[0].toUpperCase()}
              </Avatar>
            ) : (
              <Avatar style={{ background: "blue" }} onClick={handleClick} />
            )}
          </div>
          <Menu
            id="fade-menu"
            MenuListProps={{
              "aria-labelledby": "fade-button",
            }}
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
          >
            {loginData.ValidUserOne ? (
              <>
                <MenuItem onClick={()=>{
                  handleClose()
                  goDash()
                  }}>Profile</MenuItem>
                <MenuItem onClick={()=>{
                  logoutuser()
                  handleClose()
                  }}>Logout</MenuItem>
              </>
            ) : (
              <>
                <MenuItem
                  onClick={() => {
                    goError();
                    handleClose();
                  }}
                >
                  Profile
                </MenuItem>
              </>
            )}
          </Menu>
        </nav>
      </header>
    </>
  );
}

export default Header;
