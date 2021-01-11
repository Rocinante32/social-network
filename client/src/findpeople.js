import { useState, useEffect } from "react";
import axios from "./axios";

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
        <div>
            {!query && (
                <>
                    <h2>Our latest users</h2>
                </>
            )}

            <p>Use the search to find users by name</p>
            <input
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Type user here..."
            />
            {!users.length && <p>No users found</p>}

            <ul>
                {users.map((user) => (
                    <li key={user.id}>
                        {user.first} {user.last}
                        <img src={user.profile_pic} alt={first + last} />
                    </li>
                ))}
            </ul>
        </div>
    );
}

{
    /* <ul>
    {countries.map((country, idx) => (
        <li key={idx}>{country}</li>
    ))}
    {!countries.length && query && <li>Nothing Found</li>}
</ul>; */
}
