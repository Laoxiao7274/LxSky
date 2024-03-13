// LiteLoader-AIDS automatic generated
/// <reference path="d:\BDS_api/dts/llaids/src/index.d.ts"/> 
const { Methods } = require("./Methods.js");

class Share {
    constructor(name, permission) {
        this.name = name;
        this.permission = permission;
    }
    static ShareMenu(player, Land) {
        const form = mc.newSimpleForm();
        form.setTitle("分享菜单");
        form.addButton("添加共享成员");
        form.addButton("移除共享成员");
        form.addButton("共享成员设置");
        form.addButton("默认共享设置");
        player.sendForm(form, (player, data) => {
            if (data != undefined) {
                switch (data) {
                    case 0:
                        this.AddShareMenu(player, Land);
                        break;
                    case 1:
                        this.DelShareMenu(player, Land);
                        break;
                    case 2:
                        break;
                    case 3:
                        break;
                }
            }
        });
    }

    static AddShareMenu(player, Land) {
        const OnlinePlayers = mc.getOnlinePlayers();
        const needPlayers = OnlinePlayers.filter((ele) => {
            if (!Methods.hasSharePlayer(ele, Land) && ele.name != player.name) {
                return true;
            }
            else {
                return false;
            }
        });
        const DropDown = needPlayers.map((ele) => {
            return ele.name;
        });
        if (DropDown.length == 0) {
            player.tell("暂无成员可以添加");
            return;
        }
        const form = mc.newCustomForm();
        form.setTitle("添加共享成员");
        form.addDropdown("请选择要添加的成员", DropDown);
        player.sendForm(form, (player, data) => {
            if (data != undefined) {
                const sharePlayerName = DropDown[data[0]];
                const newShareData = new Share(sharePlayerName, Land.sharePermission);
                Land.share.push(newShareData);
                Methods.writeLandData(Land, player);
                player.tell("添加成功！");
            }
        });
    }

    static DelShareMenu(player, Land) {
        let shareData = Land.share;
        if (shareData.length == 0) {
            player.tell("暂无可删除的分享成员");
            return;
        }
        const shareName = shareData.map((ele) => {
            return ele.name;
        });
        const form = mc.newCustomForm();
        form.setTitle("删除共享成员");
        form.addDropdown("选择要删除的成员", shareName);
        player.sendForm(form, (player, data) => {
            if (data != undefined) {
                player.sendModalForm("删除共享成员", "你是否要删除共享成员" + shareName[data], "是", "否", (player, res) => {
                    if (res) {
                        Land.share = Land.share.filter((ele) => {
                            if (ele.share == shareName[data]) {
                                return false;
                            }
                        });
                        Methods.writeLandData(Land, player);
                        player.tell("你已成功删除!");
                    }
                });
            }
        });
    }

    static SetShareMenu(player, Land) {
        let shareData = Land.share;
        if (shareData.length == 0) {
            player.tell("暂无可设置的分享成员");
            return;
        }
        const shareName = shareData.map((ele) => {
            return ele.name;
        });
        const form = mc.newCustomForm();
        form.setTitle("设置共享成员");
        form.addDropdown("选择要设置的成员", shareName);
        player.sendForm(form, (player, data) => {
            if (data != undefined) {

            }
        });
    }

    static SetOneShareMenu(player,Land,pName){
        const form = mc.newCustomForm();
        form.setTitle("成员共享设置");
        
    }
};

module.exports = { Share };