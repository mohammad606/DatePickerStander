const ArrowMonthIcon = ({style,onClick}:{style?:any,onClick?:any}) => {

    return (
        <svg xmlns="http://www.w3.org/2000/svg" className={'arrowMonthIcon'} style={style} onClick={onClick} viewBox="0 0 24 24">
            <path
                d="M12.727 3.687a1 1 0 1 0-1.454-1.374l-8.5 9a1 1 0 0 0 0 1.374l8.5 9.001a1 1 0 1 0 1.454-1.373L4.875 12z"/>
        </svg>
    )
}

export default ArrowMonthIcon