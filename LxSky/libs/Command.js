// LiteLoader-AIDS automatic generated
/// <reference path="d:\BDS_api/dts/llaids/src/index.d.ts"/> 
const { Struct, CustomStruct } = require("./Struct.js");
const { CmdMethods } = require('./service/CmdService.js')
const { IsLandCreate } = require("./Island.js");
const { Share } = require("./Share.js");
const { IsLandTP } = require("./IsLandTP.js");
const { InviteMenu } = require("./Invite.js");
const { ManageLand } = require("./ManageLand.js");
const { Setting } = require("./Setting.js");

class Command {
    static register() {
        const cmd = mc.newCommand("is", "LxSky空岛插件指令", PermType.Any);
        cmd.setEnum("struct", ["struct"]);
        cmd.setEnum("op", ["op"])
        cmd.mandatory("action", ParamType.Enum, "struct");
        cmd.mandatory("action", ParamType.Enum, "op");
        cmd.overload([]);
        cmd.overload(["struct"]);
        cmd.overload(["op"]);
        cmd.setCallback((cmd, ori, out, res) => {
            switch (res.action) {
                case "struct":
                    Struct.structMenu(ori.player);
                    break;
                case "op":
                    if (ori.player.isOP()) {
                        opMenu.First(ori.player);
                    }
                    else {
                        ori.player.tell("你没有权限这么做");
                    }
                    break;
                default:
                    IsMenu.Transfer(ori.player);
                    break;
            }
        });
        cmd.setup();
    }
};

class opMenu {
    static First(player) {
        if (!CmdMethods.checkHaveModal()) {
            player.tell("暂时没有模板初始化");
            return;
        }
        const form = mc.newSimpleForm();
        form.setTitle("LxSky管理员菜单");
        form.addButton("添加模板");
        form.addButton("修改模板");
        form.addButton("删除模板");
        form.addButton("系统设置");
        player.sendForm(form, (player, data) => {
            if (data != undefined) {
                switch (data) {
                    case 0:
                        CustomStruct.addModal(player);
                        break;
                    case 1:
                        CustomStruct.setModal(player);
                        break;
                    case 2:
                        CustomStruct.delModal(player);
                        break;
                    case 3:
                        Setting.Form(player);
                        break;
                }
            }
        });
    }
};

class IsMenu {
    static Transfer(player) {
        switch(CmdMethods.getPlayerRight(player)){
            case "Master":
                this.Menu(player);
                break;
            case "Member":
                break;
            case "none":
                this.createMenu(player);
                break;
        }
    }

    static createMenu(player) {
        const CustomStructs = CmdMethods.getCustomModal();
        if (CustomStructs.length == 0) {
            player.tell("暂时没有模板，无法创建空岛");
            return;
        }
        const form = mc.newCustomForm();
        form.setTitle("空岛创建");
        const CustomNames = CustomStructs.map((ele) => {
            return ele.name;
        });
        form.addDropdown("请选择空岛模板", CustomNames);
        form.addInput("请输入你的空岛名称", "空岛名称");
        form.addInput("请输入你的空岛介绍", "空岛介绍");
        player.sendForm(form, (player, data) => {
            if (data != undefined) {
                if (CmdMethods.haveOneLand(player, data[1])) {
                    player.tell("你已拥有该名称的岛屿了，请换个名字再来吧!");
                    return;
                }
                else {
                    const money = CustomStructs[CmdMethods.getCustomModalIndex(CustomNames[data[0]])].money;
                    CmdMethods.reMoney(money,player);
                    IsLandCreate.createOne(data[1], data[2], player, CustomStructs[CmdMethods.getCustomModalIndex(CustomNames[data[0]])]);
                }
            }
        });
    }

    static Menu(player) {
        const form = mc.newSimpleForm();
        form.setTitle("LxSky空岛菜单");
        form.addButton("我的空岛");
        form.addButton("创建空岛");
        form.addButton("公共岛屿");
        player.sendForm(form, (player, data) => {
            if (data != undefined) {
                switch (data) {
                    case 0:
                        this.MyLandMenu(player);
                        break;
                    case 1:
                        if (CmdMethods.checkPlayerLandCount(player.name)) {
                            player.tell("你的空岛数量已满");
                            return;
                        }
                        else {
                            this.createMenu(player);
                        }
                        break;
                    case 2:
                        //公共岛屿
                        break;
                }
            }
        })
    }

    static MyLandMenu(player) {
        const Lands = CmdMethods.getPlayerLand(player.name);
        const LandsName = Lands.map((ele) => {
            return ele.name;
        });
        const form = mc.newSimpleForm();
        form.setTitle("我的空岛");
        for (let LandName of LandsName) {
            form.addButton(LandName);
        }
        player.sendForm(form, (player, data) => {
            if (data != undefined) {
                const land = Lands.filter((ele) => {
                    if (ele.name == LandsName[data]) {
                        return ele;
                    }
                })[0];
                this.LandMenu(player, land);
            }
        });
    }

    static LandMenu(player, land) {
        const form = mc.newSimpleForm();
        form.setTitle("空岛菜单");
        form.addButton("空岛传送");
        form.addButton("分享管理");
        form.addButton("成员管理");
        form.addButton("岛屿管理");
        player.sendForm(form, (player, data) => {
            if (data != undefined) {
                switch (data) {
                    case 0:
                        IsLandTP.TPMenu(player, land);
                        break;
                    case 1:
                        Share.ShareMenu(player, land);
                        break;
                    case 2:
                        InviteMenu.Menu(player, land);
                        break;
                    case 3:
                        this.ManageLandMenu(player,land);
                        break;
                }
            }
        });
    }

    static ManageLandMenu(player,Land){
        const form = mc.newSimpleForm();
        form.setTitle("岛屿管理");
        form.addButton("删除岛屿");
        form.addButton("转让岛屿");
        form.addButton("岛屿权限设置");
        form.addButton("共享权限设置");
        player.sendForm(form,(player,data)=>{
            if(data != undefined){
                switch(data){
                    case 0:
                        ManageLand.DeleteLand(player,Land);
                        break;
                    case 1:
                        ManageLand.TransferLand(player,Land);
                        break;
                    case 2:
                        ManageLand.PerSetting(player,Land);
                        break;
                    case 3:
                        ManageLand.ShareSetting(player,Land);
                        break;
                }
            }
        });
    }
    
};

module.exports = { Command };