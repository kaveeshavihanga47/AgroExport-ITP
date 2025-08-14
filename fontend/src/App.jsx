import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { Home } from './Pages/Home'
import { UserProvider } from './UserContext'

import { SignUp } from './Pages/SignUp'


import { Delivery_Note } from './Pages/Finance_Manager/Delivery_Management/Delivery_Note'
import { All_Delivery_Notes } from './Pages/Finance_Manager/Delivery_Management/All_Delivery_Notes'
import { Update_Delivery_Note } from './Pages/Finance_Manager/Delivery_Management/Update_Delivery_Note'
import Hero from './Pages/Hero'
import { Manager } from './Pages/Manager'
import { Destribution } from './Pages/Finance_Manager/Destributor_Management/Destribution'
import { SignIn } from './Pages/SignIn'
import { DistributorList } from './Pages/Finance_Manager/Destributor_Management/DistributorList'
import { Finance_Dashboard } from './Pages/Finance_Manager/Delivery_Management/Finance_Dashborad'
import { Customer_SignUp } from './Pages/Customer/Customer_SignUp'
import FarmerPayments from './Components/Delivery Manager/FarmerPayments'
import EmployeeList from './Components/Delivery Manager/FarmerPaymentList'
import UpdateFarmnerPayment from './Components/Delivery Manager/UpdateFarmnerPayment'
import DistributeList from './Components/Distribution/DistributeList'
import InsertDistribute from './Components/Distribution/InsertDistribute'
import ShowDistributeDetail from './Components/Distribution/ShowDistributeDetail'
import UpdateDistribute from './Components/Distribution/UpdateDistribute'


import UserProfile from './Pages/Export_Manager/UserProfile';
import ChangeUsername from './Pages/Export_Manager/ChangeUsername';
import Insertexportdata from './Pages/Export_Manager/Insertexportdata';
import ViewExportedItems from './Pages/Export_Manager/ViewExportedItems';
import EditExportedItem from './Pages/Export_Manager/EditExportedItem';
import Ongoingorders from './Pages/Export_Manager/Ongoingorders'

import Dlist from './Pages/Inventory_Manager/Dlist';
import Dinsert from './Pages/Inventory_Manager/Dinsert';
import Dshow from './Pages/Inventory_Manager/Dshow';
import Dupdate from './Pages/Inventory_Manager/Dupdate';
import { OrderList } from './Pages/Order_Manager/OrderList'
import OrderForm from './Pages/Order_Manager/orderForm'
import UpdateForm from './Pages/Order_Manager/Updateorder'
import ToDeliveryList from './Components/Delivery Manager/ToDeliveryList'
import HomePage from './Components/Delivery Manager/HomePage'
import HarvestingList from './Pages/Collecting_manager/HarvestingList'
import InsertHarvest from './Pages/Collecting_manager/InsertHarvest'
import ShowHRDetail from './Pages/Collecting_manager/ShowHRDetail'
import UpdateHDetails from './Pages/Collecting_manager/UpdateHDetails'
import { Supplier_form } from './Pages/Supplier_manager/Supplier_form'
import { SupplierList } from './Pages/Supplier_manager/SupplierList'
import { SupplierDashboard } from './Pages/Supplier_manager/SupplierDashboard'
import Contact from './Pages/Contact'
import Services from './Pages/Services'
import AcceptedOders from './Components/Delivery Manager/AcceptedOders'
import InsertEmployee from './Components/Delivery Manager/InsertEmployee'
import Receivedorders from './Pages/Export_Manager/Receivedorders'
import Sentorders from './Pages/Export_Manager/Sentorders'
import Navbar from './Pages/Export_Manager/Navbar'
import AddOrder from './Pages/Order_Manager/Addorder'
import { MyOrders } from './Pages/Customer/MyOrders'
import { CancaledOrders } from './Pages/Finance_Manager/CancaledOrders'
import PaymentReturnForm from './Pages/Finance_Manager/PaymentReturnForm'
import PaymentReturnList from './Pages/Finance_Manager/PaymentReturnList'
import Updatestatus from './Pages/Export_Manager/Updatestatus'







