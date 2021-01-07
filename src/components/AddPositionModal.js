import React, {useRef, useEffect, useState} from 'react'
import {Link} from 'react-router-dom'

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
            props.handleAddPositionSubmit(props.positionStock, parseFloat(numberShares.current.value).toFixed(2), parseFloat(avgPrice.current.value).toFixed(2))
            handleModalFieldsClear()
            setPositionSubmitted(true)
        }
    }

    const handleModalFieldsClear = () => {
        const position_error = document.querySelector(".add_position_error")
        position_error.innerHTML = "no error"
        position_error.style.color = 'white'
        numberShares.current.value = ""
        avgPrice.current.value = ""
    }

    const handleModalClose = () => {
        if (positionSubmitted === false){
            handleModalFieldsClear()
        }
        props.handleModalClose()
        setPositionSubmitted(false)
    }

    const handleViewPositions = () => {
        window.scrollTo({
            top: 0
        })
        props.handleModalClose()
        setPositionSubmitted(false)
    }

    const node = useRef()

    const [currentPosition, setCurrentPosition] = useState(false)

    useEffect(() => {
        let user_positions = props.userPositions
        if (user_positions.length === 0){
            setCurrentPosition(false)
        } else if (user_positions.find(position => position.stock === props.positionStock)){
            setCurrentPosition(true)
        } else{
            setCurrentPosition(false)
        }

        let handler = (event) => {
            if (!node.current.contains(event.target) && props.positionModal) {
                handleModalClose()
                setPositionSubmitted(false)
            }
        }
        document.addEventListener('mousedown', handler)

        return () => {
            document.removeEventListener('mousedown', handler)
        }
    }, [props.userPositions, handleModalClose, props.positionModal, props.positionStock]);


    return (
        <div className={props.positionModal ? "add_position_modal active" : "add_position_modal"}>
            <img className={props.positionModal ? "exit_modal active" : "exit_modal"} src={x_mark} onClick={handleModalClose} alt=""/>
            <div ref={node} className="add_position_container">
                {positionSubmitted ? 
                <div>
                    <h2 id="position_submitted">Updated ✔️</h2>
                    <Link to="/" id="view_positions" onClick={handleViewPositions}>View Positions</Link>
                    <button id="close_button" onClick={handleModalClose}>Close</button>
                </div>
                :
                <div> 
                <h1 className="enter_position_headline">{props.positionStock}</h1>
                <form onSubmit={handlePositionSubmit}>
                    <div className="position_input_container">
                        <h4>Number of Shares:</h4>
                        <input ref={numberShares} type="number" placeholder="0.00" step=".01"/>
                    </div>
                    <div className="position_input_container">
                        <h4>Avg. Share Price ($):</h4>
                        <input ref={avgPrice} type="number" placeholder="0.00" step=".01"/>
                    </div>
                    <input className="position_submit_button" type="submit" value={currentPosition ? "Edit Position" : "Add Position"} />
                </form>
                <h3 className="add_position_error">no error</h3>
                </div>
                }              
            </div>
        </div>
    )
}
