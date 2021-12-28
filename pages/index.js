import {useState} from 'react'
import {useRouter} from 'next/router'
export default function Login() {
    const [first_name, setFirstName] = useState();
    const [last_name, setLastName] = useState();
    const [password, setPassword] = useState();
    const [email, setEmail] = useState();
    const [confirm_password, setConfirmPassword] = useState();
    const router = useRouter()
  function tabClicked(e){
    e.target.classList.add('active')
    e.target.classList.add('text-blue-500')
    e.target.classList.add('border-blue-500')
    e.target.classList.add('border-b-2')
    if(e.target.textContent === 'Sign up'){
      document.querySelector('[data-target="panel-2"]').classList.remove('active')
      document.querySelector('[data-target="panel-2"]').classList.remove('text-blue-500')
      document.querySelector('[data-target="panel-2"]').classList.remove('border-blue-500')
      document.querySelector('[data-target="panel-2"]').classList.remove('border-b-2')
      document.querySelector('.panel-1').classList.add('active')
      document.querySelector('.panel-2').classList.remove('active')
    }else{
      document.querySelector('[data-target="panel-1"]').classList.remove('active')
      document.querySelector('[data-target="panel-1"]').classList.remove('text-blue-500')
      document.querySelector('[data-target="panel-1"]').classList.remove('border-blue-500')
      document.querySelector('[data-target="panel-1"]').classList.remove('border-b-2')
      document.querySelector('.panel-2').classList.add('active')
      document.querySelector('.panel-1').classList.remove('active')
    }
  }
  function signUp(event){
    callSignUp()
    event.preventDefault();
  }
  function login(event){
    callLogin()
    event.preventDefault();
  }
  async function callLogin(){
    try{
        const response = await fetch('http://159.100.241.165:8000/api/v1/auth/token',{
          method: 'POST',
          body: `grant_type=&scope=&client_id=&client_secret=&username=${email}&password=${password}`,
          headers:{
            'Content-Type':'application/x-www-form-urlencoded',
            'access-control-allow-credentials': true, 
            'access-control-allow-origin': '*'
          }
        })
        console.log(response.status)
      if(response.status === 200){
        const data = await response.json()
        console.log("data>>>",data)
        localStorage.setItem('access_token',data.access_token)
        localStorage.setItem('refresh_token',data.refresh_token)
        router.push('/dashboard')
      }else{
        throw 'Login error occured'
      }
    }catch(error){
      console.log(error)
    }
  }
  async function callSignUp(){
    try{
      const response = await fetch('http://159.100.241.165:8000/api/v1/auth/signup',{
        method: 'POST',
        body: JSON.stringify({first_name,last_name,email,password,confirm_password}),
        headers: {
          'Content-Type':'application/json',
          'access-control-allow-credentials': true, 
          'access-control-allow-origin': '*'
        }
      });
      console.log(response.status)
      if(response.status === 201){
        const data = await response.json()
        console.log("data>>>",data)
        router.push('/dashboard')
      }else{
        throw 'Signup error occured'
      }
    }catch(error){
      console.log(error)
    }
  }
  


  return <div className="flex flex-col bg-sky-50">
    <section className="flex-col flex items-center justify-center h-screen">
              <div className="bg-white">
                  <nav className="tabs flex sm:flex-row" onClick={tabClicked}>
                      <button data-target="panel-1" className="tab bg-sky-50  active text-blue-500 border-b-2 border-blue-500 text-gray-600 py-4 px-6 block hover:text-blue-500 focus:outline-none font-medium">
                                Sign up
                      </button>
                      <button data-target="panel-2" className="tab bg-sky-50 ext-gray-600 py-4 px-6 block hover:text-blue-500 focus:outline-none">
                                Login
                      </button>
                  </nav>
              </div>

              <div id="panels">
                  <div className="panel-1 tab-content active py-5">
                  <form onSubmit={(e)=>signUp(e)} className="flex flex-col ">
                            <input onChange={(e)=>setFirstName(e.target.value)} className="m-4" type="text" name="first_name" placeholder="First Name" required/>
                            <input onChange={(e)=>setLastName(e.target.value)} className="m-4" type="text" name="last_name" placeholder="Last Name" required/>
                            <input onChange={(e)=>setEmail(e.target.value)} className="m-4" type="email" name="email" placeholder="Email" required/>
                            <input onChange={(e)=>setPassword(e.target.value)} className="m-4"type="password" name="password" placeholder="Password" required/>
                            <input onChange={(e)=>setConfirmPassword(e.target.value)} className="m-4"type="password" name="confirm_password" placeholder="Confirm Password" required/>
                            <button className="p-1 m-4 bg-sky-400 text-white" type="submit">Sign up</button>
                            </form>
                  </div>
                  <div className="panel-2 tab-content py-5">
                            <form onSubmit={login} className="flex flex-col ">
                            <input onChange={(e)=>setEmail(e.target.value)} className="m-4" type="text" name="email" placeholder="User name" required/>
                            <input onChange={(e)=>setPassword(e.target.value)} className="m-4"type="password" name="password" placeholder="Password" required/>
                            <button className="p-1 m-4 bg-sky-400 text-white" type="submit">Login</button>
                            </form>
                  </div>
              </div>
  </section>
  </div>
  
}
