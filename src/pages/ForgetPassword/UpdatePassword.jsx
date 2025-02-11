import { Button, Input } from '@heroui/react'
import axios from 'axios'
import { useFormik } from 'formik'
import { useContext, useState } from 'react'
import { Link } from 'react-router'
import { useNavigate } from 'react-router'
import * as Yup from "yup"
import { authContext } from '../../contexts/authContext'

export default function UpdatePassword(email) {
  
  const [isLoading, setIsLoading] = useState(false)
  const [errMsg, setErrMsg] = useState("")
  const navigate = useNavigate()
  const { setIsLoggedIn } = useContext(authContext)
  const UpdateEmail = localStorage.getItem("UpdateEmail")


  const initialValues = {
    email: `${UpdateEmail}`,
    newPassword:"",
  }

  const validationSchema = Yup.object({
    email: Yup.string().required("Email is required").email("Invalid email address"),
    newPassword: Yup.string().required("Password is required").min(8, "Password must be at least 8 characters").max(20, "Password must be less than 20 characters"),
  })

  const {values , handleChange , handleSubmit, errors, touched , handleBlur } = useFormik({
    initialValues,
    onSubmit,
    validationSchema
  })

  
  function onSubmit(values){
    setIsLoading(true)
    setErrMsg("")
    axios.put("https://ecommerce.routemisr.com/api/v1/auth/resetPassword", values)
    .then(({data}) => {
      if(data.token != null){
        setIsLoggedIn(true)
        localStorage.setItem("token", data.token)
        localStorage.removeItem("UpdateEmail")
      }
    }).catch((err) => {
      console.log("err")
      setErrMsg(err.response.data.message)
    }).finally(() => {
      setIsLoading(false)
    })
  }



  return (
    <div className='w-2/3 mx-auto mt-5'>
      <h1 className='font-bold text-2xl text-center'>Update Password</h1>
      <form onSubmit={handleSubmit}>
        <div className='py-10 grid md:grid-cols-2 gap-4'>

          <Input name='email' value={values.email} className='md:col-span-2' label="Email" type="email"  variant='bordered' />

          <Input isInvalid={touched.newPassword &&errors.newPassword} errorMessage={errors.newPassword} name='newPassword' value={values.newPassword} onChange={handleChange}  onBlur={handleBlur}className='md:col-span-2' label="Password" type="Password"  variant='bordered' />

          <Button disabled={isLoading} type='submit' className='md:col-span-2' isLoading={isLoading} color="primary">
            Update Password
          </Button>


          {errMsg && <p className='text-red-600'>{errMsg}</p>}

        </div>
      </form>
    </div>
  )
}
