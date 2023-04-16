import React, { useState } from 'react'
import medicine from '../../images/medicine_demo.png'
import dawaFasta from '../../dawafastaAPI'
import BadLoginCredentials from './BadLoginCredentials'
const SingleMedicine = ({name, description, price, quantity, company,solid, owners, manufacturer, manufactured, expiry, medId, compId, userId, userName, token}) => {
 const [loading, setLoading] = useState(false);
 const [insufficient, setInsufficient] = useState(true)
 const handleSubmit = (e)=>{
  e.preventDefault()
  const makePurchase = async ()=>{
   try{
    setLoading(true)
    const {data} = await dawaFasta.get(`user/${userId}/purchase`, {
     params:{
      medicine: medId,
      company: compId,
      amount: e.target.amount.value
     },
     headers:{
      Authorization:'Bearer '+ token
     }
    })
    if(data.err){

    }

   }catch(err){
    console.log(err)

   }
   finally{
    setLoading(false)
   }
  }
  makePurchase()
 }

  return (
    <div className='card text-center single-medicine m-4'>
    {insufficient && <BadLoginCredentials info='Insufficient amount please lower the quantity you are purchasing!!'/>}
      <img className='card-img-top' src={medicine} alt='Card image cap' />
      <div className='card-body '>
        <h5 className='card-title text-secondary'>{name}</h5>
        <div className='medicine-info d-flex flex-column'>
          <small>Pieces Left : {quantity}</small>
          <small>Company : {company}</small>
          <small>Contents: {description.active_ingredients.join(' , ')}</small>
          <small>Manufacturer : {manufacturer}</small>
          <small>Manufactured On :{manufactured}</small>
          <small>Expires In : {expiry}</small>
          <small>State : {solid ? 'Solid' : 'Liquid'} </small>
          <small>There are {owners} other companies owning this medicine</small>
        </div>
       {loading? <h1>Loading.....</h1>: <div className='d-flex justify-content-around'>
          <span>Price: {price} $</span>
          <form className='d-flex mt-3 mt-lg-0 ' role='search' onSubmit={handleSubmit}>
            <input
              className='form-control me-2 input-sm'
              name='amount'
              type='amount'
              placeholder='Amount'
              aria-label='Search'
            />
            <button className='btn btn-outline-success' type='submit'>
              Buy
            </button>
          </form>
        </div>
        }
      </div>
    </div>
  )
}

export default SingleMedicine