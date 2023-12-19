const IconArrowDown = ({size,color,handleIconClick}:{size:number,color:string,handleIconClick:()=>void}) => {
  return (
    <svg onClick={handleIconClick} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1" stroke="currentColor" width={size} height={size} className={`${color}`}>
        <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 5.25 7.5 7.5 7.5-7.5m-15 6 7.5 7.5 7.5-7.5" />
    </svg>
  )
}

export default IconArrowDown
