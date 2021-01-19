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
            <h1>Welcome to the chat</h1>
            {chatMessages && (
                <div className="chat-container">
                    {chatMessages.map((msg) => (
                        <div key={msg.id} className="message">
                            <img src={msg.profile_pic} />
                            <h3>{msg.first + " " + msg.last}</h3>
                            <p>{msg.created_at}</p>
                            <p>{msg.message}</p>
                        </div>
                    ))}
                    <textarea onKeyDown={handleKeyDown} />
                </div>
            )}
        </>
    );
}
