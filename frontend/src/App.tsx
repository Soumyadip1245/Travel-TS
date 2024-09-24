import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Admin from './components/Admin/Admin';
import Agreement from './components/Agreement/Agreement';
import { NotificationProvider } from './components/Context/NotificationContext';
import { UserProvider } from './components/Context/User';
import Invoice from './components/Invoice/Invoice';
import Login from './components/Login/Login';
import Register from './components/Login/Register';
import ProtectedRoute from './components/Routing/ProtectedRoute';
import Supplier from './components/Supplier/Supplier';
import User from './components/User/User';
import './index.css';
export interface RoutesType {
  path: string;
  element: React.ReactElement
  role: string;
}
const routes: RoutesType[] = [
  { path: "/user", element: <User />, role: "User" },
  { path: "/supplier", element: <Supplier />, role: "Supplier" },
  { path: "/admin", element: <Admin />, role: "Admin" },
  { path: "/", element: <Login />, role: "Empty" },
  { path: "/register", element: <Register />, role: "AllEmpty" },
  { path: "/agreement/:id", element: <Agreement />, role: "All" },
  { path: "/invoice/:id", element: <Invoice />, role: "All" }

]
const App = () => {
  return (
    <NotificationProvider>
 <UserProvider>
    <BrowserRouter>
      <div className="app">
        <Routes>
          {routes.map((curr,index) => (
          curr.role == "All"?
          <Route path={curr.path} element={curr.element}/>
          :
          <Route path={curr.path} element={<ProtectedRoute path={curr.path} element={curr.element} role={curr.role} routes={routes}/>}/>
          ))}
        </Routes>
      </div>
    </BrowserRouter>
  </UserProvider>
    </NotificationProvider>
   
 
  )
}

export default App
