import { LinearProgress, Typography } from '@material-ui/core';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { SingleCoin } from '../Config/Api';
import { CryptoState } from '../CryptoContext';
import CoinChart from './CoinChart';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
function numberWithCommas(x) {
    return x?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
const Coins = () => {
    const {id}=useParams();
    const {currency,symbol,setCurrency}=CryptoState();
    const [coin,setCoin]=useState({});
    const [loading,setLoading]=useState(false);
    const getCoinById=async()=>{
        setLoading(true);
       const {data}= await axios.get(SingleCoin(id));
      //  console.log({data});
       setCoin(data);
       setLoading(false);

    }
console.log(coin);
    useEffect(()=>{getCoinById()},[currency]);
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
        </div>

        </div>
        { loading? <Box sx={{ display: 'flex',justifyContent:"center",alignItems:"center" }}>
      <CircularProgress size={100}  />
    </Box>:<CoinChart coin={coin}/> }
        {/* {coin?:null} */}
        </div>
        }
        
        
    </div>
  )
}

export default Coins