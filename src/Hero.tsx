import { AppContext, RentalsContext } from "./App.tsx"
import Edit from "./shared/Edit.tsx"
import HeroImageEdit from "./HeroImageEdit.tsx";
import { useContext } from "react";
import Heading1 from "./shared/Heading1.tsx";

export interface TextHero {
  title: string;
  subtitle: string;
}

const Hero = ({content,scrolledHalfway}:{content:TextHero,scrolledHalfway:boolean}) => {
  const contextValue = useContext(RentalsContext)

  const { password } = contextValue as AppContext
  
  return (
    <div className="relative h-screen overflow-hidden">
      <div className="absolute inset-0">
        <img src="images/hero.jpg" alt="Background Image" className="object-cover object-center w-full h-full" />
        {password && <HeroImageEdit section={2} />}
      </div>
      
      <div className="relative z-10 flex flex-col justify-center items-center h-full text-center">
        <Heading1 scrolledHalfway={scrolledHalfway} text={content.title} subtext={content.subtitle} />
        {password && <Edit section={2} />}
      </div>
    </div>
  )
}

export default Hero
