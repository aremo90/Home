import axios from "axios"



export async function addItemToCard(productId, setIsLoading) {
  setIsLoading(true)
  const {data} = await axios.post("https://ecommerce.routemisr.com/api/v1/cart",{
    productId,
  },{
    headers:{
      token: localStorage.getItem("token")
    }
  })
  setIsLoading(false)
  setCounter(counter + 1)
}