import React, {useState} from 'react'
import './App.css';
import {HashRouter, Switch, Route} from "react-router-dom"

//Components
import Home from './components/Home'
import Stocks from './components/Stocks'
import StockQuote from './components/StockQuote'
import NavBar from './components/NavBar';
import AddPositionModal from './components/AddPositionModal';

function App() {
  const [selectedStock, setSelectedStock] = useState("")
  const [positionStock, setPositionStock] = useState("")
  const [positionModal, setPositionModal] = useState(false)
  const [userPositions, setUserPositions] = useState([])

  const handleStockClick = (stock) => {
    setSelectedStock(stock)
  }

  const handlePositionClick = (stock) => {
    setPositionModal(true)
    setPositionStock(stock)
  }

  const handleModalClose = () => {
    setPositionModal(false)
  }


  //Handling an Addition to The User's Positions

  const handleAddPositionSubmit = (stock, numberShares, avgPrice) => {
    let stockObject = {}
    stockObject.stock = stock
    stockObject.numberShares = numberShares
    stockObject.avgPrice = avgPrice
    setUserPositions(userPositions.concat([stockObject]))
  }


  return (
    <div className="App">
      <HashRouter baseline="/">
        <NavBar />
        <Switch>
          <Route exact path="/" render={() => <Home
          handleStockClick={handleStockClick}  
          handlePositionClick={handlePositionClick}
          userPositions={userPositions}  
          />} />
          <Route exact path="/Stocks" render={() => <Stocks
          handleStockClick={handleStockClick} 
          handlePositionClick={handlePositionClick}   
          />} />
          <Route path="/StockQuote" render={() => <StockQuote
          selectedStock={selectedStock} 
          handlePositionClick={handlePositionClick}  
          />} />
        </Switch>
        <AddPositionModal 
        positionModal={positionModal}  
        positionStock={positionStock}
        handleAddPositionSubmit={handleAddPositionSubmit} 
        handleModalClose={handleModalClose} 
        />
      </HashRouter>
    </div>
  );
}

export default App;
