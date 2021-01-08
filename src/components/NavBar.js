import React from 'react'
import {Link} from 'react-router-dom'

//Images
import logo from '../images/RR_finance.JPG'

export default function NavBar() {
    return (
        <div className="navbar">
            <div className="logo_container">
                <Link to="/">
                    <img src={logo} alt="" />
                </Link>
            </div>
            <div className="links_container">
                <Link to="/">Positions</Link>
                <Link to="/Stocks">Search Stocks 🔍</Link>
            </div>
        </div>
    )
}
