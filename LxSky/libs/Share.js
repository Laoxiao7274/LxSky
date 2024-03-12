// LiteLoader-AIDS automatic generated
/// <reference path="d:\BDS_api/dts/llaids/src/index.d.ts"/> 
const { Methods } = require("./Methods.js");

class Share{
    constructor(name,permission){
        this.name = name;
        this.permission = permission;
    }
    static ShareMenu(player,Land){
        const form = mc.newSimpleForm();
        form.setTitle("分享菜单");
        form.addButton("添加共享成员");
        form.addButton("移除共享成员");
        form.addButton("共享成员设置");
        form.addButton("默认共享设置");
        player.sendForm(form,(player,data)=>{
            if(data != undefined){
                switch(data){
                    case 0:
                        this.AddShareMenu(player,Land);
                        break;
                    case 1:
                        break;
                    case 2:
                        break;
                    case 3:
                        break;
                }
            }
        });
    }

    static AddShareMenu(player,Land){
        const OnlinePlayers = mc.getOnlinePlayers();
        const needPlayers = OnlinePlayers.filter((ele)=>{
            if(!Methods.hasSharePlayer(ele,Land) && ele.name != player.name){
                return ele;
            }
        });
        const DropDown = needPlayers.map((ele)=>{
            return ele.name;
        });
        const form = mc.newCustomForm();
        form.setTitle("添加共享成员");
        form.addDropdown("请选择要添加的成员",DropDown);
        player.sendForm(form,(player,data)=>{
            if(data != undefined){
                const sharePlayerName = DropDown[data[0]];
                const newShareData = new Share(sharePlayerName,Land.sharePermission);
                Methods.writeShareLandData(Land,player,newShareData);
                player.tell("添加成功！");
            }
        });
    }
};

module.exports = { Share };