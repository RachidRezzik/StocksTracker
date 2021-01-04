import React, {useState} from 'react'
import './App.css';
import {HashRouter, Switch, Route} from "react-router-dom"

//Components
import Home from './components/Home'
import Stocks from './components/Stocks'
import StockQuote from './components/StockQuote'
import NavBar from './components/NavBar';

function App() {
  const [selectedStock, setSelectedStock] = useState("")

  const handleStockClick = (stock) => {
    console.log(stock)
    setSelectedStock(stock)
  }

  return (
    <div className="App">
      <HashRouter baseline="/">
        <NavBar />
        <Switch>
          <Route exact path="/" render={() => <Home
          handleStockClick={handleStockClick}  
          />} />
          <Route exact path="/Stocks" render={() => <Stocks
          handleStockClick={handleStockClick}  
          />} />
          <Route path="/StockQuote" render={() => <StockQuote
          selectedStock={selectedStock}  
          />} />
        </Switch>
      </HashRouter>
    </div>
  );
}

export default App;
