import React, { useState } from "react";
import { Button } from "@material-ui/core";
import { HashRouter, Route, Link } from "react-router-dom";

export default function NavBar(props) {
    const [login, setLogin] = useState(true);

    function toggleLogin() {
        console.log("Login toggled");
        setLogin(!login);
    }

    /// need to update the state on a click to allow the component to re render and show correct button type

    console.log("state from navbar", login);
    if (login) {
        return (
            <HashRouter>
                <div id="navbar">
                    <div id="logo-div">
                        <h1 id="logo">fakebook</h1>
                    </div>
                    <div id="icon-div">
                        <Button
                            color="inherit"
                            className="button"
                            component={Link}
                            to="/login"
                            id="login"
                            onClick={() => toggleLogin()}
                        >
                            Login
                        </Button>
                    </div>
                </div>
            </HashRouter>
        );
    } else {
        return (
            <HashRouter>
                <div id="navbar">
                    <div id="logo-div">
                        <h1 id="logo">fakebook</h1>
                    </div>
                    <div id="icon-div">
                        <Button
                            color="inherit"
                            className="button"
                            component={Link}
                            to="/"
                            id="login"
                            onClick={() => toggleLogin()}
                        >
                            Register
                        </Button>
                    </div>
                </div>
            </HashRouter>
        );
    }
}
