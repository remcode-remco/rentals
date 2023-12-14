const IconPlus = ({size,color,handleIconClick}:{size:string,color:string,handleIconClick:()=>void}) => {
  return (
    <svg onClick={handleIconClick} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1" stroke="currentColor" width={size} height={size} className={`${color}`}>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"/>
    </svg>
  )
}

export default IconPlus
