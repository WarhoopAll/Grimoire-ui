import { useContext, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { publicRoutes, authRoutes } from "@/routes/routes";
import { UserContext } from "@/context/userContext";
import Maintenance from "@/pages/maintenance";
import { useApiStatus } from "@/context/apiStatus";

export default function AppRouter() {
    const location = useLocation();
    const { isAuth } = useContext(UserContext);
    const { isApiAvailable } = useApiStatus();

    useEffect(() => {
        document.querySelector('html').style.scrollBehavior = 'auto';
        window.scroll({ top: 0 });
        document.querySelector('html').style.scrollBehavior = '';
    }, [location]);

    if (!isApiAvailable) {
        return <Maintenance />;
    }

    return (
        <Routes>
            {isAuth && authRoutes.map(({ path, Component }) => (
                <Route key={path} path={path} element={<Component />} />
            ))}
            {publicRoutes.map(({ path, Component }) => (
                <Route key={path} path={path} element={<Component />} />
            ))}
        </Routes>
    );
}