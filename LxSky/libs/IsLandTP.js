// LiteLoader-AIDS automatic generated
/// <reference path="d:\BDS_api/dts/llaids/src/index.d.ts"/> 

const { Methods } = require("./Methods");



class IsLandTP {


    static TPMenu(player, Land) {
        const form = mc.newSimpleForm();
        form.setTitle("空岛传送菜单");
        form.addButton("空岛传送点菜单");
        form.addButton("返回默认传送点");
        form.addButton("设置默认传送点");
        player.sendForm(form, (player, data) => {
            if (data != undefined) {
                switch (data) {
                    case 0:
                        Point.PointMenu(player, Land);
                        break;
                    case 1:
                        this.backDefult(player, Land);
                        break;
                    case 2:
                        this.setDefult(player, Land);
                        break;
                }
            }
        });
    }

    static backDefult(player, Land) {
        player.teleport(Land.defultTp.x, Land.defultTp.y, Land.defultTp.z, 0);
        player.tell("已成功将你传送至该空岛");
    }

    static setDefult(player, Land) {
        if (!Methods.checkInLand(player, Land)) {
            player.tell("你不在该岛屿范围内");
            return;
        }
        player.sendModalForm("默认传送点设置", "是否设置你目前所在坐标为该空岛默认传送点", "是", "否", (player, res) => {
            if (res) {
                Land.defultTp = {
                    x: player.blockPos.x,
                    y: player.blockPos.y,
                    z: player.blockPos.z
                }
                Methods.writeLandData(Land, player.name);
                player.tell("已为你成功设置");
            }
        });
    }
};

class Point {
    constructor(name, pos) {
        this.name = name;
        this.pos = pos;
    }

    static PointMenu(player, Land) {
        const form = mc.newSimpleForm();
        form.setTitle("岛屿传送点菜单");
        form.addButton("岛屿传送点");
        form.addButton("创建传送点");
        form.addButton("删除传送点");
        player.sendForm(form, (player, data) => {
            if (data != undefined) {
                switch (data) {
                    case 0:
                        this.TpMenu(player, Land);
                        break;
                    case 1:
                        this.CreateMenu(player, Land);
                        break;
                    case 2:
                        this.delPoint(player,Land);
                        break;
                }
            }
        });
    }

    static TpMenu(player, Land) {
        const pointData = Land.TpPoint;
        if(pointData.length == 0){
            player.tell("该空岛暂时没有传送点");
            return;
        }
        const form = mc.newSimpleForm();
        form.setTitle("岛屿传送点");
        for (let point of pointData) {
            form.addButton(point.name);
        }
        player.sendForm(form, (player, data) => {
            if (data != undefined) {
                const needPoint = pointData[data];
                const pos = new IntPos(needPoint.x, needPoint.y, needPoint.z, needPoint.dimid);
                player.sendModalForm("传送点传送", "是否传送至\n名称: " + needPoint.name + "\n介绍: " + needPoint.introduct, "是", "否", (player, res) => {
                    if (res) {
                        player.teleport(pos);
                        player.tell("已将你传送至" + needPoint.name);
                    }
                });
            }
        });
    }

    static CreateMenu(player, Land) {
        if (Methods.checkLandPointCount(Land)) {
            player.tell("你的传送点数已满");
            return;
        }
        else {
            const form = mc.newCustomForm();
            form.setTitle("添加传送点");
            form.addInput("请输入传送点名", "请输入传送点名");
            form.addInput("请输入传送点介绍", "请输入传送点介绍");
            player.sendForm(form, (player, data) => {
                if (data != undefined) {
                    if(Methods.checkSamePoint(data[0],Land)){
                        player.tell("该传送点名已存在！");
                        return;
                    }
                    if(!Methods.checkInLand(player,Land)){
                        player.tell("目前你不在该空岛中!");
                        return;
                    }
                    player.sendModalForm("添加传送点", "是否将你当前的坐标添加为传送点", "是", "否", (player, res) => {
                        if (res) {
                            Land.TpPoint.push({
                                name: data[0],
                                introduct: data[1],
                                x: player.blockPos.x,
                                y: player.blockPos.y,
                                z: player.blockPos.z,
                                dimid: player.blockPos.dimid
                            });
                            Methods.writeLandData(Land, player.name);
                            player.tell("你已成功设置!");
                        }
                    });
                }
            });
        }
    }

    static delPoint(player,Land){
        const pointData = Land.TpPoint;
        if(pointData.length == 0){
            player.tell("该空岛暂时没有传送点");
            return;
        }
        const form = mc.newSimpleForm();
        form.setTitle("删除传送点");
        for (let point of pointData) {
            form.addButton(point.name);
        }
        player.sendForm(form, (player, data) => {
            if (data != undefined) {
                const needPoint = pointData[data];
                player.sendModalForm("传送点删除", "是否删除传送点\n名称: " + needPoint.name + "\n介绍: " + needPoint.introduct, "是", "否", (player, res) => {
                    if (res) {
                        Land.TpPoint = Land.TpPoint.filter((ele)=>{
                            if(ele.name == needPoint.name){
                                return false;
                            }
                            else{
                                return true;
                            }
                        });
                        Methods.writeLandData(Land,player.name);
                        player.tell("已为你删除该传送点!");
                    }
                });
            }
        });
    }
}

module.exports = { IsLandTP };