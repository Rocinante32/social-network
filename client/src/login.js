import { Component } from "react";
import axios from "./axios";
import { Link } from "react-router-dom";
import { TextField, Button } from "@material-ui/core";

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
        const self = this;
        axios
            .post("/login", this.state)
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
            <div className="login bodyTextCol">
                {this.state.error && <p>Something went wrong</p>}
                <h1>Login</h1>
                <TextField
                    onChange={(e) => this.handleChange(e)}
                    name="email"
                    placeholder="email"
                    type="text"
                    id="standard-basic"
                />
                <TextField
                    onChange={(e) => this.handleChange(e)}
                    name="password"
                    placeholder="password"
                    type="password"
                    id="standard-basic"
                />
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => this.handleClick()}
                >
                    submit
                </Button>
                <div>
                    <Link to="/reset">Click here to reset your password</Link>
                </div>
            </div>
        );
    }
}
