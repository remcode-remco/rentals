import { useState, TouchEventHandler, useContext } from "react"
import Heading2 from "./shared/Heading2"
import Paragraph from "./shared/Paragraph"
import Rental, { TextRental } from "./Rental"
import Edit from "./shared/Edit";
import { RentalsContext, AppContext } from "./App";

export interface TextRentals {
  title:string;
  text: string;
  dates: string[];
  rentals: TextRental[];
}

const Rentals = ({content,setLockScroll}:{content:TextRentals,setLockScroll:(lockScroll:boolean)=>void}) => {
  const contextValue = useContext(RentalsContext)
  const { password } = contextValue as AppContext
  
  const [showRental, setShowRental] = useState<number|null>(null)
  const [touchStartX, setTouchStartX] = useState<number|null>(null)
  const [touchEndX, setTouchEndX] = useState<number|null>(null)
  const [touchStartY, setTouchStartY] = useState<number|null>(null)
  const [touchEndY, setTouchEndY] = useState<number|null>(null)
  const [evenNoOfRentals] = useState<boolean>((content.rentals.length % 2) === 0)

  // the required distance between touchStart and touchEnd to be detected as a swipe
  const minSwipeDistance = 100 

  const onTouchStart: TouchEventHandler<HTMLDivElement> = (e) => {
    const touch = e.targetTouches[0]
    if (touch) {
      setTouchEndX(null)
      setTouchStartX(touch.clientX)
      setTouchEndY(null)
      setTouchStartY(touch.clientY)
    }
  }

  const onTouchMove: TouchEventHandler<HTMLDivElement> = (e) => {
    const touch = e.targetTouches[0]
    if (touch) {
      setTouchEndX(touch.clientX)
      setTouchEndY(touch.clientY)
  
      if (Math.abs(touch.clientX) > 10) {
        e.preventDefault()
        return false
      }
    }
  }

  const onTouchEnd = () => {
    if (!touchStartX || !touchEndX || !touchStartY || !touchEndY) return
    const distanceX = touchStartX - touchEndX
    const distanceY = touchStartY - touchEndY
    const isLeftSwipe = distanceX > minSwipeDistance
    const isRightSwipe = distanceX < -minSwipeDistance
    const isDownSwipe = distanceY > minSwipeDistance
    if (isRightSwipe && Math.abs(distanceX) > distanceY) {
      // index one back
      console.log("right swipe: " + isRightSwipe)
    } 
    if (isLeftSwipe && distanceX > distanceY) {
      // index + 1
      console.log("left swipe: " + isLeftSwipe)
    }
    if (isDownSwipe && distanceY < distanceX) {
      // index + 1
      console.log("down swipe: " + isDownSwipe)
    }
  }

  return (
    <section>
      <div
        className="mx-auto max-w-screen-xl px-2 py-8 bg-green-200"
      >
        <div className="relative grid grid-cols-1 gap-2">
          <Heading2 text={content.title} />
          <Paragraph text={content.text} />
          {password && <Edit section={4} />}
        </div>
        <div className={`mt-2 grid gap-2
                          ${evenNoOfRentals || content.rentals.length < 4 ? "grid-cols-2 lg:grid-cols-4" : "grid-cols-2 lg:grid-cols-3"}`}
        >
          {content.rentals.map((rental: TextRental,index:number)=>(
            <div className={`h-full ${rental === content.rentals[content.rentals.length-1] && !evenNoOfRentals && ""}`} key={index} onClick={()=>{!password && setShowRental(index);!password && setLockScroll(true)}}>
              <Rental index={index} rental={rental} overview={true} />
            </div>
          ))}
        </div>
      </div>
      <div 
        onClick={()=>{setShowRental(null);setLockScroll(false)}} 
        className={`z-10 fixed top-0 bottom-0 left-0 right-0 transition-opacity bg-white/80 ${showRental !== null ? 'opacity-1 translate-y-0' : 'opacity-0 translate-y-full'}`}
      ></div>
      <div
        onTouchStart={onTouchStart} onTouchMove={onTouchMove} onTouchEnd={onTouchEnd}
        className={`z-20 fixed bottom-0 left-0 right-0 bg-white py-4 transition-transform transform h-[80vh]
          ${showRental !== null ? 'translate-y-0' : 'translate-y-full' }`}
      >
        <div className="overflow-y-auto h-full px-4">
          {showRental !== null && <Rental rental={content.rentals[showRental]} overview={false} index={showRental} />}
        </div>
      </div>
    </section>
  )
}

export default Rentals