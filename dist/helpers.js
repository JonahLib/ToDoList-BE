"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getId = void 0;
const getId = (id) => {
    if (!id)
        return Math.floor(Math.random() * 100000);
    return id;
};
exports.getId = getId;
