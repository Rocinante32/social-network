import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import axios from "./axios";
import { getList, acceptFriend, unfriend } from "./actions";
import { Button } from "@material-ui/core";

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
            <h3>Your Friends</h3>
            {!friends && <p>You have no friends...</p>}
            <div className="friends">
                {friends.map((user) => (
                    <div className="user" key={user.id}>
                        <img src={user.profile_pic} />
                        <div className="user-req-details">
                            <h3>{user.first + " " + user.last}</h3>
                            <Button
                                className="smallerButton"
                                variant="contained"
                                color="secondary"
                                size="small"
                                onClick={() => dispatch(unfriend(user.id))}
                            >
                                Unfriend
                            </Button>
                        </div>
                    </div>
                ))}
            </div>
            <h3>Pending Requests</h3>

            <div className="wannabes">
                {wannabes.map((user) => (
                    <div className="user" key={user.id}>
                        <img src={user.profile_pic} />
                        <div className="user-req-details">
                            <h3>{user.first + " " + user.last}</h3>
                            <Button
                                className="smallerButton"
                                variant="contained"
                                color="primary"
                                size="small"
                                onClick={() => dispatch(acceptFriend(user.id))}
                            >
                                Accept
                            </Button>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}
