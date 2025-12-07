import React from 'react'
import AppLayout from '../layout/AppLayout' 
import {Outlet} from 'react-router-dom'
const ProtectedRoute = () => {
    const isAuthenticated = true
    const loading = false

    if(loading) {
        return (
            <div>
                <p>Loading...</p>
            </div>
        )
    }
    return isAuthenticated ? (
        <AppLayout>
            <Outlet />
        </AppLayout>
    ) : (
        <Navigate to="/login" replace />
    );
  
}

export default ProtectedRoute
