import React from 'react'

//COMPONENTS
import FeaturedStock from './FeaturedStock'
import UserPositions from './UserPositions'

export default function Home(props) {
    const featuredStocks = [
        {
            name: "AMAZON",
            ticker: 'AMZN',
            logo: "https://storage.googleapis.com/iexcloud-hl37opg/api/logos/AMZN.png"
        },
        {
            name: "IBM",
            ticker: 'IBM',
            logo: "https://storage.googleapis.com/iexcloud-hl37opg/api/logos/IBM.png"
        },
        {
            name: "NETFLIX",
            ticker: 'NFLX',
            logo: "https://storage.googleapis.com/iexcloud-hl37opg/api/logos/NFLX.png"
        },
        {
            name: "TESLA",
            ticker: 'TSLA',
            logo: "https://storage.googleapis.com/iexcloud-hl37opg/api/logos/TSLA.png"
        },
        {
            name: "APPLE",
            ticker: 'AAPL',
            logo: "https://storage.googleapis.com/iexcloud-hl37opg/api/logos/AAPL.png"
        },
        {
            name: "MICROSOFT",
            ticker: 'MSFT',
            logo: "https://storage.googleapis.com/iexcloud-hl37opg/api/logos/MSFT.png"
        }
    ]

    return (
        <div>
            <UserPositions />
            <div>
                <h2 className="featured_headline">Featured Stocks</h2>
                <div className="featured_stocks_container">
                    {featuredStocks.map(stock => {
                        return (
                            <div className="featured_stock">
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
                                    <FeaturedStock
                                    stock={stock.ticker}
                                    handleStockClick={props.handleStockClick}
                                    />
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}
