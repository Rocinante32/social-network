import React from "react";

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
