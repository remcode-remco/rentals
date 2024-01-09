import { AppContext, RentalsContext } from './Home'
import { useContext } from 'react'

const RentalPrices = ({rentalIndex}:{rentalIndex:number}) => {
  const contextValue = useContext(RentalsContext)
  const { siteContents, language } = contextValue as AppContext

  if (siteContents) {
    return (
      <div className='max-w-lg mx-auto'>
        <table className="text-gray-600 text-xl md:text-3xl lg:text-2xl min-w-full divide-y divide-gray-200">
          <tbody className="bg-white divide-y divide-gray-200">
            {siteContents.rentals.dates.map((date, index) => (
              index !== siteContents.rentals.dates.length-1 &&
                <tr key={index}>
                  <td className="px-3 py-4 whitespace-nowrap">
                    {new Intl.DateTimeFormat(language, { day: '2-digit', month: 'long' }).format(new Date(date))}
                    <span> - </span>
                    {new Intl.DateTimeFormat(language, { day: '2-digit', month: 'long', year: 'numeric' }).format(new Date(siteContents.rentals.dates[index+1]))}
                  </td>
                  <td className="px-3 py-4 whitespace-nowrap">{siteContents.rentals.rentals[rentalIndex].prices[index]}</td>
                </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }
}

export default RentalPrices
