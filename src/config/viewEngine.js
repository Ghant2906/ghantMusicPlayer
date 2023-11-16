import express from "express"

let configViewEngine = (app) => {
    app.use(express.static("./src/public"))
    app.set("view engine", "ejs")
    app.set("views", "./src/views")
    app.set('layout', './src/views/layout');
}

module.exports = configViewEngine