// LiteLoader-AIDS automatic generated
/// <reference path="d:\BDS_api/dts/llaids/src/index.d.ts"/> 

class InviteMethods {
    //TODO:获取玩家身份
    /**
     * 获取玩家身份
     * @param {*} PlayerName 
     */
    static getPlayerRight(PlayerName) {
        const pFile = new JsonConfigFile("./plugins/LxSky/players/" + PlayerName + ".json");
        return pFile.get("Right");
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

module.exports = { InviteMethods };