import { createContext } from 'react'

import Admin from './Admin'
import './App.css'
import Area, { TextArea } from './Area'
import Hero, { TextHero } from './Hero'
import Navigation, { TextNavigation } from './Navigation'
import Rentals, { TextRentals } from './Rentals'
import Contact, { TextContact } from './Contact'
import Footer from './Footer'
import { useEffect, useState } from 'react'
import IconAdmin from './shared/IconAdmin'
import { FetchData } from './constants/constants'

export interface AppContext {
  siteContents:SiteContents|null|undefined;
  language:string;
}

interface SiteContents {
  navigation: TextNavigation;
  hero: TextHero;
  area: TextArea;
  rentals: TextRentals;
  contact: TextContact;
  dates: [ Date ];
  languages: [ string ];
}

export const RentalsContext = createContext<AppContext|null>(null)

const App = () => {
  //@ts-ignore
  const [lockScroll,setLockScroll]=useState<boolean>(false)
  const [scrollPosition, setScrollPosition] = useState<number>(0)
  const [editingSection, setEditingSection] = useState<number>(0)
  const [password,setPassword] = useState<string>("")
  const [showAdmin,setShowAdmin] = useState<boolean>(false)
  const [siteContents,setSiteContents] = useState<SiteContents|null|undefined>()
  const [language,setLanguage] = useState<string>(navigator.language.split('-')[0])

  useEffect(() => {
    if (lockScroll) {
      setScrollPosition(window.scrollY)
      document.body.classList.add('h-screen')
      document.body.classList.add('overflow-hidden')
    } else {
      document.body.classList.remove('h-screen')
      document.body.classList.remove('overflow-hidden')

      window.scrollTo(0, scrollPosition)
    }

    return () => {
      document.body.classList.remove('overflow-hidden')
      document.body.classList.remove('h-screen')
    }
  }, [lockScroll, scrollPosition])

  useEffect(()=>{
    let url = 'http://localhost:8000/php/get_json.php?language=' + language.split('-')[0]
    FetchData(url)
    .then(data=>{
      setSiteContents(data)
    })
  },[language])
  
  const contextValue = {siteContents, language}

  if (siteContents) {
    return (
      <RentalsContext.Provider value={contextValue}>
        <Navigation content={{navigation:siteContents.navigation, languages:siteContents.languages}} password={password} editingSection={editingSection} setEditingSection={setEditingSection} language={language} setLanguage={setLanguage} />
        <Hero content={siteContents.hero} password={password} editingSection={editingSection} setEditingSection={setEditingSection} />
        <Area content={siteContents.area} password={password} editingSection={editingSection} setEditingSection={setEditingSection} />
        <Rentals content={siteContents.rentals} password={password} editingSection={editingSection} setEditingSection={setEditingSection} setLockScroll={setLockScroll} />
        <Contact content={siteContents.contact} password={password} editingSection={editingSection} setEditingSection={setEditingSection} />
        <Footer content={{contact: siteContents.contact, navigation:siteContents.navigation, languages:siteContents.languages}} language={language} setLanguage={setLanguage} />
        <IconAdmin showAdmin={showAdmin} setShowAdmin={setShowAdmin} size={"80"} color={"text-black"} />
        {showAdmin && <Admin setShowAdmin={setShowAdmin} setPassword={setPassword} />}
      </RentalsContext.Provider>
    )
  } else {
    return <div>Loading................</div>
  }
}

export default App
