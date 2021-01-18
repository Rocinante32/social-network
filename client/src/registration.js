//registration will be a class component
import { Component } from "react";
import axios from "./axios";
import { Link } from "react-router-dom";
import { Button, TextField } from "@material-ui/core";

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
                <div id="navbar">
                    <div id="logo-div">
                        <h1 id="logo">fakebook</h1>
                    </div>
                    <div id="icon-div">
                        <Button
                            color="inherit"
                            className="button"
                            component={Link}
                            to="/login"
                            id="login"
                        >
                            Login
                        </Button>
                    </div>
                </div>
                {this.state.error && <p>Something went wrong</p>}
                <h1>Registration</h1>
                <form>
                    <TextField
                        onChange={(e) => this.handleChange(e)}
                        name="first"
                        placeholder="first name"
                        type="text"
                    />
                    <TextField
                        onChange={(e) => this.handleChange(e)}
                        name="last"
                        placeholder="last name"
                        type="text"
                    />
                    <TextField
                        onChange={(e) => this.handleChange(e)}
                        name="email"
                        placeholder="email"
                        type="text"
                    />
                    <TextField
                        onChange={(e) => this.handleChange(e)}
                        name="password"
                        placeholder="password"
                        type="password"
                    />
                </form>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => this.handleClick()}
                >
                    submit
                </Button>
            </div>
        );
    }
}
