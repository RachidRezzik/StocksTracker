import React from 'react'
import {Link} from 'react-router-dom'

export default function UserPositions() {
    return (
        <div>
            <div className="positions_headline">
                <h1>Your Positions (0)</h1>
                <Link to="/Stocks">Search Stocks</Link>
            </div>
            <div className="positions_container">
                <div className="position_row" id="positions_key">
                    <h4>Name</h4>
                    <h4>Value/Return</h4>
                    <h4>#Shares</h4>
                    <h4>Average Price/Share</h4>
                </div>
                <div className="position_row">
                    <h4> - No Positions Added</h4>
                </div>
            </div>
        </div>
    )
}
