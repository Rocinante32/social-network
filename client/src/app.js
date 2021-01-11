import { Component } from "react";
import axios from "./axios";
import Profile from "./profile";
import ProfilePic from "./profilepic";
import Uploader from "./uploader";
import { BrowserRouter, Route } from "react-router-dom";
import OtherProfile from "./otherprofile";
import FindPeople from "./findpeople";

export default class App extends Component {
    constructor() {
        super();
        this.state = {
            uploaderIsVisible: false,
        };
    }

    toggleUploader() {
        console.log("uploader toggled");
        this.setState({
            uploaderIsVisible: !this.state.uploaderIsVisible,
        });
    }

    setImage(newProfilePic) {
        this.setState(
            {
                profile_pic: newProfilePic,
            },
            this.toggleUploader()
        );
    }

    updateBio(newBio) {
        this.setState(
            {
                bio: newBio,
            },
            () => console.log("state after bio update: ", this.state)
        );
    }

    componentDidMount() {
        console.log("mounted!");
        axios
            .get("/user-info")
            .then((response) => {
                console.log("response: ", response);
                this.setState({
                    first: response.data.first,
                    last: response.data.last,
                    email: response.data.email,
                    profile_pic: response.data.profile_pic,
                    bio: response.data.bio,
                    id: response.data.id,
                });
                console.log("user data retrieved");
            })
            .catch((err) => {
                console.log(err);
            });
    }

    render() {
        return (
            <BrowserRouter>
                <div>
                    <div id="navbar">
                        <p id="logo">This is the app LOGO</p>
                        <ProfilePic
                            first={this.state.first}
                            last={this.state.last}
                            profile_pic={this.state.profile_pic}
                            toggleUploader={() => this.toggleUploader()}
                        />
                        {this.state.uploaderIsVisible && (
                            <Uploader
                                setImage={(newProfilePic) =>
                                    this.setImage(newProfilePic)
                                }
                                toggleUploader={() => this.toggleUploader()}
                            />
                        )}
                    </div>
                    <div id="app-main">
                        <Route
                            exact
                            path="/"
                            render={() => (
                                <Profile
                                    first={this.state.first}
                                    last={this.state.last}
                                    profile_pic={this.state.profile_pic}
                                    bio={this.state.bio}
                                    updateBio={(newBio) =>
                                        this.updateBio(newBio)
                                    }
                                    toggleModal={() => this.toggleModal()}
                                />
                            )}
                        />
                        <Route
                            exact
                            path="/users"
                            render={() => <FindPeople />}
                        />

                        <Route
                            exact
                            path="/user/:id"
                            render={(props) => (
                                <OtherProfile
                                    key={props.match.url}
                                    match={props.match}
                                    history={props.history}
                                />
                            )}
                        />
                    </div>
                </div>
            </BrowserRouter>
        );
    }
}
