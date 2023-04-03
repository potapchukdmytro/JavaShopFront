import AdminHeader from "./AdminHeader";
import {Outlet, useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {IAuthUser} from "../../auth/types";
import {useEffect} from "react";

const AdminLayout = () => {

    const navigate = useNavigate();
    const {isAuth, user} = useSelector((store: any)=> store.auth as IAuthUser);
    let isAdmin = false;

    if(isAuth && user) {
        isAdmin = user.roles.includes("admin");
    }

    useEffect(() => {
        if(!isAdmin) {
            navigate("/login");
        }
    },[]);

    return (
        <>
            <AdminHeader />
            <div>
                {isAdmin && <Outlet />}
            </div>
        </>
    );
}

export default AdminLayout;