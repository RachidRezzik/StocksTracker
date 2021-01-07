import React from 'react'

//COMPONENTS
import FeaturedStocks from './FeaturedStocks'
import UserPositions from './UserPositions'

export default function Home(props) {
    return (
        <div className="home_container">
            <div className="home_left">
                <UserPositions 
                userPositions={props.userPositions}
                handlePositionClick={props.handlePositionClick}
                handleStockClick={props.handleStockClick}
                handleRemovePosition={props.handleRemovePosition}
                />
            </div>
            <div className="home_right">
                <FeaturedStocks 
                handleStockClick={props.handleStockClick}
                handlePositionClick={props.handlePositionClick}
                userPositions={props.userPositions}
                />
            </div>
        </div>
    )
}
