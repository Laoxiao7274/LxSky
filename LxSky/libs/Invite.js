// LiteLoader-AIDS automatic generated
/// <reference path="d:\BDS_api/dts/llaids/src/index.d.ts"/> 

const { Methods } = require("./Methods");

class ManagePer {
    constructor() {

    }
};

class Member {
    constructor(MasterName, Permission, ManagePer) {
        this.MasterName = MasterName;
        this.Permission = Permission;
        this.ManagePer = ManagePer;
    }
};

class InviteMenu {
    static Menu(player, Land) {
        const form = mc.newSimpleForm();
        form.addButton("成员菜单");
        form.addButton("添加成员");
        form.addButton("删除成员");
        form.addButton("成员管理");
        player.sendForm(form, (player, data) => {
            if (data != undefined) {
                switch (data) {
                    case 0:
                        this.addMember(player, Land);
                        break;
                    case 1:
                        this.delMember(player,Land);
                        break;
                    case 2:
                        break;
                }
            }
        });
    }

    static addMember(player, Land) {
        const OnlinePlayers = mc.getOnlinePlayers();
        const OnlinePlayerNames = OnlinePlayers.map((ele) => { return ele.name; });
        //移除自己和已经存在的成员并且用药岛屿的玩家
        OnlinePlayerNames = OnlinePlayerNames.filter((ele)=>{
            if(ele == player.name||Methods.getPlayerRight != "none"){
                return false;
            }
            else{
                return true;
            }
        });
        const form = mc.newCustomForm();
        form.setTitle("添加成员");
        form.addDropdown("请选择要添加的成员", OnlinePlayerNames);
        player.sendForm(form, (player, data) => {
            if (data != undefined) {
                const MemberPlayerName = OnlinePlayerNames[data];
                const MemberPlayer = mc.getPlayer(MemberPlayerName);
                MemberPlayer.sendModalForm("邀请菜单","玩家"+player.name+"邀请你加入他的岛屿: "+"\n名称: "+Land.name+"\n介绍: "+Land.introduct,"同意","拒绝",(MemberPlayer,res)=>{
                    if(res){
                        const MemberFile = new JsonConfigFile("./plugins/LxSky/players/"+MemberPlayerName+".json");
                        const mLand = new Member(player.name,Land.sharePermission,"test");
                        let mData = MemberFile.get("IsLands");
                        mData.push(mLand);
                        let pos = Land.defultTp;
                        pos = new IntPos(pos.x,pos.y,pos.z,0);
                        Land.invite.push(MemberPlayerName);
                        Methods.writeLandData(Land,player.name);
                        MemberFile.set("Right","Member");
                        MemberFile.set("IsLands",mData);
                        MemberPlayer.teleport(pos);
                        player.tell("该玩家已加入你的岛屿");
                        MemberPlayer.tell("你已加入"+player.name+"的岛屿");
                    }
                    else{
                        player.tell("该玩家拒绝了你的请求");
                    }
                });
            }
        });
    }

    static delMember(player,Land){
        const members = Land.invite;
        const form = mc.newCustomForm();
        form.setTitle("删除成员");
        form.addDropdown("请选择要删除的成员",members);
        player.sendForm(form,(player,data)=>{
            if(data != undefined){
                player.sendModalForm("确认删除","是否确认删除\n玩家: "+members[data]+"\n所在岛屿: "+Land.name,"确认","取消",(player,res)=>{
                    if(res){
                        const newMembers = members.filter((member)=>{
                            if(member == members[data]){
                                return false;
                            }
                            else{
                                return true;
                            }
                        });
                        Land.invite = newMembers;
                        Methods.writeLandData(Land,player.name);
                        const mFile = new JsonConfigFile("./plugins/LxSky/players/"+members[data]+".json");
                        mFile.set("Right","none");
                        mFile.set("IsLands",[]);
                        player.tell("你已成功删除该成员");
                        if(mc.getPlayer(members[data]) != null){
                            mc.getPlayer(members[data]).tell("你已被岛主请出该岛屿....");
                        }
                    }
                });
            }
        });
    }
};

module.exports = { InviteMenu };