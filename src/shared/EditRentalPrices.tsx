import { useContext, useEffect } from "react"
import { RentalsContext, AppContext } from "../Home"

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
    <div className="mt-3 p-3 bg-white border border-green-800 shadow shadow-green-800 rounded text-xl text-center">
    <table className="p-2 w-full divide-y divide-gray-200">
      <thead>
        <tr>
          <th>
            Start/End<br />
            { language === "fr" || language === "nl" ?
              "(dd/mm/yyyy)"
              :
              "(mm/dd/yyyy)"
            }
          </th>
          <th>Price</th>
          <th></th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-200">
        {dates.map((date, index) => (
          <tr key={index}>
            <td className="w-2/6 px-1 py-2 whitespace-nowrap text-center" onClick={()=>setShowDatePicker(index)}>
              {showDatePicker === index ?
                <DatePicker locale={language} autoFocus={true} openToDate={new Date(date)} selected={startDate} onCalendarClose={()=>setShowDatePicker(-1)} onChange={(d) => d ? handleChangeDate(d,index) : null} />
              :
              new Intl.DateTimeFormat(language, { day: '2-digit', month: '2-digit', year: 'numeric' }).format(new Date(date))
              }
            </td>
            <td className="px-1 py-2 whitespace-nowrap">
              {showPriceInput === index ?
                <input 
                  onChange={(e) => handleChangePrice(e, index)} 
                  name="price" 
                  type="number"
                  defaultValue={prices[index] ? prices[index] : 0} 
                  className="p-1 rounded border border-green-800 shadow shadow-green-800 w-full text-gray-800 focus:shadow-lg mb-1 text-center"
                />
              :
                <span className="w-full mb-1" onClick={()=>setShowPriceInput(index)}>{prices[index] ? prices[index] : 0}</span>
              }
            </td>
            <td>
              {index === dates.length -1 &&
                <div className="flex gap-3">          
                    <div onClick={()=>removeDate()} className=''>
                      <IconGarbage size={40} color={"hover:bg-red-300 text-black"} />
                    </div>
                  <IconPlus size={40} color={""} handleIconClick={()=>addDate()} />
                </div>
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