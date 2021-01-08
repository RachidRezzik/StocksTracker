import React, {useEffect} from 'react'
import {Link} from 'react-router-dom'
import Position from './Position'

export default function UserPositions(props) {

    useEffect(() => {
        const allPositions = Array.from(document.querySelectorAll('.position_row'))
        allPositions.forEach(position => {
            if (allPositions.indexOf(position) !== allPositions.length -1 && allPositions.indexOf(position) !== 0){
                position.style.borderRadius = "0px"
                position.style.borderBottom = "1px solid black"
            } else if(allPositions.indexOf(position) === 0){
                position.style.borderRadius = "5px 5px 0px 0px"
                position.style.borderBottom = "none"
            } else{
                position.style.borderRadius = "0px 0px 5px 5px"
                position.style.borderBottom = "none"
            }
        })   
    },)

    return (
        <div className="positionSection">
            <div className="positions_headline">
                <h1>Your Positions</h1>
            </div>
            <div className="positions_container">
                <div className="position_row" id="positions_key">
                    <h4>Stock</h4>
                    <h4>Value</h4>
                    <h4>Gain/Return</h4>
                    <h4>#Shares</h4>
                    <h4>Avg. Price</h4>
                    <h4>Options</h4>
                </div>
                {props.userPositions.length === 0 ? 
                <div className="position_row">
                    <h4> - No Positions Added</h4>
                </div>
                :
                props.userPositions.map(position => {
                    return(
                        <Position
                        key={position.key}
                        stock={position.stock}
                        numberShares={position.numberShares}
                        avgPrice={position.avgPrice}
                        handlePositionClick={props.handlePositionClick}
                        handleStockClick={props.handleStockClick}
                        handleRemovePosition={props.handleRemovePosition}
                        userPositions={props.userPositions}
                        />
                    )
                })
                
                }
            </div>
        </div>
    )
}
