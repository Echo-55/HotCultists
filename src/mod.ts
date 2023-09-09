import { IPostDBLoadMod } from "@spt-aki/models/external/IPostDBLoadMod";
import { LogTextColor } from "@spt-aki/models/spt/logging/LogTextColor";
import { ILogger } from "@spt-aki/models/spt/utils/ILogger";
import { DatabaseServer } from "@spt-aki/servers/DatabaseServer";
import { DependencyContainer } from "tsyringe";

class HotCultists implements IPostDBLoadMod {
    modName = "HotCultists";

    public postDBLoad(container: DependencyContainer): void {
        const logger = container.resolve<ILogger>("WinstonLogger");
        logger.logWithColor(`${this.modName} - Thermal Cultists Enabled`, LogTextColor.CYAN);

        const DB = container.resolve<DatabaseServer>("DatabaseServer").getTables();
        const botTypes = DB.bots.types;
        for (const type in botTypes) {
            if (type === "sectantpriest" || type === "sectantwarrior") {
                botTypes[type].health.Temperature.min = 75
                botTypes[type].health.Temperature.max = 80
            }
        }
    }
}

module.exports = { mod: new HotCultists() }