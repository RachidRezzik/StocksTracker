import React from 'react'

export default function Position(props) {
    return (
        <div className="position_row">
            <h4>{props.stock}</h4>
            <h4>Value/Return</h4>
            <h4>{props.numberShares}</h4>
            <h4>${props.avgPrice}</h4>
        </div>
    )
}
