import io from "socket.io-client";
import { postNewMessage, addTenLastMessagesToRedux } from "./actions";

export let socket;

export const init = (store) => {
    if (!socket) {
        socket = io.connect();
    }
    socket.on("new message and user", (userAndMessage) => {
        //hand over to redux, dispatch an action
        store.dispatch(postNewMessage(userAndMessage));
    });

    socket.on("10 most recent messages", (mostRecentMessages) => {
        // console.log("return from db to client: ", mostRecentMessages);
        // this will run when a new user connects (logs in)
        store.dispatch(addTenLastMessagesToRedux(mostRecentMessages));
    });
};
