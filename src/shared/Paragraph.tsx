import { useState } from "react"
import IconArrowDown from "./icons/IconArrowDown"

const Paragraph = ({text}:{text:string}) => {
  const paragraphs = text.split('\n\n')
  const restOfParagraphs = paragraphs.slice(1).join('##\n')
  const [showEntireText,setShowEntireText] = useState<boolean>(false)
  
  return (
    <div className="lg:mt-4 text-gray-600 whitespace-pre-line">
      <span>{paragraphs[0] + '\n\n'}</span>
      {paragraphs.length > 1 && (
        <div onClick={() => setShowEntireText(true)}
          className={`flex justify-center transition-max-h overflow-hidden transition duration-1000 
                      ${!showEntireText ? 'max-h-full translate-y-0' : 'max-h-0 -translate-y-full'}`}
        >
          <IconArrowDown size={40} color="" handleIconClick={() => null} />
        </div>
      )}
      <div className={` transition transform duration-1000 
                        ${showEntireText ? 'opacity-100 max-h-screen' : 'opacity-0 max-h-0'}`}
      >
        {restOfParagraphs.split('##').map((paragraph, index) => (
          <div className="lg:mt-4 text-gray-600 whitespace-pre-line" key={index}>
            {paragraph}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Paragraph