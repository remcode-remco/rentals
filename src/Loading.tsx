import { useEffect, useState } from "react"

const Loading = ({showLoading,setLockScroll}:{showLoading:boolean,setLockScroll:(lockScroll:boolean)=>void}) => {
  const [classes,setClasses] = useState<string>("")

  useEffect(()=>{
    if (showLoading) {
      setLockScroll(true)
      setClasses("z-50 fixed top-0 bottom-0 right-0 left-0 bg-yellow-500/50 translate-y-0 flex items-center justify-center opacity-100 transition-opacity")
    } else {
      setLockScroll(false)
      setClasses("fixed top-0 bottom-0 right-0 left-0 bg-red-500 translate-y-full opacity-0")
    }
  },[showLoading])

  return (
    <div className={classes}>
      <div
        className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
        role="status">
        <span
          className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
          >Loading...</span>
      </div>
    </div>
  )
}

export default Loading