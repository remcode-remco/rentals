import Heading2 from "./shared/Heading2.tsx"
import Paragraph from "./shared/Paragraph.tsx"
import { AppContext, RentalsContext } from "./App.tsx"
import Edit from "./shared/Edit.tsx"
import RentalImage from "./Image.tsx"
import { useContext, useState } from "react"
import ImageGallery from "./ImageGallery.tsx"

export interface TextArea {
  title:string;
  text:string;
  button_text:string;
  videos: [ {embedUrl:string} ];
  pictures: [ {original:string} ];
}

const AreaDetail = ({overview,content,setShowArea,setLockScroll}:{overview:boolean,content:TextArea,setShowArea:(showArea:boolean)=>void,setLockScroll:(lockScroll:boolean)=>void}) => {
  const contextValue = useContext(RentalsContext)

  const { password } = contextValue as AppContext

  return (
    <div
      className="relative mx-auto max-w-screen-xl px-4 py-8 sm:py-12 sm:px-6 lg:py-16 lg:px-8"
    >
      <div onClick={()=>{!password && setShowArea(true);!password && setLockScroll(true)}} className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-16">
        <div
          className="relative overflow-hidden rounded-lg lg:order-last h-full"
        >
          {overview ?
            <RentalImage image={content.pictures[0]} />
            :
            <ImageGallery images={content.pictures} />
          }
        </div>

        <div className="lg:py-10">
          <div className="relative flex items-center">
            {password && overview && <Edit section={3} />}
            <Heading2 text={content.title} />
          </div>
          <Paragraph text={content.text} />
          <a
              href="#"
              className="mt-8 inline-block rounded bg-indigo-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-yellow-400"
            >
            {content.button_text}
          </a>
        </div>
      </div>
    </div>
  )
}

const Area = ({content,setLockScroll}:{content:TextArea,setLockScroll:(lockScroll:boolean)=>void}) => {
  const [showArea, setShowArea] = useState<boolean>(false)
  
  if (content) {
    return (
      <section className="relative">
        <AreaDetail content={content} overview={true} setShowArea={setShowArea} setLockScroll={setLockScroll} />
        <div 
          onClick={()=>{setShowArea(false);setLockScroll(false)}} 
          className={`z-10 fixed top-0 bottom-0 left-0 right-0 bg-white/80 ${showArea ? 'translate-y-0' : 'translate-y-full'}`}
        ></div>
        <div
          
          className={`z-20 fixed bottom-0 left-0 right-0 bg-white py-4 transition-transform transform h-[80vh]
            ${showArea ? 'translate-y-0' : 'translate-y-full' }`}
        >
          <div className="overflow-y-auto h-full px-4">
            {showArea && <AreaDetail content={content} overview={false} setShowArea={setShowArea} setLockScroll={setLockScroll} />}
          </div>
        </div>
      </section>
    )
  }
}

export default Area