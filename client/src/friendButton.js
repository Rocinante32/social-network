import { useState, useEffect } from "react";
import axios from "./axios";

export default function FriendButton({ otherUserId }) {
    const [buttonText, setButtonText] = useState("");

    useEffect(() => {
        // console.log("useEffect otherUserId: ", otherUserId);
        axios
            .get(`/friendship-status/${otherUserId}`)
            .then(({ data }) => {
                let text = friendshipStatusButtonText(data);
                setButtonText(text);
            })
            .catch((err) => {
                console.log("err in get req: ", err);
            });
    }, [otherUserId]);

    return (
        <>
            <button>{buttonText}</button>
        </>
    );
}

function friendshipStatusButtonText(friendshipStatus) {
    let buttonText = "Send Friend Request";
    const { userId } = friendshipStatus;

    if (friendshipStatus.rows.length == 1) {
        const { sender_id, recipient_id, accepted } = friendshipStatus.rows[0];
        if (accepted) {
            console.log("unfriend");
            buttonText = "Unfriend";
        } else if (sender_id == userId) {
            console.log("cancel req");
            buttonText = "Cancel Request";
        } else {
            buttonText = "Accept Friend Request";
        }
    }
    return buttonText;
}
