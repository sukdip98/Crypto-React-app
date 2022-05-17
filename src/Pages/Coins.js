import { LinearProgress, Typography } from '@material-ui/core';
import { Button } from '@mui/material';
import axios from 'axios';
import { doc, setDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { SingleCoin } from '../Config/Api';
import { CryptoState } from '../CryptoContext';
import { db } from '../Firebase';
import CoinChart from './CoinChart';

function numberWithCommas(x) {
    return x?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
const Coins = () => {
    const {id}=useParams();
    const {currency,symbol,setCurrency,user,watchList}=CryptoState();
    const [coin,setCoin]=useState({});
    const [loading,setLoading]=useState(false);
    const inWatchList=watchList.includes(coin?.id);
    const getCoinById=async()=>{
        setLoading(true);
       const {data}= await axios.get(SingleCoin(id));
      //  console.log({data});
       setCoin(data);
       setLoading(false);

    }

console.log(coin);
    useEffect(()=>{getCoinById()},[currency]);
    const addToList=async()=>{
      const coinRef=doc(db,"watchList",user.uid);
      try{
        await setDoc(coinRef,{coins:watchList?[...watchList,coin.id]:[coin?.id]});
        window.alert("coin added successfully");
      }
      catch(err){
        window.alert(err);
      }
    }
  return (
    <div >
        {loading?<LinearProgress style={{backgroundColor:"gold"}}/>:
        <div style={{display:"flex"}}>
            
        <div className="sideBar">
        <img src={coin.image?.large} alt={coin.name} height="200" style={{marginButtom:"20",marginTop:"3vh"}}/>
        <Typography variant="h3">{coin.name}</Typography>
        <p style={{textAlign:"center"}}>{coin.description?.bg.split(". ")[0]}</p>
        <div style={{display:"flex",flexDirection:"column",justifyContent:"center",marginTop:"5vh"}}>
            <Typography variant='h4' style={{textAlign:"center"}}>Rank:{coin?.market_cap_rank}</Typography>
            <Typography variant='h5' style={{textAlign:"center",marginTop:"3vh"}}>Current Price:{symbol} {numberWithCommas(coin.market_data?.current_price[currency.toLowerCase()])}</Typography>
            <Typography variant='h5' style={{textAlign:"center",marginTop:"3vh"}}>Market Cap:{symbol}{numberWithCommas(coin.market_data?.market_cap[currency.toLowerCase()])}M</Typography>
            {user && (<Button onClick={addToList} variant='contained' style={{backgroundColor:"gold",marginTop:"2vw"}}>
              {inWatchList?"Remove":"Add to wishList"}</Button>)}
        </div>

        </div>
        <CoinChart coin={coin}/> 
        </div>
        }
        
        
    </div>
  )
}

export default Coins