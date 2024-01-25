import { useState, useContext, forwardRef } from "react"
// import { useLocation, useNavigate } from 'react-router-dom'
import Heading2 from "./shared/Heading2"
import Paragraph from "./shared/Paragraph"
import Rental, { TextRental } from "./Rental"
import Edit from "./shared/Edit"
import { RentalsContext, AppContext } from "./Home"
import RentalOverview from "./RentalOverview"
import { Link } from "react-router-dom"

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
  setScrollPosition:(scrollPosition:number)=>void;
}

const Rentals: React.ForwardRefRenderFunction<HTMLDivElement, RentalsProps> = ({ content, setScrollPosition }, ref) => {
  const contextValue = useContext(RentalsContext)
  const { password, showRental, setShowRental, setLockScroll } = contextValue as AppContext
  
  const [evenNoOfRentals] = useState<boolean>(content && content.rentals ? (content.rentals.length % 2) === 0 : false)
  
  // const navigate = useNavigate()
  // const location = useLocation()
  
  const handleClickRental = (index:number) => {
    setShowRental(index)
    setScrollPosition(window.scrollY)
    setLockScroll(true)
  }
  
  return (
    <section ref={ref}>
      <div className="relative bg-gray-50 w-full">
        <div className="max-w-6xl xl:mx-auto px-5 pt-16 lg:pt-24">
          <div className="relative grid md:grid-cols-1 gap-2 px-2">
            <Heading2 text={content?.title} />
            <Paragraph text={content?.text} />
            {password && <Edit section={4} />}
          </div>
          <div className={`grid gap-4 pb-3
                            ${evenNoOfRentals || content && content.rentals.length < 4 ? "grid-cols-2 md:grid-cols-3" : "md:grid-cols-3"}`}
          >
            {content?.rentals.map((rental: TextRental,index:number)=>(
              <div className={`h-full ${rental === content.rentals[content.rentals.length-1] && !evenNoOfRentals && ""}`} key={index} 
                    onClick={()=>{!password && handleClickRental(index)}}
              >
                <Link to='/rentaldetail'>
                  <RentalOverview index={index} rental={rental} overview={true} />
                </Link>
              </div>
            ))}
          </div>
          <div className={`
                            z-20 fixed bottom-0 left-0 right-0 bg-white lg:bg-white/90 py-4 transition-transform transform h-screen
                            ${showRental !== -1 ? 'translate-x-0' : 'translate-x-full'}
                          `}
          >
            <div className="overflow-y-auto h-full px-4">
              {showRental !== -1 && <Rental rental={content?.rentals[showRental]} index={showRental} content_prices={{title:content?.prices,text:content?.prices_text}} text_availability={content?.availability} />}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default forwardRef(Rentals)