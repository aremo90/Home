import React from 'react'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";

export default function Brands() {



  function getAllProducts() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/brands")
  }

  const { data } = useQuery({
    queryKey: ["brands"],
    queryFn: getAllProducts,
    select: (res) => res.data.data
  },
  )

  console.log(data)

  return (
    <div>
      <div className="grid my-12 grid-cols-1 md:grid-cols-2 md:gap-4 lg:grid-cols-3 lg:gap-4 ">
        {
          data?.map((product, index) => {
            return (
              <Card key={index} className=" lg:bg-blue-gray-50 mb-4 ">
                <CardHeader color="blue-gray" className="h-56">
                  <img className='w-full' src={product.image} alt={product.name} />
                </CardHeader>
                <CardBody className='lg:flex lg:justify-between lg:items-center'>
                  <Typography variant="h5" color="blue-gray" className="">
                    {product.name}
                  </Typography>
                  <Button>Read More</Button>
                </CardBody>
              </Card>
            )
          })
        }
      </div>
    </div>
  )
}
