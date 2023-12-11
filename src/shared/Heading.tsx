import IconPencil from "./IconPencil"

const Heading = ({text,password}:{text:string,password:string}) => (
  <h2 className="text-3xl font-bold sm:text-4xl">
    {text}
    {password && password.length > 0 && <IconPencil size={"8"} color={"text-black"} />}
  </h2>
)

export default Heading