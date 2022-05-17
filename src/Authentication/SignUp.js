import { TextField,Box } from '@material-ui/core'
import { Button } from '@mui/material';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react'
import CryptoContext from '../CryptoContext';
import { auth } from '../Firebase';
import AlertBar from './AlertBar';

const SignUp = ({handleClose}) => {
    // const alert=useAlert();
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const[confirmPassword,setConfirmPassword]=useState("");
 
    // const {currency,symbol,setCurrency,alert,setAlert}=CryptoContext();
    const handleSubmit=async()=>{
        try{
          const result= await createUserWithEmailAndPassword(auth,email,password);
          console.log(result);
          window.alert(`user with mail id ${email} created`);
          handleClose();

        }
        catch(error){
         window.alert(error);
        }
        
    };
  return (
      <Box p={3} style={{display:"flex",flexDirection:"column",gap:"20px",marginTop:"5vh"}}>
       <TextField variant='outlined' label="User Name" type="email" onChange={(e)=>setEmail(e.target.value)} value={email}/>
       <TextField variant='outlined'  label="Password" type="password" onChange={(e)=>setPassword(e.target.value)} value={password}/>
       <TextField variant='outlined'  label="Confirm Password" type="password" onChange={(e)=>setConfirmPassword(e.target.value)} value={confirmPassword}/>
       {password!==confirmPassword?<span style={{fontSize:"14px" ,color:"red",marginTop:"-2vh"}}>Password do not match</span>:null}
       <Button variant='contained' style={{backgroundColor:"green"}} onClick={handleSubmit}>Sign up</Button>
      </Box>
  )
}

export default SignUp