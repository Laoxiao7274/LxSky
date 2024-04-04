// LiteLoader-AIDS automatic generated
/// <reference path="d:\BDS_api/dts/llaids/src/index.d.ts"/> 

class InitService {
    //TODO:初始化公共岛屿文件
    /**
     * 初始化公共岛屿文件
     */
    static initPublic(){
        const PublicConf = new JsonConfigFile('./plugins/LxSky/data/PublicData.json');
        PublicConf.init("PublicLands",[]);
    }

    //TODO:初始化Struct文件
    /**
     * 初始化Struct文件
     */
    static initStructConfig() {
        const conf = new JsonConfigFile("./plugins/LxSky/data/Struct.json");
        conf.init("Struct", []);
        conf.init("CustomStruct", []);
    }

    //TODO:初始化配置文件
    /**
     * 初始化配置文件
     */
    static initConfig() {
        const permissions = {
            BREAK_BLOCK: false,
            PLACE_BLOCK: false,
            DROP_ITEM: true,
            TAKE_ITEM: true,
            ATTACK_PLAYER: false,
            ATTACK_ENTITY: false,
            OPEN_CRAFTING_TABLE: false,
            OPEN_FURNACE: false,
            OPEN_BLAST_FURNACE: false,
            OPEN_SMOKER: false,
            OPEN_BREWING_STAND: false,
            OPEN_ANVIL: false,
            OPEN_ENCHANTING_TABLE: false,
            OPEN_BARREL: false,
            OPEN_CHEST: false,
            OPEN_STONECUTTER_BLOCK: false,
            OPEN_DISPENSER: false,
            OPEN_DROPPER: false,
            OPEN_HOPPER: false,
            OPEN_BEACON: false,
            USE_FLINE_AND_STEEL: false,
            USE_BUCKET: false,
            USE_FRAME: false,
        }
        const sharePermissions = {
            BREAK_BLOCK: true,
            PLACE_BLOCK: true,
            DROP_ITEM: true,
            TAKE_ITEM: true,
            ATTACK_PLAYER: true,
            ATTACK_ENTITY: true,
            OPEN_CRAFTING_TABLE: true,
            OPEN_FURNACE: true,
            OPEN_BLAST_FURNACE: true,
            OPEN_SMOKER: true,
            OPEN_BREWING_STAND: true,
            OPEN_ANVIL: true,
            OPEN_ENCHANTING_TABLE: true,
            OPEN_BARREL: true,
            OPEN_CHEST: true,
            OPEN_STONECUTTER_BLOCK: true,
            OPEN_DISPENSER: true,
            OPEN_DROPPER: true,
            OPEN_HOPPER: true,
            OPEN_BEACON: true,
            USE_FLINE_AND_STEEL: true,
            USE_BUCKET: true,
            USE_FRAME: true,
        }
        const conf = new JsonConfigFile("./plugins/LxSky/config.json");
        const isConf = new JsonConfigFile("./plugins/LxSky/data/IsData.json");
        conf.init("MoneyType", "LLMoney");
        conf.init("ScoreName", "money");
        conf.init("Height", 20);
        conf.init("LandRange", 1000);
        conf.init("LandProtectRange", 200);
        conf.init("MaxLandCount", 3);
        conf.init("MaxTpPoint", 3);
        conf.init("worldPermission", permissions);
        conf.init("defultPermission", permissions);
        conf.init("defultSharePermission", sharePermissions);
        isConf.init("Lands", []);
    }

    //TODO:玩家数据文件初始化
    /**
     * 玩家数据文件初始化
     */
    static initPlayerDataConfig() {
        mc.listen("onJoin", (player) => {
            const conf = new JsonConfigFile("./plugins/LxSky/config.json");
            const pFile = new JsonConfigFile("./plugins/LxSky/players/" + player.name + ".json");
            pFile.init("Right", "none");
            pFile.init("IsLandCount", conf.get("MaxLandCount"));
            pFile.init("IsLands", []);
        });
    }
};

module.exports = { InitService };