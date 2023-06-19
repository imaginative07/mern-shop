import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

function PrivateRoute() {
    const { useInfo } = useSelector((state) => state.auth);
    
    return useInfo ? <Outlet /> : <Navigate to="/login" replace />;
}

export default PrivateRoute;
