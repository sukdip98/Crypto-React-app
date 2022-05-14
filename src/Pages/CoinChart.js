import React,{useEffect, useState} from 'react'
import { HistoricalChart } from '../Config/Api';
import { CryptoState } from '../CryptoContext'
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import { borderColor, flexbox } from '@mui/system';
// import Chart from 'chart.js/auto';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { Button } from '@material-ui/core';
const CoinChart = ({coin}) => {
  const {currency,symbol,setCurrency}=CryptoState();
  const [historicalData,setHistoricalData]=useState([]);
  const [day,setDay]=useState(1);
  const getHistoricData=async()=>{
    const {data}=await axios.get(HistoricalChart(coin.id,day,currency));
    setHistoricalData(data.prices);
  }
  const style1={
    backgroundColor:day===1?"gold":"white",
    color:day===1?"white":"black"
  }
  const style2={
    backgroundColor:day===30?"gold":"white",
    color:day===30?"white":"black"
  }
  const style3={
    backgroundColor:day===90?"gold":"white",
    color:day===90?"white":"black"
  }
  const style4={
    backgroundColor:day===365?"gold":"white",
    color:day===365?"white":"black"
  }
  useEffect(()=>{
    getHistoricData();
  },[currency,day]);
  if(!coin){
    return <Box sx={{ display: 'flex',justifyContent:"center",alignItems:"center" }}>
    <CircularProgress size={100}  />
  </Box>
  }
  return (
    <div style={{width:"100%",color:"green"}}>
      
      <Line color='green' data={{labels:historicalData.map((coin)=>{
        let date=new Date(coin[0]);
        let time=date.getHours()>12?`${(date.getHours()-12)}:${date.getMinutes()} PM`:
        `${date.getHours()}:${date.getMinutes()} AM`;
        return day===1?time:date.toLocaleDateString();
      }),
      datasets:[{data:historicalData.map((coin)=>coin[1]),
      label:`Price(Past${day}Days) in ${currency}`,borderColor:"black"},
      
    ]
      }}/>
      <div style={{display:"flex",msFlexDirection:"column",justifyContent:"space-around",marginTop:"6vh"}}>
      <Button variant="outlined" style={style1} onClick={()=>setDay(1)}>24 Hours</Button>
      <Button variant="outlined" style={style2} onClick={()=>setDay(30)}>30 Days</Button>
      <Button variant="outlined" style={style3} onClick={()=>setDay(90)}>3 Months</Button>
      <Button variant="outlined" style={style4} onClick={()=>setDay(365)}>1 Year</Button>
      </div>
    </div>
  )
}

export default CoinChart