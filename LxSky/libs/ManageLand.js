// LiteLoader-AIDS automatic generated
/// <reference path="d:\BDS_api/dts/llaids/src/index.d.ts"/> 
const { Methods } = require("./Methods");

class ManageLand{
    /**
     * 岛屿删除
     * @param {Player} player - 岛主玩家对象
     * @param {Land} Land - 被删除的岛屿对象
     */
    static DeleteLand(player,Land){
        player.sendModalForm("岛屿删除","是否确认删除岛屿: "+Land.name,"是","否",(player,res)=>{
            if(res){
                Land.IsLands = Land.IsLands.filter((land)=>{
                    if(land.name == Land.name){
                        return false;
                    }
                    else{
                        return true;
                    }
                });
                Methods.writeLandData(Land,player.name);
                player.tell("已为你删除岛屿");
            }
        });
    }

    /**
     * 岛屿转让
     * @param {Player} player - 岛主玩家对象
     * @param {Land} Land - 被转让的岛屿对象
     */
    static TransferLand(player,Land){
        const OnlinePlayers = mc.getOnlinePlayers();
        const OnlinePlayersName = OnlinePlayers.map((ele)=>{return ele.name});
        const NeedNames = OnlinePlayersName.filter((ele)=>{
            if(ele == player.name||Methods.getPlayerRight(ele) == "Member"){
                return false;
            }
            else{
                return true;
            }
        });
        const form = mc.newCustomForm();
        form.setTitle("岛屿转让");
        form.addDropdown("请选择要转让的玩家",NeedNames);
        player.sendForm(form,(player,data)=>{
            if(data != undefined){
                player.sendModalForm("转让岛屿","是否将岛屿: "+Land.name+"\n转让给玩家: "+NeedNames[data],"是","否",(player,res)=>{
                    if(res){
                        if(mc.getPlayer(NeedNames[data]) != undefined){
                            const newLandData = Land.filter((ele)=>{
                                if(Land.name == ele){
                                    return true;
                                }
                                else{
                                    return false;
                                }
                            });
                            const trFile = new JsonConfigFile('./plugins/LxSky/players/'+NeedNames[data]+".json");
                            if(Methods.getPlayerRight(NeedNames[data]) == "none"){
                                trFile.set("Right","Master");
                                trFile.set("IsLands",[Land]);
                                Methods.delLandData(Land,player.name);
                                mc.getPlayer(NeedNames(data)).tell("你被转让了一个岛屿!");
                                player.tell("你已成功转让空岛！");
                            }   
                            else if(Methods.getPlayerRight(NeedNames[data]) == "Master"){
                                if(Methods.checkPlayerLandCount(NeedNames[data])){
                                    player.tell("该玩家空岛已满");
                                    return;
                                }
                                let newData = trFile.get("IsLands");
                                newData.push(Land);
                                trFile.set("IsLands",newData);
                                Methods.delLandData(Land,player.name);
                                player.tell("你已成功转让空岛! ");
                                mc.getPlayer(NeedNames(data)).tell("你被转让了一个岛屿!");
                            }
                        }
                        else{
                            player.tell("该玩家已下线!");
                        }
                    }
                });
            }
        });
    }
}

module.exports = { ManageLand };