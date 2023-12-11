const Bed = ({size,color}:{size:string,color:string}) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1" stroke="currentColor" width={size} height={size} className={`${color}`}>
      <path d="M3 8h12v10H3z"></path>
      <path d="M1 3h16v5H1z"></path>
    </svg>
  
  )
}

export default Bed