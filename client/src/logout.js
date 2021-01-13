import React from "react";
import axios from "./axios";

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
            <button onClick={() => handleClick()}>Logout</button>
        </>
    );
}
