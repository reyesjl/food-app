import React from "react";
import Link from "next/link";
import {getFoodInfo} from "../lib/utils.js";

class Home extends React.Component {
    // constructor
    constructor(props) {
        super(props);
        this.state = {search: "zed"};
    }

    // input textbox
    handleUpdate(evt) {
        this.setState({search: evt.target.value});
        this.handleSearch(evt.target.value);
    }

    // take user input and run query on DB getFoodInfo()
    async handleSearch(evt) {
        const foodItems = await getFoodInfo(this.state.search);
        this.setState({foodItems});
    }

    // render body
    render() {
        return (
            <div>
                <div className="navbar">
                    <Link href="/">
                        <a>HOME</a>
                    </Link>
                </div>
            <div style={{ margin: "0px auto", width: "600px", textAlign: "center"}}>
                <img src="/food-logo.jpg" alt="fresh food logo" className="app-logo"/>
                <h2 className="title">FOODE FACTS</h2>
                <p><input type="text" value={this.state.search} onChange={this.handleUpdate.bind(this)}/></p>

            </div>
                
                <style jsx>{`
                    .navbar {
                        float: right;
                        padding: 10px 30px 0 0;
                        width: 100%;
                        margin-bottom: 100px;
                    }
    
                    a {
                        float: right;
                        padding: 4px 10px 4px 10px;
                        text-decoration: none;
                        color: black;
                        transition: .2s;
                        margin-left: 20px;
                        border-radius: 6px;
                    }
    
                    a:hover {
                        transition: .2s;
                        color: #F4782E;
                        background-color: #eee;
                    }
                    .foodWrapper {
                        width: 100%;
                        margin: 100px auto;
                        font-family: Roboto;
                    }

                    h1,
                    h2,
                    a,
                    p {
                        font-family: 'Roboto';
                    }

                    .title {
                        letter-spacing: .8em;
                        font-size: 2.3em;
                    }

                    .app-logo {
                        width: 250px;
                        height: 250px;
                        border-radius: 50%;
                    }

                    input {
                        margin-top: 5px;
                        margin-bottom: 20px;
                        font-family: Roboto;
                        font-weight: bold;
                        height: 32px;
                        width: 60%;
                        padding: 5px 20px;
                        border-radius: 31px;
                    }
                `}</style>
            </div>
        )
    }
}

export default Home;