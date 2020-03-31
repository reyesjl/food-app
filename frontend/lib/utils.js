require("isomorphic-fetch");

async function getFood(foodInput) {
    return fetch(`http://localhost:8080/food?q=${foodInput}`).then(function(resp){
        return resp.json();
    });
}

function handleError(error) {
    console.warn(error);
    return null;
}

module.exports = {
    getFoodInfo: function(foodInfo) {
        return getFood(foodInfo).catch(handleError);
    }
}