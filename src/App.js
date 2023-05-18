import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './index.css';
import Login from './components/auth';
import SignupUser from './components/auth/signup';
import ResetEmail from './components/auth/resetEmail';
import ResetPassword from './components/auth/resetPassword';
import Dashboard from './components/admin';
import AllProducts from './components/admin/all_products';
import NewRequest from './components/admin/request_form';
import MyDependants from './components/admin/all_dependants';
import DependantRequest from './components/admin/dependant_request';
import PendingRequests from './components/admin/pending_request';
import AllStaffs from './components/admin/all_staff';
import AllCustomers from './components/admin/all_customers';
import { AuthProvider } from './context';
import ProtectedRoute from './context/protect'
import UpdateProduct from './components/admin/updateProduct';
import UpdateUser from './components/admin/updateUser';
import CartPage from './components/admin/cart_page';
import SaleProduct from './components/admin/sale_page';

function App() {
  return (
    <div className="App">
       <BrowserRouter>
          <AuthProvider>
          <Routes>
             <Route  path='/' element={ <Login  /> } />
             <Route  path='/register' element={ <ProtectedRoute> <SignupUser /> </ProtectedRoute> } />
             <Route path='/forget' element={ <ResetEmail /> } />
             <Route path='/reset' element={ <ResetPassword /> } />
             <Route path='/dashboard' element={ <ProtectedRoute> <Dashboard/>  </ProtectedRoute> } />
             <Route path='/products' element={ <ProtectedRoute>  <AllProducts /> </ProtectedRoute> } />
             <Route path='/pending_requests' element={ <ProtectedRoute>  <PendingRequests/>  </ProtectedRoute> } />
             <Route path='/new_product' element={ <ProtectedRoute> <NewRequest /> </ProtectedRoute> } />
             <Route path='/product/:id' element={ <ProtectedRoute> <UpdateProduct /> </ProtectedRoute> } />
             <Route path='/sale_product/:id' element={ <ProtectedRoute> <SaleProduct /> </ProtectedRoute> } />
             <Route path='/cart' element={ <ProtectedRoute> <CartPage /> </ProtectedRoute> } />
             <Route path='/dependants' element={ <ProtectedRoute>  <MyDependants />  </ProtectedRoute> } />
             <Route path='/new_dependant' element={ <ProtectedRoute>  <DependantRequest />  </ProtectedRoute>} />
             <Route path='/staffs' element={<ProtectedRoute>  <AllStaffs /> </ProtectedRoute> } />
             <Route path='/customers' element={ <ProtectedRoute>  <AllCustomers />  </ProtectedRoute>} />
             <Route  path='/customer/:id' element={ <ProtectedRoute> <UpdateUser/> </ProtectedRoute> } />
          </Routes>
          </AuthProvider>
       </BrowserRouter>
    </div>
  );
}

export default App;
