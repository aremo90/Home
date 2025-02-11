import { Button, Input } from '@heroui/react'
import axios from 'axios'
import { useFormik } from 'formik'
import { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router'
import * as Yup from "yup"
import { authContext } from '../../contexts/authContext'

export default function RestCode() {


  const [isLoading, setIsLoading] = useState(false)
  const [errMsg, setErrMsg] = useState("")
  const navigate = useNavigate()

  const initialValues = {
    resetCode: "",
  }



  const validationSchema = Yup.object({
    resetCode: Yup.number().typeError("Invalid Code").required("ResetCode is required"),
  });
  

  const { values, handleChange, handleSubmit, errors, touched, handleBlur } = useFormik({
    initialValues,
    onSubmit,
    validationSchema
  })


  function onSubmit(values) {
    setIsLoading(true)
    setErrMsg("")
    axios.post("https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode",
      values
    )
      .then(({ data }) => {
        if (data.status == "Success") {
          navigate("/updatePassword")
        }
      }).catch((err) => {
        setErrMsg(err.response.data.message)
      }).finally(() => {
        setIsLoading(false)
      })
  }



  return (
    <div className='w-2/3 mx-auto mt-5'>
      <h1 className='font-bold text-2xl text-center'></h1>
      <form onSubmit={handleSubmit}>
        <div className='grid md:grid-cols-2 gap-4 py-10'>
          <Input isInvalid={touched.resetCode && errors.resetCode} errorMessage={errors.resetCode} name='resetCode' value={values.resetCode} onChange={handleChange} onBlur={handleBlur} className='md:col-span-2' label="Reset Code" type="tel" variant='bordered' />
          
          
          <Button disabled={isLoading} type='submit' className='md:col-span-2 md:mt-5' isLoading={isLoading} color="primary">Verify Code</Button>

          {errMsg && <p className='text-red-600 text-center'>{errMsg}</p>}
        </div>
      </form>
    </div>
  )
}