const App = () => {
  return (
    <div>

     <UserProvider>
        <Routes>
          <Route index path='/' element={<Hero/>} />
          <Route index path='/home' element={<Home/>} />
          <Route index path='/admin' element={<SignUp/>} />
          <Route index path='/signin' element={<SignIn/>} />
          <Route index path='/financedashboard' element={<Finance_Dashboard/>} />
          <Route index path='/deliverynote' element={<Delivery_Note/>} />
          <Route index path='/alldeliverynote' element={<All_Delivery_Notes/>} />
          <Route index path='/updatedelivery/:id' element={<Update_Delivery_Note/>} />
          <Route index path='/manager' element={<Manager/>} />
          <Route index path='/destribution' element={<Destribution/>} />
          <Route index path='/distributorlist' element={<DistributorList/>} />          
          <Route index path='/signup' element={<Customer_SignUp/>} />       
          <Route index path='/contact' element={<Contact/>} />       
          <Route index path='/services' element={<Services/>} />       
          <Route index path='/paymentreturn' element={<PaymentReturnForm/>} />       
          <Route index path='/paymentreturnlist' element={<PaymentReturnList/>} />       

           {/* deliver manager */}
        
           <Route index path='/myorders' element={<MyOrders/>} />      
         {/* deliver manager */}
          <Route path='/farmerpayment' element={<FarmerPayments/>}/>   {/* index */}
          <Route path='/FarmerPaymentList' element={<EmployeeList/>}/>
          <Route path='/UpdateFarmnerPayment' element={<UpdateFarmnerPayment/>}/>
          <Route path='/UpdateFarmnerPayment/:process_id' element={<UpdateFarmnerPayment/>}/>
          <Route path='/todiliverylist' element={<ToDeliveryList/>}/>
          <Route path='/deliverydashboard' element={<HomePage/>}/>
          <Route path='/acceptedorders' element={<AcceptedOders/>}/>
          <Route path='/insertemployee' element={<InsertEmployee/>}/>

        {/* distributor manager */} 

          <Route path="/distributelist" element={<DistributeList />} />
          <Route path="/insertdistribute" element={<InsertDistribute />} />
          <Route path="/showdetails/:id" element={<ShowDistributeDetail />} />
          <Route path="/updatedetails/:id" element={<UpdateDistribute />} />
        
        {/*Export manager */}

          <Route path='/Ongoingorders' element={ <Ongoingorders/>}/> 
          <Route path='/UserProfile' element={<UserProfile/>}/>
          <Route path='/ChangeUsername' element={<ChangeUsername/>}/>
          <Route path='/Insertexportdata' element={<Insertexportdata/>}/>
          <Route path="/viewExporteditems" element={<ViewExportedItems/>} />
          <Route path="/editExportedItem/:id" element={<EditExportedItem/>} />
          <Route path="/recieveorders" element={<Receivedorders/>} />
          <Route path="/sentorders" element={<Sentorders/>} />
          <Route path="/exportdashboard" element={<Navbar/>} />
          <Route path="/cancaledorders" element={<CancaledOrders/>} />
          <Route path="/updatestatus" element={<Updatestatus/>} />


        {/*Inventroy manager */} 
          <Route path="/inventorylist" element={<Dlist />} /> {/* List component on root */}
          <Route path="/insert" element={<Dinsert />} /> {/* Insert component */}
          <Route path="/Dshow/:Employee_Id" element={<Dshow />} /> {/* Show details for specific employee */}
          <Route path="/Dupdate/:Employee_Id" element={<Dupdate />} /> {/* Update inventory for specific employee */}


        {/*Order manager */} 

        <Route path="/orderlist" element={<OrderList />} />
        <Route path="/add-order" element={<OrderForm />} />
        <Route path="/addorder" element={<AddOrder/>} />
        <Route path="/update-information/:id" element={<UpdateForm />} />


        {/* Collecting manager */}
        <Route path='/harvestinglist' element={<HarvestingList/>} />
        <Route path='/insertH' element={<InsertHarvest/>} />
        <Route path='/showdetailH/:id' element={<ShowHRDetail/>} />
        <Route path='/updateHDetails/:id' element={<UpdateHDetails/>} />

        {/* Supplier Manager */}
        <Route path='/supplier' element={<Supplier_form/>} />
        <Route path='/supplierlist' element={<SupplierList/>} />
        <Route path='/supplierdashboard' element={<SupplierDashboard/>} />
        </Routes>
     </UserProvider>
       
      
    </div>
  )
}

export default App