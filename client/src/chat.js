import { useSelector } from "react-redux";
import { socket } from "./socket";

export default function Chat() {
    const chatMessages = useSelector((state) => state && state.messages);

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            console.log("enter has been pressed");
            socket.emit("my new chat message", e.target.value);
            e.target.value = null;
        }
    };
    // console.log("chatmsg: ", chatMessages);

    return (
        <>
            <h1 className="bodyTextCol">Welcome to the chat</h1>
            {chatMessages && (
                <div className="chat-container">
                    {chatMessages.map((msg) => (
                        <div key={msg.id} className="message">
                            <div className="messageUser">
                                <img src={msg.profile_pic} />
                                <p>{msg.first + " " + msg.last}</p>
                            </div>
                            <div className="messageTxt">
                                <p>{msg.message}</p>
                                <p className="messageDate">{msg.created_at}</p>
                            </div>
                        </div>
                    ))}
                    <textarea onKeyDown={handleKeyDown} />
                </div>
            )}
        </>
    );
}
