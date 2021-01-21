import { useState, useEffect } from "react";
import axios from "./axios";
import TextField from "@material-ui/core/TextField";

export default function FindPeople() {
    const [query, setQuery] = useState("");
    const [users, setUsers] = useState([]);

    useEffect(() => {
        if (!query) {
            axios.get("/users-info").then(({ data }) => {
                console.log("get req from db: ", data);
                setUsers(data);
                console.log("state after set: ", users);
            });
        } else {
            axios.get(`/users-info/${query}`).then(({ data }) => {
                console.log("db response: ", data);
                setUsers(data);
            });
        }
    }, [query]);

    console.log("query: ", query);
    console.log("state after set outside of effect: ", users);
    // console.log("********* RENDERING <FindPeople /> *************");
    return (
        <div className="bodyTextCol">
            <h1>Find People</h1>
            {!query && (
                <>
                    <h2>Our latest users</h2>
                </>
            )}

            <p>Use the search to find users by name</p>
            <TextField
                id="standard-basic"
                onChange={(e) => setQuery(e.target.value)}
                label="Search here ..."
            />
            {!users.length && <p>No users found</p>}

            <div className="foundUsers">
                {users.map((user) => (
                    <div className="user" key={user.id}>
                        {!user.profile_pic && (
                            <img src="../default-profile.png" />
                        )}
                        {user.profile_pic && (
                            <img
                                src={user.profile_pic}
                                alt={`${user.first} ${user.last}`}
                            />
                        )}

                        <a href={`/user/${user.id}`}>
                            {user.first} {user.last}
                        </a>
                    </div>
                ))}
            </div>
        </div>
    );
}
