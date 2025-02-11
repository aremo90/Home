import axios from "axios";
import React, { useEffect, useState } from "react";
import CartProduct from "../../Components/CartProduct/CartProduct";
import { Button } from "@heroui/react";
import { Link } from "react-router";

export default function Cart() {
  const [cartId, setCartId] = useState(null);
  const [numOfCartItem, setNumOfCartItem] = useState(0);
  const [cartData, setCartData] = useState(null);
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    getUserCart();
  }, []);

  async function getUserCart() {
    const { data } = await axios.get(
      "https://ecommerce.routemisr.com/api/v1/cart",
      {
        headers: {
          token: localStorage.getItem("token"),
        },
      }
    );
    setCartId(data.cartId);
    setNumOfCartItem(data.numOfCartItems);
    setCartData(data.data);
  }

  

  async function removeItemFromCart(productId, setIsLoading) {
    setIsLoading(true)
    await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/` + productId,
      {
        headers: {
          token: localStorage.getItem("token"),
        },
      }
    );
    setIsLoading(false)
    getUserCart();
  }

  async function removeUserCart() {
    setIsLoading(true)

    await axios.delete("https://ecommerce.routemisr.com/api/v1/cart",
      {
        headers: {
          token: localStorage.getItem("token"),
        },
      }
    );
    setIsLoading(false)
    setCartId(null);
    setNumOfCartItem(0);
    setCartData(null);
  }

  async function updateItemCount(productId , count , setCountLoading ) {
    setCountLoading(true)
    const {data} = await axios.put("https://ecommerce.routemisr.com/api/v1/cart/" + productId, {
      count
    },{
      headers: {
        token: localStorage.getItem("token")
      }
    },)
    setCountLoading(false)
    setCartId(data.cartId);
    console.log(data.cartId);
    setNumOfCartItem(data.numOfCartItems);
    setCartData(data.data);
  }



  if(numOfCartItem == 0){
    return <div className="flex flex-col justify-center items-center my-52">
        <h1 className="text-3xl mb-12 uppercase">Oops Look Like you didn't add any item to your cart</h1>
        <Button as={Link} to={"/"} type="button" className="text-xl bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg">Browse Items</Button>
    </div>
  }

  return (
    <div className="font-sans max-w-5xl max-md:max-w-xl mx-auto bg-white py-4">
      
      <h1 className="text-3xl font-bold text-gray-800 text-center">
        Shopping Cart ({numOfCartItem})
      </h1>
      <Button className="bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg"
      radius="full" disabled={isLoading} isLoading={isLoading} onPress={() => removeUserCart()}>Clear Cart</Button>
      <div className="grid md:grid-cols-3 gap-8 mt-16">
        <div className="md:col-span-2 space-y-4">
          {/* items */}
          {cartData?.products.map((product, index) => {
            return <CartProduct key={index} product={product}  removeItemFromCart={removeItemFromCart} isLoading={isLoading} updateItemCount={updateItemCount}/>;
          })}
        </div>

        {/* Check Out */}
        <div className="bg-gray-100 rounded-md p-4 h-max sticky top-20">
          <h3 className="text-lg max-sm:text-base font-bold text-gray-800 border-b border-gray-300 pb-2">
            Order Summary
          </h3>

          <ul className="text-gray-800 mt-6 space-y-3">
            <li className="flex flex-wrap gap-4 text-sm">
              Subtotal{" "}
              <span className="ml-auto font-bold">
                ${cartData?.totalCartPrice}
              </span>
            </li>
            <li className="flex flex-wrap gap-4 text-sm">
              Shipping <span className="ml-auto font-bold">$5.00</span>
            </li>
            <li className="flex flex-wrap gap-4 text-sm">
              Tax <span className="ml-auto font-bold">$10.00</span>
            </li>
            <li className="flex flex-wrap gap-4 text-sm font-bold">
              Total{" "}
              <span className="ml-auto">
                ${cartData?.totalCartPrice + 5 + 10}
              </span>
            </li>
          </ul>
          <div className="mt-6 space-y-3">
            <Button
            as={Link}
            to={"/CheckOut/" + cartId}
            type="button"
            className="text-sm px-4 py-2.5 w-full font-semibold tracking-wide bg-gray-800 hover:bg-gray-900 text-white rounded-md"
            >
              Checkout
            </Button>
            <Button
              as={Link}
              to={"/"}
              type="button"
              className="text-sm px-4 py-2.5 w-full font-semibold tracking-wide bg-transparent text-gray-800 border border-gray-300 rounded-md"
            >
              Continue Shopping
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
