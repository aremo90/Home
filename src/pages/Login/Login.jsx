import { Button, Input } from '@heroui/react'
import axios from 'axios'
import { useFormik } from 'formik'
import { useContext, useState } from 'react'
import { Link } from 'react-router'
import * as Yup from "yup"
import { authContext } from '../../contexts/authContext'

export default function Login() {


  const [isLoading, setIsLoading] = useState(false)
  const [errMsg, setErrMsg] = useState("")
  const { setIsLoggedIn } = useContext(authContext)

  const initialValues = {
    email: "",
    password: "",
  }

  const validationSchema = Yup.object({
    email: Yup.string().required("Email is required").email("Invalid email address"),
    password: Yup.string().required("Password is required").min(8, "Password must be at least 8 characters").max(20, "Password must be less than 20 characters"),
  })

  const { values, handleChange, handleSubmit, errors, touched, handleBlur } = useFormik({
    initialValues,
    onSubmit,
    validationSchema
  })


  function onSubmit(values) {
    setIsLoading(true)
    setErrMsg("")
    axios.post("https://ecommerce.routemisr.com/api/v1/auth/signin", values)
      .then(({ data }) => {
        if (data.message == "success") {
          setIsLoggedIn(true)
          localStorage.setItem("token", data.token)
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
      <h1 className='font-bold text-2xl text-center'>Login Now</h1>
      <form onSubmit={handleSubmit}>
        <div className='grid md:grid-cols-2 gap-4 py-10'>
          <Input isInvalid={touched.email && errors.email} errorMessage={errors.email} name='email' value={values.email} onChange={handleChange} onBlur={handleBlur} className='' label="Email" type="email" variant='bordered' />
          <Input isInvalid={touched.password && errors.password} errorMessage={errors.password} name='password' value={values.password} onChange={handleChange} onBlur={handleBlur} className='' label="Password" type="Password" variant='bordered' />
          <Button disabled={isLoading} type='submit' className='md:col-span-2 md:mt-5' isLoading={isLoading} color="primary">
            LogIn
          </Button>
          <div className='flex flex-col gap-3'>
            <span>Don't have account <Button as={Link} className='text-blue-400' to={"/register"} variant="flat">Register Now</Button></span>
            <span>Can't remember Password<Button as={Link} className='text-blue-700' to={"/forgetPassword"} variant="flat">Forget Password</Button></span>
            {errMsg && <p className='text-red-600 text-center'>{errMsg}</p>}
          </div>
        </div>
      </form>
    </div>
  )
}
