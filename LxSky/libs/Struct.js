// LiteLoader-AIDS automatic generated
/// <reference path="d:\BDS_api/dts/llaids/src/index.d.ts"/> 

const { StructService } = require("./service/StructService.js");

class Struct {
    constructor(init, x, y, z, name) {
        this.init = init;
        this.x = x;
        this.y = y;
        this.z = z;
        this.name = name;
    }
    static ModalFileCheck(){
        const Modals = File.getFilesList("./plugins/LxSky/structures/");
        for(let modal of Modals){
            if(!File.exists("./behavior_packs/vanilla/structures/"+modal)){
                if (File.copy("./plugins/LxSky/structures/" + modal , "./behavior_packs/vanilla/structures")) {
                    const newData =new Struct(0,0,0,0,modal.replace(".mcstructure",""));
                    const sFile = new JsonConfigFile("./plugins/LxSky/data/Struct.json");
                    const sData = sFile.get("Struct");
                    sData.push(newData);
                    sFile.set("Struct",sData);
                    log("结构文件"+modal.replace(".mcstructure","")+"复制成功,请在游戏中输入/is struct初始化该结构");
                }
            }
        }
    }

    static structMenu(player) {
        const form = mc.newSimpleForm();
        form.setTitle("初始化结构表单");
        form.addButton("创建结构");
        form.addButton("选取结构中心点");
        player.sendForm(form, (player, data) => {
            if (data != undefined) {
                if (data == 0) {
                    this.initStruct(player);
                }
                else if (data == 1) {
                    this.chooseCenter(player);
                }
            }
        });
    }

    static initStruct(player) {
        let sData = StructService.getStruct();
        const sNames = sData.filter((ele) => {
            if (ele.init == 0) {
                return true;
            }
            else{
                return false;
            }
        }).map((ele)=>{return ele.name});
        if(sNames.length == 0){
            player.tell("暂无可初始化的模板!");
            return;
        }
        const form = mc.newCustomForm();
        form.setTitle("初始化结构");
        form.addDropdown("请选择需要初始化的结构", sNames);
        player.sendForm(form, (player, data) => {
            if (data != undefined) {
                player.sendModalForm("是否创建", "即将为你创建" + sNames[data[0]] + "的结构模型，请站在该结构的正中心再次输入/is struct并选中中心点", "确认", "取消", (player, res) => {
                    if (res) {
                        const cmd = mc.runcmdEx("structure load " + sNames[data[0]] + " 0 0 0 0_degrees none true true true");
                        player.teleport(0, 0, 0, 0);
                        player.tell("请站在该结构的正中心再次输入/is struct并选中中心点");
                    }
                })
            }
        });
    }

    static chooseCenter(player) {
        let sData = StructService.getStruct();
        const sNames = sData.filter((ele) => {
            if (ele.init == 0) {
                return true;
            }
            else{
                return false;
            }
        }).map((ele)=>{return ele.name});
        if(sNames.length == 0){
            player.tell("暂无可初始化的模板!");
            return;
        }
        const form = mc.newCustomForm();
        form.setTitle("中心点选取");
        form.addDropdown("请选择需要初始化的结构", sNames);
        player.sendForm(form, (player, data) => {
            if (data != undefined) {
                player.sendModalForm("中心点选取", "是否选取你目前的坐标为" + sNames[data[0]] + "模板的中心点(设置错误将会出现问题)", "是", "否", (player, res) => {
                    if (res) {
                        sData = sData.filter((ele) => {
                            if (ele.name == sNames[data[0]]) {
                                ele.init = 1;
                                ele.x = player.blockPos.x;
                                ele.y = player.blockPos.y;
                                ele.z = player.blockPos.z;
                                return ele;
                            }
                            else {
                                return ele;
                            }
                        });
                        const sFile = new JsonConfigFile("./plugins/LxSky/data/Struct.json");
                        sFile.set("Struct",sData);
                        player.tell("你已成功设置该模板！");
                    }
                });
            }
        });
    }
}

