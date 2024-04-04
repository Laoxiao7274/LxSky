// LiteLoader-AIDS automatic generated
/// <reference path="d:\BDS_api/dts/llaids/src/index.d.ts"/> 

class IslandMethods {
    //TODO:获取模板偏移量
    /**
     * 获取模板偏移量
     * @param {string} name - 模板名称
     * @returns 
     */
    static getSkew(name) {
        const sFile = new JsonConfigFile("./plugins/LxSky/data/Struct.json");
        const sData = sFile.get("Struct");
        const needData = sData.filter((ele) => {
            if (ele.name == name) {
                return true;
            }
            else {
                return false;
            }
        });
        const px = needData[0].x;
        const py = needData[0].y;
        const pz = needData[0].z;
        return { px, py, pz };
    }
};

module.exports = { IslandMethods };