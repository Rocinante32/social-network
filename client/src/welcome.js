import React from "react";
import Registration from "./registration";
import { HashRouter, Route, Link } from "react-router-dom";
import Login from "./login";
import Reset from "./reset";
import NavBar from "./navbar";
import { Button } from "@material-ui/core";

export default function Welcome() {
    if (location.hash === "#/") {
        console.log("hash is: ", location.hash);
        return (
            <div>
                <div>
                    <HashRouter>
                        <NavBar type="login" />
                        <div>
                            <Route exact path="/" component={Registration} />
                            <Route path="/login" component={Login} />
                            <Route path="/reset" component={Reset} />
                        </div>
                    </HashRouter>
                </div>
            </div>
        );
    } else {
        return (
            <div>
                <div>
                    <HashRouter>
                        <NavBar type="register" />
                        <div>
                            <Route exact path="/" component={Registration} />
                            <Route path="/login" component={Login} />
                            <Route path="/reset" component={Reset} />
                        </div>
                    </HashRouter>
                </div>
            </div>
        );
    }
}
