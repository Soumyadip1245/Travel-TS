import React, { FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { RoutesType } from '../../App';
import { fetchDestinations, fetchUserById } from '../Apis/Api';
import { useUserContext } from '../Context/User';
import Login from '../Login/Login';
import Register from '../Login/Register';
interface ProtectedRouteProps {
    element: React.ReactElement;
    role: string;
    path: string;
    routes: RoutesType[]
}

const ProtectedRoute:FC<ProtectedRouteProps> = (props) => {
    const { user,setUser,destination, setDestination} = useUserContext();
    const id = sessionStorage.getItem('userId')
    const navigate = useNavigate()
    useEffect(()=>{
        
        const fetchAndRedirect = async () =>{
            if(destination?.length == 0){
                const response = await fetchDestinations()
                setDestination(response)
            }
            if(id){
                const userData = await fetchUserById(parseInt(id));
                setUser(userData)
                const redirectPath = props.routes.find(r => r.role === userData.role?.name)?.path! ;
                if(userData.role?.name == "AllEmpty"){
                    navigate(redirectPath)
                }
                else if (userData.role?.name !== props.role) {
                    
                    navigate(redirectPath);
                }
                else {
                    navigate(props.path);
                }
            }
            else{
                console.log(props.path)
                props.path == "/register" ? navigate("/register"): navigate("/")
            }
           
        }
        fetchAndRedirect();
    },[id,props.path,setUser,navigate])
  return (
    <>
     { user && user.role?.name == props.role ? props.element : props.path == "/register"? <Register/>: <Login />}
    </>
  )
}

export default ProtectedRoute
