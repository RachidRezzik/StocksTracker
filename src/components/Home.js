import React, {useState} from 'react'

//COMPONENTS
import FeaturedStocks from './FeaturedStocks'
import News from './News'
import UserPositions from './UserPositions'

export default function Home(props) {
    const featuredStocks = [
        {
            key: 1,
            name: "AMAZON",
            ticker: 'AMZN',
            logo: "https://storage.googleapis.com/iexcloud-hl37opg/api/logos/AMZN.png"
        },
        {
            key: 2,
            name: "IBM",
            ticker: 'IBM',
            logo: "https://storage.googleapis.com/iexcloud-hl37opg/api/logos/IBM.png"
        },
        {
            key: 3,
            name: "NETFLIX",
            ticker: 'NFLX',
            logo: "https://storage.googleapis.com/iexcloud-hl37opg/api/logos/NFLX.png"
        },
        {
            key: 4,
            name: "TESLA",
            ticker: 'TSLA',
            logo: "https://storage.googleapis.com/iexcloud-hl37opg/api/logos/TSLA.png"
        },
        {
            key: 5,
            name: "APPLE",
            ticker: 'AAPL',
            logo: "https://storage.googleapis.com/iexcloud-hl37opg/api/logos/AAPL.png"
        },
        {
            key: 6,
            name: "MICROSOFT",
            ticker: 'MSFT',
            logo: "https://storage.googleapis.com/iexcloud-hl37opg/api/logos/MSFT.png"
        }
    ]

    return (
        <div className="home_container">
            <div className="home_left">
                <UserPositions 
                userPositions={props.userPositions}
                handlePositionClick={props.handlePositionClick}
                handleStockClick={props.handleStockClick}
                handleRemovePosition={props.handleRemovePosition}
                />
                <h1>News</h1>
                <News
                featuredStocks={featuredStocks.filter(stock => stock.ticker !== "IBM")}
                />
            </div>
            <div className="home_right">
                <FeaturedStocks 
                handleStockClick={props.handleStockClick}
                handlePositionClick={props.handlePositionClick}
                userPositions={props.userPositions}
                featuredStocks={featuredStocks}
                />
            </div>
        </div>
    )
}
