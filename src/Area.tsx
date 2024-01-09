import Heading2 from "./shared/Heading2.tsx"
import Paragraph from "./shared/Paragraph.tsx"
import { AppContext, RentalsContext } from "./Home.tsx"
import Edit from "./shared/Edit.tsx"
import React, { forwardRef, useContext } from 'react'
import ImageGallery from "./ImageGallery.tsx"
import AreaImageEdit from "./AreaImageEdit.tsx"

export interface TextArea {
  title:string;
  text:string;
  button_text:string;
  videos: {embedUrl:string}[];
  pictures: {original:string}[];
}

interface AreaProps {
  content?: TextArea;
}

const Area: React.ForwardRefRenderFunction<HTMLDivElement, AreaProps> = ({ content }, ref) => {
  const contextValue = useContext(RentalsContext)
  const { password } = contextValue as AppContext

  return (
    <section ref={ref} className="">
      <div className="relative md:shadow-lg md:rounded bg-white w-full h-full relative px-5 pt-16 lg:pt-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-16">
          <div className="relative flex items-center order-1 lg:hidden">
            <Heading2 text={content?.title} />
          </div>
          <div
            className="relative overflow-hidden rounded-lg order-2 lg:order-3 h-full mx-2"
          >
            <ImageGallery images={content?.pictures} />
            {password && <AreaImageEdit />}
          </div>
          <div className="order-3 lg:order-2">
            <div className="hidden lg:block">
              {password && <Edit section={3} />}
              <Heading2 text={content?.title} />
            </div>
            <Paragraph text={content?.text} />
          </div>
        </div>
      </div>
    </section>
  )
}

export default forwardRef(Area)