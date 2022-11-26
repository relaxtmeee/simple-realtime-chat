import { Context } from "../index";
import { useContext } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { privateRoutes, publicRoutes } from "../routes";
import { CHAT_ROUTE, LOGIN_ROUTE } from "../utils/consts";
import { useAuthState } from 'react-firebase-hooks/auth';

const AppRouter = () => {

    const {auth} = useContext(Context);
    const [user] = useAuthState(auth);

    return user ?
        (
            <Routes>
                <Route path="*" element={<Navigate replace to={CHAT_ROUTE} />} />
                {privateRoutes.map(({path, Component}) => {
                    return <Route key={path} path={path} element={Component} />
                })}
                
            </Routes>
        ) 
        :
        (  
            <Routes>
                <Route path="*" element={<Navigate replace to={LOGIN_ROUTE} />} />
                {publicRoutes.map(({path, Component}) => {
                    return <Route key={path} path={path} element={Component} />
                })}
                
            </Routes>
        )
};
export default AppRouter;