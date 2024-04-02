// LiteLoader-AIDS automatic generated
/// <reference path="d:\BDS_api/dts/llaids/src/index.d.ts"/> 
const {Methods} = require('../Methods.js');

class PerMethods{
    //TODO:获取玩家所在岛屿
    /**
     * 获取玩家所在岛屿
     * 存在返回岛屿对象
     * 不存在返回none
     * @param {Player} player - 玩家对象 
     */
    static getPosLand(player){
        const pos = player.blockPos;
        const LandFile = new JsonConfigFile('./plugins/LxSky/data/IsData.json');
        const LandData = LandFile.get("Lands");
        for(let land of LandData){
            const LandPos = land.pos;
            const range = land.ProtectRange;
            if(pos.x <= LandPos.x+range && pos.x>= LandPos.x-range && pos.z <= LandPos.z+range && pos.z>= LandPos.z-range){
                const MasterName = land.Mastername;
                const LandName = land.LandName;
                const MasterLands = Methods.getPlayerLand(MasterName);
                return MasterLands.filter((ele)=>{
                    if(ele.name == LandName){
                        return true;
                    }
                    else{
                        return false;
                    }
                })[0];
            }
        }
        return "none";
    }

    //TODO:判断玩家是否存在某个岛屿
    /**
     * 判断玩家是否存在某个岛屿
     * @param {Player} player - 玩家对象
     * @param {string} LandName -岛屿名称
     * @param {Pos} pos - 岛屿中心
     * @returns 
     */
    static haveOneLand(player,LandName,pos){
        const pFile = new JsonConfigFile("./plugins/LxSky/players/"+player.name+".json");
        const pLands = pFile.get("IsLands");
        const result = pLands.filter((ele)=>{
            if(ele.name == LandName&&pos.x == ele.pos.x&&pos.z == ele.pos.z){
                return true;
            }
            else{
                return false;
            }
        });
        if(result.length == 0){
            return false;
        }
        else{
            return true;
        }
    }

    //TODO:判断是否为分享玩家并检测权限
    /**
     * 判断是否为该岛屿分享玩家
     * @param {Player} player - 玩家对象 
     * @param {Land} Land - 岛屿对象
     */
    static CheckShare(player,Land,PerName){
        const SharePlayers = Land.share;
        for(let sPlayer of SharePlayers){
            if(player.name == sPlayer.name){
                if(sPlayer.permission[PerName]){
                    return true;
                }
            }
        }
        return false;
    }

    //TODO:判断是否为成员并检测权限
    /**
     * 判断是否为成员并检测权限
     * @param {Player} player - 玩家对象
     * @param {Land} Land - 岛屿对象
     * @param {string} PerName - 要检测的权限名
     * @returns 
     */
    static CheckMember(player,Land,PerName){
        const MemberPlayers = Land.member;
        for(let mPlayer of MemberPlayers){
            if(player.name == mPlayer.name){
                if(mPlayer.Permission[PerName]){
                    return true;
                }
            }
        }
        return false;
    }

    //TODO:公共权限检测
    /**
     * 公共权限检测
     * @param {Land} Land - 岛屿对象 
     * @param {string} PerName - 要检测的权限名
     * @returns 
     */
    static CheckPer(Land,PerName){
        if(Land.permission[PerName]){
            return true;
        }
        else{
            return false;
        }
    }

    //TODO:世界权限检测
    /**
     * 世界权限检测
     * @param {string} PerName - 要检测的权限名
     * @returns 
     */
    static CheckWorldPer(PerName){
        const conf = new JsonConfigFile('./plugins/LxSky/config.json');
        const pers = conf.get("worldPermission");
        if(pers[PerName]){
            return true;
        }
        else{
            return false;
        }
    }
};

module.exports = {PerMethods}