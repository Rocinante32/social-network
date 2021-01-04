//registration will be a class component
import { Component } from "react";
import axios from "axios";

export default class Registration extends Component {
    constructor() {
        super();
        this.state = {};
    }

    handleChange(e) {
        this.setState({
            //name of input field: user input
            [e.target.name]: e.target.value,
        });
    }

    handleClick() {
        //send off user input to the server using axios POST registration
        console.log("button clicked");
        console.log("state of submit: ", this.state);
        const self = this;
        axios
            .post("/registration", this.state)
            .then((response) => {
                console.log("response: ", response.data);
                if (response.data.error) {
                    console.log("error occured");
                    console.log("state: ", self.state);
                    self.setState({ error: true });
                } else {
                    console.log("no error :)");
                    location.replace("/");
                }
            })
            .catch(function (err) {
                console.log("error: ", err);
                self.setState({ error: true });
            });
    }

    render() {
        return (
            <div>
                {this.state.error && <p>Something went wrong</p>}
                <h1>Registration</h1>
                <input
                    onChange={(e) => this.handleChange(e)}
                    name="first"
                    placeholder="first name"
                    type="text"
                />
                <input
                    onChange={(e) => this.handleChange(e)}
                    name="last"
                    placeholder="last name"
                    type="text"
                />
                <input
                    onChange={(e) => this.handleChange(e)}
                    name="email"
                    placeholder="email"
                    type="text"
                />
                <input
                    onChange={(e) => this.handleChange(e)}
                    name="password"
                    placeholder="password"
                    type="password"
                />
                <button onClick={() => this.handleClick()}>submit</button>
            </div>
        );
    }
}
