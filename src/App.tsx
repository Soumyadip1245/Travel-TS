import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Admin from './components/Admin/Admin';
import AdminPackage from './components/Admin/AdminPackage';
import Agreement from './components/Agreement/Agreement';
import { NotificationProvider } from './components/Context/NotificationContext';
import { UserProvider } from './components/Context/User';
import Login from './components/Login/Login';
import ProtectedRoute from './components/Routing/ProtectedRoute';
import './index.css';
export interface RoutesType {
  path: string;
  element: React.ReactElement
  role: string;
}
const routes: RoutesType[] = [
  { path: "/user", element: <AdminPackage />, role: "User" },
  { path: "/supplier", element: <AdminPackage />, role: "Supplier" },
  { path: "/admin", element: <Admin />, role: "Admin" },
  { path: "/", element: <Login />, role: "Empty" },
  { path: "/agreement/:id", element: <Agreement />, role: "All" }

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
