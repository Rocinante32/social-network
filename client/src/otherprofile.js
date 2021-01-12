import { Component } from "react";
import axios from "./axios";
import FriendButton from "./friendButton";

export default class OtherProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        const id = this.props.match.params.id;
        axios
            .get("/other-userinfo/" + id)
            .then((response) => {
                console.log("response from other info get: ", response);
                if (this.props.match.params.id == response.data.userId) {
                    this.props.history.push("/");
                }
                this.setState({
                    first: response.data.first,
                    last: response.data.last,
                    profile_pic: response.data.profile_pic,
                    bio: response.data.bio,
                });
                console.log("user data retrieved");
            })
            .catch((err) => {
                console.log(err);
            });
    }

    render() {
        const { first, last, profile_pic, bio } = this.state;
        return (
            <>
                <div className="profile">
                    <img src={profile_pic} />
                    <h3>
                        {first} {last}
                    </h3>
                    {!bio && <p>No bio yet</p>}
                    {bio && <p>{bio}</p>}
                </div>
                <FriendButton otherUserId={this.props.match.params.id} />
            </>
        );
    }
}
