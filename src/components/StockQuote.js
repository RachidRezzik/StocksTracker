import React, {useState, useEffect} from 'react'
import axios from 'axios'

export default function StockQuote(props) {
    //Local Storage For Refresh, Maintaining the Stock User Wanted to View
    const setSelectedStockStorage = (userPositions) => {
        localStorage.setItem('selectedStock', JSON.stringify(userPositions))
    }
    
    const readSelectedStockStorage = () => {
        return JSON.parse(localStorage.getItem('selectedStock'))
    }

    if (localStorage.getItem('selectedStock') === null){
        setSelectedStockStorage(props.selectedStock)
    } else if (props.selectedStock !== ""){
        setSelectedStockStorage(props.selectedStock)
    }

    const [selectedStock, setSelectedStock] = useState(props.selectedStock !== "" ? props.selectedStock : readSelectedStockStorage())



    const [logoData, setLogoData] = useState({
        url: ""
    })
    const [quoteData, setQuoteData] = useState({
        companyName: "",
        latestPrice: "",
        changePercent: "",
        marketCap: "",
        peRatio: "",
        week52High: "",
        week52Low: ""
    })
    const [divData, setDivData] = useState({
        amount: "",
        paymentDate: "",
        recordDate: "",
        frequency: ""
    })
    const [newsArray, setNewsArray] = useState([])
    const [isLoading, setLoading] = useState(true)


    
    const [currentPosition, setCurrentPosition] = useState(false)
    
    useEffect(() => {
        console.log(selectedStock)
        let user_positions = props.userPositions
        if (user_positions.length === 0){
            setCurrentPosition(false)
        } else if (user_positions.find(position => position.stock === selectedStock)){
            setCurrentPosition(true)
        } else{
            setCurrentPosition(false)
        }
        
        //Calling API Based on Which of the Featured Stocks they Selected

        //LOGO DATA
        let url = `https://cloud.iexapis.com/stable/stock/${selectedStock}/logo?token=sk_3e722d9cee6c4ae498d5e8ad9f543015`
        axios.get(url)
        .then((res) => {
            setLogoData({
                url: res.data.url
            })
        })
        .catch((error) => { 
            console.log(error)
        })

        //QUOTE DATA

        url = `https://cloud.iexapis.com/stable/stock/${selectedStock}/quote?token=sk_3e722d9cee6c4ae498d5e8ad9f543015`
        axios.get(url)
        .then((res) => {
            let marketCap = res.data.marketCap
            if (marketCap.toString().length > 6 && marketCap.toString().length <= 9){
                marketCap = `${Math.round(marketCap / 1000000)} M`
            } else if (marketCap.toString().length >= 10 && marketCap.toString().length <= 12){
                marketCap = `${Math.round(marketCap / 1000000000)} B`
            } else if (marketCap.toString().length >= 12 && marketCap.toString().length <= 15){
                marketCap = `${Math.round(marketCap / 1000000000000)} T`
            }
            setQuoteData({
                companyName: res.data.companyName,
                latestPrice: res.data.latestPrice.toFixed(2),
                changePercent: (res.data.changePercent * 100).toFixed(2),
                marketCap: marketCap,
                peRatio: res.data.peRatio.toFixed(2),
                week52High: res.data.week52High.toFixed(2),
                week52Low: res.data.week52Low.toFixed(2)
            })
        })
        .catch((error) => {
            console.log(error)
        })


        //DIVIDEND DATA
        url = `https://cloud.iexapis.com/stable/stock/${selectedStock}/dividends?token=sk_3e722d9cee6c4ae498d5e8ad9f543015`
        axios.get(url)
        .then((res) => {
            if (res.data[0] === undefined){
                setDivData({
                    amount: " -",
                    paymentDate: " -",
                    recordDate: " -",
                    frequency: " -"
                })
            } else{
                setDivData({
                    amount: `$${res.data[0].amount.toFixed(2)}`,
                    paymentDate: res.data[0].paymentDate,
                    recordDate: res.data[0].recordDate,
                    frequency: res.data[0].frequency
                })
            }
        })
        .catch((error) => {
            console.log(error)
        })

        //News Articles (In English)
        url = `https://cloud.iexapis.com/stable/stock/${selectedStock}/news/last/{100}?token=sk_3e722d9cee6c4ae498d5e8ad9f543015`
        axios.get(url)
        .then((res) => {
            let english_array = res.data.filter(article => article.lang === 'en').slice(0, 5)
            setNewsArray(english_array)
        })
        .catch((error) => {
            console.log(error)
        })

        setLoading(false)
    }, [selectedStock, props.userPositions])

    const handleAddPosition = (stock) => {
        props.handlePositionClick(stock)
    }

    if (isLoading) {
        return(
            <h2>Loading Data..</h2>
        )
    } else{
        return(
            <div className="stock_quote">
                <div className="quote_container">
                    <div className="name_logo">
                        <img style={{border: "1px solid lightgray"}} src={logoData.url} alt=""/>
                        <div>
                            <p>{selectedStock}</p>
                            <h2>{quoteData.companyName}</h2>
                        </div>
                    </div>
                    <div>
                        <button onClick={() => handleAddPosition(selectedStock)}>{currentPosition ? "Edit Position" : "Add Position"}</button>
                    </div>
                </div>
                <h4 id="price">Price: ${quoteData.latestPrice} <span className={quoteData.changePercent > 0 ? "positive_change" : quoteData.changePercent < 0 ?"negative_change" : ""}>({quoteData.changePercent}%)</span></h4> 
                <div className="quote_data">
                    <div className="metrics_info">
                        <div>
                            <h4>P/E Ratio:</h4>
                            <h4>{quoteData.peRatio}</h4> 
                        </div>
                        <div>
                            <h4>Market Cap:</h4>
                            <h4>{quoteData.marketCap}</h4>  
                        </div>
                        <div>
                            <h4>52-Week High:</h4>
                            <h4>${quoteData.week52High}</h4>  
                        </div>
                        <div style={{border: "none"}}>
                            <h4>52-Week Low:</h4>
                            <h4>${quoteData.week52Low}</h4>  
                        </div>
                    </div>
                    <div className="div_info">
                        <div>
                            <h4>Dividend:</h4>
                            <h4>{divData.amount}</h4> 
                        </div>
                        <div>
                            <h4>Payment Date:</h4>
                            <h4>{divData.paymentDate}</h4> 
                        </div>
                        <div>
                            <h4>Record Date:</h4>
                            <h4>{divData.recordDate}</h4> 
                        </div>
                        <div style={{border: "none"}}>
                            <h4>Frequency:</h4>
                            <h4 style={{textTransform: "capitalize"}}>{divData.frequency}</h4> 
                        </div>
                        
                    </div>
                </div>
                <h1 className="in_the_news">Latest News for {selectedStock}</h1>
                <div className="articles_container">
                    {newsArray.length !== 0 ? 
                        newsArray.map(article => {
                        return (
                            <a className="article_link" href={article.url} key={article.url} target="_blank" rel="noreferrer">
                                <h2>{article.headline}</h2>
                                <h3>{article.source}</h3>
                            </a>
                        ) 
                    }) : ""}
                </div>
            </div> 
        )
    }
}
