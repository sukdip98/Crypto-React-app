import { Container } from '@material-ui/core';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import AliceCarousel from 'react-alice-carousel';
import { Link } from 'react-router-dom';
import { TrendingCoins } from '../Config/Api';
import { CryptoState } from '../CryptoContext'
function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
const Carousel =() => {
    const [trending,setTrending]=useState([]);
    const{currency,symbol,setCurrency}=CryptoState();
    //  trending=await axios.get(TrendingCoins(currency));
    const fetchTrendingCoins=async()=>{
        const {data}=await axios.get(TrendingCoins(currency));
        setTrending(data);

    }
    console.log(trending);
     useEffect(()=>{
         fetchTrendingCoins();
     },[currency]);
     const items=trending.map((coin)=>{
         const profit=coin.market_cap_change_percentage_24h>=0;
         return <Link to={`/coins/${coin.id}`} style={{alignItems:"center",textDecoration:"none",
         display:"flex",flexDirection:"column",color:"white"}}>
             <img src={coin?.image} alt={coin.name} height="80" style={{marginButtom:10}}/>
             <span style={{textTransform:"uppercase"}}>{coin.symbol}
             &nbsp;
             <span style={{color:profit>0?"green":"red"}}>{profit && "+"}{coin.market_cap_change_percentage_24h.toFixed(2)}%</span>
             </span>
             <span>{symbol}:{numberWithCommas(coin.current_price)}</span>
         </Link>
     })
     const responsive={
         0:{
             items:2,
         },
         512:{
             items:4,
         }
     }
  return (
      <Container>
 <div style={{height:"40%",display:"flex",alignItem:"centre"}}>
        <AliceCarousel mouseTracking infinite autoPlayInterval={true} animationDuration={150} responsive={responsive}
        disableButtonsControls items={items} disableDotsControls/>
    </div>
      </Container>
   
  )
}

export default Carousel