import React, {useEffect, useState} from 'react'
import axios from 'axios'

//Images
import edit from '../images/edit-icon.svg'
import trash from '../images/trash.svg'
import quote from '../images/view-details.svg'
import { Link } from 'react-router-dom'

export default function Position(props) {
    const [isLoading, setLoading] = useState(true)
    const [value, setValue] = useState("")
    const [positionGain, setPositionGain] = useState("")
    const [positionReturn, setPositionReturn] = useState("")

    const handleMoreInfo = (stock) => {
        props.handleStockClick(stock)
    }

    const handleEditClick = (stock) => {
        props.handlePositionClick(stock)
    }

    const handleDeleteClick = (stock) => {
        props.handleRemovePosition(stock)
    }


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

    if (isLoading || positionReturn === "") {
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
                <h4 className={positionGain[0] !== "-" ? "positive_change" : "negative_change"}>{positionGain[0] !== "-" ? `$${positionGain}` : `-$${positionGain.toString().slice(1)}`} ({positionGain[0] !== "-" ? `${positionReturn}` : `${positionReturn.toString().slice(1)}`}%)</h4>
                <h4>{props.numberShares.toLocaleString(undefined, {maximumFractionDigits: 2, minimumFractionDigits: 2})}</h4>
                <h4>${props.avgPrice.toLocaleString(undefined, {maximumFractionDigits: 2, minimumFractionDigits: 2})}</h4>
                <h4>
                    <Link to="/StockQuote" onClick={() => handleMoreInfo(props.stock)}>
                        <img src={quote} alt="" />
                    </Link>
                    <img src={edit} alt="" onClick={() => handleEditClick(props.stock)}/>
                    <img src={trash} alt="" onClick={() => handleDeleteClick(props.stock)}/>
                </h4>
            </div>
        )
    }
}
