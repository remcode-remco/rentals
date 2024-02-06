// import { useState } from "react"
// import IconArrowDown from "./icons/IconArrowDown"
// import IconArrowUp from "./icons/IconArrowUp"

const Paragraph = ({text}:{text?:string}) => {
  if (text) {
    const paragraphs = text.split('\n\n')
    const restOfParagraphs = paragraphs.slice(1).join('##\n')
    // disabled for now =================================
    // const [showEntireText,setShowEntireText] = useState<boolean>(true)
    // ================================
    // from div line 18:
    // ${showEntireText ? 'opacity-100 max-h-screen' : 'opacity-0 max-h-0'}`}
    // ===============================
    return (
      <div className="mx-2 md:mx-4 md:my-4 lg:my-0 text-xl text-gray-600 whitespace-pre-line">
        <span>{paragraphs[0]}</span>
        <div className={` transition transform duration-1000 
                         `}
        >
          {restOfParagraphs.split('##').map((paragraph, index) => (
            <div className={`${index === 0 && "mt-6"}`} key={index}>
              {paragraph}
            </div>
          ))}
        </div>
        {/* {paragraphs.length > 1 && (
          <div onClick={() => setShowEntireText(!showEntireText)}
            className={`relative flex justify-center transition-max-h overflow-hidden transition duration-1000 cursor-pointer md:p-3`}
          >
            {showEntireText ?
              <IconArrowUp size={40} color="" handleIconClick={() => null} />
            :
              <IconArrowDown size={40} color="" handleIconClick={() => null} />
            }
          </div>
        )} */}
      </div>
    )
  }
}

export default Paragraph