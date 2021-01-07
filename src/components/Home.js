import React from 'react'

//COMPONENTS
import FeaturedStocks from './FeaturedStocks'
import UserPositions from './UserPositions'

export default function Home(props) {
    return (
        <div>
            <UserPositions 
            userPositions={props.userPositions}
            handlePositionClick={props.handlePositionClick}
            handleRemovePosition={props.handleRemovePosition}
            />
            <FeaturedStocks 
            handleStockClick={props.handleStockClick}
            handlePositionClick={props.handlePositionClick}
            userPositions={props.userPositions}
            />
        </div>
    )
}
