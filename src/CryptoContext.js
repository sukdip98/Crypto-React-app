import React, {createContext, useContext, useEffect, useState } from 'react'
import {auth} from './Firebase'
import { onAuthStateChanged } from 'firebase/auth';
const Crypto=createContext();
const CryptoContext = ({children}) => {
    const [currency,setCurrency]=useState("INR");
    const [symbol,setSymbol]=useState(<span>&#8377;</span>);
   const [user,setUser]=useState({});
   const [watchList,setWatchList]=useState([]);
   useEffect(()=>{
      onAuthStateChanged(auth,(user)=>{
          console.log(user);
          if(user){
            setUser(user);

          }
          else{
              setUser(null);
          }
      });
   },[]);
    useEffect(()=>{
        if(currency==="INR") setSymbol(<span>&#8377;</span>);
        else if(currency==="USD") setSymbol("$");
    },[currency]);
  return (
      <Crypto.Provider value={{currency,symbol,setCurrency,user,setUser,watchList}}>
          {children}
      </Crypto.Provider>
  )
}

export default CryptoContext;
export const CryptoState=()=>{
   return useContext(Crypto);
}