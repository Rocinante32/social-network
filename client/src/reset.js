import { Component } from "react";
import axios from "./axios";
import { Link } from "react-router-dom";

export default class Reset extends Component {
    constructor() {
        super();
        this.state = {
            view: 1,
            code: "",
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

    handleReset() {
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
                    self.setState({
                        view: 2,
                        code: "",
                    });
                }
            })
            .catch(function (err) {
                console.log("error: ", err);
                self.setState({ error: true });
            });
    }

    handleVerify() {
        //send off user input to the server using axios POST registration
        console.log("button clicked");
        console.log("state of submit: ", this.state);
        const self = this;
        axios
            .post("/password/reset/verify", this.state)
            .then((response) => {
                console.log("response: ", response.data);
                if (response.data.error) {
                    console.log("error occured");
                    console.log("state: ", self.state);
                    self.setState({ error: true });
                } else {
                    console.log("no error :)");
                    self.setState({
                        view: 3,
                    });
                }
            })
            .catch(function (err) {
                console.log("error: ", err);
                self.setState({ error: true });
            });
    }

    render() {
        if (this.state.view === 1) {
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
                    <button onClick={() => this.handleReset()}>submit</button>
                </div>
            );
        } else if (this.state.view === 2) {
            return (
                <div>
                    {this.state.error && (
                        <p>
                            Something went wrong, please try entering your reset
                            code and new password again.
                        </p>
                    )}
                    <h1>Please enter the reset code and new password</h1>
                    <input
                        onChange={(e) => this.handleChange(e)}
                        name="code"
                        placeholder="code"
                        type="text"
                        value={this.state.code}
                    />
                    <input
                        onChange={(e) => this.handleChange(e)}
                        name="password"
                        placeholder="password"
                        type="password"
                    />
                    <button onClick={() => this.handleVerify()}>submit</button>
                </div>
            );
        } else if (this.state.view === 3) {
            return (
                <div>
                    <h3>Your password has been updated!</h3>
                    <div>
                        <p>
                            You may now <Link to="/login">Log in!</Link>
                        </p>
                    </div>
                </div>
            );
        }
    }
}
