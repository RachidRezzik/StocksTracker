import React, {useState, useEffect} from 'react'
import axios from 'axios'

export default function Article(props) {
    const [isLoading, setLoading] = useState(true)
    const [featuredArticle, setFeaturedArticle] = useState("")
    const [featuredArticleHeadline, setFeaturedArticleHeadline] = useState("")

    useEffect(() => {
        //News Articles (In English)
        let url = `https://cloud.iexapis.com/stable/stock/${props.stock}/news/last/{100}?token=sk_3e722d9cee6c4ae498d5e8ad9f543015`
        axios.get(url)
        .then((res) => {
            let article = res.data.filter(article => article.lang === 'en')[0]
            setFeaturedArticleHeadline(article.headline)
            setFeaturedArticle(article)
        })
        .catch((error) => {
            console.log(error)
        })
        setLoading(false)
    }, [props.stock]);
    
    if (isLoading && featuredArticle.headline === undefined){
        return (
            <h2>Loading...</h2>
        )
    } else if (!isLoading){
        return (
            <div>
                {props.featured ? 
                <a href={featuredArticle.url} >
                    <img className="featured_image" src={featuredArticle.image} alt="" />
                    <div className="headline_info">
                        <h2>{featuredArticleHeadline}</h2>
                        <h4>{featuredArticle.source}</h4>
                    </div>
                </a>
                :
                <a className="home_article" href={featuredArticle.url} target="_blank" rel="noreferrer">
                    <h2>
                    {featuredArticleHeadline}
                    </h2>
                    <h4>{featuredArticle.source}</h4>
                </a>
                }
            </div>
        )
    }
}
