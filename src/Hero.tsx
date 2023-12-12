import Heading1 from "./shared/Heading1.tsx"
import { AppContext, RentalsContext } from "./App.tsx"
import Edit from "./shared/Edit.tsx"
import EditImage from "./shared/EditImage.tsx";
import { useContext } from "react";

export interface TextHero {
  title: string;
  subtitle: string;
}

const Hero = ({content}:{content:TextHero}) => {
  const contextValue = useContext(RentalsContext)

  const { password } = contextValue as AppContext
  
  return (
    <section
      className={`relative w-full bg-[url('images/hero.jpg')] bg-cover bg-center bg-no-repeat h-[70vh]`}
    >
      <div
        className="absolute bottom-0 left-0 right-0 mx-auto max-w-screen-xl px-4 py-2 lg:py-8 lg:flex lg:h-screen items-end lg:px-8"
      >
        <div className={`relative flex flex-col items-start bg-white rounded-xl p-3`}>
          {password && <Edit section={2} />}
          <Heading1 text={content.title} subtext={content.subtitle} />
        </div>
        {password && <EditImage section={2} />}
      </div>
    </section>
  )
}

export default Hero