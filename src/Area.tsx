import Heading2 from "./shared/Heading2.tsx"
import Paragraph from "./shared/Paragraph.tsx"
import { AppContext, RentalsContext } from "./App.tsx"
import Edit from "./shared/Edit.tsx"
import { useContext } from "react"
import ImageGallery from "./ImageGallery.tsx"
import AreaImageEdit from "./AreaImageEdit.tsx"

export interface TextArea {
  title:string;
  text:string;
  button_text:string;
  videos: {embedUrl:string}[];
  pictures: {original:string}[];
}

const Area = ({content}:{content:TextArea}) => {
  const contextValue = useContext(RentalsContext)

  const { password } = contextValue as AppContext
  return (
    <section className="relative mx-auto max-w-screen-xl px-4 py-8 sm:py-12 sm:px-6 lg:py-16 lg:px-8">
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-16">
        <div
          className="relative overflow-hidden rounded-lg lg:order-last h-full order-2"
        >
          <ImageGallery images={content.pictures} />
          {password && <AreaImageEdit />}
        </div>

        <div className="relative flex items-center order-1">
          {password && <Edit section={3} />}
          <Heading2 text={content.title} />
        </div>
        <div className="order-3">
          <Paragraph text={content.text} />
        </div>
      </div>
    </section>
  )
}

export default Area