import React from "react";
import { Component } from "react";
import axios from "./axios";

export default class BioEditor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            textareaVisible: false,
            draftBio: "",
        };
    }
    toggleTextarea() {
        if (this.props.bio) {
            this.setState({
                draftBio: this.props.bio,
            });
        }
        this.setState({
            textareaVisible: !this.state.textareaVisible,
        });
    }

    handleChange(e) {
        this.setState({
            //name of input field: user input
            draftBio: e.target.value,
        });
    }

    handleClick() {
        //send off user input to the server using axios POST registration
        const self = this;
        axios
            .post("/bio", this.state)
            .then((response) => {
                console.log("response: ", response.data);
                if (response.data.error) {
                    console.log("error occured");
                    console.log("state: ", self.state);
                    self.setState({ error: true });
                } else {
                    console.log("no error :)");
                    self.props.updateBio(this.state.draftBio);
                    this.toggleTextarea();
                }
            })
            .catch(function (err) {
                console.log("error: ", err);
                self.setState({ error: true });
            });
    }

    render() {
        // console.log("state from bio Ed: ", this.state);
        // console.log("props from bio Ed: ", this.props);
        return (
            <>
                {!this.props.bio && !this.state.textareaVisible && (
                    <div>
                        <p>No bio added ....</p>
                        <button onClick={() => this.toggleTextarea()}>
                            Add your bio
                        </button>
                    </div>
                )}
                {this.props.bio && !this.state.textareaVisible && (
                    <div>
                        <p>{this.props.bio}</p>
                        <button onClick={() => this.toggleTextarea()}>
                            Update
                        </button>
                    </div>
                )}

                {this.state.textareaVisible && (
                    <div>
                        <textarea
                            value={this.state.draftBio}
                            onChange={(e) => this.handleChange(e)}
                        />
                        <button onClick={() => this.toggleTextarea()}>
                            Cancel
                        </button>
                        <button onClick={() => this.handleClick()}>Save</button>
                    </div>
                )}
            </>
        );
    }
}
