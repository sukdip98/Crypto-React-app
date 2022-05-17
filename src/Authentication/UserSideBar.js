import * as React from 'react';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import { Avatar } from '@material-ui/core';
import { CryptoState } from '../CryptoContext';
import { signOut } from 'firebase/auth';
import { auth } from '../Firebase';
export default function TemporaryDrawer() {
    const {user,watchList}=CryptoState();
  const [state, setState] = React.useState({
  
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };


const logOut=()=>{
signOut(auth);
window.alert("successfully logged out");
toggleDrawer();
}

  return (
    <div>
      {['right'].map((anchor) => (
        <React.Fragment key={anchor}>
            <Avatar onClick={toggleDrawer(anchor, true)} src={user.photoURL} alt={user.displayName|| user.email}
            style={{height:38,width:38,marginLeft:15,cursor:"pointer",backgroundColor:"#EEBC1D"}}/>

          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
              <div style={{height:"100%",width:350,padding:25,display:"flex",flexDirection:"column"}}>
<div style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",height:"92%",gap:"20px"}}>
    <Avatar src={user.photoURL} alt={user.displayName|| user.email} style={{width:200,height:200,cursor:"pointer"}}/>
    <span>{user.displayName || user.email}</span>
    <div style={{flex:1,width:"100%",height:"100%", backgroundColor:"grey",borderRadius:10,padding:15,paddingTop:10,display:"flex",flexDirection:"column",alignItems:"center",gap:12,overflow:"scroll"}}>
      
      <span>{watchList.map((coin)=>{return coin.id})}</span>
    </div>

</div>
              </div>
              <Button variant='contained' onClick={logOut} style={{backgroundColor:"gold"}}>Log out</Button>
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}
