"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = void 0;
const User_1 = require("../models/User");
const generateToken_1 = require("../utils/generateToken");
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    try {
        const user = yield User_1.User.create({ username, password });
        const token = (0, generateToken_1.generateToken)(user.id);
        res.status(201).json({ user, token });
    }
    catch (error) {
        res.status(400).json({ error: 'Error creating user' });
    }
});
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    try {
        const user = yield User_1.User.findOne({ where: { username } });
        if (!user || !(yield user.validatePassword(password))) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        const token = (0, generateToken_1.generateToken)(user.id);
        res.json({ user, token });
    }
    catch (error) {
        res.status(400).json({ error: 'Error logging in' });
    }
});
exports.login = login;
