import {useState} from "react";
import {useLocation} from "react-router-dom";
import api from "../services/api";

export default function VerifyOtp(){

const location = useLocation();

const email = location.state.email;

const [otp,setOtp] = useState("");

const handleVerify = async()=>{

try{

await api.post(
"/verify-otp",
{
email,
otp
}
);

alert("Email Verified");

}
catch(error){

alert(
error.response.data.message
);

}
};

return(

<div>

<h2>Email Verification</h2>

<input
value={otp}
onChange={(e)=>
setOtp(e.target.value)
}
placeholder="Enter OTP"
/>

<button
onClick={handleVerify}
>

Verify OTP

</button>

</div>

);
}