import React, { useState } from 'react'
import medicine from '../../images/medicine_demo.png'
import dawaFasta from '../../dawafastaAPI'
import BadLoginCredentials from './BadLoginCredentials'
import LoadingSpinner from '../../components/Loading'
const SingleMedicine = ({name, description, price, quantity, company,solid, owners, manufacturer, manufactured, expiry, medId, compId, userId, token, load, setLoad}) => {
 const [loading, setLoading] = useState(false);
 const [insufficient, setInsufficient] = useState(false)
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
     setInsufficient(true)
    }
    else{
     setInsufficient(false)
     setLoad(!load)
    
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
      {insufficient && (
        <BadLoginCredentials info='Insufficient amount please lower the quantity you are purchasing!!' />
      )}
      <img className='card-img-top' src={medicine} alt='Medicine' />
      <div className='card-body '>
        <h5 className='card-title text-secondary'>{name}</h5>
        <div className='d-flex flex-column text-muted content-data ms-3 '>
          <p>
            <span className=''>Pieces Left : {quantity}</span>
          </p>
          <p>
            <span className=''>Company : {company}</span>
          </p>
          <p>
            <span className='drink-data'>
              Contents: {description.active_ingredients.join(' , ')}
            </span>
          </p>
          <p>
            <span className='drink-data'>Manufacturer : {manufacturer}</span>
          </p>
          <p>
            <span className='drink-data'>Manufactured On :{manufactured}</span>
          </p>
          <p>
            <span className='drink-data'>Expires In : {expiry}</span>
          </p>
          <p>
            <span className='drink-data'>
              State : {solid ? 'Solid' : 'Liquid'}
            </span>
          </p>
          <p>
            <span className='drink-data'>
              There are {owners} other companies owning this medicine
            </span>
          </p>
        </div>
        {loading ? (
          <div className='d-flex justify-content-center mt-5'>
            <LoadingSpinner />
          </div>
        ) : (
          <div className='d-flex justify-content-around'>
            <span className='text-success '>
              <b>Price: {price} $</b>
            </span>
            <form
              className='d-flex mt-3 mt-lg-0 '
              role='search'
              onSubmit={handleSubmit}
            >
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
        )}
      </div>
    </div>
  )
}

export default SingleMedicine