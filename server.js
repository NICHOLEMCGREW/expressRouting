const express = require("express");
const path = require("path");
const morgan = require("morgan");
const fs = require("fs");

const file = path.join(__dirname, "./pokemon.json");

const app = express();

app.use(morgan("dev"));

app.use(express.json());

app.get("/pokemon/:id?", (req, res, next) => {
    try {
        let { id } = req.params;
        if(id) {
            fs.readFile(file, (err, data) => {
                if(err) {
                    console.log(err);
                    return;
                }
                let selectedPokemon;
                JSON.parse(data).forEach((pokemon) => {
                    if(pokemon.id == id) {
                        selectedPokemon = pokemon;
                    }
                });
                res.status(200).json(selectedPokemon);
            });
        } else {
            res.status(200).sendFile(file);
        }
    } catch (error) {
        next(error)
    }
})

app.post("/pokemon", (req, res, next) => {
    try {
        let pokemon = req.body;

        fs.readFile(file, (err, data) => {
            if(err) {
                console.log(err);
                throw err;
            }

            let pokemonArr = JSON.parse(data);
            pokemon.id = pokemonArr[pokemonArr.length - 1].id + 1;
            pokemon.num = pokemon.id.toString().padStart(3, "0");
            pokemonArr.push(pokemon);

            fs.writeFile(file, JSON.stringify(pokemonArr), (err) => {
                if(err) {
                    console.log(err);
                    throw err;
                }

                res.status(200).json({ msg: "Successfully added pokemon to list!" });
        });
    });
    } catch (error) {
        next(error);
    }
});

app.put("/pokemon/:id", (req, res, next) => {
    try {
        let pokemonId = req.params.id;
        let updatedPokemon = req.body;

        fs.readFile(file, (err, data) => {
            if(err) {
                console.log(err);
                throw err;
            }

            let pokemonArr = JSON.parse(data).map(pokemon => {
                if(pokemon.id == pokemonId) {
                    updatedPokemon.id = pokemon.id;
                    updatedPokemon.num = pokemon.num;
                    return updatedPokemon;
                }
                return pokemon;
            });

            fs.writeFile(file, JSON.stringify(pokemonArr), (err) => {
                if(err) {
                    console.log(err);
                    throw err;
                }

                res.status(200).json({ 
                    msg: "Successfully updated pokemon to list!",
                    data: updatedPokemon,
                 });
        });
    });
    } catch (error) {
        next(error);
    }
})

app.delete("/pokemon/:id", (req, res, next) => {
    try {
        let pokemonId = req.params.id;

        fs.readFile(file, (err, data) => {
            if(err) {
                console.log(err);
                throw err;
            }

            let pokemonArr = JSON.parse(data).filter(({id}) => id != pokemonId);

            fs.writeFile(file, JSON.stringify(pokemonArr), (err) => {
                if(err) {
                    console.log(err);
                    throw err;
                }

                res.status(200).json({ 
                    msg: "Successfully removed pokemon from list!",
                    data: pokemonId,
                 });
        });
    });
    } catch (error) {
        next(error);
    }
})

app.get("*", (req, res, next) => {
        try {
            res.status(404).json({ msg: "I couldn't find what you were looking for."});
        } catch (error) {
            next(error);
        }
    })
    
    app.use((err, req, res, next) => {
        res.status(err.statusCode || 500).json({
            err, 
            msg: "Something went wrong on the server. Check the error message.",
        });
    });

app.listen(8081, () => console.log("server listening..."));
