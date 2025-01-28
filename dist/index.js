"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helpers_1 = require("./helpers");
const items = [];
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.get("/items", (_req, res) => {
    res.status(200).send(items);
});
app.post("/items", (req, res) => {
    if (!req.body)
        return res.status(400).send({ error: "No body provided" });
    const { id, title, description, done = false } = req.body;
    if (!title)
        return res.status(400).send({ error: "title is a required fields" });
    const item = { id: (0, helpers_1.getId)(id), title, description, done };
    items.push(item);
    res.status(200).send(items);
});
app.get("/items/:id", (req, res) => {
    if (!req.params.id)
        return res.status(400).send({ error: "No ID Provided" });
    const id = parseInt(req.params.id);
    const item = items.find((item) => item.id === id);
    if (!item)
        return res.status(404).send({ error: "item not found" });
    res.status(200).send(item);
});
app.put("/items/:id", (req, res) => {
    if (!req.params.id)
        return res.status(400).send({ error: "No ID Provided" });
    const id = parseInt(req.params.id);
    const item = items.find((item) => item.id === id);
    if (!item)
        return res.status(404).send({ error: "Item not found" });
    const updateItem = req.body;
    if (!updateItem)
        return res.status(400).send({ error: "No body provided" });
    if (updateItem.title)
        item.title = updateItem.title;
    if (updateItem.description)
        item.description = updateItem.description;
    if (updateItem.done !== undefined)
        item.done = updateItem.done;
    res.status(200).send(items);
});
app.delete("/items/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const filteredItems = items.filter((item) => item.id !== id);
    if (filteredItems.length === items.length) {
        return res.status(404).send({ error: "Item not found" });
    }
    items.length = 0;
    items.push(...filteredItems);
    res.status(200).send(items);
});
app.listen(3000, () => {
    console.log("express server started on port 3000");
});
