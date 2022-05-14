import { Container, LinearProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@material-ui/core'
import { Pagination } from '@mui/material'
import axios from 'axios'
import React, { useEffect,useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CoinList } from '../Config/Api'
import { CryptoState } from '../CryptoContext'
function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
const CoinPage = () => {
  const{currency,symbol,setCurrency}=CryptoState();
  const [coins,setCoins]=useState([]);
  const[search,setSearch]=useState("");
  const[loading,setLoading]=useState(false);
  const history=useNavigate();
  const [page,setpage]=useState(1);
  const fetchCoinList=async()=>{
    setLoading(true);
   const {data}=await axios.get(CoinList(currency));
  //  console.log(data);

   setCoins(data);
   setLoading(false);

  }
  useEffect(()=>{
    fetchCoinList();
  },[currency]);
   const handleSearch=()=>{
     return coins.filter((coin)=>(
       coin.name.toLowerCase().includes(search)||
       coin.symbol.toLowerCase().includes(search)
     ))
   }
  return (
        <Container style={{alignItem:"center",textAlign:"center"}}>
          <Typography variant='h4' style={{margin:"18"}}>List of Coins Based on Market Cap</Typography>
          <TextField style={{marginTop:"3vw",width:"100%"}} label="Search Coins" className="textfield" 
          onChange={(e)=>setSearch(e.target.value)} variant="outlined"/>
          <TableContainer>
            {loading?(
              <LinearProgress style={{backgroundColor:"gold"}}/>
            ):
            <Table style={{marginTop:"1vw",backgroundColor:"darkgrey"}}>
              <TableHead>
                <TableRow style={{backgroundColor:"yellow"}}>
                  {["Coin","Price","24Hr Change","Market Cap"].map((head)=>
                    <TableCell key={head} align={head==="Coin"?"":"right"} style={{fontSize:"30",fontWeight:"bold"}}>{head}</TableCell>
                  )}
                </TableRow>
              </TableHead>
              <TableBody>{handleSearch().slice((page-1)*10,(page-1)*10+10).map((row)=>{
                const profit=row.price_change_percentage_24h>0;
                return(
                  <TableRow className="row" onClick={()=>history(`/coins/${row.id}`)} key={row.name} style={{cursor:"pointer"}}>
                    <TableCell component="th" scope="row" style={{display:"flex",gap:15}} >
                       <img src={row.image} alt={row.name} height="50" style={{marginButtom:10}}></img>
                       <div style={{display:"flex",flexDirection:"column",alignItem:"centre"}}>
                       <span style={{textTransform:"uppercase",fontSize:"30",fontWeight:"bold"}}>{row.symbol}</span>
                       <span>{row.name}</span>
                       </div>
                     
                    </TableCell>
                    <TableCell align='right'>
                      {symbol}:{numberWithCommas(row.current_price)}
                    </TableCell>
                    <TableCell align="right" style={{color:profit>0?"green":"red"}}>{row.price_change_percentage_24h.toFixed(2)}%</TableCell>
                    <TableCell align="right">{symbol}:{numberWithCommas(row.market_cap)}M</TableCell>
                  </TableRow>
                )
              })}
                
              </TableBody>
              </Table>}
          </TableContainer>
          <Pagination count={10} onChange={(_,value)=>
            {setpage(value)
            window.scroll(0,450);
            }}/>
        </Container>
  )
}

export default CoinPage