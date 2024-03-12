// LiteLoader-AIDS automatic generated
/// <reference path="d:\BDS_api/dts/llaids/src/index.d.ts"/> 
const { Struct , CustomStruct} = require("./Struct.js");
const { Methods } = require("./Methods.js");
const { IsLandCreate } = require("./Island.js");
const { Share } = require("./Share.js");

class Command {
    static register() {
        const cmd = mc.newCommand("is", "LxSky空岛插件指令", PermType.Any);
        cmd.setEnum("struct", ["struct"]);
        cmd.setEnum("op",["op"])
        cmd.mandatory("action", ParamType.Enum, "struct");
        cmd.mandatory("action",ParamType.Enum,"op");
        cmd.overload([]);
        cmd.overload(["struct"]);
        cmd.overload(["op"]);
        cmd.setCallback((cmd, ori, out, res) => {
            switch (res.action) {
                case "struct":
                    Struct.structMenu(ori.player);
                    break;
                case "op":
                    if(ori.player.isOP()){
                        opMenu.First(ori.player);
                    }
                    else{
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

class opMenu{
    static First(player){
        const form = mc.newSimpleForm();
        form.setTitle("LxSky管理员菜单");
        form.addButton("添加模板");
        form.addButton("修改模板");
        form.addButton("删除模板");
        form.addButton("系统设置");
        player.sendForm(form,(player,data)=>{
            if(data != undefined){
                switch(data){
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
                        break;
                }
            }
        });
    }
};

class IsMenu{
    static Transfer(player){
        if(Methods.haveIsland(player)){
            this.Menu(player);
        }
        else{
            this.createMenu(player);
        }
    }

    static createMenu(player){
        const CustomStructs = Methods.getCustomModal();
        if(CustomStructs.length == 0){
            player.tell("暂时没有模板，无法创建空岛");
            return;
        }
        const form = mc.newCustomForm();
        form.setTitle("空岛创建");
        const CustomNames = CustomStructs.map((ele)=>{
            return ele.name;
        });
        form.addDropdown("请选择空岛模板",CustomNames);
        form.addInput("请输入你的空岛名称","空岛名称");
        form.addInput("请输入你的空岛介绍","空岛介绍");
        player.sendForm(form,(player,data)=>{
            if(data != undefined){
                if(Methods.haveOneLand(player,data[1])){
                    player.tell("你已拥有该名称的岛屿了，请换个名字再来吧!");
                    return;
                }
                else{
                    const money = CustomStructs[Methods.getCustomModalIndex(CustomNames[data[0]])].money;
                    Methods.reMoney(money);
                    IsLandCreate.createOne(data[1],data[2],player,CustomStructs[Methods.getCustomModalIndex(CustomNames[data[0]])].ModalName);
                }
            }
        });
    }

    static Menu(player){
        const form = mc.newSimpleForm();
        form.setTitle("LxSky空岛菜单");
        form.addButton("我的空岛");
        form.addButton("创建空岛");
        player.sendForm(form,(player,data)=>{
            if(data != undefined){
                if(data == 0){
                    this.MyLandMenu(player);
                }
                else if(data == 1){
                    if(Methods.checkPlayerLandCount(player)){
                        player.tell("你的空岛数量已满");
                        return;
                    }
                    else{
                        this.createMenu(player);
                    }
                }
            }
        })
    }

    static MyLandMenu(player){
        const Lands = Methods.getPlayerLand(player);
        const LandsName = Lands.map((ele)=>{
            return ele.name;
        });
        const form = mc.newSimpleForm();
        form.setTitle("我的空岛");
        for(let LandName of LandsName){
            form.addButton(LandName);
        }
        player.sendForm(form,(player,data)=>{
            if(data != undefined){
                const land = Lands.filter((ele)=>{
                    if(ele.name == LandsName[data]){
                        return ele;
                    }
                })[0];
                this.LandMenu(player,land);
            }
        });
    }

    static LandMenu(player,land){
        const form = mc.newSimpleForm();
        form.setTitle("空岛菜单");
        form.addButton("成员分享管理");
        player.sendForm(form,(player,data)=>{
            if(data != undefined){
                switch(data){
                    case 0:
                        Share.ShareMenu(player,land);
                        break;
                }
            }
        });
    }
};

module.exports = { Command };