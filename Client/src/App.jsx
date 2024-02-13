import { Route, Routes, useNavigate } from "react-router-dom";
import Header from "./Components/Header";
import Login from "./Components/Login";
import Register from "./Components/Register";
import Dashboard from "./Components/Dashboard";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Error from "./Components/Error";
import { useEffect, useContext, useState } from "react";
import { LoginContext } from "./Components/ContextProvider/Context";

function App() {

  const [data, setData] = useState(false);
  

    const {loginData, setLoginData} = useContext(LoginContext);
   
    
   
     const history = useNavigate();
   
     const DashboardValid = async ()=>{
       let token = localStorage.getItem("usersdatatoken")  
       
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
        console.log("User Not Valid");
   
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

  return (
    <>
    {
      data ? (
        <>
         <Header />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dash" element={<Dashboard />} />
        <Route path="*" element={<Error />} />  //user ager kuch be likhy ga error k page pr phnch jy ga
      </Routes>
        </>
      ):<Box sx={{ display: 'flex', justifyContent: "center", alignItems: "center", height: "100vh" }}>
      Loading... &nbsp;
      <CircularProgress />
    </Box>
    }
    </>
  );
}

export default App;
