import React, {useRef, useEffect, useState} from 'react'

//Images
import x_mark from '../images/white_x_mark.png'

export default function AddPositionModal(props) {
    const numberShares = React.useRef()
    const avgPrice = React.useRef()
    const [positionSubmitted, setPositionSubmitted] = useState(false)
    
    const handlePositionSubmit = () => {
        const position_error = document.querySelector(".add_position_error")

        if (numberShares.current.value === "" || avgPrice.current.value === ""){
            position_error.innerHTML = "Please Fill Both Fields"
            position_error.style.color = 'red'
        } else if (numberShares.current.value <= 0 || avgPrice.current.value <= 0) {
            position_error.innerHTML = "Fields Must be Positive Numbers"
            position_error.style.color = 'red'
        } else{
            position_error.innerHTML = "Position Successfully Added"
            position_error.style.color = 'green'
            props.handleAddPositionSubmit(props.positionStock, numberShares.current.value, avgPrice.current.value)
            setPositionSubmitted(true)
        }
    }

    const handleModalClose = () => {
        props.handleModalClose()
        setPositionSubmitted(false)
    }

    const node = useRef()

    useEffect(() => {
        let handler = (event) => {
            if (!node.current.contains(event.target) && props.positionModal) {
                props.handleModalClose()
                setPositionSubmitted(false)
            }
        }
        document.addEventListener('mousedown', handler)

        return () => {
            document.removeEventListener('mousedown', handler)
        }
    });


    return (
        <div className={props.positionModal ? "add_position_modal active" : "add_position_modal"}>
            <img className={props.positionModal ? "exit_modal active" : "exit_modal"} src={x_mark} onClick={handleModalClose} alt=""/>
            <div ref={node} className="add_position_container">
                {positionSubmitted ? 
                <h2 id="position_submitted">Position Submitted ✔️</h2>
                :
                <div> 
                <h1 className="enter_position_headline">Enter Your Current Position for {props.positionStock}</h1>
                <form onSubmit={handlePositionSubmit}>
                    <div className="position_input_container">
                        <h4>Number of Shares:</h4>
                        <input ref={numberShares} type="text" />
                    </div>
                    <div className="position_input_container">
                        <h4>Avg. Share Price ($):</h4>
                        <input ref={avgPrice} type="text" />
                    </div>
                    <input className="position_submit_button" type="submit" value="Add to Your Positions" />
                </form>
                <h3 className="add_position_error">dgfdg</h3>
                </div>
                }              
            </div>
        </div>
    )
}
