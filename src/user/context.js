import React,{useContext, useEffect, useReducer} from 'react'
import reducer from './reducer'
const AppContext = React.createContext();
const initialState = {
 detailSet:false,
  name:'',
  username:'',
  birthdate:''
}

const AppProvider = ({children})=>{
 const [state, dispatch] = useReducer(reducer, initialState)
 return (
  <AppContext.Provider value={{...state, dispatch}}>
   {children}
  </AppContext.Provider>
 )
}

const useGlobalContext = ()=>{
 return useContext(AppContext)
}
export {AppContext, AppProvider, useGlobalContext}