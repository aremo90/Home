import { Button, Input } from '@heroui/react'
import axios from 'axios'
import { useFormik } from 'formik'
import { useContext, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router'
import * as Yup from "yup"

export default function CheckOut() {

  const [isLoading, setIsLoading] = useState(false)
  const { cartId } = useParams()  

  const initialValues = {
    "details": "",
    "city": "",
    "phone": ""
  }

  async function checkout() {
    setIsLoading(true)
    const {data} = await axios.post("https://ecommerce.routemisr.com/api/v1/orders/checkout-session/" + cartId,{
      shippingAddress: values
    },{
      headers: {
        token: localStorage.getItem("token")
      },
      params:{
        url: "https://aremo90.github.io/Home/"
      }
    })
    setIsLoading(false)
    location.href = data.session.url
  }

  const validationSchema = Yup.object({
    details: Yup.string().required("details is required"),
    city: Yup.string().required("city is required"),
    phone: Yup.string().required("phone is required").min(11, "Phone number must be 11 digits"),
  })

  const {values , handleChange , handleSubmit, errors, touched , handleBlur } = useFormik({
    initialValues,
    onSubmit: checkout,
    validationSchema
  })






  return (
    <div className='w-2/3 mx-auto mt-5'>
      <h1 className='font-bold text-2xl text-center'>Enter Your Address</h1>
      <form onSubmit={handleSubmit}>

        
        <div className='grid md:grid-cols-2 gap-4 py-10'>
          <Input name='details' value={values.details} onChange={handleChange}  onBlur={handleBlur} className='md:col-span-2' label="details" type="text"  variant='bordered' />


          <Input name='city' value={values.city} onChange={handleChange}  onBlur={handleBlur} className='md:col-span-2' label="City" type="text"  variant='bordered' />
          


          <Input isInvalid={touched.phone &&errors.phone} errorMessage={errors.phone} name='phone' value={values.phone} onChange={handleChange}  onBlur={handleBlur}className='md:col-span-2' label="Phone" type="tel" variant='bordered' />

          <Button disabled={isLoading} type='submit' className='md:col-span-2 md:mt-5' isLoading={isLoading} color="primary">
            Place Order
          </Button>
        </div>
      </form>
    </div>
  )
}
