// LiteLoader-AIDS automatic generated
/// <reference path="d:\BDS_api/dts/llaids/src/index.d.ts"/> 

class PublicService{

    //TODO:查看岛屿是否存在公共岛屿中
    /**
     * 查看岛屿是否存在公共岛屿中
     * @param {string} MasterName - 岛主名称
     * @param {string} LandName - 岛屿名称
     */
    static checkPublic(MasterName,LandName){
        const PublicConf = new JsonConfigFile('./plugins/LxSky/data/PublicData.json');
        const PublicData = PublicConf.get("PublicLands");
        const NeedData = PublicData.filter((ele)=>{
            if(ele.MasterName == MasterName&&ele.LandName == LandName){
                return true;
            }
            else{
                return false;
            }
        });
        if(NeedData.length == 0){
            return false;
        }
        else{
            return true;
        }
    }

};

module.exports = { PublicService }