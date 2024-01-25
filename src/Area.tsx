import Heading2 from "./shared/Heading2.tsx"
import Paragraph from "./shared/Paragraph.tsx"
import { AppContext, RentalsContext } from "./Home.tsx"
import Edit from "./shared/Edit.tsx"
import React, { forwardRef, lazy, useContext, useState } from 'react'
import IconArrowDown from "./shared/icons/IconArrowDown"
import IconArrowUp from "./shared/icons/IconArrowUp.tsx"
import EditPictures from "./shared/EditPictures.tsx"

const Image = lazy(() => import('./Image.tsx'))
const ImageGallery = lazy(() => import('./ImageGallery.tsx'))

export interface TextArea {
  title:string;
  text:string;
  button_text:string;
  videos: {embedUrl:string}[];
  pictures: {src:string}[];
}

interface AreaProps {
  content?: TextArea;
}

const Area: React.ForwardRefRenderFunction<HTMLDivElement, AreaProps> = ({ content }, ref) => {
  const contextValue = useContext(RentalsContext)
  const { password } = contextValue as AppContext
  const [showEntireText,setShowEntireText] = useState<boolean>(false)
  
  return (
    <section ref={ref} className="bg-white">
      <div className="relative md:shadow-lg md:rounded bg-white w-full h-full relative px-5 pt-16 lg:py-24">
        <div className="xl:max-w-6xl xl:mx-auto grid grid-cols-1 gap-2 lg:grid-cols-2">
          <div className="relative flex items-center order-1 lg:hidden">
            <Heading2 text={content?.title} />
          </div>
          <div
            className="relative overflow-hidden rounded-lg order-2 lg:order-3 h-full mx-auto"
          >
            <Image images={content?.pictures} rental_overview={false} />
            {password && content?.pictures && <EditPictures pictures={content?.pictures} section={2} index={0} />}
          </div>
          <div className="relative order-3 lg:order-2">
            <div className="hidden lg:block">
              <Heading2 text={content?.title} />
            </div>
            <Paragraph text={content?.text} />
            {password && <Edit section={3} />}
          </div>
          {content?.pictures && content?.pictures.length > 1 && (
            <div onClick={() => setShowEntireText(!showEntireText)}
              className={`order-5 lg:col-span-2 relative flex justify-center transition-max-h overflow-hidden transition duration-1000 cursor-pointer md:p-3`}
            >
              {showEntireText ?
                <IconArrowUp size={40} color="" handleIconClick={() => null} />
              :
                <IconArrowDown size={40} color="" handleIconClick={() => null} />
              }
            </div>
          )}
          <div className={`
                            order-4 xl:w-full xl:max-w-[1600px] xl:mx-auto lg:order-3 lg:col-span-2 md:mx-2 transition transform duration-1000 
                            ${showEntireText ? 'opacity-100 max-h-full' : 'opacity-0 max-h-0'}
                          `}
          >
            <ImageGallery photos={content?.pictures} targetRowHeight={300} />
          </div>
        </div>
      </div>
    </section>
  )
}

export default forwardRef(Area)