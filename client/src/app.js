import { Component } from "react";
import axios from "./axios";
import ProfilePic from "./profilepic";
import Uploader from "./uploader";

export default class App extends Component {
    constructor() {
        super();
        this.state = {
            uploaderIsVisible: false,
        };
    }

    toggleUploader() {
        this.setState({
            uploaderIsVisible: !this.state.uploaderIsVisible,
        });
    }

    setImage(newProfilePic) {
        /*
            This method allows Uploader to communicate with App.
                - This method is passed to Uploader as a prop
                - Uploader can call this method, and can pass it an argument
                - Uploader calls setImage, but setImage will run in App
                - The result is that the state of App will be updated 
        */
        console.log("newProfilePic: ", newProfilePic);
        this.setState({
            profile_pic: newProfilePic,
        });
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
                });
                console.log("user data retrieved");
                console.log("state after db query", this.state);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    render() {
        return (
            <div>
                <p>This is the app LOGO</p>
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
                    />
                )}
            </div>
        );
    }
}
