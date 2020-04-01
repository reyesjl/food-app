import React from "react";
import Link from "next/link";
import {getFoodInfo} from "../lib/utils.js";

class Home extends React.Component {
    // constructor
    constructor(props) {
        super(props);
        this.state = {search: "zed", foodlist: []};
    }

    // input textbox
    async handleUpdate(evt) {
        this.setState({search: evt.target.value});
    }

    // take user input and run query on DB getFoodInfo()
    async handleSearch(evt) {
        await this.handleUpdate(evt);
        const foodlist = await getFoodInfo(this.state.search);
        this.setState({foodlist: foodlist});
    }

    // render body
    render() {
        return (
            <div className="foodWrapper">
                <div className="navbar">
                    <Link href="/">
                        <a>HOME</a>
                    </Link>
                </div>

                <div style={{ margin: "0px auto", width: "80vw", textAlign: "center"}}>
                    <img src="/food-logo.jpg" alt="fresh food logo" className="app-logo"/>
                    <h2 className="title">FOODE FACTS</h2>
                    <p><input className="textbox" type="text" value={this.state.search} onChange={this.handleSearch.bind(this)}/></p>
                    <table>
                        { "foodlist" in this.state && this.state.foodlist.status != undefined && this.state.foodlist.status == 'good' ?
                            <tr>
                                <th>Descriptions</th>
                                <th>Calories</th>
                                <th>Fats</th>
                                <th>Proteins</th>
                                <th>Carbs</th> 
                            </tr> : null
                        }

                        { "foodlist" in this.state && this.state.foodlist.status != undefined && this.state.foodlist.status == 'good' ?
                                this.state.foodlist.foods.map((item) => (
                                    <tr className="tableRow">
                                        <td>{item.description}</td>
                                        <td>{item.calories}</td>
                                        <td>{item.fat.toFixed(2)}</td>
                                        <td>{item.protein}</td>
                                        <td>{item.carbs}</td>
                                    </tr>
                                ))
                            : null
                        }

                        { "foodlist" in this.state && this.state.foodlist.status == 'bad' ?
                            <p className="lonely">It's lonely here</p>: null
                        }
                    </table>
                </div>
                
                <style jsx>{`
                    .navbar {
                        float: right;
                        padding: 10px 30px 0 0;
                        width: 100%;
                        margin-bottom: 100px;
                    }

                    .textbox {
                        width: 30vw;
                        margin-bottom: 10vh;
                    }

                    .lonely {
                        text-align: center;
                    }
    
                    a {
                        float: right;
                        letter-spacing: .1em;
                        padding: 4px 10px 4px 10px;
                        text-decoration: none;
                        color: black;
                        transition: .2s;
                        margin-left: 20px;
                        border-radius: 6px;
                    }
    
                    a:hover {
                        transition: .2s;
                        color: #73a142;
                        background-color: #eee;
                    }
                    .foodWrapper {
                        width: 100%;
                        margin: 0 auto;
                        font-family: Roboto;
                    }

                    td {
                        padding-top: 30px;
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
                        height: 240px;
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

                    table {
                        margin: 0 auto;
                        margin-bottom: 30vh;
                        text-align: left;
                        width: 100vh;
                        font-family: 'Roboto';
                    }
                `}</style>
            </div>
        )
    }
}

export default Home;