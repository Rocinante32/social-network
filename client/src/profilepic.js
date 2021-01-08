import React from "react";

export default function ProfilePic({
    first,
    last,
    profile_pic,
    toggleUploader,
}) {
    return (
        <div className="pic-div">
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
            <h1>{first}</h1>
        </div>
    );
}
