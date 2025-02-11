import axios from "axios"



export async function addItemToWishList(productId, setIsLoading) {
  setIsLoading(true)
  const {data} = await axios.post("https://ecommerce.routemisr.com/api/v1/wishlist",{
    productId,
  },{
    headers:{
      token: localStorage.getItem("token")
    }
  })
  setIsLoading(false)
}