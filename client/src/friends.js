import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import axios from "./axios";
import { getList, acceptFriend, unfriend } from "./actions";

export default function Friends() {
    const dispatch = useDispatch();

    const friends = useSelector(
        (state) =>
            state.users && state.users.filter((user) => user.accepted == true)
    );
    console.log("friends: ", friends);

    const wannabes = useSelector(
        (state) =>
            state.users && state.users.filter((user) => user.accepted == false)
    );

    useEffect(() => {
        dispatch(getList());
    }, []);

    if (!friends && !wannabes) {
        return null;
    }

    return (
        <>
            <p>friends App</p>
            {/* <img src={wannabes[0].profile_pic} /> */}
            <div className="friends">
                {friends.map((user) => (
                    <div className="user" key={user.id}>
                        <img src={user.profile_pic} />
                        <h3>{user.first + " " + user.last}</h3>
                        <button onClick={() => dispatch(unfriend(user.id))}>
                            Unfriend
                        </button>
                    </div>
                ))}
            </div>
            <p>requests</p>

            <div className="wannabes">
                {wannabes.map((user) => (
                    <div className="user" key={user.id}>
                        <img src={user.profile_pic} />
                        <h3>{user.first + " " + user.last}</h3>
                        <button onClick={() => dispatch(acceptFriend(user.id))}>
                            Accept
                        </button>
                    </div>
                ))}
            </div>
        </>
    );
}
