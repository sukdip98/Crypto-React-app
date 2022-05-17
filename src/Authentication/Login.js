import React, { useState } from 'react'
import { Box } from '@mui/system';
import { Button, TextField } from '@mui/material';
import { auth } from '../Firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { async } from '@firebase/util';
import { CryptoState } from '../CryptoContext';
const Login = ({handleClose}) => {
    const [email,setEmail]=useState('');
    const[password,setPassword]=useState('');
    const{setUser}=CryptoState();
    const handleSubmit=async()=>{
      if(email===""||password===""){
        window.alert("Please enter the values");
      }
      try{
        const result=await signInWithEmailAndPassword(auth,email,password);
        console.log(result.user);
        // setUser(result.user);
        window.alert(`Login successful,Welcome ${result.user.email}`);
        handleClose();
      }
      catch(err){
        window.alert(err.message);
      }
    }
  return (
    <Box p={3} style={{display:"flex",flexDirection:"column",gap:"20px"}}>
<TextField  value={email} onChange={(e)=>setEmail(e.target.value)} variant="outlined" label="User Name" fullWidth/>
<TextField type="password" onChange={(e)=>setPassword(e.target.value)} label="Password" fullWidth/>
<Button variant="contained" style={{backgroundColor:"red"}} onClick={handleSubmit}>Login</Button>
    </Box>
  )
}

export default Login