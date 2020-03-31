const express = require("express");
const bodyParser = require("body-parser");

// app bootstrap
const cors = require("cors");
const app = express();
app.set("port", 8080);

// middleware
app.use(bodyParser.json({ type: "application/json" }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// setup connection
var Pool = require("pg").Pool;
var config = {
    host: "localhost",
    user: "postgres",
    password: "zAdRUnapr8",
    database: "food_nutrition"
};
var pool = new Pool(config);

// get info on certain campground
app.get("/food", async (req, res) => {
    console.log("Querying '" + req.query.q + "' ...");
    try {
        const template = "SELECT description, kcal AS calories, kcal / 9 AS fat, protein_g AS protein, carbohydrate_g AS carbs FROM entries WHERE description LIKE $1 LIMIT 15";   
        const response = await pool.query(template, ['%' + req.query.q + '%']);

        if (response.rowCount == 0) {
            res.sendStatus(404);
        } else {
            console.log(response);
        }

        // map all food properties needed
        const foodlist = response.rows.map(function(item) {
            return {description: item.description, calories: item.calories, fat: item.fat, 
                    protein: item.protein, carbs: item.carbs};
        });

        // return the list of foods that meet criteria
        res.json({foods: foodlist});
    } catch (err) {
        console.error("Error while running: " + err);
    }
});

// start app
app.listen(app.get("port"), () => {
	console.log(`Find the server at http://localhost:${ app.get("port") }`);
});