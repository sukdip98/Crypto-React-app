import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { AppBar,Tabs,Tab } from '@mui/material';
import SignUp from './SignUp';
import Login from './Login';
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  
};

export default function AuthModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
 const [value,setValue]=React.useState(0);
 const handleChange=(event,newValue)=>{
     setValue(newValue);
 }
  return (
    <div>
      <Button variant="contained" style={{backgroundColor:"gold"}} onClick={handleOpen}>Log in</Button>
      <Modal 
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <AppBar style={{backgroundColor:"transparent",color:"black"}} >
              <Tabs  value={value} onChange={handleChange} centered>
                 <Tab label="Login"  value={0} />
                 <Tab label="Sign Up"  value={1} />

              </Tabs>
          </AppBar>
          <div style={{marginTop:"3vh"}}>
          {value===0 && <Login handleClose={handleClose}/> }
          {value===1 && <SignUp handleClose={handleClose}/>}
          </div>

          <div>

          </div>

        </Box>
      </Modal>
    </div>
  );
}
