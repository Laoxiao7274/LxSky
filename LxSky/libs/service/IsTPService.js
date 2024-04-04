// LiteLoader-AIDS automatic generated
/// <reference path="d:\BDS_api/dts/llaids/src/index.d.ts"/> 

class IsTPService {
    //TODO:判断玩家是否在某个空岛中
    /**
     * 判断玩家是否在某个空岛中
     * @param {Player} player 
     * @param {Land} Land 
     */
    static checkInLand(player, Land) {
        const range = Land.ProtectRange;
        if (player.blockPos.x <= Land.pos.x + range && player.blockPos.x >= Land.pos.x - range) {
            if (player.blockPos.z <= Land.pos.z + range && player.blockPos.z >= Land.pos.z - range) {
                return true;
            }
        }
        return false;
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

    //TODO:判断岛屿传送点数是否上限
    /**
     * 判断岛屿传送点数是否上限
     * @param {Land} Land - 检查的岛屿 
     */
    static checkLandPointCount(Land) {
        const point = Land.TpPoint;
        if (point.length < Land.PointCount) {
            return false;
        }
        else {
            return true;
        }
    }

    //TODO:判断传送点名是否重复
    /**
     * 判断传送点名是否重复
     * @param {string} name - 判断的传送点名
     * @param {Land} Land - 岛屿对象
     */
    static checkSamePoint(name, Land) {
        for (let ele of Land.TpPoint) {
            if (ele.name == name) {
                return truel
            }
        }
        return false;
    }
};

module.exports = { IsTPService };