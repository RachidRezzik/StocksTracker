import React, {useState, useEffect} from 'react'
import axios from 'axios'

export default function StockStats(props) {
    const [logoData, setLogoData] = useState("")
    const [quoteData, setQuoteData] = useState("")
    const [divData, setDivData] = useState("")
    const [newsArray, setNewsArray] = useState("")

    //Calling API Based on Which of the Featured Stocks they Selected

    useEffect(() => {
        //LOGO DATA
        let url = `https://cloud.iexapis.com/stable/stock/${props.selectedStock}/logo?token=pk_d6a02730351b4e809a24fbaf29fb5ac1`
        axios.get(url)
        .then((res) => {
            console.log(res.data.url)
            setLogoData(res.data)
        })
        .catch((error) => { 
            console.log(error)
        })

        //QUOTE DATA

        url = `https://cloud.iexapis.com/stable/stock/${props.selectedStock}/quote?token=pk_d6a02730351b4e809a24fbaf29fb5ac1`
        axios.get(url)
        .then((res) => {
            setQuoteData(res.data)
        })
        .catch((error) => {
            console.log(error)
        })


        //DIVIDEND DATA
        url = `https://cloud.iexapis.com/stable/stock/${props.selectedStock}/dividends?token=pk_d6a02730351b4e809a24fbaf29fb5ac1`
        axios.get(url)
        .then((res) => {
            if (res.data[0] === undefined){
                setDivData("none")
            } else{
                setDivData(res.data[0])
            }
        })
        .catch((error) => {
            console.log(error)
        })

        //News Articles (In English)
        url = `https://cloud.iexapis.com/stable/stock/${props.selectedStock}/news/last/{50}?token=pk_d6a02730351b4e809a24fbaf29fb5ac1`
        axios.get(url)
        .then((res) => {
            let english_array = res.data.filter(article => article.lang === 'en').slice(0, 5)
            setNewsArray(english_array)
        })
        .catch((error) => {
            console.log(error)
        })
    }, [props.selectedStock])
    
    return (
        <div className="stock_quote">
            {(newsArray === "" && quoteData === "" && logoData === "" && divData === "") ? <h2>Loading Data..</h2> : 
            <div>
            <div>
                <h1>{props.selectedStock}</h1>
                {logoData !== {} ? <img src={logoData.url} alt=""/> : ""}
            </div>
            <div style={{margin: "20px auto"}}>
                <h4>Price: ${quoteData.latestPrice} <span className={quoteData.changePercent > 0 ? "positive_change" : "negative_change"}>({(quoteData.changePercent * 100).toFixed(2)}%)</span></h4>
                <h4>52-Week High: ${(quoteData.week52High)}</h4>
                <h4>52-Week Low: ${(quoteData.week52Low)}</h4>
            </div>
            <div style={{margin: "20px auto"}}>
                <h4>Last Div Payment: {divData !== "none" ? `$${divData.amount}` : "-"}</h4>
                <h4>Payment Date: {divData !== "none" ? divData.paymentDate : "-"}</h4>
                <h4>Record Date: {divData !== "none" ? divData.recordDate : "-"}</h4>
            </div>
            <div className="articles_container" style={{margin: "20px auto"}}>
                {newsArray.length !== 0 ? 
                    newsArray.map(article => {
                    return (
                        <div className="article">
                            <a href={article.url} >
                                <h2>{article.headline}</h2>
                                <h3>{article.source}</h3>
                            </a>
                        </div>
                    ) 
                }) : ""}
            </div>
            </div>
            }  
        </div>
    )
}
