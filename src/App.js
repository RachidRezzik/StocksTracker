import React, {useState} from 'react'
import './App.css';
import {HashRouter, Switch, Route} from "react-router-dom"

//Components
import Home from './components/Home'
import Stocks from './components/Stocks'
import StockQuote from './components/StockQuote'

function App() {
  const [selectedStock, setSelectedStock] = useState("")

  const handleStockClick = (stock) => {
    console.log(stock)
    setSelectedStock(stock)
  }


  //how to convert epoch timestamp to date
  // let utc = response.data[0].datetime
  // let d = new Date(utc)
  
  // axios.request('https://cloud.iexapis.com/stable/stock/IBM/news/last/{5}?token=sk_55c776d814304653a39d9ba6b3efcd03').then(function (response) {
  //   // let utc = response.data[0].datetime
  //   // let d = new Date(utc)
  //   // console.log(d)
  // }).catch(function (error) {
  //   console.error(error);
  // });


  return (
    <div className="App">
      <HashRouter baseline="/">
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
