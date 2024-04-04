// LiteLoader-AIDS automatic generated
/// <reference path="d:\BDS_api/dts/llaids/src/index.d.ts"/> 

class CmdMethods {
    //TODO:判断是否存在初始化模板
    /**
     * 判断是否存在初始化模板
     * @returns 
     */
    static checkHaveModal() {
        const sFile = new JsonConfigFile("./plugins/LxSky/data/Struct.json");
        const sData = sFile.get("Struct");
        if (sData.length == 0) {
            return false;
        }
        return true;
    }

    //TODO:判断玩家是否存在岛屿
    /**
     * 判断玩家是否存在岛屿
     * @param {Player} player - 玩家对象
     * @returns 
     */
    static haveIsland(player) {
        const pFile = new JsonConfigFile("./plugins/LxSky/players/" + player.name + ".json");
        const right = pFile.get("Right");
        if (right == "none") {
            return false;
        }
        return true;
    }

    //TODO:获取自定义模板数组
    /**
     * 获取自定义模板数组
     * @returns 
     */
    static getCustomModal() {
        const sFile = new JsonConfigFile("./plugins/LxSky/data/Struct.json");
        const sData = sFile.get("CustomStruct");
        return sData;
    }

    //TODO:判断玩家是否存在某个岛屿
    /**
     * 判断玩家是否存在某个岛屿
     * @param {Player} player - 玩家对象
     * @param {string} LandName -岛屿名称
     * @returns 
     */
    static haveOneLand(player, LandName) {
        const pFile = new JsonConfigFile("./plugins/LxSky/players/" + player.name + ".json");
        const pLands = pFile.get("IsLands");
        const result = pLands.filter((ele) => {
            if (ele.name == LandName) {
                return true;
            }
            else {
                return false;
            }
        });
        if (result.length == 0) {
            return false;
        }
        else {
            return true;
        }
    }

    //TODO:获取自定义模板数组下标
    /**
     * 
     * @param {string} name - 自定义模板名
     * @returns 
     */
    static getCustomModalIndex(name) {
        let a = 0;
        const sfile = new JsonConfigFile("./plugins/LxSky/data/Struct.json");
        let StructData = sfile.get("CustomStruct");
        for (let sdata of StructData) {
            if (sdata.name == name) {
                return a;
            }
            a++;
        }
    }

    //TODO:扣除钱
    /**
     * 扣除钱
     * @param {number} money - 扣除金币数
     * @param {Player} player - 玩家对象
     * @returns 
     */
    static reMoney(money, player) {
        const conf = new JsonConfigFile("./plugins/LxSky/config.json");
        const MoneyType = conf.get("MoneyType");
        const ScoreName = conf.get("ScoreName");
        if (money == 0) {
            return;
        }
        if (MoneyType == "LLMoney") {
            player.reduceMoney(money);
            player.tell("已扣除你" + money + "金币");
        }
        else if (MoneyType == "ScoreMoney") {
            const cmd = mc.runcmdEx("scoreboard players remove " + player.name + " " + ScoreName + " " + String(money));
            if (cmd.success) {
                player.tell("已扣除你" + money + "金币");
            }
        }
    }

    //TODO:判断玩家空岛数是否上限
    /**
     * 判断玩家空岛数是否上限
     * @param {Player} player - 玩家对象
     * @returns 
     */
    static checkPlayerLandCount(playerName) {
        const maxcount = this.getIsLandCount(playerName);
        const pLands = this.getPlayerLand(playerName);
        if (pLands.length < maxcount) {
            return false;
        }
        else {
            return true;
        }
    }

    //TODO:根据玩家名获取玩家岛屿
    /**
     * 根据玩家名获取玩家岛屿
     * @param {string} name - 玩家名
     * @returns 
     */
    static getPlayerLand(name) {
        const pFile = new JsonConfigFile("./plugins/LxSky/players/" + name + ".json");
        const pData = pFile.get("IsLands");
        return pData;
    }

    //TODO:获取玩家身份
    /**
     * 获取玩家身份
     * @param {*} PlayerName 
     */
    static getPlayerRight(PlayerName) {
        const pFile = new JsonConfigFile("./plugins/LxSky/players/" + PlayerName + ".json");
        return pFile.get("Right");
    }
};

module.exports = { CmdMethods };