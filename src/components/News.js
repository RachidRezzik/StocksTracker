import React, {useState, useEffect} from 'react'
import axios from 'axios'

export default function News(props) {
    const [isLoading, setLoading] = useState(true)
    const [stock1, setStock1] = useState({})
    const [stock2, setStock2] = useState({})
    const [stock3, setStock3] = useState({})
    const [stock4, setStock4] = useState({})
    const [stock5, setStock5] = useState({})

    useEffect(() => {
        let newArray = []
        props.featuredStocks.forEach(stock => {
            //News Articles (In English)
            let url = `https://cloud.iexapis.com/stable/stock/${stock.ticker}/news/last/{100}?token=sk_3e722d9cee6c4ae498d5e8ad9f543015`
            axios.get(url)
            .then((res) => {
                let articleRes = res.data.filter(article => article.lang === 'en')[0]
                newArray.push({
                    url: articleRes.url,
                    headline: articleRes.headline,
                    image: articleRes.image,
                    datetime: articleRes.datetime,
                    source: articleRes.source
                })
                if (newArray.length >= 2) {
                    newArray.sort((a,b) => b.datetime - a.datetime)
                } 
                if (newArray.length === 5) {
                    setStock1(newArray[0])
                    setStock2(newArray[1])
                    setStock3(newArray[2])
                    setStock4(newArray[3])
                    setStock5(newArray[4])
                }
            })
            .catch((error) => {
                console.log(error)
            })
        })
        setLoading(false)
    }, [props.featuredStocks]);


    if (isLoading){
        return(
            <h2>Loading News..</h2>
        )
    } else{
        return (
            <div className="news">            
                <div className="featuredSection">
                    {stock1 === undefined ? 
                    <h2>undefined</h2>
                    :
                    <a href={stock1.url} target="_blank" rel="noreferrer">
                        <img className="featured_image" src={stock1.image} alt="" />
                        <div className="headline_info">
                            <h2>{stock1.headline}</h2>
                            <h4>{stock1.source}</h4>
                        </div>
                    </a>

                    }
                </div>
                <div className="other_articles">
                    <a className="home_article" href={stock2.url} target="_blank" rel="noreferrer">
                        <h2>
                        {stock2.headline}
                        </h2>
                        <h4>{stock2.source}</h4>
                    </a>
                    <a className="home_article" href={stock3.url} target="_blank" rel="noreferrer">
                        <h2>
                        {stock3.headline}
                        </h2>
                        <h4>{stock3.source}</h4>
                    </a>
                    <a className="home_article" href={stock4.url} target="_blank" rel="noreferrer">
                        <h2>
                        {stock4.headline}
                        </h2>
                        <h4>{stock4.source}</h4>
                    </a>
                    <a className="home_article" href={stock5.url} target="_blank" rel="noreferrer">
                        <h2>
                        {stock5.headline}
                        </h2>
                        <h4>{stock5.source}</h4>
                    </a> 
                </div>
            </div>
        )
    }
}
