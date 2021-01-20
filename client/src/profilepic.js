import React from "react";
import axios from "./axios";
import { Link } from "react-router-dom";
import { Button, Menu, MenuItem } from "@material-ui/core";

export default function ProfilePic({
    first,
    last,
    profile_pic,
    toggleUploader,
}) {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    function handleLogout() {
        console.log("logout clicked");
        axios.post("/logout").then(() => {
            console.log("logged out");
            location.replace("/");
        });
    }
    {
        return (
            <div className="pic-div">
                <Button
                    className="button"
                    aria-controls="simple-menu"
                    aria-haspopup="true"
                    onClick={handleClick}
                >
                    {first}
                </Button>
                <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                >
                    <MenuItem
                        onClick={handleClose}
                        component={Link}
                        to="/delete"
                    >
                        My account
                    </MenuItem>
                    <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </Menu>
                {!profile_pic && (
                    <img
                        src="../default-profile.png"
                        alt="default pic"
                        className="profile-pic"
                        onClick={() => toggleUploader()}
                    />
                )}

                {profile_pic && (
                    <img
                        src={profile_pic}
                        alt={(first, last)}
                        className="profile-pic"
                        onClick={() => toggleUploader()}
                    />
                )}
            </div>
        );
    }
}
