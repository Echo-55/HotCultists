"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const LogTextColor_1 = require("C:/snapshot/project/obj/models/spt/logging/LogTextColor");
class HotCultists {
    constructor() {
        this.modName = "HotCultists";
    }
    postDBLoad(container) {
        const logger = container.resolve("WinstonLogger");
        logger.logWithColor(`${this.modName} - Thermal Cultists Enabled`, LogTextColor_1.LogTextColor.CYAN);
        const DB = container.resolve("DatabaseServer").getTables();
        const botTypes = DB.bots.types;
        for (const type in botTypes) {
            if (type === "sectantpriest" || type === "sectantwarrior") {
                botTypes[type].health.Temperature.min = 75;
                botTypes[type].health.Temperature.max = 80;
            }
        }
    }
}
module.exports = { mod: new HotCultists() };
