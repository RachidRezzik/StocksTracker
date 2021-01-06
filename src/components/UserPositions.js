import React from 'react'
import {Link} from 'react-router-dom'
import Position from './Position'

export default function UserPositions(props) {


    return (
        <div>
            <div className="positions_headline">
                <h1>Your Positions</h1>
                <Link to="/Stocks">Search Stocks</Link>
            </div>
            <div className="positions_container">
                <div className="position_row" id="positions_key">
                    <h4>Stock</h4>
                    <h4>Value</h4>
                    <h4>Gain/Return</h4>
                    <h4>#Shares</h4>
                    <h4>Avg. Price</h4>
                </div>
                {props.userPositions.length === 0 ? 
                <div className="position_row">
                    <h4> - No Positions Added</h4>
                </div>
                :
                props.userPositions.map(position => {
                    return(
                        <Position
                        stock={position.stock}
                        numberShares={position.numberShares}
                        avgPrice={position.avgPrice}
                        />
                    )
                })
                
                }
            </div>
        </div>
    )
}
