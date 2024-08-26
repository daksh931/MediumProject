import { useState } from "react"
import Button from "../components/Button"
import { Link, useNavigate } from "react-router-dom";
import { SignInInput } from "@daksh931/project-medium";
import axios from "axios";
import { BACKEND_URL } from "../config";


const Login = () => {
        const naviagte = useNavigate();
        const[loginData,setLoginData] = useState<SignInInput>({
          email:"",
          password:""
        });
      
        // console.log(loginData);
        const handleLogin = async (e: React.FormEvent)=>{
          e.preventDefault();

          try {
            console.log("inside1");
            const response = await axios.post(`${BACKEND_URL}/api/v1/user/login`,loginData);
            const jwt = response.data.jwt;
            localStorage.setItem("token",jwt);
            console.log(response.data)
            // localStorage.setItem("token",response.data.user);
            naviagte("/blogs");
          } catch (error) {
            alert("Login Failed")
              //alert on login failed
          }
        }



  return (
    <div className="flex justify-center items-center w-[100vw] h-[93vh] bg-white ">

<form onSubmit={handleLogin}>
        <div className="flex flex-col text-[15px] items-center h-96 w-80 rounded-md min-h-80 bg-zinc-300
          px-5  pt-16 shadow-xl shadow-zinc-400  hover:shadow-zinc-300 hover:border-slate-500 hover:border-[1px]">
            
            <span>Don't have an account?   
            <Link to={"/signup"} className="text-sm pl-1 text-slate-500 hover:text-black">  signup here</Link>
            </span>
            <input type="email" className="rounded-lg h-9 w-full text-[17px] mx-4 pl-3 my-3" placeholder="Email"
              value={loginData.email} onChange={(e)=>setLoginData({...loginData,email:e.target.value})}/> 
            <input type="password" className="rounded-lg h-9 w-full text-[17px] mx-4 pl-3 my-3" placeholder="Password"
              value={loginData.password} onChange={(e)=>setLoginData({...loginData,password:e.target.value})}/> 

            <div className="mt-9"> <Button>Login</Button> </div>
        </div>
</form>

    </div>
  )
}

export default Login
