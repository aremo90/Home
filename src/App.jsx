import { createBrowserRouter, createHashRouter, RouterProvider } from "react-router"
import MainLayout from "./Layout/MainLayout"
import Login from './pages/Login/Login';
import Home from './pages/Home/Home';
import Register from './pages/Register/Register';
import NotFound from './pages/NotFound/NotFound';
import Categories from './pages/Categories/Categories';
import Brands from './pages/Brands/Brands';
import CounterContextProvider from "./contexts/counterContext";
import AuthContextProvider from "./contexts/authContext";
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute";
import ProtectedAuthRoute from "./ProtectedRoute/ProtectedAuthRoute";
import ProductDetails from "./pages/ProductDetails/ProductDetails";
import { ToastContainer, toast } from 'react-toastify';
import Cart from "./pages/cart/Cart";
import CheckOut from "./pages/CheckOut/CheckOut";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import WishList from "./pages/WishList/WishList";
import ForgetPassword from "./pages/ForgetPassword/ForgetPassword";
import RestCode from "./pages/ForgetPassword/RestCode";
import UpdatePassword from "./pages/ForgetPassword/UpdatePassword";
import AllOrders from "./pages/AllOrders/AllOrders";

const queryClient = new QueryClient();

function App() {


  const router = createHashRouter([
    {
      path: '', element: <MainLayout />, children: [
        { index: true, element: <ProtectedRoute><Home /></ProtectedRoute> },
        { path: '/login', element: <ProtectedAuthRoute><Login /></ProtectedAuthRoute> },
        { path: '/register', element: <ProtectedAuthRoute><Register /></ProtectedAuthRoute> },
        { path: '/forgetPassword', element: <ProtectedAuthRoute><ForgetPassword /></ProtectedAuthRoute> },
        { path: '/restCode', element: <ProtectedAuthRoute><RestCode /></ProtectedAuthRoute> },
        { path: '/updatePassword', element: <ProtectedAuthRoute><UpdatePassword /></ProtectedAuthRoute> },
        { path: '/categories', element: <ProtectedRoute><Categories /></ProtectedRoute> },
        { path: '/Brands', element: <ProtectedRoute><Brands /></ProtectedRoute> },
        { path: '/cart', element: <ProtectedRoute><Cart /></ProtectedRoute> },
        { path: '/wishList', element: <ProtectedRoute><WishList /></ProtectedRoute> },
        { path: '/CheckOut/:cartId', element: <ProtectedRoute><CheckOut /></ProtectedRoute> },
        { path: '/productDetails/:id', element: <ProtectedRoute><ProductDetails /></ProtectedRoute> },
        { path: '/AllOrders', element: <ProtectedRoute><AllOrders /></ProtectedRoute> },
        { path: '/*', element: <NotFound /> },
      ]
    }
  ])

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <AuthContextProvider>
          <CounterContextProvider>
            <RouterProvider router={router}></RouterProvider>
            <ToastContainer />
          </CounterContextProvider>
        </AuthContextProvider>
      </QueryClientProvider>


    </>
  )
}

export default App
