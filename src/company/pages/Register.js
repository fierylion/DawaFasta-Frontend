import React, {useState} from 'react'
import dawaFasta from '../../dawafastaAPI'
import BadLoginCredentials from '../components/BadLoginCredentials'
import LoadingSpinner from '../../components/Loading'
const Register = () => {
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [verifyPassword, setVerifyPassword] = useState('')
  const[description, setDescription] = useState('');
   const [about, setAbout] = useState('')
   const [loading, setLoading] = useState(false)
   const [invalid, setInvalid] = useState([])
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
     if (
       name.length >= 3 &&
       password === verifyPassword &&description.length>=3 &&
       about
     ) {
       const submitData = async () => {
         try {
           setLoading(true)
           setInvalid([])
           const { data } = await dawaFasta.post('/register/company', {
             name,
             password,
             description
           })
            document.cookie = 'Authorization=Bearer ' + data.token
            localStorage.setItem(
              'DawaFasta',
              JSON.stringify({
                isUser: false,
                company: {
                  company_id: data.data.id,
                  company_name: data.data.name,
                  company_description: data.data.description,
                  token: data.token,
                },
              })
            )
           window.location.pathname = 'company/' + data.data.name
         } catch (err) {
           const data = err.response.data
           if (err.code === 'ERR_BAD_REQUEST') {
             for (const key in data) {
               setInvalid((invalid) => [...invalid, [key, data[key][0]]])
             }
           }
         } finally {
           setLoading(false)
         }
       }
       submitData()
     } else return
   }

   const property = (classMapper, prop, n) => {
     const value = prop !== '' && classMapper.get(prop.length >= n)
     return value !== false ? value : prop
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
        {invalid &&
          invalid.map((ele, ind) => {
            return <BadLoginCredentials key={ind} info={`${ele[1]}`} />
          })}
      </section>
      <section className='registration'>
        <form onSubmit={handleSubmit}>
          <div className='form-row row'>
            <div className='col-md-6 mb-3'>
              <label htmlFor='name'>Enter Company Name:</label>
              <input
                type='text'
                value={name}
                className={`form-control ${property(info, name, 3)}`}
                id='name'
                placeholder='name'
                onChange={(e) => setName(e.target.value)}
                required
              />
              <div className={property(descr, name, 3)}>
                {name?.length >= 3
                  ? 'Looks good!'
                  : 'name should be more than 2 characters'}
              </div>
            </div>

            <div className='col-md-6 mb-3'>
              <label htmlFor='password'>Enter your Password:</label>
              <input
                type='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`form-control ${property(info, password, 4)}`}
                id='password'
                placeholder='Password'
                required
              />
              <div className={property(descr, password, 4)}>
                {password?.length >= 4
                  ? 'Looks good!'
                  : 'password should be more than 3 characters'}
              </div>
            </div>
            <div className='col-md-6 mb-3'>
              <label htmlFor='password_2'>Verify your password:</label>
              <input
                type='password'
                value={verifyPassword}
                onChange={(e) => setVerifyPassword(e.target.value)}
                className={`form-control ${info.get(
                  password === verifyPassword
                )}`}
                id='password_2'
                placeholder='Verify Password'
                required
              />
              <div
                className={descr.get(descr.get(password === verifyPassword))}
              >
                {password === verifyPassword
                  ? 'Looks Good!'
                  : 'Password Do not match'}
              </div>
            </div>
            <div className='col-md-6 mb-3'>
              <label htmlFor='description'>Enter Company Description:</label>
              <input
                type='text'
                className={`form-control ${property(info, description, 3)}`}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                name='description'
                id='description'
                placeholder='Description...'
                required
              />
              <div className={property(descr, description, 3)}>
                {name?.length >= 3
                  ? 'Looks good!'
                  : 'Description should be more than 2 characters'}
              </div>
            </div>
          </div>
          <div className='form-group'>
            <div className='form-check'>
              <input
                className={`form-check-input ${info.get(about)}`}
                onClick={(e) => {
                  setAbout(e.target.checked)
                }}
                value={about}
                type='checkbox'
                name='about'
                id='invalidCheck3'
              />
              <label className='form-check-label' htmlFor='invalidCheck3'>
                Agree to terms and conditions
              </label>
              <div className={`${descr.get(about)}`}>
                {about ? 'Looks Good!' : 'You should agree before submitting.'}
              </div>
            </div>
          </div>
          <button className='btn btn-primary' type='submit'>
            Submit form
          </button>
        </form>
      </section>
    </main>
  )
}

export default Register