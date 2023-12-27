const axios = require("axios");
const fs = require("fs");

axios
    .get(
        "https://raw.githubusercontent.com/Biuni/PokemonGO-Pokedex/master/pokedex.json "
    )
    .then((res) => {
        console.log(res.data.pokemon);
        let {
            data: { pokemon },
        } = res;
        
        fs.writeFile("pokemon.json", JSON.stringify(pokemon), (err) => {
            console.log(err || "Success");
        });
    });