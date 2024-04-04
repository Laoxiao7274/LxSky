// LiteLoader-AIDS automatic generated
/// <reference path="d:\BDS_api/dts/llaids/src/index.d.ts"/> 

const { PublicService } = require("./service/PublicService");

class Public{
    
    constructor(Name,Introduct,MasterName,LandName){
        this.Name = Name;
        this.Introduct = Introduct;
        this.MasterName = MasterName;
        this.LandName = LandName;
    }

    static PublicSwitch(player,Land){
        if(PublicService.checkPublic(player.name,Land.name)){

        }
        else{
            player.sendModalForm("公共岛屿添加","你的岛屿并未在公共岛屿之中\n是否将岛屿"+Land.name+"加入公共岛屿中","是","否",(player,res)=>{
                if(res){
                    
                }
            });
        }
    }

};

module.exports = { Public }