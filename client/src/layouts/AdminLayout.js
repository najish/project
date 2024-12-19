import {Outlet} from 'react-router-dom'
import Header from '../components/admin/Header'
import Footer from '../components/admin/Footer'

const AdminLayout = () => {
    return (
        <div className="admin-layout">
            <Header />
            <main className="admin-main">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};

export default AdminLayout;
