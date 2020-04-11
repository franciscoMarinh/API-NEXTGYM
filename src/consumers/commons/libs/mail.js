"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var nodemailer_1 = __importDefault(require("nodemailer"));
var mail_config_1 = __importDefault(require("../config/mail.config"));
exports.default = nodemailer_1.default.createTransport(mail_config_1.default);
