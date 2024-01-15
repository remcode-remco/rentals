import { AppContext, RentalsContext } from "./Home.tsx"
import { useContext } from "react"
import Heading1 from "./shared/Heading1.tsx"
import EditPicture from "./shared/EditPicture.tsx"

export interface TextHero {
  title: string;
  subtitle: string;
}

const Hero = ({content,scrolledHalfway,doneLoading}:{content?:TextHero,scrolledHalfway:boolean,doneLoading:boolean}) => {
  const contextValue = useContext(RentalsContext)
  const { password } = contextValue as AppContext

  return (
    <section className="relative h-screen overflow-hidden flex items-center lg:items-end">
      <div className={`fixed top-0 bottom-0 left-0 right-0 inset-0 ${doneLoading ? "opacity-100 transition transform duration-500" : "opacity-0"}`}>
        <img  src="images/hero.jpg" 
              alt="Background Image" 
              className={`object-cover w-full h-full`} 
              onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                const target = e.target as HTMLImageElement;
                target.src = "/images/img_placeholder.png";
              }}
        />
        {password && <EditPicture section={1} />}
      </div>
      
      <div className="relative flex flex-col justify-center lg:justify-end items-center lg:items-start text-center lg:text-left">
        <Heading1 doneLoading={doneLoading} scrolledHalfway={scrolledHalfway} text={content?.title} subtext={content?.subtitle} />
      </div>
    </section>
  )
}

export default Hero
