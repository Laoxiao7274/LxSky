// LiteLoader-AIDS automatic generated
/// <reference path="d:\BDS_api/dts/llaids/src/index.d.ts"/> 
const { PerMethods } = require('./service/PerService.js');

class Permission {
    static checkPermission(player,PerName){
        const pData = new JsonConfigFile('./plugins/LxSky/players/'+player.name+".json");
        const pRight = pData.get("Right");
        const Land = PerMethods.getPosLand(player);
        if(Land == "none"){
            if(PerMethods.CheckWorldPer(PerName)){
                return true;
            }
            else{
                return false;
            }
        }
        switch(pRight){
            case "Master":
                //查看是否为自己岛屿
                if(PerMethods.haveOneLand(player,Land.name,Land.pos)){
                    return true;
                }
                break;
            case "Member":
                //查看是否为当前岛屿成员并查看权限
                if(PerMethods.CheckMember(player,Land,PerName)){
                    return true;
                }
                break;
            case "none":
                break;
            default:
                return false;
        }
        //查看共享权限
        if(PerMethods.CheckShare(player,Land,PerName)){
            return true;
        }
        //查看公共权限
        if(PerMethods.CheckPer(Land,PerName)){
            return true;
        }
        return false;
    }
}

class Listen {
    
}

module.exports = { Permission, Listen }