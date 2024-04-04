// LiteLoader-AIDS automatic generated
/// <reference path="d:\BDS_api/dts/llaids/src/index.d.ts"/> 

class ManageService {
    //TODO:根据岛屿名删除岛屿数据
    /**
     * 根据岛屿名删除岛屿数据
     * @param {Land} Land - 岛屿数据
     * @param {string} MasterName  - 岛主名称
     */
    static delLandData(Land, MasterName) {
        const sFile = new JsonConfigFile("./plugins/LxSky/players/" + MasterName + ".json");
        const landFile = new JsonConfigFile("./plugins/LxSky/data/IsData.json");
        let LandData = sFile.get("IsLands");
        LandData = LandData.filter((ele) => {
            if (ele.name == Land.name) {
                return false;
            }
            else {
                return true;
            }
        });
        sFile.set("IsLands", LandData);
        let AllLandData = landFile.get("Lands");
        AllLandData = AllLandData.filter((ele) => {
            if (ele.LandName == Land.name && ele.Mastername == MasterName) {
                return false;
            }
            else {
                return true;
            }
        });
        landFile.set("Lands", AllLandData);
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

    //TODO:根据岛屿名转让data岛屿数据
    /**
     * 根据岛屿名转让data岛屿数据
     * @param {string} MasterName - 转让前的岛主名
     * @param {string} TransferName - 被转让收到岛屿的玩家名
     * @param {Land} Land - data岛屿数据
     */
    static transferLand(MasterName, TransferName, Land) {
        const dataFile = new JsonConfigFile('./plugins/LxSky/data/IsData.json');
        let Data = dataFile.get("Lands");
        Data.map((ele) => {
            if (ele.Mastername == MasterName && ele.LandName == Land.name) {
                ele.Mastername = TransferName;
                return ele;
            }
            else {
                return ele;
            }
        })
        dataFile.set("Lands", Data);
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

        //TODO:根据岛屿名写入岛屿数据
    /**
     * 根据岛屿名写入岛屿数据
     * @param {Land} Land - 岛屿对象 
     * @param {string} MasterName - 岛主名称
     */
    static writeLandData(Land, MasterName) {
        const sFile = new JsonConfigFile("./plugins/LxSky/players/" + MasterName + ".json");
        let LandData = sFile.get("IsLands");
        LandData = LandData.map((ele) => {
            if (ele.name == Land.name) {
                return Land;
            }
            else {
                return ele;
            }
        });
        sFile.set("IsLands", LandData);
    }
};

module.exports = { ManageService };