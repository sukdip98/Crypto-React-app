import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './Pages/HomePage';
import CoinPage from './Pages/CoinPage';
import Header from './Pages/Header';
import { ThemeProvider } from '@mui/styles';
import Coins from './Pages/Coins';
import AlertBar from './Authentication/AlertBar';
// const theme=createTheme({
//  backgroundColor:"red",
//  color:"white",
//  minHeight:"100vh"
// })
function App() {

  return (
   <BrowserRouter>
   <div className='App'>
    <Header/>
    <Routes>
      <Route path="/" element={<HomePage/>} exact/>
       <Route path="/coins/:id" element={<Coins/>} />
    </Routes>
    </div>
   
   </BrowserRouter>
  );
}

export default App;
