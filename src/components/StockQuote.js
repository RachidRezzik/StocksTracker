import React, {useState, useEffect} from 'react'
import axios from 'axios'

export default function StockStats(props) {
    const [quoteData, setQuoteData] = useState({})
    const [divData, setDivData] = useState({})
    const [newsArray, setNewsArray] = useState([])
    const [recordDateData, setRecordDateData] = useState({})


    //Calling API Based on Which of the Featured Stocks they Selected

    useEffect(() => {
        //QUOTE DATA

        let url = `https://cloud.iexapis.com/stable/stock/${props.selectedStock}/quote?token=sk_55c776d814304653a39d9ba6b3efcd03`
        axios.get(url)
        .then((res) => {
            setQuoteData(res.data)
        })
        .catch((error) => {
            console.log(error)
        })

        //DIVIDEND DATA
        url = `https://cloud.iexapis.com/stable/stock/${props.selectedStock}/dividends?token=sk_55c776d814304653a39d9ba6b3efcd03`
        axios.get(url)
        .then((res) => {
            setDivData(res.data[0])
        })
        .catch((error) => {
            console.log(error)
        })
    }, [])
    

    // //DIVIDEND DATA
    // url = `https://cloud.iexapis.com/stable/stock/${props.selectedStock}/dividends?token=sk_55c776d814304653a39d9ba6b3efcd03`
    // axios.get(url).then(function (response){
    //     setDivData(response.data[0])
    // }).catch(function (error){
    //     console.log(error)
    // })
    // console.log(divData)

    // const recordDateFormatted = divData.recordDate.replace(/-/g, '')
    // console.log(recordDateFormatted)

    // //CALCULATING DIV % BASED ON CLOSING PRICE ON RECORD DATE
    // url = `https://cloud.iexapis.com/stable/stock/${props.selectedStock}/chart/date/${recordDateFormatted}?token=sk_55c776d814304653a39d9ba6b3efcd03`
    // axios.get(url).then(function (response){
    //     setRecordDateData(response.data)
    // }).catch(function (error){
    //     console.log(error)
    // })
    
    // const div_percent = ((divData.amount / recordDateData.close) * 100).toFixed(2)

    // //NEWS DATA (NEEDS TO BE ENGLISH ARTICLES)
    // axios.get(`https://cloud.iexapis.com/stable/stock/${props.selectedStock}/news/last/{50}?token=sk_55c776d814304653a39d9ba6b3efcd03`).then(function (response){
    //     setNewsArray(response.data.filter(article => article.lang == 'en'))
    // }).catch(function (error){
    //     console.log(error)
    // })

    return (
        <div>
            <h2>{quoteData.latestPrice}</h2>
            {/* <h1>{props.selectedStock}</h1>
            <div style={{margin: "20px auto"}}>
                <h4>Price: ${quote_data.latestPrice}</h4>
                <h4>Change:{quote_data.changePercent}%</h4>
                <h4>52-Week High: ${quote_data.week52High}</h4>
                <h4>52-Week Low: ${quote_data.week52Low}</h4>
            </div>
            <div style={{margin: "20px auto"}}>
                <h4>Last Div Payment: ${div_data.amount} ({div_percent})</h4>
                <h4>Payment Date: {div_data.paymentDate}</h4>
                <h4>Record Date: {div_data.recordDate}</h4>
                <h4>Close Price on Record Date:{recordDate_data.close}</h4>
            </div>
            <div className="articles_container" style={{margin: "20px auto"}}>
                {news_array.slice(0, 5).map(article => {
                    return (
                        <div className="article">
                            <a href={article.url} >
                                <h2>{article.headline}</h2>
                                <h3>{article.source}</h3>
                            </a>
                        </div>
                    ) 
                })}
            </div> */}
        </div>
    )
}
