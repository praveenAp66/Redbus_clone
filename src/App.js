import React, { Suspense } from "react";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import Navbar from "./Front_end/Components/Navbar";
import Footer from "./Front_end/Components/Footer";
import Mainpage from "./Front_end/Components/Mainpage";
import Statebuses from "./Front_end/Components/Statebuses";
import Redbusadds from "./Front_end/Components/Redbusadds";
import FAQ from './Front_end/Components/FAQ';

import { UserProvider } from './Front_end/Components/Usercontext.jsx'


const Signup = React.lazy(() => import("./Front_end/Components/Signup"))
const Busdetails=React.lazy(()=>import("./Front_end/Components/Busdetails"))
const Viewalloffers=React.lazy(()=>import("./Front_end/Components/Viewalloffers"))
const Viewallbuses=React.lazy(()=>import("./Front_end/Components/Viewallbuses"))
const Passengerdetails=React.lazy(()=>import("./Front_end/Components/Passengerdetails"))
const Payment=React.lazy(()=>import("./Front_end/Components/Payment"))
const Confirmation=React.lazy(()=>import("./Front_end/Components/Confirmationpage.jsx"))
const Showmyticket=React.lazy(()=>import("./Front_end/Components/Showmyticket.jsx"))
const Cancelticlet=React.lazy(()=>import("./Front_end/Components/Cancelticket.jsx"))
const Email=React.lazy(()=>import("./Front_end/Components/Email.jsx"))

const MainLayout = () => (
  <>
    <Navbar />
    <Mainpage />
    <Statebuses />
    <Redbusadds />
    <FAQ />
    <Footer />
 
  </>
);

const AuthLayout = () => (
  <>
    <Navbar />
    <Suspense fallback={<div>Loading...</div>}>
      <Outlet />
    </Suspense>
    <Footer />
  </>
);

function App() {
  return (
    
    <div className="App">
      <UserProvider>
    
      <BrowserRouter>
        <Routes>


          <Route path="/" element={<MainLayout />} />
          <Route path="/signup" element={<AuthLayout />}>
            <Route index element={<Signup />} />
          </Route>
          <Route path="/Busdetails" element={<AuthLayout />}>
            <Route index element={<Busdetails />} />
          </Route>
          <Route path="/viewalloffers" element={<AuthLayout />}>
            <Route index element={<Viewalloffers/>} />
          </Route>
          <Route path="/viewallbuses" element={<AuthLayout />}>
            <Route index element={<Viewallbuses/>} />
          </Route>
          <Route path="/passengerform" element={<AuthLayout />}>
            <Route index element={<Passengerdetails/>} />
          </Route>
          <Route path="/payment" element={<AuthLayout />}>
            <Route index element={<Payment/>} />
          </Route>
          <Route path="/confirmation" element={<AuthLayout />}>
            <Route index element={<Confirmation/>} />
          </Route>
          <Route path="/showmyticket" element={<AuthLayout />}>
            <Route index element={<Showmyticket/>} />
          </Route>
           <Route path="/cancelticket" element={<AuthLayout />}>
            <Route index element={<Cancelticlet/>} />
          </Route>
           <Route path="/email" element={<AuthLayout />}>
            <Route index element={<Email/>} />
          </Route>



        </Routes>
      </BrowserRouter>
      </UserProvider>
     
    </div>
  
  );
}

export default App;
