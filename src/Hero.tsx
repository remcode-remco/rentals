import { AppContext, RentalsContext } from "./Home.tsx"
import Edit from "./shared/Edit.tsx"
import HeroImageEdit from "./HeroImageEdit.tsx";
import { useContext } from "react";
import Heading1 from "./shared/Heading1.tsx";

export interface TextHero {
  title: string;
  subtitle: string;
}

const Hero = ({content,scrolledHalfway,doneLoading}:{content?:TextHero,scrolledHalfway:boolean,doneLoading:boolean}) => {
  const contextValue = useContext(RentalsContext)

  const { password } = contextValue as AppContext
  
  return (
    <section className="relative h-screen overflow-hidden">
      <div className={`fixed top-0 inset-0 ${doneLoading ? "opacity-100 transition transform duration-500" : "opacity-0"}`}>
        <img src="images/hero.jpg" alt="Background Image" className={`object-cover object-center w-full h-full`} />
        {password && <HeroImageEdit section={2} />}
      </div>
      
      <div className="relative z-10 flex flex-col justify-center lg:justify-end items-center lg:items-start h-full text-center lg:text-left">
        <Heading1 doneLoading={doneLoading} scrolledHalfway={scrolledHalfway} text={content?.title} subtext={content?.subtitle} />
        {password && <Edit section={2} />}
      </div>
    </section>
  )
}

export default Hero
