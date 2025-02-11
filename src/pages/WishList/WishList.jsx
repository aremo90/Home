import axios from "axios";
import React, { useEffect, useState } from "react";
import CartProduct from "../../Components/CartProduct/CartProduct";
import { Button } from "@heroui/react";
import { Link } from "react-router";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
} from "@material-tailwind/react";
import { addItemToCard } from '../../Services/cartServices';

export default function WishList() {
  const [numOfWishListCartItem, setNumOfWishListItem] = useState(0);
  const [wishListData, setWishListData] = useState(null);
  const [deleteItemFromWishList, setDeleteItemFromWishList] = useState(false)
  const [addItemToCart, setAddItemToCart] = useState(false)

  useEffect(() => {
    getWishList();
  }, []);

  async function getWishList() {
    const { data } = await axios.get(
      "https://ecommerce.routemisr.com/api/v1/wishlist",
      {
        headers: {
          token: localStorage.getItem("token"),
        },
      }
    );
    setNumOfWishListItem(data.count);
    setWishListData(data.data);
  }



  async function removeItemFromWishList(productId) {
    setDeleteItemFromWishList(true)
    await axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,
      {
        headers: {
          token: localStorage.getItem("token"),
        },
      }
    );
    setDeleteItemFromWishList(false)
    getWishList();
  }

  if (numOfWishListCartItem == 0) {
    return <div className="flex flex-col justify-center items-center my-52">
      <h1 className="text-3xl mb-12 uppercase">Oops Look Like you didn't add any item to your wishList</h1>
      <Button as={Link} to={"/"} type="button" className="text-xl bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg">Browse Items</Button>
    </div>
  }

  return (
    <div>
      <div className="grid my-8 grid-cols-1 md:grid-cols-2 md:gap-4 lg:grid-cols-3 lg:gap-4 ">
        {
          wishListData?.map((product, index) => {
            return (
              <Card key={index} className=" lg:bg-blue-gray-50 mb-4 ">
                <CardHeader color="blue-gray" className="relative mx-3 mt-3 flex  overflow-hidden rounded-xl">
                  <img className='object-contain w-full' src={product.imageCover} alt={product.title} />
                </CardHeader>
                <CardBody className='lg:flex lg:justify-between lg:items-center'>
                  <Typography variant="h5" color="blue-gray" >
                    <h5 className="text-xl text-blue-gray-900 tracking-tight text-slate-900 line-clamp-1">
                      {product.title}
                    </h5>
                  </Typography>
                </CardBody>
                <CardFooter className="flex  gap-3">
                  <Button isLoading={deleteItemFromWishList} onPress={() => removeItemFromWishList(product._id)} className="flex items-center justify-center rounded-md bg-black hover:bg-gray-600 px-5 py-2.5 text-center text-sm font-medium text-white focus:outline-none focus:ring-4 focus:ring-blue-300">Remove From WishList</Button>
                  <Button disabled={addItemToCart} isLoading={addItemToCart} onPress={() => addItemToCard(product._id,  setAddItemToCart)}>Add to Cart</Button>
                </CardFooter>
              </Card>
            )
          })
        }
      </div>
    </div>
  );
}
