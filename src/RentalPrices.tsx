import { AppContext, RentalsContext } from './App'
import { useContext } from 'react'

const RentalPrices = ({rentalIndex}:{rentalIndex:number}) => {
  const contextValue = useContext(RentalsContext)
  const { siteContents, language } = contextValue as AppContext

  if (siteContents) {
    return (
      <div>
        <table className="min-w-full divide-y divide-gray-200">
          <tbody className="bg-white divide-y divide-gray-200">
            {siteContents.dates.map((date, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap">{new Intl.DateTimeFormat(language, { day: '2-digit', month: 'long', year: 'numeric' }).format(new Date(date))}</td>
                <td className="px-6 py-4 whitespace-nowrap">{siteContents.rentals.rentals[rentalIndex].prices[index]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }
}

export default RentalPrices
