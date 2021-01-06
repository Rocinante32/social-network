import { Component } from "react";

export default class App extends Component {
    constructor() {
        super();
        this.state = {};
    }

    componentDidMount() {
        //this is the same as mount in Vue.js
        console.log("mounted!");
    }

    render() {
        return (
            <div>
                <p>This is the app</p>
            </div>
        );
    }
}
