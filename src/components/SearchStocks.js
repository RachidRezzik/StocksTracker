import React, {useState, useEffect} from 'react'
import axios from "axios"

//Components
import FeaturedStockPrice from './FeaturedStockPrice'

export default function SearchStocks(props) {
    const userInput = React.createRef()
    const [stock, setStock] = useState("")
    const [logo, setLogo] = useState("")
    const [notFound, setNotFound] = useState("") 
    
    const handleStockSearch = (event) => {
        event.preventDefault()

        let url = `https://cloud.iexapis.com/stable/stock/${userInput.current.value.toUpperCase()}/quote?token=sk_3e722d9cee6c4ae498d5e8ad9f543015`
        
        //Quote Data
        axios.get(url)
        .then((res) => {
            if (res.data.latestPrice !== undefined){
                setStock(res.data)
            }
        })
        .catch((error) => {
            setNotFound(userInput.current.value)
            console.log(error)
        })

        //LOGO DATA
        url = `https://cloud.iexapis.com/stable/stock/${userInput.current.value.toUpperCase()}/logo?token=sk_3e722d9cee6c4ae498d5e8ad9f543015`
        axios.get(url)
        .then((res) => {
            setLogo(res.data.url)
        })
        .catch((error) => { 
            console.log(error)
        }) 
    }

    useEffect(() => {
        let handler = (event) => {
            if (!node.current.contains(event.target) && event.target.id !== "search_stocks_icon") {
                props.handleSearchClose()
            }
        }
        document.addEventListener('mousedown', handler)

        return () => {
            document.removeEventListener('mousedown', handler)
        }
    }, [props.handleSearchClose])

    const node = React.useRef()

    return (
        <div ref={node} className={props.searchOpen ? "search_container active" : "search_container"}>    
            <form onSubmit={handleStockSearch}>
                <span id="search_span">Search Stock:</span>
                <input id="stock_input" type="text" autoComplete="off" ref={userInput} placeholder="Input Ticker Symbol" />
                <input id="stock_submit" type="submit" value="Get Quote" />
            </form>
            {stock !== "" ? 
                <div className="featured_stock" id="searched_stock">
                    <div className="featured_stock_flex"> 
                        <div className="logo_ticker"> 
                            <div className="image_container">
                                <img src={logo} alt="" />
                            </div>
                            <div className="stock_name_container">
                                <p>{stock.symbol}</p>
                                <h4 style={{textTransform: "uppercase"}}>{stock.companyName}</h4>
                            </div>
                        </div>
                        <FeaturedStockPrice
                        userPositions={props.userPositions}
                        stock={stock.symbol}
                        handleStockClick={props.handleStockClick}
                        handlePositionClick={props.handlePositionClick}
                        handleSearchClose={props.handleSearchClose}
                        />
                    </div>
                </div>        
                : notFound !== "" ? <h3 id="stock_error">Sorry, "{notFound}" Was Not Found..</h3> : ""
                }     
        </div>
    )
}
