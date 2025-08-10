import React,{useState} from "react";
import axios from 'axios';
import {Link,useNavigate} from 'react-router-dom'
import {useAuth} from '../../Context/authContext'

const signup = () => {
  const navigate= useNavigate();
  const [form,setForm] = useState({username:'',email:'',password:''});
  const {login}=useAuth();

  const handleChange =(e)=> setForm({...form,[e.target.name]:e.target.value});

  const handleSubmit =async(e)=>{
    e.preventDefault();
    try{
      const res=await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/auth/register`,form)
      login(res.data.token,res.data.user);
      navigate('/home')
    }catch(err){
      alert("error registering user");
      console.error(err);
    }
  };

  return (
    <div className="Signup flex justify-center items-center absolute inset-0 z-10 w-full h-full dark:bg-gray-700 bg-gray-200 bg-opcaity-50">
      <div className="Signup_card dark:bg-gray-900 dark:text-white w-100 h-120 bg-white rounded-lg gap-8 flex flex-col py-14 justify-between items-center">
        
        <div className="top_container flex flex-col gap-6">
            <div className="signup_title text-center ">
                <h2>SignUp</h2>
                <p>to create an account</p>
            </div>
            <div className="input_container flex flex-col gap-8 justify-center">
                <form action="" id='myForm' onSubmit={handleSubmit} className="flex flex-col gap-4 justify-center">
                    <input name='username' required onChange={handleChange} className="px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-0 " type="text" placeholder="username" />
                    <input name='email' required onChange={handleChange} className="px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-0 " type="email" placeholder="e-mail" />
                    <input name='password' required onChange={handleChange} className="px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-0" type="password" placeholder="password" />
                </form>
            </div>
        </div>
        
        <div className="button_container mb-4 flex gap-6 px-4">
            <button onClick={()=>navigate('/')} className="px-2 font-bold text-[0.8rem] py-1 border-gray-300 text-gray-500 rounded-lg border-2 hover:-translate-y-1 transition-transform duration-300 linear active:translate-y-1 ">Cancel</button>
            <button type='submit' form='myForm' className="px-2 font-bold text-[0.8rem] py-1 bg-gray-300 text-gray-600 border-gray-300 rounded-lg border-2 hover:-translate-y-1 transition-transform duration-300 linear active:translate-y-1">SignUp</button>
        </div>

      </div>
    </div>
  );
};

export default signup;
