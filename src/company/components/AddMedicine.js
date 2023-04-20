import React, { useState } from 'react'
import dawaFasta from '../../dawafastaAPI';
import { useMajorGlobalContext } from '../../context';
import BadLoginCredentials from './BadLoginCredentials';
import Information from './Information';
const AddMedicine = ({ setModal}) => {
 const {details} = useMajorGlobalContext();
 const [fill, setFill] = useState({state:false, message:'', color:''});
 const handleSubmit=(e)=>{
  e.preventDefault()
  
  const {name, manufacturer, manDate, expDate, ingredients, state, quantity, price} = e.target;
  setFill(false)
  if(name.value&& manufacturer.value && manDate.value && expDate.value&& ingredients.value&& state.value && quantity.value && price.value){
   const sendData = async ()=>{
    try{
    setFill({state:true, message:'Posting...', color:'warning'})
    const {data} = await dawaFasta.post(
     `/company/${details.company_id}`,{medicine: {
      name:name.value,content:{
       'active_ingredients': ingredients.value.split(',')
      },expiryDate: expDate.value, manufactureDate: manDate.value, manufacturerName: manufacturer.value, isSolid:(state.value.toLowerCase()==='solid')
     },
     info:{
      price:price.value,
      quantity: quantity.value
     }
    },{headers: {
     Authorization: 'Bearer ' + details.token
    }}
    )
    console.log(data)
    setFill({state:true, message:'Posted!', color:'success'})
  
  }
    catch(err){
     console.log(err)
     setFill({state:true, message:'An error Ocurred, Post Unsuccessful!', color:'danger'})
    }
    finally{
     
    }
   }
   sendData()
  }
  else{
    setFill({state:true, message:'Please fill all the fields!!', color:'danger'});
  }
 }
 
  return (
    <form className='mt-5' onSubmit={handleSubmit}>
      <section className='my-2 text-center bg-dark rounded'>
        {fill.state && <Information 
          state={fill.state} 
          info={fill.message} 
          color={fill.color} 
          setState={setFill} 
        />}
      </section>
      <div className='form-row row'>
        <div className='col-md-12'>
          <label htmlFor='name'>Medicine Name: </label>
          <input type='text' className='form-control' name='name' />
        </div>
        <div className='col-md-12'>
          <label htmlFor='manufacturer'>Manufacturer: </label>
          <input type='text' className='form-control' name='manufacturer' />
        </div>
        <div className='col-md-12'>
          <label htmlFor='manDate'>Manufacture Date: </label>
          <input type='date' className='form-control' name='manDate' />
        </div>
        <div className='col-md-12'>
          <label htmlFor='expDate'>Expiry Date: </label>
          <input type='date' className='form-control' name='expDate' />
        </div>
        <div className='col-md-12'>
          <label htmlFor='ingredients'>Ingredients: </label>
          <input type='text' className='form-control' name='ingredients' />
        </div>
        <div className='col-md-4'>
          <label htmlFor='state'>State: </label>
          <input type='text' name='state' className='form-control' />
        </div>
        <div className='col-md-4'>
          <label htmlFor='quantity'>Quantity: </label>
          <input type='text' className='form-control' name='quantity' />
        </div>
        <div className='col-md-4'>
          <label htmlFor='price'>Price: </label>
          <input type='text' className='form-control' name='price' />
        </div>
      </div>
      <div className='modal-footer'>
        <button type='submit' className='btn btn-primary'>
          Add Medicine
        </button>
        <button className='btn btn-danger' onClick={() => setModal(false)}>
          Close
        </button>
      </div>
    </form>
  )
}

export default AddMedicine