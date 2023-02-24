import { Navigate, Outlet } from "react-router-dom"

export const AuthGuards = () => {
    const user = JSON.parse(window.localStorage.getItem('loggedEcommerceUser'))
    console.log(user)
    return user.role === 'ADMIN' ? <Outlet/> : <Navigate replace to='/'/>
}

export default AuthGuards