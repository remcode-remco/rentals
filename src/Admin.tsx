import { FormEvent, useState } from 'react'
import { VerifyPassword } from './constants/constants'
import { Message } from './App'

const Admin = ({setMessage,setShowAdmin,setPassword}:{setMessage:(message:Message)=>void,setShowAdmin:(showAdmin:boolean)=>void,setPassword:(password:string)=>void}) => {
  const [pwd,setPwd] = useState<string>("")
  const [authenticated,setAuthenticated] = useState<boolean>(false)
  
  const handleChange = (e:any) => {
    setPwd(e.target.value)
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!authenticated) {
      VerifyPassword(pwd).then((data)=>{
        if (data.status === "authenticated") {
          setPassword(pwd)
          setAuthenticated(true)
          setShowAdmin(false)
          setMessage({error:false,message:"Login succesful!"})
        } else {
          setMessage({error:true,message:"Password incorrect or filepermissions not set."})
        }
      })
    } else {
      setShowAdmin(false)
    }
  }
  
  return (
    <div className='fixed top-0 bottom-0 left-0 right-0 bg-white/90 flex items-center justify-center'>
      <form onSubmit={e=>handleSubmit(e)} className="max-w-md mx-auto p-4 bg-white shadow-md">
        {authenticated ?
          <div className='mt-4'>
            Already Signed in.
          </div>
        :
          <div className="mt-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              onChange={handleChange}
              className="mt-1 p-2 border rounded-md"
            />
          </div>
        }

        <div className="mt-4">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-700"
          >
            Upload
          </button>
        </div>
      </form>
    </div>
  );
};

export default Admin
