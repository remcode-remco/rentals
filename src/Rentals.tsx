import { useState, TouchEventHandler } from "react"
import Heading2 from "./shared/Heading2"
import Paragraph from "./shared/Paragraph"
import Rental, { TextRental } from "./Rental"

export interface TextRentals {
  title:string;
  subtitle: string;
  rentals: [ TextRental ]
}

const Rentals = ({content,setLockScroll}:{content:TextRentals,setLockScroll:(lockScroll:boolean)=>void}) => {
  const [showRental, setShowRental] = useState<number|null>(null)
  const [touchStartX, setTouchStartX] = useState<number|null>(null)
  const [touchEndX, setTouchEndX] = useState<number|null>(null)
  const [touchStartY, setTouchStartY] = useState<number|null>(null)
  const [touchEndY, setTouchEndY] = useState<number|null>(null)

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

  if (content) {
    return (
      <section>
        <div
          className="mx-auto max-w-screen-xl px-4 py-8 sm:py-12 sm:px-6 lg:py-16 lg:px-8 bg-green-200"
        >
          <div className="grid grid-cols-1 gap-2">
            <Heading2 text={content.title} />
            <Paragraph text={content.subtitle} />
          </div>
          <div className="mt-2 grid lg:grid-cols-2">
            {content.rentals.map((rental: TextRental,index:number)=>(
              <div key={index} onClick={()=>{setShowRental(index);setLockScroll(true)}}>
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
}

export default Rentals