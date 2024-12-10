import React from 'react'
import { Outlet } from 'react-router-dom'

const AdminLayout = () => {
    return (

        <div>
            <header>Admin Header</header>
            <aside>Admin sidebar</aside>
            <main>
                <Outlet />
            </main>
        </div>
    )

}


export default AdminLayout