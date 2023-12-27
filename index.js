const express = require("express");
const morgan = require("morgan");
const path = require("path");

const app = express();

app.use(morgan("short"));

app.get("/", (req, res, next) => {
    try {
        res.status(200).sendFile(path.join(__dirname, "./index.html"));
    } catch (error) {
        next(error)
    }
})

app.get("/about", (req, res, next) => {
    try {
        res.status(200).sendFile(path.join(__dirname, "./about.html"));
    } catch (error) {
        next(error)
    }
})

app.get("/contact", (req, res, next) => {
    try {
        res.status(200).sendFile(path.join(__dirname, "./contact.html"));
    } catch (error) {
        next(error)
    }
})

app.get("*", (req, res, next) => {
    try {
        res.status(404).sendFile(path.join(__dirname, "./notFound.html"));
    } catch (error) {
        next(error);
    }
});


app.use((err, req, res, next) => {
    res.status(err.statusCode || 500).json({name: err.name, msg: err.message || "Server Error"})
});

app.listen(8081, () => console.log("server listening..."));



// const requestInfo = (req, res, next) => {
//     console.log(req._parsedUrl.pathname, new Date().toTimeString());
//     next();
// };

// app.use(requestInfo);

// app.use(express.json());


// app.post("/newsletter_signup", (req, res, next) => {
//     let { body } = req;
//     try {
//         res.status(200).json(body);
//     } catch (error) {
//         next(error);
//     }
// });
// app.put("/profile/:id", (req, res, next) => {
//     try {
//         let { id } = req.params;
//         let { body } = req;
//         res.status(200).json({ id, body });
//     } catch (error) {
//         next(error);
//     }
// });

// 





