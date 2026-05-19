import {   useContext, useState } from "react";
import logo from "../assets/images/logo.svg";
import { Navigate, useNavigate } from "react-router-dom";
import AuthContext from "../components/Authentication/AuthContext";





const Otp = () => {
const {setDatas} = useContext(AuthContext)
  
//console.log(datas);
 const navigate=useNavigate()

    const otpid="12345"

const [value,setValue]=useState("")
    const [error,SetError]=useState("")

   



    const HandleChange=(e)=>{
      setValue(e.target.value)
      SetError("")
        
    }


    
    const OtpValidate=()=>{

        
         if(value===""){
            SetError("Enter the OTP")
         }
        
           else if(value!==otpid){
            SetError("Invalid OTP")
         }
          else {
            
            
            const authData = { status: true };
            localStorage.setItem("auth", JSON.stringify(authData));
            setDatas(authData);
            alert("successfully logged in")
            navigate("/")

          }
        
        }  


    
  
  return (
 <>

  <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
       
     
       <img src={logo} className="w-52 mb-6" alt="logo" />
 
   
       <div className="bg-white shadow-lg rounded-xl p-8 w-87.5 text-center">
         
      
 
         <input
            
           className="border w-full p-2 rounded mb-4 outline-none focus:ring-2 focus:ring-[#8E1C9D]"
           type="text"
           placeholder="Enter OTP" name="email"
           onChange={HandleChange}
         />
        <p className="text-red-500 text-sm mb-3">{error}</p>
 
         <button onClick={OtpValidate} className="bg-[#8E1C9D] hover:bg-[#7a1787] text-white w-full p-3 rounded-xl mb-4">
           Confirm
         </button>
 
         <div className="text-sm text-gray-600">
            
         
         </div>
 
       </div>
     </div>
 </>
  )
}

export default Otp;