class CustomStruct {
    constructor(ModalName, name, introduct, money) {
        this.ModalName = ModalName;
        this.name = name;
        this.introduct = introduct;
        this.money = money;
    }
    static addModal(player) {
        let modals = [];
        const sFile = new JsonConfigFile("./plugins/LxSky/data/Struct.json");
        const sData = sFile.get("Struct");
        for (let sdata of sData) {
            if (sdata.init == 1) {
                modals.push(sdata.name);
            }
        }
        if(modals.length == 0){
            player.tell("暂无可用的模板");
            return;
        }
        const form = mc.newCustomForm();
        form.setTitle("添加模板");
        form.addDropdown("选择模板", modals);
        form.addInput("模板名称", "请输入自定义模板名称");
        form.addInput("模板介绍", "请输入自定义模板介绍");
        form.addInput("消耗金币", "所需金币数(0为没有)");
        player.sendForm(form, (player, data) => {
            if (data != undefined) {
                if (StructService.checkCustomStructName(data[1])) {
                    player.tell("该自定义名称已存在!");
                    return;
                }
                const mFile = new JsonConfigFile("./plugins/LxSky/data/Struct.json");
                let CustomStructs = mFile.get("CustomStruct");
                const chooseModal = modals[data[0]];
                const newData = new CustomStruct(chooseModal, data[1], data[2], Number(data[3]));
                CustomStructs.push(newData);
                mFile.set("CustomStruct", CustomStructs);
                player.tell("已成功为你添加模板");
            }
        });
    }

    static delModal(player) {
        const sFile = new JsonConfigFile("./plugins/LxSky/data/Struct.json");
        let sData = sFile.get("CustomStruct");
        if(sData.length == 0){
            player.tell("暂无可删除的模板!");
            return;
        }
        const form = mc.newSimpleForm();
        form.setTitle("删除模板");
        for (let sdata of sData) {
            form.addButton(sdata.name);
        }
        player.sendForm(form, (player, data) => {
            if (data != undefined) {
                player.sendModalForm(sData[data].name + "删除", "是否确认删除自定义模板" + sData[data].name, "是", "否", (player, res) => {
                    if (res) {
                        sData = sData.filter((ele) => {
                            if(ele.name == sData[data].name){
                                return false;
                            }
                            else{
                                return true;
                            }
                        })
                        sFile.set("CustomStruct", sData);
                        player.tell("你已成功删除");
                    }
                });
            }
        });
    }

    static setModal(player) {
        const sFile = new JsonConfigFile("./plugins/LxSky/data/Struct.json");
        let sData = sFile.get("CustomStruct");
        if(sData.length == 0){
            player.tell("暂无可设置的模板!");
            return;
        }
        const form = mc.newSimpleForm();
        form.setTitle("设置模板");
        for (let sdata of sData) {
            form.addButton(sdata.name);
        }
        player.sendForm(form, (player, data) => {
            if (data != undefined) {
                this.setOneModal(player, sData[data]);
            }
        });
    }

    static setOneModal(player, inData) {
        let modals = [];
        const sFile = new JsonConfigFile("./plugins/LxSky/data/Struct.json");
        const sData = sFile.get("Struct");
        for (let sdata of sData) {
            if (sdata.init == 1) {
                modals.push(sdata.name);
            }
        }
        const form = mc.newCustomForm();
        form.setTitle("设置模板");
        form.addDropdown("选择模板", modals, StructService.getCustomModalIndex(inData.name));
        form.addInput("模板名称", "请输入自定义模板名称", inData.name);
        form.addInput("模板介绍", "请输入自定义模板介绍", inData.introduct);
        form.addInput("消耗金币", "所需金币数(0为没有)", String(inData.money));
        player.sendForm(form, (player, data) => {
            if (data != undefined) {
                let newsData = sFile.get("CustomStruct");
                newsData = newsData.filter((ele) => {
                    if(ele.name == inData.name){
                        return true;
                    }
                    else{
                        return false;
                    }
                });
                const newData = new CustomStruct(modals[data[0]], data[1], data[2], Number(data[3]));
                newsData.push(newData);
                sFile.set("CustomStruct", newsData);
                player.tell("你已成功设置!");
            }
        });
    }
}

module.exports = { Struct, CustomStruct }