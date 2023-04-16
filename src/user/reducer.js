const reducer =(state, action)=>{
 switch(action.type){
  case 'SET_DETAILS':
    return {...state,detailSet:true, name:action.payload.name, username:action.payload.username, birthdate:action.payload.birthdate}


 }
}
export default reducer