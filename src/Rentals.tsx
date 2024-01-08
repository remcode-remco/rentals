import { useState, TouchEventHandler, useContext, forwardRef, useEffect } from "react"
import { useLocation, useNavigate } from 'react-router-dom'
import Heading2 from "./shared/Heading2"
import Paragraph from "./shared/Paragraph"
import Rental, { TextRental } from "./Rental"
import Edit from "./shared/Edit"
import { RentalsContext, AppContext } from "./Home"
import RentalOverview from "./RentalOverview"

export interface TextRentals {
  title: string;
  text: string;
  prices: string;
  availability: string;
  dates: string[];
  rentals: TextRental[];
}

interface RentalsProps {
  content?: TextRentals;
  showRental:number|null;
  setShowRental:(showRental:number|null)=>void;
  setLockScroll:(lockScroll:boolean)=>void;
}

const Rentals: React.ForwardRefRenderFunction<HTMLDivElement, RentalsProps> = ({ content,setLockScroll,showRental,setShowRental }, ref) => {
  const contextValue = useContext(RentalsContext)
  const { password } = contextValue as AppContext
  
  const [touchStartX, setTouchStartX] = useState<number|null>(null)
  const [touchEndX, setTouchEndX] = useState<number|null>(null)
  const [touchStartY, setTouchStartY] = useState<number|null>(null)
  const [touchEndY, setTouchEndY] = useState<number|null>(null)
  const [evenNoOfRentals] = useState<boolean>(content && content.rentals ? (content.rentals.length % 2) === 0 : false)
  
  const navigate = useNavigate()
  const location = useLocation()

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
  
  const handleClickRental = (index:number) => {
    setShowRental(index)
    navigate('/rentaldetail')
  }
  
  useEffect(() => {
    if (location.pathname !== '/rentaldetail') {
      setShowRental(null)
    }
  }, [location.pathname])

  return (
    <section ref={ref}>
      <div className="relative shadow-lg rounded bg-gray-100 w-full h-full relative px-5 py-16">
        <div className="relative grid grid-cols-1 gap-2 p-2">
          <Heading2 text={content?.title} />
          <Paragraph text={content?.text} />
          {password && <Edit section={4} />}
        </div>
        <div className={`m-2 grid gap-4
                          ${evenNoOfRentals || content && content.rentals.length < 4 ? "grid-cols-2 lg:grid-cols-4" : "grid-cols-2 lg:grid-cols-3"}`}
        >
          {content?.rentals.map((rental: TextRental,index:number)=>(
            <div className={`h-full bg-gray-50 ${rental === content.rentals[content.rentals.length-1] && !evenNoOfRentals && ""}`} key={index} 
                  onClick={()=>{!password && handleClickRental(index)}}
            >
              <RentalOverview index={index} rental={rental} overview={true} />
            </div>
          ))}
        </div>
        <div 
          onClick={()=>{setShowRental(null);setLockScroll(false)}} 
          className={`z-10 fixed top-0 bottom-0 left-0 right-0 transition-opacity bg-white/80 ${showRental !== null ? 'opacity-1 translate-y-0' : 'opacity-0 translate-y-full'}`}
        ></div>
        <div
          onTouchStart={onTouchStart} onTouchMove={onTouchMove} onTouchEnd={onTouchEnd}
          className={`z-20 fixed bottom-0 left-0 right-0 bg-white py-4 transition-transform transform h-screen
            ${showRental !== null ? 'translate-x-0' : 'translate-x-full' }`}
        >
          <div className="overflow-y-auto h-full px-4">
            {showRental !== null && <Rental rental={content?.rentals[showRental]} index={showRental} text_prices={content?.prices} text_availability={content?.availability} />}
          </div>
        </div>
      </div>
    </section>
  )
}

export default forwardRef(Rentals)