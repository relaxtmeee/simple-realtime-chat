import { useContext } from "react";
import { useAuthState } from 'react-firebase-hooks/auth';
import { signOut } from "firebase/auth";
import { AppBar } from "@mui/material";
import { Box } from "@mui/system";
import { Toolbar } from "@mui/material";
import { Typography } from "@mui/material";
import { Button } from "@mui/material";
import { NavLink } from "react-router-dom";
import { LOGIN_ROUTE } from "../utils/consts";

import { Context } from "../index";

const Navbar = () => {

    const {auth} = useContext(Context);
    const [user] = useAuthState(auth);


    return (

    <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
        <Toolbar >
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Realtime - Chat
            </Typography>
            {user ?
                <Button onClick={() => signOut(auth)} variant={"outlined"} color="inherit">Log out</Button>
                :
                <NavLink to={LOGIN_ROUTE}>
                    <Button variant={"outlined"} color="inherit">Log in</Button>
                </NavLink>
            }
        </Toolbar>
        </AppBar>
    </Box>

    );
};

export default Navbar;