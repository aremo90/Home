import React from 'react'
import Footer from './../Components/Footer/Footer';
import { Outlet } from 'react-router';
import NavBar from '../Components/Navbar/Navbar';

export default function MainLayout() {
  return (
    <div className='container mx-auto'>
      <NavBar/>
      <Outlet/>
      <Footer/>
    </div>
  )
}
