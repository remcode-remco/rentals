import { useContext } from "react"
import { RentalsContext, AppContext } from "./Home"
import IconAdmin from "./shared/icons/IconAdmin"

const Footer = ({showAdmin,setShowAdmin}:{showAdmin:boolean,setShowAdmin:(showAdmin:boolean)=>void}) => {   
	const contextValue = useContext(RentalsContext)
  const { password } = contextValue as AppContext

	return (
		<footer className="relative bg-white block">
			<div className="w-full h-10 bg-green-200 text-green-800 opacity-80 flex items-center justify-center gap-2 text-md">
				{!password && <IconAdmin showAdmin={showAdmin} setShowAdmin={setShowAdmin} size={"30"} color={"text-black"} /> }
				RentalsTemplate v1.0
			</div>
		</footer>
	)
}

export default Footer