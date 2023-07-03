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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const app_1 = __importDefault(require("./app"));
const index_1 = __importDefault(require("./config/index"));
let server;
process.on('uncaughtException', err => {
    console.error(err);
    process.exit(1);
});
function mainFunc() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield mongoose_1.default.connect(index_1.default.database_url);
            console.log('Database connected');
            server = app_1.default.listen(index_1.default.port, () => {
                console.log(`Application is listening on port ${index_1.default.port}`);
            });
        }
        catch (error) {
            console.error('error found', error);
        }
        process.on('unhandledRejection', err => {
            console.log('We Are closing the server...');
            if (server) {
                server.close(() => {
                    console.error(err);
                    process.exit(1);
                });
            }
            else {
                process.exit(1);
            }
        });
    });
}
mainFunc();
process.on('SIGTERM', () => {
    console.log('Sigterm is received');
    if (server) {
        server.close();
    }
});
// console.log(x)
