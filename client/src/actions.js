import axios from "./axios";

//this will contain all of our action creators
//action creator is just a function that returns an object

export async function getList() {
    const { data } = await axios.get("/getfriends");
    console.log("from actions.js: ", data);
    return {
        type: "GET_LIST",
        users: data.users,
    };
}

export async function acceptFriend(id) {
    const { data } = await axios.post("/accept-friend", { otherUserId: id });
    console.log("from acceptFriend actions.js: ", data);
    return {
        type: "ACCEPT_FRIEND_REQUEST",
        id: data.otherUserId,
    };
}

export async function unfriend(id) {
    const { data } = await axios.post("/unfriend", { otherUserId: id });
    console.log("from unfriend actions.js: ", data);
    return {
        type: "UNFRIEND",
        id: data.otherUserId,
    };
}

export async function addTenLastMessagesToRedux(data) {
    // const { data } = await axios.get("/getfriends");
    // console.log("from actions.js: ", data);
    return {
        type: "GET_MESSAGES",
        messages: data,
    };
}

export async function postNewMessage(data) {
    // const { data } = await axios.get("/getfriends");
    console.log("from actions.js: ", data);
    return {
        type: "POST_MESSAGES",
        data: data,
    };
}
