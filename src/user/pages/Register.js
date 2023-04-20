import React, { useState} from 'react'
import dawaFasta from '../../dawafastaAPI';
import BadLoginCredentials from '../components/BadLoginCredentials';
const Register = () => {
  const [name, setName]= useState('');
  const [email, setEmail]= useState('');
  const [password, setPassword]= useState('');
  const [verifyPassword, setVerifyPassword]= useState('');
  const [username, setUsername]= useState('');
  const [birthdate, setBirthdate]= useState('');
  const[about, setAbout] = useState('')
  const [loading, setLoading] = useState(false);
  const [invalid, setInvalid] = useState([]);
  const info = new Map([
    [true, 'is-valid'],
    [false, 'is-invalid'],
  ])
  const descr = new Map([
    [true, 'valid-feedback'],
    [false, 'invalid-feedback'],
  ])
  const handleSubmit =(e)=>{
    e.preventDefault();
    const timestamp = Date.parse(birthdate)
    if (
      name.length >= 3 &&
      email &&
      password === verifyPassword &&
      !isNaN(timestamp) &&
      username.length>=4 &&
      about
    ) {
      const submitData = async () => {
        try {
          setLoading(true)
          setInvalid([])
          const { data } = await dawaFasta.post('/register/user', {
            name,
            birth_date: birthdate,
            username,
            email,
            password,
          })
          document.cookie = 'Authorization=Bearer ' + data.token
          localStorage.setItem(
              'DawaFastaUser',
              JSON.stringify({
                user_name: data.data.username,
                user_id: data.data.id,
                name: data.data.name,
                token: data.token,
              })
            )
       
          window.location.pathname = 'user/' + data.data.username
        } catch (err) {
          const data = err.response.data;
          if(err.code ==='ERR_BAD_REQUEST'){
          for(const key in data){
            setInvalid((invalid)=>[...invalid, [key, data[key][0]]])
          }
          }
        }
        finally{
          setLoading(false)
        }
      }
      submitData()
    } else return
  }

  const property =(classMapper, prop, n)=>{
    const value = prop!=='' && classMapper.get(prop.length>=n);
    return (value !==false) ? value : prop;
  }
  if(loading) return(<div><h1>Loading......</h1></div>);
  return (
    <main className=' d-flex justify-content-center align-items-center flex-column mt-5'>
    <section>
        {invalid && invalid.map((ele,ind)=>{
          return <BadLoginCredentials key={ind} info={`${ele[1]}`} />
        }) }
        
      </section>
    
      <section className='registration'>
        <form onSubmit={(e)=>handleSubmit(e)}>
          <div className='form-row row'>
            <div className='col-md-6 mb-3'>
              <label htmlFor='name'>Enter your name:</label>
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
              <label htmlFor='email'>Enter your email:</label>
              <input
                type='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className='form-control'
                id='email'
                placeholder='Email'
                required
              />
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
                className={`form-control ${info.get(password===verifyPassword)}`}
                id='password_2'
                placeholder='Verify Password'
                required
              />
              <div className={descr.get(descr.get(password===verifyPassword))}>{(password===verifyPassword)? 'Looks Good!':'Password Do not match'}</div>
            </div>

            <div className='col-md-6 mb-3'>
              <label
                htmlFor='username'
              >
                Enter your Username:
              </label>
              <div className='input-group'>
                <div className='input-group-prepend'>
                  <span className='input-group-text' id='inputGroupPrepend3'>
                    @
                  </span>
                </div>
                <input
                  type='text'
                  className={`form-control ${property(info, username, 4)}`}
                  onChange={(e)=>setUsername(e.target.value)}
                  value={username}
                  id='username'
                  placeholder='Username'
                  aria-describedby='inputGroupPrepend3'
                  required
                />
                <div className={property(descr, username, 4)}>
                  {username?.length>=4 ? 'Looks Good!': 'Username should have 4 characters'}
                </div>
              </div>
            </div>
            <div className='mb-3 col-4'>
              <label htmlFor='date'>Enter Your Birthdate</label>
              <input
                type='date'
                value={birthdate}
                onChange={(e)=>setBirthdate(e.target.value)}
                className='form-control'
                id='date'
                name='date'
              />
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
                {about
                  ? 'Looks Good!'
                  : 'You should agree before submitting.'}
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