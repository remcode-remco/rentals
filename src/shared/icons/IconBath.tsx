const IconBath = ({size,color}:{size:string,color:string}) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1" stroke="currentColor" width={size} height={size} className={`${color}`}>
      <path d="M5 5h14v14H5z"></path>
      <path d="M17 10H7v8a2 2 0 002 2h6a2 2 0 002-2v-8z"></path>
      <path d="M16 1v3M8 1v3M3 9h18"></path>
    </svg>
  
  )
}

export default IconBath