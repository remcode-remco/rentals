import { useContext } from "react"
import { AppContext, RentalsContext } from "../Home"
import IconPencil from "./icons/IconPencil"

const Edit = ({section}:{section:number}) => {
  const contextValue = useContext(RentalsContext)
  const { setEditingSection } = contextValue as AppContext

  return (
    <div className="z-40 absolute left-0 bottom-0 right-0 top-0 flex items-center justify-center opacity-0 hover:opacity-100 hover:bg-green-50/40 rounded-xl hover:shadow-green-50">
      <IconPencil size={"50"} color={""} onClick={() => setEditingSection(section)} />
    </div>
  )
}

export default Edit