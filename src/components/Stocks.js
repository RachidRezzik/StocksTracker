import React, {useRef, useState} from 'react'

//Components
import FeaturedStocks from './FeaturedStocks'

export default function Stocks(props) {
    const userInput = React.createRef()
    const [suggestedStocks, setSuggestedStocks] = useState([])
    
    const handleStockSearch = () => {

    }


    return (
        <div className="stocks_page">
            <h1>Search Stocks</h1>
            <input type="text" placeholder="Input Stock Ticker Symbol" />
            <FeaturedStocks 
            handleStockClick={props.handleStockClick}
            />
            
        </div>
    )
}
