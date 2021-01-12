import React from 'react'
import {Link} from 'react-router-dom'

//Images
import logo from '../images/RR_finance.JPG'

export default function Footer() {
    const handleLogoClick = () => {
        window.scrollTo({
            top: 0
        })
    }

    return (
        <div className="footer">
            <Link to="/" onClick={handleLogoClick}>
                <div className="footer_left">
                    <img src={logo} alt=""/>
                </div>        
            </Link>
            <div className="footer_right">
                <h4>Copyright 2021 RR FINANCE LLC. All Rights Reserved.</h4>
            </div>            
        </div>
    )
}
