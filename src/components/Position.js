import React, {useEffect, useState} from 'react'
import axios from 'axios'

export default function Position(props) {
    const [isLoading, setLoading] = useState(true)
    const [value, setValue] = useState(0)
    const [positionGain, setPositionGain] = useState(0)
    const [positionReturn, setPositionReturn] = useState(0)

    //Calculating Position Value and Return Based on User's Number of Shares and Average Share Price

    useEffect(() => {
        let url = `https://cloud.iexapis.com/stable/stock/${props.stock}/quote?token=pk_d6a02730351b4e809a24fbaf29fb5ac1`
        axios.get(url)
        .then((res) => {
            setValue((props.numberShares * res.data.latestPrice).toLocaleString(undefined, {maximumFractionDigits: 2, minimumFractionDigits: 2}))
            const gain = (props.numberShares * res.data.latestPrice - props.numberShares * props.avgPrice)
            const gain_adjusted = gain.toLocaleString(undefined, {maximumFractionDigits: 2, minimumFractionDigits: 2})
            setPositionGain(gain_adjusted)
            const position_return = (gain / (props.numberShares * props.avgPrice) * 100).toLocaleString(undefined, {maximumFractionDigits: 2, minimumFractionDigits: 2})
            setPositionReturn(position_return)
        })
        .catch((error) => {
            console.log(error)
        })
        setLoading(false)
    }, [props.stock, props.avgPrice, props.numberShares]);

    if (isLoading) {
        return(
            <div className="position_row">
            <h4>{props.stock}</h4>
            <h4>-</h4>
            <h4>-</h4>
            <h4>{props.numberShares}</h4>
            <h4>${props.avgPrice}</h4>
            </div>
        )    
    } else {
        return (
            <div className="position_row">
                <h4>{props.stock}</h4>
                <h4>${value}</h4>
                <h4 className={positionReturn > 0 ? "positive_change" : "negative_change"}>{positionReturn > 0 ? `$${positionGain}` : `-$${positionGain.toString().slice(1)}`} ({positionReturn > 0 ? `${positionReturn}` : `${positionReturn.toString().slice(1)}`}%)</h4>
                <h4>{props.numberShares.toLocaleString(undefined, {maximumFractionDigits: 2, minimumFractionDigits: 2})}</h4>
                <h4>${props.avgPrice.toLocaleString(undefined, {maximumFractionDigits: 2, minimumFractionDigits: 2})}</h4>
            </div>
        )
    }
}
