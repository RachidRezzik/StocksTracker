import React from 'react'

//COMPONENTS
import FeaturedStocks from './FeaturedStocks'
import UserPositions from './UserPositions'

export default function Home(props) {
    return (
        <div>
            <UserPositions />
            <FeaturedStocks 
            handleStockClick={props.handleStockClick}
            />
        </div>
    )
}
