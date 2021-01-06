import React from "react";

/*
    ProfilePic's jobs:
    1. render the profile pic
    2. if there is no profile pic, render a default image 
    3. when the user clicks on the profile pic, toggle the Uploader component
*/

/*
    ProfilePic's props:
    1. profilePic
    2. toggleUploader
    3. (optional) the user's name, which can be set as the alt attribute of the img
*/

export default function ProfilePic({
    first,
    last,
    profile_pic,
    toggleUploader,
}) {
    console.log(
        "props in ProfilePic: ",
        first,
        last,
        profile_pic,
        toggleUploader
    );
    return (
        <div>
            {!profile_pic && (
                <img
                    src="../default-profile.png"
                    alt="default pic"
                    onClick={() => toggleUploader()}
                />
            )}

            {profile_pic && (
                <img
                    src={profile_pic}
                    alt={(first, last)}
                    onClick={() => toggleUploader()}
                />
            )}
            <h1>{first}</h1>
        </div>
    );
}
