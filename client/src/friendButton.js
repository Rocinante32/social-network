import { useState, useEffect } from "react";
import axios from "./axios";

export default function FriendButton({ otherUserId }) {
    const { buttonText, setButtonText } = useState();

    useEffect(() => {
        console.log("useEffect otherUserId: ", otherUserId);
        axios.get(`/friendship-status/${otherUserId}`).then(({ data }) => {
            console.log("data from db: ", data[0]);
            if (data.length != 1) {
                () => {
                    setButtonText("Send Friend Request");
                };
            }
            console.log("data length from db: ", data.length);

            console.log("button text: ", buttonText);
            // friendshipStatusButtonText(data);
        });
    });
    console.log("friend status ", buttonText);

    return (
        <>
            <button>{buttonText}</button>
        </>
    );
}

function friendshipStatusButtonText(friendshipStatus) {
    const { senderId, recipientId, accepted } = friendshipStatus;
    console.log("friend status ", friendshipStatus);
    if (!friendshipStatus) {
        console.log("no entry in db");
    }
}
