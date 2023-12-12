import { useContext } from "react";
import { AppContext, RentalsContext } from "./App";
import IconHome from "./shared/IconHome"
import ReactFlagsSelect from 'react-flags-select'

interface ContentNavigation {
  navigation: TextNavigation;
  languages: [ string ];
}

export interface TextNavigation {
  title: string;
  home: string;
  area: string;
  rentals: string;
  contact: string;
}

export const Menu = ({content}:{content:TextNavigation}) => {
  return (
    <div className="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1" id="mobile-menu-2">
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
      <li>
        <a href="#" className="block py-2 pr-4 pl-3 text-white rounded bg-primary-700 lg:bg-transparent lg:text-primary-700 lg:p-0">{label}</a>
      </li>
  )


export const Language = ({languages,setLanguage}:{languages:[string],setLanguage:(language:string)=>void}) => {
  
  const contextValue = useContext(RentalsContext)
  const { language } = contextValue as AppContext
  
  // ============ not pretty =================
  const fixLanguagesArray = (languages:[string]) => languages.map((str) => (str === 'en' ? 'GB' : str.toUpperCase()))
  const fixSelectedLanguage = (language:string) => language === 'en' ? 'GB' : language.toUpperCase()
  const fixSelectLanguage = (language:string) => language === 'gb' ? setLanguage('en') : setLanguage(language)
  // =========================================
  
  return (
    <div className="z-40 flex items-center space-x-2">
      <ReactFlagsSelect
        countries={fixLanguagesArray(languages)}
        selected={fixSelectedLanguage(language)} 
        onSelect={code=>fixSelectLanguage(code.toLowerCase())}
      />
    </div>
  )
}

const Navigation = (
    {content,setLanguage}:
    {content:ContentNavigation,setLanguage:(language:string)=>void}
  ) => {
    
  const { navigation, languages } = content
  
  if (content) {
    return (
      <header>
        <nav className="z-40 bg-white border-gray-200 px-2 lg:px-6 py-2.5 dark:bg-gray-800">
          <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
            <a className="flex gap-2 items-center block text-xl font-semibold whitespace-nowrap ">
              <IconHome size="40" color="text-green-800" />
              {navigation.title}
            </a>
            <div className="flex items-center lg:order-2">
              <button data-collapse-toggle="mobile-menu-2" type="button" className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="mobile-menu-2" aria-expanded="false">
                <span className="sr-only">Open main menu</span>
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path></svg>
                <svg className="hidden w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
              </button>
            </div>
            <Menu content={navigation} />
            <Language languages={languages} setLanguage={setLanguage} />
          </div>
        </nav>
      </header>
    )
  }
}

export default Navigation