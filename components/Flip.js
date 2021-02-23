import React, { useState } from 'react'
import ReactCardFlip from 'react-card-flip';


export default function Flip({front, back}) {
    const[isFlipped, setIsFlipped] = useState(false);
    const handleClick = () =>{
        setIsFlipped(!isFlipped)
    }

        return (
            <ReactCardFlip isFlipped={isFlipped} flipDirection="vertical">
                <div>
                <li className = "location-front-item">
                    <h1>{front}</h1>
                    <button className="front-flip-button" onClick={handleClick}Click to Flip></button>
                </li>
                </div>
                <div>
                    <li className="location-back-item"></li>
                    <h1>{back}</h1>
                    <button className="back-flip-button" onClick={handleClick}>Click to Flip</button>
                </div>

            </ReactCardFlip>
        )
    }


