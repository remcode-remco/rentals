import { useContext, useEffect } from "react"
import { RentalsContext, AppContext } from "../App"

import { useState } from "react"
import DatePicker, { registerLocale } from "react-datepicker"

import "react-datepicker/dist/react-datepicker.css"
import fr from 'date-fns/locale/fr'
import en from 'date-fns/locale/en-GB'
import nl from 'date-fns/locale/nl'
import { TextRentals } from "../Rentals"
import IconGarbage from "./icons/IconGarbage"
import IconPlus from "./icons/IconPlus"

const EditRentalPrices = ({dates,prices,setChanges,editingRental}:{dates:string[],prices:number[],setChanges:(changes:any)=>void,editingRental:number}) => {
  const contextValue = useContext(RentalsContext)
  const { language } = contextValue as AppContext

  const [startDate, setStartDate] = useState(new Date())
  const [showDatePicker, setShowDatePicker] = useState<number>(-1)
  const [showPriceInput, setShowPriceInput] = useState<number>(-1)

  useEffect(()=>{
    if (language === "fr") {
      registerLocale('fr', fr)
    } else if (language === "nl") {
      registerLocale('nl', nl)
    } else {
      registerLocale('en', en)
    }
  },[language])

  const handleChangePrice = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const value = e.target.value
    
    setChanges((prevChanges: TextRentals) => ({
      ...prevChanges,
      rentals: prevChanges.rentals.map((rental, i) =>
        i === editingRental
          ? {
              ...rental,
              prices: rental.prices.map((price, j) =>
                j === index ? value : price
              ),
            }
          : rental
      ),
    }))
  }
  
  const handleChangeDate = (value:Date,index:number) => {
    setStartDate(value)
    const year = value.getFullYear()
    const month = String(value.getMonth() + 1).padStart(2, '0')
    const day = String(value.getDate()).padStart(2, '0')
    
    const dateAsString:string = `${year}/${month}/${day}`
    setChanges((prevChanges:TextRentals) => ({
      ...prevChanges,
      dates: prevChanges.dates.map((currentDate, i) =>
        i === index ? dateAsString : currentDate
      ),
    }))
  }

  const addDate = () => {
    setChanges((prevChanges: TextRentals) => {
      const lastDate = prevChanges.dates[prevChanges.dates.length - 1]
      const newDate = new Date(lastDate)
      newDate.setDate(newDate.getDate() + 1)
    
      const dateAsString = `${newDate.getFullYear()}/${String(newDate.getMonth() + 1).padStart(2, '0')}/${String(newDate.getDate()).padStart(2, '0')}`
    
      return {
        ...prevChanges,
        dates: [...prevChanges.dates, dateAsString],
      }
    })
  }

  const removeDate = () => {
    setChanges((prevChanges: TextRentals) => {
      if (prevChanges.dates.length > 1) {
        return {
          ...prevChanges,
          dates: prevChanges.dates.slice(0, -1),
        }
      }
    
      return prevChanges
    })
  }
  
  return (
    <div>
    <table className="min-w-full divide-y divide-gray-200">
      <thead>
        <tr>
          <th></th>
          <th>
            Start/End<br />
            { language === "fr" || language === "nl" ?
              "(dd/mm/yyyy)"
              :
              "(mm/dd/yyyy)"
            }
          </th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {dates.map((date, index) => (
          <tr key={index}>
            <td>
              {index === dates.length -1 &&
                <>          
                    <div onClick={()=>removeDate()} className=''>
                      <IconGarbage size={20} color={"hover:bg-red-300 text-black"} />
                    </div>
                  <IconPlus size={20} color={""} handleIconClick={()=>addDate()} />
                </>
              }
            </td>
            <td className="px-6 py-4 whitespace-nowrap" onClick={()=>setShowDatePicker(index)}>
              {showDatePicker === index ?
                <DatePicker locale={language} autoFocus={true} openToDate={new Date(date)} selected={startDate} onChange={(d) => d ? handleChangeDate(d,index) : null} />
              :
              new Intl.DateTimeFormat(language, { day: '2-digit', month: '2-digit', year: 'numeric' }).format(new Date(date))
              }
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              {showPriceInput === index ?
                <input 
                  onChange={(e) => handleChangePrice(e, index)} 
                  name="price" 
                  type="number"
                  defaultValue={prices[index] ? prices[index] : 0} 
                  className="my-2 p-1 border shadow w-full" 
                />
              :
                <span onClick={()=>setShowPriceInput(index)}>{prices[index] ? prices[index] : 0}</span>
              }
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
  )
}

export default EditRentalPrices