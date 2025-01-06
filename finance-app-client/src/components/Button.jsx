

function Button({ children, bgColor, textColor, hover, className, onClick, idform, form = false, disabled = false, }) {

    if (form) {
        return <button id={idform} type="submit" className={`font-semibold rounded-lg  ${className}  ${bgColor} ${textColor} ${hover} transition-all`} disabled={disabled} onClick={onClick}>
            {children}
        </button>
    }


    return (
        <button type="button" className={`font-semibold rounded-lg  ${className}  ${bgColor} ${textColor} ${hover} transition-all`} disabled={disabled} onClick={onClick}>
            {children}
        </button>
    )
}

export default Button
