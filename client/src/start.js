import ReactDOM from "react-dom";
import Welcome from "./welcome";

let elem;
if (location.pathname === "/welcome") {
    elem = <Welcome />;
} else {
    elem = <h1>Home page</h1>;
}

ReactDOM.render(elem, document.querySelector("main"));

// function HelloWorld() {
//     return <div>Hello, World!</div>;
// }
