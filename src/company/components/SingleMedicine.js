import React, { useState, useRef } from 'react'
import medicine from '../../images/medicine_demo.png'
import dawaFasta from '../../dawafastaAPI'
import BadLoginCredentials from './BadLoginCredentials'
import Information from './Information'
import { useMajorGlobalContext } from '../../context'
import { redirect } from 'react-router-dom'
const SingleMedicine = ({name, description, price, quantity, company,solid, owners, manufacturer, manufactured, expiry, medId, compId, setDeleteLoad,  token, load, setLoad}) => {
  const {details} = useMajorGlobalContext();
 const [loading, setLoading] = useState(false);
 const [edit, setEdit] = useState({state:false, message:'', color:''})
const deleteRef = useRef()
 
 const handleSubmit = (e)=>{
  e.preventDefault()
  
 }
 const handleStartEdit=(medId)=>{
  setEdit({state:true, message:'', medId})

 }
 const handleDelete = (e)=>{
  e.preventDefault();
  const deleteMed = async ()=>{
  
    try
  {
    setDeleteLoad({ state: true, message: 'Deleting.....', color:'danger' })
    const {data}= await dawaFasta.delete(`/company/${compId}/medicine/${medId}`, {
      headers:{
        Authorization: 'Bearer '+ token
      }
    })
    //cancel the delete modal..
    deleteRef.current.click()

  } catch(err){
    console.log(err)
  }
    
  }
  deleteMed()
 }
 const handleEditSubmit=(e)=>{
  e.preventDefault();
  const price = e.target.price.value;
  const quantity = e.target.quantity.value;
  
  if(price && quantity){
    const postData = async ()=>{
      setEdit({state:true, message:'Submitting...', color:'warning'})
      try{
        const {data} = await dawaFasta.patch(`/company/${compId}/medicine/${medId}`,{price, quantity}, {
          headers:{
            Authorization:'Bearer ' +token
          }
        })
      setEdit({state:true, message:'Submitted!', color:'success'})
      }
      catch(err){
        console.log(err)
        setEdit({state:true, message:'An issue occurred! Data not edited try again', color:'danger'})

      }
      finally{
        
      }
    }
    postData()
  }
 }

  return (
    <div className='card  single-medicine m-4 shadow bg-white'>
      <img className='card-img-top' src={medicine} alt='Card image cap' />
      <div className='card-body '>
        <h5 className='card-title text-secondary text-center'>{name}</h5>
        <div className='d-flex flex-column text-muted content-data ms-3 '>
          <p>
            <span className=''>
              Contents: {description.active_ingredients.join(' , ')}
            </span>
          </p>
          <p>
            <span className=''>Manufacturer : {manufacturer}</span>
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
            <span className='drink-data'>Price : {price}</span>
          </p>
          <p>
            <span className='drink-data'>Quantity : {quantity}</span>
          </p>
          <p>
            <span className='drink-data'>
              There are {owners} other companies owning this medicine
            </span>
          </p>
        </div>
        <div className='modal' id='myModal' tabIndex={-1}>
          <div className='modal-dialog'>
            <div className='modal-content'>
              <div className='modal-header'>
                <h5 className='modal-title text-danger'>Delete Medicine</h5>
                <button
                  type='button'
                  ref={deleteRef}
                  className='btn-close'
                  data-bs-dismiss='modal'
                  aria-label='Close'
                />
              </div>
              <div className='modal-body text-warning'>
                <p>Are you sure you want to delete, The medicine</p>
              </div>
              <div className='modal-footer'>
                <button
                  type='button'
                  className='btn btn-secondary'
                  data-bs-dismiss='modal'
                >
                  Close
                </button>
                <button
                  type='button'
                  className='btn btn-danger'
                  onClick={(e) => {
                    handleDelete(e)
                  }}
                >
                  Sure, Delete
                </button>
              </div>
            </div>
          </div>
        </div>

        {!edit.state && (
          <div className='d-flex justify-content-around'>
            <button className='btn btn-success' onClick={handleStartEdit}>
              Edit
            </button>
            <a href={`/company/${details.company_name}/medicine/${medId}/orders`}>
              <button className='btn btn-secondary'>Sales</button>
            </a>
            <button
              className='btn btn-danger'
              data-bs-toggle='modal'
              data-bs-target='#myModal'
            >
              Delete
            </button>
          </div>
        )}
        {edit.state && (
          <div className='d-flex justify-content-center align-items-center bg-secondary p-3  rounded shadow'>
            <div className=''>
              <section className='my-2 text-center bg-dark rounded '>
                <Information
                  state={edit.state}
                  info={edit.message}
                  load={load}
                  setLoad={setLoad}
                  color={edit.color}
                  setState={setEdit}
                />
              </section>
              <form
                className='text-white'
                role='search'
                onSubmit={handleEditSubmit}
              >
                <label htmlFor='price' className='form-label text-left'>
                  Enter New Price:
                </label>
                <input
                  className='form-control'
                  id='price'
                  name='price'
                  type='amount'
                  placeholder='Amount in $'
                  aria-label='Search'
                  required
                />
                <label htmlFor='edit' className='form-label mt-3'>
                  Enter New Quantity:
                </label>
                <input
                  type='text'
                  id='quantity'
                  name='quantity'
                  className='form-control'
                  placeholder='Enter new quantity of product'
                  required
                />

                <button className='btn btn-primary  mt-3' type='submit'>
                  Edit
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default SingleMedicine