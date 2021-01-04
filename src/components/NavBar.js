import React from 'react'
import {NavLink} from 'react-router-dom'

//Images
import logo from '../images/RR_finance.JPG'

export default function NavBar() {
    return (
        <div className="navbar">
            <div className="logo_container">
                <img src={logo} alt="" />
            </div>
            <div className="links_container">
                <NavLink to="/">Positions</NavLink>
                <NavLink to="/">Search Stocks</NavLink>
            </div>
        </div>
    )
}
