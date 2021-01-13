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

    function handleClick() {
        console.log("click, method is: ", buttonText);
        axios
            .post("/friendship-action", {
                otherUserId: otherUserId,
                buttonText: buttonText,
            })
            .then(({ data }) => {
                console.log("data from db: ", data);
                let text = friendshipStatusButtonText(data);
                console.log("text from update: ", text);
                setButtonText(text);
            });
    }

    return (
        <>
            <button onClick={() => handleClick()}>{buttonText}</button>
        </>
    );
}

function friendshipStatusButtonText(friendshipStatus) {
    let buttonText = "Send Friend Request";
    const { userId } = friendshipStatus;
    console.log("fship status var: ", friendshipStatus);

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
