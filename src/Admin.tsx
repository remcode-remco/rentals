import { FormEvent, useState } from 'react';
import { VerifyPassword } from './constants/constants';

const Admin = ({setShowAdmin,setPassword}:{setShowAdmin:(showAdmin:boolean)=>void,setPassword:(password:string)=>void}) => {
  const [pwd,setPwd] = useState<string>("")
  // tmp for TS
  setShowAdmin(true)
  //
  
  const handleChange = (e:any) => {
    setPwd(e.target.value)
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setPassword(pwd)
    VerifyPassword(pwd)
  }

  return (
    <div className='fixed top-0 bottom-0 left-0 right-0 bg-white/90 flex items-center justify-center'>
      <form onSubmit={e=>handleSubmit(e)} className="max-w-md mx-auto p-4 bg-white shadow-md">
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
