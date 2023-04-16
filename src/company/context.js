import React,{useState} from "react"
const AppContext = React.createContext()
const AppProvider = ({children})=>{
 const [modal,setModal] = useState(false)
 return( <AppContext.Provider value={{modal, setModal}}>
 {children}
 </AppContext.Provider>)
}

const useGlobalContext = ()=>{
 return React.useContext(AppContext);
}
export {AppContext, AppProvider, useGlobalContext}