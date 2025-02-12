import React from 'react'
import './styles.css'

function Button({ text, onClick, blue,disabled,style }) {
    return (
        <div style={style} disabled={disabled} className={blue ? 'btn btn-blue' : 'btn'} onClick={onClick}>{text}</div>
    )
}

export default Button