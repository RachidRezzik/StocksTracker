import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'


export default function FeaturedStock(props) {
    const [isLoading, setLoading] = useState(true)
    const [price, setPrice] = useState(0)
    const [changePercent, setChangePercent] = useState(0)

    useEffect(() => {
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
    }, [props.stock]);

    const handleMoreInfo = (stock) => {
        props.handleStockClick(stock)
    }


    if (price === 0 && isLoading) {
        return (
            <div>
                <p>-</p>
            </div>
        )
    } else{
        return (
            <div className="price_container">
                <p>${price}(<span className={changePercent > 0 ? "positive_change" : "negative_change"}>{(changePercent * 100).toFixed(2)}%</span>)</p>
                <Link to="StockQuote" onClick={() => handleMoreInfo(props.stock)}>
                    <button>Stock Details</button>
                </Link>
                <button>Add Position</button>
            </div>
        )
    }

}
