import { Component } from "react";

/*
    Uploader's jobs:
    1. store the image the user selected in its own state 
    2. send the file to the server 
    3. let App know that there's a new profile picture, and that App needs to update its own state
*/

export default class Uploader extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    handleClick() {
        // setImage is called in Uploader but it runs in App!
        // this means it is updating the state of App even though it's not called in App
        this.props.setImage(
            "I'm an argument being passed from Uploader to App"
        );
    }

    render() {
        console.log("this.props in Uploader: ", this.props);
        return (
            <div>
                <h1 onClick={() => this.handleClick()}>uploader</h1>
            </div>
        );
    }
}
