import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router'
import Slider from "react-slick";
import { addItemToCard } from '../../Services/cartServices';
import { Button } from '@heroui/react';
import { addItemToWishList } from '../../Services/wishLissServices';

export default function ProductDetails() {

  const [product, setProduct] = useState(null)
  const { id } = useParams()
  const [isLoading, setIsLoading] = useState(false)
  const [wishListIsLoading, setWishListIsLoading] = useState(false)

  const settings = {
    dots: true,
    infinite: true,
    speed: 200,
    slidesToShow: 1,
    slidesToScroll: 1,
  };


  // async function addItemToWishList(productId) {
  //   setWishListIsLoading(true)
  //   const {data} = await axios.post("https://ecommerce.routemisr.com/api/v1/wishlist",{
  //     productId,
  //   },{
  //     headers:{
  //       token: localStorage.getItem("token")
  //     }
  //   })
  //   setWishListIsLoading(false)
  // }


  useEffect(() => {
    getProductDetails(id)
  }, [])

  async function getProductDetails(productID) {
    const { data } = await axios.get("https://ecommerce.routemisr.com/api/v1/products/" + productID)
    setProduct(data.data)
  }


  return (

    <div className="py-8">
      <div className="flex items-center flex-wrap -mx-4">
        {/* Product Images */}
        <div className="w-full md:w-1/2 px-4 mb-8">
          <Slider {...settings}>
            {
              product?.images?.map((img) => {
                return <img src={img} alt="bl7" className="w-full h-[70vh]  rounded-lg shadow-md mb-4"/>
              })
            }
          </Slider>
        </div>
        {/* Product Details */}
        <div className="w-full md:w-1/2 px-4">
          <h2 className="text-3xl font-bold mb-2">{product?.title}</h2>
          <p className="text-gray-600 mb-4">SKU: WH1000XM4</p>
          <div className="mb-4">
            {
              product?.priceAfterDiscount ?
                <>
                  <span className="text-2xl font-bold mr-2">${product?.priceAfterDiscount}</span>
                  <span className="text-gray-500 line-through">${product?.price}</span>
                </>
                :
                <span className="text-2xl font-bold mr-2">${product?.price}</span>
            }
          </div>
          <div className="flex items-center mb-4">
            {
              [1, 2, 3, 4, 5].map((rate) => {
                return product?.ratingsAverage >= rate ?
                  <svg aria-hidden="true" className="h-5 w-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  :
                  <svg aria-hidden="true" className="h-5 w-5 text-gray-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
              })
            }
            <span className="ml-2 text-gray-600">{product?.ratingsAverage} ({product?.ratingsQuantity} reviews)</span>
          </div>
          <h5 className='my-2'> <span className="text-bold">Category: </span>{product?.category?.name}</h5>
          <h5 className='my-2'> <span className="text-bold">Brand: </span>{product?.brand?.name}</h5>
          <p className="text-gray-700 mb-6">{product?.description}</p>
          <div className="mb-6">
            <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-1">Quantity:</label>
            <input type="number" id="quantity" name="quantity" min={1} defaultValue={1} className="w-12 text-center rounded-md border-gray-300  shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
          </div>
          <div className="flex space-x-4 mb-6">
            <Button disabled={isLoading} isLoading={isLoading} onPress={() => addItemToCard(product._id, setIsLoading)} className="bg-indigo-600 flex gap-2 items-center text-white px-6 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
              </svg>
              Add to Cart
            </Button>
            <Button isLoading={wishListIsLoading} onPress={() => addItemToWishList(product._id, setWishListIsLoading)} className="bg-gray-200 flex gap-2 items-center  text-gray-800 px-6 py-2 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
              </svg>
              Wishlist
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
