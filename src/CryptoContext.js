import React, {createContext, useContext, useEffect, useState } from 'react'
const Crypto=createContext();
const CryptoContext = ({children}) => {
    const [currency,setCurrency]=useState("INR");
    const [symbol,setSymbol]=useState(<span>&#8377;</span>);
    useEffect(()=>{
        if(currency==="INR") setSymbol(<span>&#8377;</span>);
        else if(currency==="USD") setSymbol("$");
    },[currency]);
  return (
      <Crypto.Provider value={{currency,symbol,setCurrency}}>
          {children}
      </Crypto.Provider>
  )
}

export default CryptoContext;
export const CryptoState=()=>{
   return useContext(Crypto);
}