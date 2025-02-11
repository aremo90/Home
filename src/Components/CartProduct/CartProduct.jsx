import { Button } from '@heroui/react'
import { useState } from 'react'

export default function CartProduct({ product , removeItemFromCart , updateItemCount }) {

  const [isLoading, setIsLoading] = useState(false)
  const [countLoading, setCountLoading] = useState(false)





  return (
    <div className="grid grid-cols-3 items-start gap-4">
        <div className="col-span-2 flex items-start gap-4">
          <div className="w-28 h-28 max-sm:w-24 max-sm:h-24 shrink-0 bg-gray-100 p-2 rounded-md">
            <img src={product.product.imageCover} className="w-full h-full object-contain" />
          </div>
          <div className="flex flex-col"> 
            <h3 className="text-base font-bold text-gray-800">{product.product.title}</h3>
            <Button disabled={isLoading} isLoading={isLoading} onPress={() => removeItemFromCart(product.product._id , setIsLoading)} type="button" className="mt-6 font-semibold text-red-500 text-xs flex items-center gap-1 shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 fill-current inline" viewBox="0 0 24 24">
                <path d="M19 7a1 1 0 0 0-1 1v11.191A1.92 1.92 0 0 1 15.99 21H8.01A1.92 1.92 0 0 1 6 19.191V8a1 1 0 0 0-2 0v11.191A3.918 3.918 0 0 0 8.01 23h7.98A3.918 3.918 0 0 0 20 19.191V8a1 1 0 0 0-1-1Zm1-3h-4V2a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v2H4a1 1 0 0 0 0 2h16a1 1 0 0 0 0-2ZM10 4V3h4v1Z" data-original="#000000" />
                <path d="M11 17v-7a1 1 0 0 0-2 0v7a1 1 0 0 0 2 0Zm4 0v-7a1 1 0 0 0-2 0v7a1 1 0 0 0 2 0Z" data-original="#000000" />
              </svg>
              REMOVE
            </Button>
          </div>
        </div>


        <div className="flex flex-col justify-center items-center">
          <div className='flex items-center border-gray-100'>
            <Button onPress={() => updateItemCount(product.product._id , product.count -1 , setCountLoading)} isLoading={countLoading} 
            disabled={countLoading}
            className='cursor-pointer min-w-0 bg-gray-800 hover:bg-gray-900 text-white '>-</Button>
            <input type="text" className='h-8 w-8 border bg-white text-center text-xs outline-none' value={product.count}/>
            <Button onPress={() => updateItemCount(product.product._id , product.count +1 , setCountLoading)} isLoading={countLoading} 
            disabled={countLoading}
            className='cursor-pointer min-w-0 bg-gray-800 hover:bg-gray-900 text-white '>+</Button>
          </div> 
          <h4 className="text-lg max-sm:text-base font-bold text-gray-800 mt-4">${product.price * product.count}</h4>
        </div>



      </div>
  )
}
