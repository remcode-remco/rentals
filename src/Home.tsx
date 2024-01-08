import React, { useRef, createContext } from 'react'
import Admin from './Admin'
import './Home.css'
import Area, { TextArea } from './Area'
import Hero, { TextHero } from './Hero'
import Navigation, { TextNavigation } from './Navigation'
import Rentals, { TextRentals } from './Rentals'
import Contact, { TextContact } from './Contact'
import Footer from './Footer'
import { useEffect, useState } from 'react'
import IconAdmin from './shared/icons/IconAdmin'
import { FetchData } from './constants/constants'
import PopupMessage from './shared/PopupMessage'
import Loading from './Loading'


export interface AppContext {
  password:string|null|undefined;
  language:string;
  editingSection:number;
  setEditingSection:(editingSection:number)=>void;
  setShowLoading:(showLoading:boolean)=>void;
  setMessage:(message:Message)=>void;
  siteContents:SiteContents|null|undefined;
  setSiteContents:(siteContents:SiteContents|null|undefined)=>void;
  section:number|undefined;
  setShowRental:(showRental:number|null)=>void;
}

export interface SiteContents {
  navigation: TextNavigation;
  hero: TextHero;
  area: TextArea;
  rentals: TextRentals;
  contact: TextContact;
  languages: string[];
}

export const RentalsContext = createContext<AppContext|null>(null)

export interface Message {
  error: boolean;
  message: string;
}

interface HomeProps {
  section: number;
  params?: {
    rentalId?: string; 
  };
}

const Home: React.FC<HomeProps> = ({section,params}) => {
  const rentalId = params?.rentalId
  console.log(rentalId)
  const [lockScroll,setLockScroll]=useState<boolean>(false)
  const [scrollPosition, setScrollPosition] = useState<number>(0)
  const [scrolledHalfway, setScrolledHalfway] = useState<boolean>(false)
  const [editingSection, setEditingSection] = useState<number>(0)
  const [password,setPassword] = useState<string|null|undefined>("")
  const [showAdmin,setShowAdmin] = useState<boolean>(false)
  const [siteContents,setSiteContents] = useState<SiteContents|null|undefined>()
  const [language,setLanguage] = useState<string>(navigator.language)
  const [message,setMessage] = useState<Message|null>(null)
  const [showLoading,setShowLoading] = useState<boolean>(false)
  const [doneLoading,setDoneLoading] = useState<boolean>(false)
  const [showRental, setShowRental] = useState<number|null>(null)

  const areaRef = useRef<HTMLDivElement>(null)
  const rentalsRef = useRef<HTMLDivElement>(null)
  const contactRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (section && areaRef.current) {
      if (section === 1) {
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: 'smooth',
        })
      } else if (section === 2) {
        window.requestAnimationFrame(() => 
          areaRef.current?.scrollIntoView({behavior:'smooth'})
        )  
      } else if (section === 3) {
        window.requestAnimationFrame(() => 
          rentalsRef.current?.scrollIntoView({behavior:'smooth'})
        )  
      }  else if (section === 4) {
        window.requestAnimationFrame(() => 
          contactRef.current?.scrollIntoView({behavior:'smooth'})
        )  
      } 
    }
  }, [section,areaRef.current])

  useEffect(() => {
    const handleScroll = () => {      
      const windowHeight = window.innerHeight
      const scrollPosition = window.scrollY
      const halfwayPoint = windowHeight / 2.6

      setScrolledHalfway(scrollPosition >= halfwayPoint)
    }
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])  
  
  useEffect(() => {
    const delayedFunction = () => {
      setDoneLoading(true)
    }
    const timeoutId = setTimeout(delayedFunction, 500)
    return () => clearTimeout(timeoutId)
  }, [])
  
  useEffect(() => {
    if (rentalId) {
      setShowRental(parseInt(rentalId))
    }
  }, [rentalId])
  

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
    FetchData(language.split('-')[0])
    .then(data=>{
      setSiteContents(data)
    })
  },[language])
  
  const contextValue = {password, siteContents, language, editingSection, setEditingSection, setShowLoading, setMessage, setSiteContents, section, setShowRental}

    return (
      <RentalsContext.Provider value={contextValue}>
        <div className='relative'>
          <Navigation scrolledHalfway={scrolledHalfway} setScrolledHalfway={setScrolledHalfway} content={{navigation:siteContents?.navigation, languages:siteContents?.languages}} setLanguage={setLanguage} />
          <Hero scrolledHalfway={scrolledHalfway} doneLoading={doneLoading} content={siteContents?.hero} />
          <Area ref={areaRef} content={siteContents?.area} />
          <Rentals ref={rentalsRef} content={siteContents?.rentals} setLockScroll={setLockScroll} showRental={showRental} setShowRental={setShowRental} />
          <Contact ref={contactRef} content={siteContents?.contact} />
          <Footer content={{contact: siteContents?.contact, navigation:siteContents?.navigation, languages:siteContents?.languages}} setLanguage={setLanguage} />
          {!password && <IconAdmin showAdmin={showAdmin} setShowAdmin={setShowAdmin} size={"80"} color={"text-black"} /> }
          {showAdmin && <Admin setMessage={setMessage} setShowAdmin={setShowAdmin} setPassword={setPassword} />}
          <PopupMessage message={message} setMessage={setMessage} />
          <Loading showLoading={showLoading} setLockScroll={setLockScroll} />
        </div>
      </RentalsContext.Provider>
    )
  }


export default Home
