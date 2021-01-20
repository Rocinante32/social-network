import React from "react";
import axios from "./axios";
import { Button } from "@material-ui/core";

export default function Delete() {
    axios.post;

    function handleClick() {
        console.log("delete clicked");
        axios.post("/delete").then(() => {
            console.log("dlete acc");
            location.replace("/");
        });
    }

    return (
        <div className="deleteAcc">
            <h1>Would you like to delete your account?</h1>
            <p>
                This process is final and all data will be erased, are you sure
                you would like to continue?
            </p>
            <Button
                color="secondary"
                variant="contained"
                className="button"
                onClick={() => handleClick()}
            >
                Delete
            </Button>
        </div>
    );
}
