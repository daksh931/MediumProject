"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdatePost = exports.createPost = exports.signInInput = exports.signupInput = void 0;
const zod_1 = __importDefault(require("zod"));
exports.signupInput = zod_1.default.object({
    email: zod_1.default.string().email(),
    password: zod_1.default.string().min(6),
});
exports.signInInput = zod_1.default.object({
    email: zod_1.default.string().email(),
    password: zod_1.default.string().min(6),
});
exports.createPost = zod_1.default.object({
    title: zod_1.default.string().min(3),
    content: zod_1.default.string().min(10)
});
exports.UpdatePost = zod_1.default.object({
    title: zod_1.default.string().min(3),
    content: zod_1.default.string().min(10),
    id: zod_1.default.string()
});
// https://github.com/chandanck22/vibranthive
