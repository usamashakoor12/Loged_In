import React, { useContext } from 'react'
import {useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { LoginContext } from './ContextProvider/Context';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';


function Dashboard() {

 const {loginData, setLoginData} = useContext(LoginContext);
//  console.log(loginData?.ValidUserOne?.email);

const [data, setData] = useState(false);

 

  const history = useNavigate();

  const DashboardValid = async ()=>{
    let token = localStorage.getItem("usersdatatoken")  //use token for user validate
    // console.log(token);                        // agar user k pas token hoga tab hi dashboard k page pr ay ga
    
    const res = await fetch("http://localhost:8009/validuser",{
      method:"GET",
      headers:{
        "Content-Type": "application/json",
        "Authorization":token
      }
    });
    const data = await res.json();
    // console.log(data);
    if (data.status == 401 || !data) {
      // console.log("error page redirect");

      history("*")   //user valid na ho to error waly page py redirect ho jy ga

    }else{
      console.log("user verify");
      setLoginData(data)
      
      history("/dash")
    }
  }

  useEffect(()=>{

    setTimeout(()=>{
      DashboardValid()
      setData(true)
    },2000)
  },[])
  // console.log(loginData?.ValidUserOne?.email);
  return (
    <>
    {
      data ? (
        <>
        <div style={{display:"flex", flexDirection:"column", alignItems:"center"}}>
    <img src="./man.png" style={{width:"200px", marginTop:"20px"}} alt="" />
    <h1>User Email:  {loginData ? loginData?.ValidUserOne?.email : ""} </h1>
    
    </div>
        </>
      ): <Box sx={{ display: 'flex', justifyContent: "center", alignItems: "center", height: "100vh" }}>
      Loading... &nbsp;
      <CircularProgress />
    </Box>
    }
    
    </>
    
  )
}

export default Dashboard