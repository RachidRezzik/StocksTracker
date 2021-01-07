import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'


export default function FeaturedStockPrice(props) {
    const [isLoading, setLoading] = useState(true)
    const [price, setPrice] = useState(0)
    const [changePercent, setChangePercent] = useState(0)
    const [currentPosition, setCurrentPosition] = useState(false)

    useEffect(() => {
        let user_positions = props.userPositions
        if (user_positions.length === 0){
            setCurrentPosition(false)
        } else if (user_positions.find(position => position.stock === props.stock)){
            setCurrentPosition(true)
        } else{
            setCurrentPosition(false)
        }

        let url = `https://cloud.iexapis.com/stable/stock/${props.stock}/quote?token=pk_d6a02730351b4e809a24fbaf29fb5ac1`
        axios.get(url)
        .then((res) => {
            setPrice(res.data.latestPrice)
            setChangePercent(res.data.changePercent)
            setLoading(false)
        })
        .catch((error) => {
            console.log(error)
        })
    }, [props.stock, props.userPositions]);

    const handleMoreInfo = (stock) => {
        props.handleStockClick(stock)
    }

    const handleAddPosition = (stock) => {
        props.handlePositionClick(stock)
    }

    

    if (price === 0 && isLoading) {
        return (
            <div className="price_container">
                    <p>-</p>
                    <Link to="StockQuote" onClick={() => handleMoreInfo(props.stock)}>
                        <button>Stock Details</button>
                    </Link>
                    <button onClick={() => handleAddPosition(props.stock)}>{currentPosition ? "Edit Position" : "Add Position"}</button>
            </div>
        )
    } else{
        return (
            <div className="price_container">
                <p>${price.toLocaleString(undefined, {maximumFractionDigits: 2, minimumFractionDigits: 2})}(<span className={changePercent > 0 ? "positive_change" : "negative_change"}>{(changePercent * 100).toLocaleString(undefined, {maximumFractionDigits: 2, minimumFractionDigits: 2})}%</span>)</p>
                <Link to="StockQuote" onClick={() => handleMoreInfo(props.stock)}>
                    <button>Stock Details</button>
                </Link>
                <button onClick={() => handleAddPosition(props.stock)}>{currentPosition ? "Edit Position" : "Add Position"}</button>
            </div>
        )
    }

}

