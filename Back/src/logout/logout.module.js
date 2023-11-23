"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.LogoutModule = void 0;
var common_1 = require("@nestjs/common");
var prisma_service_1 = require("../database/prisma.service");
var JsonWebToken_1 = require("../modules/JsonWebToken");
var auth_1 = require("../session/auth");
var logout_controller_1 = require("./logout.controller");
var LogoutModule = /** @class */ (function () {
    function LogoutModule() {
    }
    LogoutModule = __decorate([
        (0, common_1.Module)({
            controllers: [logout_controller_1.LogoutController],
            providers: [prisma_service_1.PrismaService, JsonWebToken_1.JsonWebToken, auth_1.UserByToken]
        })
    ], LogoutModule);
    return LogoutModule;
}());
exports.LogoutModule = LogoutModule;
