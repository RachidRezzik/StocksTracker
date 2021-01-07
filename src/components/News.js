import React, { useState } from 'react'
import Article from './Article'

//components


export default function News(props) {

    //Randomly Picking the Order of News Containing the Featured Stocks
    let shuffled = props.featuredStocks
    
    for(let i = shuffled.length - 1; i > 0; i--){
        const j = Math.floor(Math.random() * i)
        const temp = shuffled[i]
        shuffled[i] = shuffled[j]
        shuffled[j] = temp
    }

    let key_num = 0

    return (
        <div className="news">
            <div className="featuredSection">
                <Article
                    featured={true}
                    stock={shuffled[0].ticker}
                    key={0}
                />
            </div>
            <div className="other_articles">
                {shuffled.slice(1).map(stock => {
                    key_num++
                    return (
                        <Article
                        featured={false}
                        stock={stock.ticker}
                        key={key_num}
                        />
                    )
                })}
            </div>
        </div>
    )
}
