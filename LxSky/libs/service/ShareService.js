// LiteLoader-AIDS automatic generated
/// <reference path="d:\BDS_api/dts/llaids/src/index.d.ts"/> 

class ShareService {
    //TODO:判断该玩家是否在分享名单中
    /** 
    * 判断该玩家是否在分享名单中
    * @param { Player } sPlayer - 被分享玩家
    * @param { Land } Land - 当前岛屿   
     */
    static hasSharePlayer(sPlayer, Land) {
        const SharePlayers = Land.share;
        const result = SharePlayers.filter((ele) => {
            if (ele.name == sPlayer.name) {
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

module.exports = { ShareService };