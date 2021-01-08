import React from 'react'

//Component
import FeaturedStockPrice from './FeaturedStockPrice'


export default function FeaturedStocks(props) {
    return(
        <div>
                <h2 className="featured_headline">Featured Stocks</h2>
                <div className="featured_stocks_container">
                    {props.featuredStocks.map(stock => {
                        return (
                            <div className="featured_stock" key={stock.key}>
                                <div className="featured_stock_flex"> 
                                    <div className="logo_ticker"> 
                                        <div className="image_container">
                                            <img src={stock.logo} alt="" />
                                        </div>
                                        <div className="stock_name_container">
                                            <p>{stock.ticker}</p>
                                            <h4>{stock.name}</h4>
                                        </div>
                                    </div>
                                    <FeaturedStockPrice
                                    stock={stock.ticker}
                                    key={stock.key}
                                    handleStockClick={props.handleStockClick}
                                    handlePositionClick={props.handlePositionClick}
                                    userPositions={props.userPositions}
                                    />
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
    )
    

}
