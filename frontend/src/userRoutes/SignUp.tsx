import { useState } from "react"
import Button from "../components/Button"
import { Link, useNavigate } from "react-router-dom";
import { SignupInput } from "@daksh931/project-medium";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { setToken,setUserData } from "../store/slices/authSlice";
import { useDispatch } from "react-redux";

const SignUp = () => {
        const naviagte = useNavigate();
        const dispatch = useDispatch();
        const[registerData,setRegisterData] = useState<SignupInput>({
          email:"",
          name:"",
          password:""
        });
      
        const handleSignUp = async (e: React.FormEvent)=>{
          e.preventDefault();

          try {

            const response = await axios.post(`${BACKEND_URL}/api/v1/user/signup`,registerData);
            console.log(response.data)
            console.log(response.data.user);
            const jwt = response.data.jwt;
            dispatch(setUserData(JSON.parse(JSON.stringify(response.data.user))));
            localStorage.setItem("user",JSON.parse(JSON.stringify(response.data.user)));
            

            dispatch(setToken(jwt));
            localStorage.setItem("token",jwt);

    
            naviagte("/blogs");

          } catch (error) {
            alert("Signup Failed")
              //alert on signup failed
          }
        }



  return (
    <div className="flex justify-center items-center w-[100vw] h-[93vh] bg-white ">

<form onSubmit={handleSignUp}>
        <div className="flex flex-col text-[15px] items-center h-96 w-80 rounded-md min-h-80 bg-zinc-300
          px-5  pt-16 shadow-xl shadow-zinc-400 hover:shadow-zinc-300 hover:border-slate-500 hover:border-[1px]">
            
            <span>Already have an account?   
            <Link to={"/login"} className="text-sm pl-1 text-slate-500 hover:text-black">  login here</Link>
            </span>
            <input type="text" className="rounded-lg h-9 w-full text-[17px] mx-4 pl-3 my-3" placeholder="Name"
              value={registerData.name} onChange={(e)=>setRegisterData({...registerData,name:e.target.value})}/> 
            <input type="email" className="rounded-lg h-9 w-full text-[17px] mx-4 pl-3 my-3" placeholder="Email"
              value={registerData.email} onChange={(e)=>setRegisterData({...registerData,email:e.target.value})}/> 
            <input type="password" className="rounded-lg h-9 w-full text-[17px] mx-4 pl-3 my-3" placeholder="Password"
              value={registerData.password} onChange={(e)=>setRegisterData({...registerData,password:e.target.value})}/> 

            <div className="mt-9"> <Button>Sign up</Button> </div>
        </div>
</form>

    </div>
  )
}

export default SignUp
