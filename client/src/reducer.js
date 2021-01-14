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

    return state;
}
