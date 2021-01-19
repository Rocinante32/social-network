export function reducer(state = {}, action) {
    if (action.type == "GET_LIST") {
        state = {
            ...state,
            users: action.users,
        };
    }

    if (action.type == "ACCEPT_FRIEND_REQUEST") {
        state = {
            ...state,
            users: state.users.map((user) => {
                if (user.id == action.id) {
                    return {
                        ...user,
                        accepted: true,
                    };
                } else {
                    return user;
                }
            }),
        };
    }

    if (action.type == "UNFRIEND") {
        state = {
            ...state,
            users: state.users.filter((user) => {
                return user.id != action.id;
            }),
        };
    }

    if (action.type == "GET_MESSAGES") {
        // console.log("state in reducer: ", state);
        // console.log("reducer msg's: ", action.messages);
        state = {
            ...state,
            messages: action.messages,
        };
        console.log("state in reducer: ", state);
    }

    if (action.type == "POST_MESSAGES") {
        // console.log("state in reducer: ", state);
        console.log("reducers new msg: ", action.data);
        state = {
            ...state,
            messages: [...state.messages, action.data],
        };
        console.log("state in reducer: ", state);
    }

    return state;
}
