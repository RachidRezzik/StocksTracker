import React from 'react'
import {Link} from 'react-router-dom'

export default function Home(props) {
    const featured_stocks = ['IBM', 'TSLA', 'AAPL', 'V', 'MSFT']


    const FeaturedStockClick = (stock) => {
        console.log(stock)
        props.handleStockClick(stock)
    }

    return (
        <div>
            <Link to="/Stocks">Search Stocks!</Link>
            <h2>Featured Stocks</h2>
            <div className="featured_stocks_container">
                {featured_stocks.map(stock => {
                    return (
                        <Link to="/StockQuote" onClick={() => FeaturedStockClick(stock)}>
                            <div className="featured_stock">
                                <p>{stock}</p>
                            </div>
                        </Link>
                    )
                })}
            </div>
        </div>
    )
}
