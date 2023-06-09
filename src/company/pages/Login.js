import React, { useState } from 'react'
import BadLoginCredentials from '../components/BadLoginCredentials'
import dawaFasta from '../../dawafastaAPI'
import LoadingSpinner from '../../components/Loading'
const Login = () => {
  const [nameClass, setNameClass] = useState(null)
  const [passClass, setPassClass] = useState(null)
  const [aboutClass, setAboutClass] = useState(null)
  const [loading, setLoading] = useState(false)
  const [invalid, setInvalid] = useState(false)
  const info = new Map([
    [true, 'is-valid'],
    [false, 'is-invalid'],
  ])
  const descr = new Map([
    [true, 'valid-feedback'],
    [false, 'invalid-feedback'],
  ])

  const handleSubmit = (e) => {
    e.preventDefault()
    const name = e.target.name.value
    const password = e.target.password.value
    const about = e.target.about.checked
    if (name.length >= 3 && password.length >= 4 && about) {
      const submitData = async () => {
        try {
          setLoading(true)
          const { data } = await dawaFasta.post('/login/company', {
            name,
            password,
          })
          document.cookie = 'Authorization=Bearer ' + data.token
          localStorage.setItem('DawaFasta', JSON.stringify(
            {isUser:false, 'company': {
              company_id: data.data.id,
              company_name: data.data.name,
              company_description: data.data.description,
              token:data.token
            }}
          ))
          window.location.pathname = 'company/' + data.data.name
        } catch (err) {
          console.log(err)
          if (
            err.code === 'ERR_BAD_REQUEST' &&
            err.response.data.err === 'Invalid credentials'
          ) {
            setLoading(false)
            setInvalid(true)
            return
          }
        }
      }
      submitData()
    }
  }
  if (loading)
    return (
      <div className='d-flex justify-content-center mt-5'>
        <LoadingSpinner />
      </div>
    )
  return (
    <main className=' d-flex flex-column justify-content-center align-items-center mt-5'>
      <section>
        {invalid && (
          <BadLoginCredentials info='Invalid company name or password!!!' />
        )}
      </section>
      <section className='registration'>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className='form-row row'>
            <div className='col-md-12 mb-3'>
              <label htmlFor='name'>Enter Company Name:</label>
              <input
                onKeyUp={(e) => {
                  if (e.target.value.length >= 3) setNameClass(true)
                  else setNameClass(false)
                }}
                type='text'
                className={`form-control ${info.get(nameClass)}`}
                name='name'
                id='name'
                placeholder='Company name..'
                required
              />
              <div className={descr.get(nameClass)}>
                {nameClass ? 'Looks good!' : 'should be more than 2 characters'}
              </div>
            </div>
            <div className='col-md-12 mb-3'>
              <label htmlFor='password'>Enter Company Password:</label>
              <input
                onKeyUp={(e) => {
                  if (e.target.value.length >= 4) setPassClass(true)
                  else setPassClass(false)
                }}
                type='password'
                className={`form-control ${info.get(passClass)}`}
                name='password'
                id='password'
                placeholder='Password...'
                required
              />
              <div className={descr.get(passClass)}>
                {passClass ? 'Looks good!' : 'Should be more than 3 characters'}
              </div>
            </div>
          </div>

          <div className='form-group'>
            <div className='form-check'>
              <input
                className={`form-check-input ${info.get(aboutClass)}`}
                onClick={(e) => {
                  if (e.target.checked) setAboutClass(true)
                  else setAboutClass(false)
                }}
                type='checkbox'
                defaultValue=''
                name='about'
                id='invalidCheck3'
              />
              <label className='form-check-label' htmlFor='invalidCheck3'>
                Agree to terms and conditions
              </label>
              <div className={`${descr.get(aboutClass)}`}>
                {aboutClass
                  ? 'Looks Good!'
                  : 'You should agree before submitting.'}
              </div>
            </div>
          </div>
          <button className='btn btn-primary' type='submit'>
            Submit
          </button>
        </form>
      </section>
    </main>
  )
}

export default Login
