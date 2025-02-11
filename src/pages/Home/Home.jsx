import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Product from '../../Components/Product/Product';
import { useQuery } from '@tanstack/react-query';

export default function Home() {

  const [products, setProducts] = useState([])

  useEffect(() => {
    getAllProducts()
  }, [])

  // async function getAllProducts() {
  //   const { data } = await axios.get("https://ecommerce.routemisr.com/api/v1/products");
  //   setProducts(data.data)
  // }

  function getAllProducts() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/products")
  }

  const { data } = useQuery({
    queryKey: ["products"],
    queryFn: getAllProducts,
    select: (res) => res.data.data
  },
)





  return (

    <div>
      <div className="grid grid-cols-2 md:grid-cols-3 md:gap-2 lg:grid-cols-5 lg:gap-3">
        {
          data?.map((product, index) => {
            return <Product key={index} product={product} />
          })
        }
      </div>
    </div>

  )
}
