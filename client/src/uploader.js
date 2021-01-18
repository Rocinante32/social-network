import { Component } from "react";
import axios from "./axios";
import { Button } from "@material-ui/core";

export default class Uploader extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    handleChange(e) {
        console.log("e target ", e.target.files[0]);
        this.setState({
            file: e.target.files[0],
        });
        console.log("state after update ", this.state);
    }

    handleUpload(e) {
        //prevent default behaviour of button ( use e.preventDefault() )
        // e.preventDefault();
        console.log("file: ", this.state.file);
        const self = this;
        //POST data to upload path with axios
        const formData = new FormData();
        formData.append("image", this.state.file);
        console.log("formData submitted: ", formData);
        axios
            .post("/upload", formData)
            .then((res) => {
                console.log("aws res: ", res.data.url);
                self.props.setImage(res.data.url);
                // this.props.toggleUploader();
            })
            .catch(function (err) {
                console.log(err);
            });
    }

    render() {
        console.log("this.props in Uploader: ", this.props);
        return (
            <div id="modalLayer">
                <div id="modal">
                    <i
                        className="far fa-window-close"
                        onClick={() => this.toggleUploader()}
                    ></i>
                    <p>Select a profile picture</p>
                    <Button>
                        <input
                            name="image"
                            type="file"
                            accept="image/*"
                            onChange={(e) => this.handleChange(e)}
                        />
                    </Button>
                    <Button onClick={(e) => this.handleUpload(e)}>
                        Submit
                    </Button>
                </div>
            </div>
        );
    }
}
