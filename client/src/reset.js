import { Component } from "react";
import axios from "./axios";

export default class Reset extends Component {
    constructor() {
        super();
        this.state = {
            view: 1,
        };
    }

    handleChange(e) {
        this.setState(
            {
                //name of input field: user input
                [e.target.name]: e.target.value,
            },
            () => console.log("this.state in handleChange: ", this.state)
        );
    }

    handleClick() {
        //send off user input to the server using axios POST registration
        console.log("button clicked");
        console.log("state of submit: ", this.state);
        const self = this;
        axios
            .post("/password/reset/start", this.state)
            .then((response) => {
                console.log("response: ", response.data);
                if (response.data.error) {
                    console.log("error occured");
                    console.log("state: ", self.state);
                    self.setState({ error: true });
                } else {
                    console.log("no error :)");
                    self.setState({ view: 2 });
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
                <h1>Please enter your email address</h1>
                <input
                    onChange={(e) => this.handleChange(e)}
                    name="email"
                    placeholder="email"
                    type="text"
                />
                <button onClick={() => this.handleClick()}>submit</button>
            </div>
        );
    }
}
