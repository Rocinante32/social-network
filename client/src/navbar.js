import React from "react";
import {
    AppBar,
    MenuIcon,
    IconButton,
    Typography,
    Toolbar,
    Button,
    Avatar,
} from "@material-ui/core";
import Logout from "./logout";

export default function NavBar() {
    return (
        <div>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h3" color="inherit">
                        Social Media App
                    </Typography>
                    <Button color="inherit">Login</Button>
                    <Logout />
                    <Avatar></Avatar>
                </Toolbar>
            </AppBar>
        </div>
    );
}
