// LiteLoader-AIDS automatic generated
/// <reference path="d:\BDS_api/dts/llaids/src/index.d.ts"/>

class StructService {
    //TODO:获取结构数组
    /**
     * 获取结构数组
     * @returns 
     */
    static getStruct() {
        const sFile = new JsonConfigFile("./plugins/LxSky/data/Struct.json");
        const sData = sFile.get("Struct");
        return sData;
    }

    //TODO:检测自定义模板名是否重复
    /**
     * 检测自定义模板名是否重复
     * @param {string} name - 自定义模板名
     * @returns 
     */
    static checkCustomStructName(name) {
        const sFile = new JsonConfigFile("./plugins/LxSky/data/Struct.json");
        let sData = sFile.get("CustomStruct");
        for (let sdata of sData) {
            if (sdata.name == name) {
                return true;
            }
        }
        return false;
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
};

module.exports = { StructService };