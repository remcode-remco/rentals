import { useState, useContext, forwardRef, useEffect } from "react"
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
  prices_text: string;
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
  
  const [evenNoOfRentals] = useState<boolean>(content && content.rentals ? (content.rentals.length % 2) === 0 : false)
  
  const navigate = useNavigate()
  const location = useLocation()
  
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
      <div className="relative md:shadow-lg md:rounded bg-gray-100 w-full h-full relative px-5 pt-16 lg:pt-24">
        <div className="relative grid md:grid-cols-1 gap-2 px-2">
          <Heading2 text={content?.title} />
          <Paragraph text={content?.text} />
          {password && <Edit section={4} />}
        </div>
        <div className={`grid gap-4
                          ${evenNoOfRentals || content && content.rentals.length < 4 ? "md:grid-cols-2 lg:grid-cols-3" : "md:grid-cols-3"}`}
        >
          {content?.rentals.map((rental: TextRental,index:number)=>(
            <div className={`h-full bg-gray-50 ${rental === content.rentals[content.rentals.length-1] && !evenNoOfRentals && ""}`} key={index} 
                  onClick={()=>{!password && handleClickRental(index)}}
            >
              <RentalOverview index={index} rental={rental} overview={true} />
            </div>
          ))}
        </div>
        <div className={`
                          z-20 fixed bottom-0 left-0 right-0 bg-white py-4 transition-transform transform h-screen
                          ${showRental !== null ? 'translate-x-0' : 'translate-x-full'}
                        `}
        >
          <div className="overflow-y-auto h-full px-4">
            {showRental !== null && <Rental rental={content?.rentals[showRental]} index={showRental} content_prices={{title:content?.prices,text:content?.prices_text}} text_availability={content?.availability} />}
          </div>
        </div>
      </div>
    </section>
  )
}

export default forwardRef(Rentals)