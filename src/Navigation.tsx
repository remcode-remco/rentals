import { useContext, useState } from "react"
import { AppContext, RentalsContext } from "./App"
import ReactFlagsSelect from 'react-flags-select'
import Edit from "./shared/Edit";
import { lang } from "moment";

interface ContentNavigation {
  navigation: TextNavigation;
  languages: string[];
}

export interface TextNavigation {
  title: string;
  home: string;
  area: string;
  rentals: string;
  contact: string;
}

const MenuHamburger = ({content,languages,setLanguage}:{content:TextNavigation,languages:string[],setLanguage:(language:string)=>void}) => {
  const [showMenu,setShowMenu] = useState<boolean>(false)

  return (
    <div className="flex items-center lg:order-2">
      <button onClick={()=>setShowMenu(!showMenu)} data-collapse-toggle="mobile-menu-2" type="button" 
        className="z-40 inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="mobile-menu-2" aria-expanded="false">
        <span className="sr-only">Open main menu</span>
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path></svg>
        <svg className="hidden w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
      </button>
      <div className={`absolute left-0 right-0 bottom-0 flex flex-col gap-5 bg-white/90 rounded-b mx-10 transform transition duration-500 origin-top translate-y-full ${showMenu ? 'scale-y-1' : 'scale-y-0'}`}>
        <ul className={`my-2 text-2xl font-medium lg:flex-row lg:space-x-8 lg:mt-0 transform transition duration-500 ${showMenu ? 'opacity-100' : 'opacity-0'}`}>
          <MenuItem label={content.home} />
          <MenuItem label={content.area} />
          <MenuItem label={content.rentals} />
          <MenuItem label={content.contact} />
        </ul>
        {languages && <Language languages={languages} setLanguage={setLanguage} />}
      </div>
    </div>
  )
}

export const Menu = ({content,languages,setLanguage}:{content:TextNavigation,languages:string[],setLanguage:(language:string)=>void}) => {
  return (
    <div className="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1" id="mobile-menu-2">
      {languages && <Language languages={languages} setLanguage={setLanguage} />}
      <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
        <MenuItem label={content.home} />
        <MenuItem label={content.area} />
        <MenuItem label={content.rentals} />
        <MenuItem label={content.contact} />
      </ul>
    </div>
  )
}

const MenuItem = ({label}:{label:string}) => (
    label && label.length > 0 && 
      <li className="hover:bg-yellow-100 px-3 py-2 w-full text-center cursor-pointer">
        <a href="#" className="">{label}</a>
      </li>
  )

export const Language = ({languages,setLanguage}:{languages:string[],setLanguage:(language:string)=>void}) => {
  const contextValue = useContext(RentalsContext)
  const { language } = contextValue as AppContext

  // ============ not pretty =================
  const fixLanguagesArray = (languages:string[]) => languages.map((str) => (str === 'en' ? 'GB' : str.toUpperCase()))
  const fixSelectedLanguage = (language:string) => language === 'en' ? 'GB' : language.toUpperCase()
  const fixSelectLanguage = (language:string) => language === 'gb' ? setLanguage('en') : setLanguage(language)
  // =========================================
  
  return (
    <ReactFlagsSelect
      countries={fixLanguagesArray(languages)}
      selected={fixSelectedLanguage(language)} 
      onSelect={code=>fixSelectLanguage(code.toLowerCase())}
      selectedSize={20}
      optionsSize={20}
      className="p-3 mb-2"
    />
  )
}

const Navigation = (
    {content,setLanguage,scrolledHalfway}:
    {content:ContentNavigation,setLanguage:(language:string)=>void,scrolledHalfway:boolean}
) => {
  const contextValue = useContext(RentalsContext)
  const { password } = contextValue as AppContext
  const { navigation, languages } = content
  
  return (
    <header className={`m-2 z-50 fixed top-0  right-0   tranform duration-1000 left-0 `} >
      <div className="relative flex justify-end items-center max-w-screen-xl">
        
          <a className={`bg-white/90 rounded absolute p-3 text-2xl w-full font-semibold whitespace-nowrap tranform duration-1000 ${scrolledHalfway ? "shadow-lg opacity-100" : "opacity-0"} `}>
            {navigation.title}
          </a>
        <nav className="bg-white/90 rounded flex gap-2 items-center justify-center p-2">
          <Menu content={navigation} languages={languages} setLanguage={setLanguage} />
          <MenuHamburger content={navigation} languages={languages} setLanguage={setLanguage} />
          {password && <Edit section={1} />}
        </nav>
      </div>
    </header>
  )
}

export default Navigation
