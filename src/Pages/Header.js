import { AppBar, Container, Select, Toolbar, Typography,MenuItem } from '@mui/material'
import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom'
import { CryptoState } from '../CryptoContext';
const Header = (props) => {
    const {currency,symbol,setCurrency}=CryptoState();
    console.log(currency)
    const handleChange = (event) => {
        setCurrency(event.target.value);
      };
      const history=useNavigate();
  return (
    <div>
        <AppBar color="transparent" position="static">
            <Container>
                <Toolbar>
                <Typography onClick={()=>history("/")} variant='h2' style={{color:"gold",flex:1}} >
         Crypto Buddy 
          </Typography> 
          <Select value={currency} variant="outlined" style={{width:100,height:40,marginRight:15,borderRadius:"5px 5px 5px 5px"}} onChange={handleChange}>
          <MenuItem value={"INR"}>INR</MenuItem>
          <MenuItem value={"USD"}>USD</MenuItem>
          </Select>
                </Toolbar>
            </Container>
        </AppBar>
       
    </div>
  )
}

export default Header