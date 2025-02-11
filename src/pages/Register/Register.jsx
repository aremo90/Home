import { Button, Input } from '@heroui/react'
import axios from 'axios'
import { useFormik } from 'formik'
import { useState } from 'react'
import { Link } from 'react-router'
import { useNavigate } from 'react-router'
import * as Yup from "yup"

export default function Register() {


  // function validate(values){
  //   const error = {};

  //   if(values.name == ""){
  //     error.name = 'Name is required'
  //   }else if(values.name.length < 3){
  //     error.name = 'Name must be at least 3 characters'
  //   }else if(values.name.length > 20){
  //     error.name = 'Name must be less than 20 characters'
  //   }

  //   if(values.email == ""){
  //     error.email = 'Email is required'
  //   }else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)){
  //     error.email = 'Invalid email address'
  //   }

  //   if(values.password == ""){    
  //     error.password = 'Password is required'
  //   }else if(values.password.length < 8){
  //     error.password = 'Password must be at least 8 characters'
  //   }else if(values.password.length > 20){
  //     error.password = 'Password must be less than 20 characters'
  //   }

  //   if(values.rePassword == ""){ 
  //     error.rePassword = 'Re-Password is required'
  //   }else if(values.rePassword != values.password){
  //     error.rePassword = 'Passwords do not match'
  //   }

  //   if(values.phone == ""){ 
  //     error.phone = 'Phone is required'
  //   }else if(values.phone.length != 11){
  //     error.phone = 'Phone number must be 11 digits'
  //   }
  
  //   return error
  // }




  const [isLoading, setIsLoading] = useState(false)
  const [errMsg, setErrMsg] = useState("")
  const navigate = useNavigate()

  const initialValues = {
    name: "",
    email:"",
    password:"",
    rePassword:"",
    phone:""
  }

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required").min(3, "Name must be at least 3 characters").max(20, "Name must be less than 20 characters"),
    email: Yup.string().required("Email is required").email("Invalid email address"),
    password: Yup.string().required("Password is required").min(8, "Password must be at least 8 characters").max(20, "Password must be less than 20 characters"),
    rePassword: Yup.string().required("Re-Password is required").oneOf([Yup.ref("password"), null], "Passwords do not match"),
    phone: Yup.string().required("Phone is required").min(11, "Phone number must be 11 digits")
  })

  const {values , handleChange , handleSubmit, errors, touched , handleBlur } = useFormik({
    initialValues,
    onSubmit,
    validationSchema
  })

  
  function onSubmit(values){
    setIsLoading(true)
    setErrMsg("")
    axios.post("https://ecommerce.routemisr.com/api/v1/auth/signup", values)
    .then(({data}) => {
      if(data.message == "success"){
        navigate("/login")
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
      <h1 className='font-bold text-2xl text-center'>Register Now</h1>
      <form onSubmit={handleSubmit}>
        <div className='py-10 grid md:grid-cols-2 gap-4'>
          <Input isInvalid={touched.name && errors.name} errorMessage={errors.name} name='name' value={values.name} onChange={handleChange} onBlur={handleBlur} className='md:col-span-2' label="Name" type="name"  variant='bordered' />
          <Input isInvalid={touched.email &&errors.email} errorMessage={errors.email} name='email' value={values.email} onChange={handleChange}  onBlur={handleBlur}className='md:col-span-2' label="Email" type="email"  variant='bordered' />
          <Input isInvalid={touched.password &&errors.password} errorMessage={errors.password} name='password' value={values.password} onChange={handleChange}  onBlur={handleBlur}className='' label="Password" type="Password"  variant='bordered' />
          <Input isInvalid={touched.rePassword &&errors.rePassword} errorMessage={errors.rePassword} name='rePassword' value={values.rePassword} onChange={handleChange}  onBlur={handleBlur}className='' label="re-Password" type="Password"  variant='bordered' />
          <Input isInvalid={touched.phone &&errors.phone} errorMessage={errors.phone} name='phone' value={values.phone} onChange={handleChange}  onBlur={handleBlur}className='md:col-span-2' label="Phone" type="tel" variant='bordered' />
          <Button disabled={isLoading} type='submit' className='md:col-span-2' isLoading={isLoading} color="primary">
            Register
          </Button>
          {errMsg && <p className='text-red-600'>{errMsg}</p>}
          <span>Already have an account <Button as={Link} className='bg-black text-teal-400' to={"/Login"} variant="flat">Login now</Button></span>
        </div>
      </form>
    </div>
  )
}
