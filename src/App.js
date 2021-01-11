import React, {useState} from 'react'
import './App.css';
import {HashRouter, Switch, Route} from "react-router-dom"

//Components
import Home from './components/Home'
import StockQuote from './components/StockQuote'
import NavBar from './components/NavBar';
import AddPositionModal from './components/AddPositionModal';
import SearchStocks from './components/SearchStocks';

function App() {
  const [selectedStock, setSelectedStock] = useState("")
  const [positionStock, setPositionStock] = useState("")
  const [positionModal, setPositionModal] = useState(false)
  
  // Selected Stock for Stock Quote Page
  const handleStockClick = (stock) => {
    setSelectedStock(stock)
  }

  // Selected Stock for Add/Edit Position Modal
  const handlePositionClick = (stock) => {
    setPositionModal(true)
    setPositionStock(stock)
  }

  const handleModalClose = () => {
    setPositionModal(false)
  }

  ///////////////////////////////////////////////////

  //Setting Up Local Storage to Remember User Positions on Refresh

  const setUserPositionsStorage = (userPositions) => {
    localStorage.setItem('userPositions', JSON.stringify(userPositions))
  }
  
  const readUserPositionsStorage = () => {
    return JSON.parse(localStorage.getItem('userPositions'))
  }

  if (localStorage.getItem('userPositions') === null){
    setUserPositionsStorage([])
  }

  const [userPositions, setUserPositions] = useState(readUserPositionsStorage() != null ? readUserPositionsStorage() : [])

  //Handling an Addition/Edit/Removal of The User's Positions

  const handleEditPosition = (positions, stockObject) => {
    let new_positions = positions.filter(position => position.stock !== stockObject.stock)
    setUserPositions(new_positions.concat([stockObject]))
    setUserPositionsStorage(new_positions.concat([stockObject]))
  }

  const handleRemovePosition = (stock) => {
    if (userPositions.length === 1) {
      setUserPositions([])
      setUserPositionsStorage([])
    } else{
      let new_positions = readUserPositionsStorage().filter(position => position.stock !== stock)
      setUserPositions(new_positions)
      setUserPositionsStorage(new_positions)
    }
  }
  
  const handleAddPositionSubmit = (stock, numberShares, avgPrice) => {
    let stockObject = {}
    stockObject.stock = stock
    stockObject.numberShares = numberShares
    stockObject.avgPrice = avgPrice
    
    let positions = readUserPositionsStorage()
    if (positions.find(position => position.stock === stock)){
      stockObject.key = positions.filter(position => position.stock === stock)[0].key
      handleEditPosition(positions, stockObject)
    } else{
      stockObject.key = userPositions.length + 1
      setUserPositions(userPositions.concat([stockObject]))
      setUserPositionsStorage(userPositions.concat([stockObject]))
    }
  }

  ///////////////////////////////////////////////////

  //Handling User Stock Search 
  
  const [searchOpen, setSearchOpen] = useState(false)

  const handleSearchOpen = () => {
    setSearchOpen(!searchOpen)
  }

  const handleSearchClose = () => {
    setSearchOpen(false)
  }

  //Detecting Page Refresh to ReShuffle the Order of Featured Stocks displayed in the News Section
  window.onbeforeunload = (e) => {
    localStorage.removeItem('articles')
  }

  return (
    <div className="App">
      <HashRouter baseline="/">
        <NavBar 
        searchOpen={searchOpen}
        handleSearchOpen={handleSearchOpen}
        handleSearchClose={handleSearchClose}
        />
        <SearchStocks 
        userPositions={userPositions}
        searchOpen={searchOpen}
        handleSearchClose={handleSearchClose}
        handleStockClick={handleStockClick}  
        handlePositionClick={handlePositionClick}
        />
        <Switch>
          <Route exact path="/" render={() => <Home
          handleStockClick={handleStockClick}  
          handlePositionClick={handlePositionClick}
          handleRemovePosition={handleRemovePosition}
          userPositions={userPositions}  
          />} />
          <Route path="/StockQuote" render={() => <StockQuote
          selectedStock={selectedStock} 
          userPositions={userPositions}  
          handlePositionClick={handlePositionClick}
          />} />
        </Switch>
        <AddPositionModal 
        positionModal={positionModal}  
        positionStock={positionStock}
        userPositions={userPositions}
        handleAddPositionSubmit={handleAddPositionSubmit} 
        handleModalClose={handleModalClose} 
        />
      </HashRouter>
    </div>
  );
}

export default App;
