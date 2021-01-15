import React from "react";
import axios from "./axios";
import { Button } from "@material-ui/core";

export default function Logout() {
    axios.post;

    function handleClick() {
        console.log("logout clicked");
        axios.post("/logout").then(() => {
            console.log("logged out");
            location.replace("/");
        });
    }

    return (
        <>
            <Button color="inherit" className="button" onClick={() => handleClick()}>
                Logout
            </Button>
        </>
    );
}
