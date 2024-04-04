// LiteLoader-AIDS automatic generated
/// <reference path="d:\BDS_api/dts/llaids/src/index.d.ts"/> 

class Setting{
    /**
     * 系统设置总表单
     * @param {Player} player - 玩家对象
     */
    static Form(player){
        const form = mc.newSimpleForm();
        form.setTitle("系统设置");
        form.addButton("数据设置");
        form.addButton("世界权限");
        player.sendForm(form,(player,data)=>{
            if(data != undefined){
                switch(data){
                    case 0:
                        this.DataSetting(player);
                        break;
                    case 1:
                        this.WorldPerSetting(player);
                        break;
                }
            }
        });
    }

    /**
     * 系统内部设置
     * @param {Player} player - 玩家对象 
     */
    static DataSetting(player){
        const conf = new JsonConfigFile('./plugins/LxSky/config.json');
        const MoneyType = ["LLMoney","ScoreMoney"];
        const form = mc.newCustomForm();
        form.setTitle("系统数据设置");
        form.addDropdown("经济系统选择",MoneyType,MoneyType.indexOf[conf.get("MoneyType")]);
        form.addInput("计分板名称","请输入计分板名称",conf.get("ScoreName"));
        form.addInput("默认岛屿高度","请输入默认岛屿高度",String(conf.get("Height")));
        form.addInput("岛屿间距","请输入岛屿间距",String(conf.get("LandRange")));
        form.addInput("岛屿保护范围","请输入岛屿保护范围",String(conf.get("LandProtectRange")));
        form.addInput("玩家最大岛屿数","玩家最大岛屿数",String(conf.get("MaxLandCount")));
        form.addInput("岛屿最大传送点数","岛屿最大传送点数",String(conf.get("MaxTpPoint")));
        player.sendForm(form,(player,data)=>{
            conf.set("MoneyType",MoneyType[data[0]]);
            conf.set("ScoreName",data[1]);
            conf.set("Height",Number(data[2]));
            conf.set("LandRange",Number(data[3]));
            conf.set("LandProtectRange",Number(data[4]));
            conf.set("MaxLandCount",Number(data[5]));
            conf.set("MaxTpPoint",Number(data[6]));
            player.tell("你已成功设置!");
        });
    }

    static WorldPerSetting(player){
        const conf = new JsonConfigFile("./plugins/LxSky/config.json");
        const permission = conf.get("worldPermission");
        const form = mc.newCustomForm();
        form.setTitle("世界权限设置");
        form.addSwitch("破坏方块", permission.BREAK_BLOCK);
        form.addSwitch("放置方块", permission.PLACE_BLOCK);
        form.addSwitch("丢弃物品", permission.DROP_ITEM);
        form.addSwitch("拾取物品", permission.TAKE_ITEM);
        form.addSwitch("攻击玩家", permission.ATTACK_PLAYER);
        form.addSwitch("攻击生物", permission.ATTACK_ENTITY);
        form.addSwitch("工作台交互", permission.OPEN_CRAFTING_TABLE);
        form.addSwitch("熔炉交互", permission.OPEN_FURNACE);
        form.addSwitch("高炉交互", permission.OPEN_BLAST_FURNACE);
        form.addSwitch("烟熏炉交互", permission.OPEN_SMOKER);
        form.addSwitch("酿造台交互", permission.OPEN_BREWING_STAND);
        form.addSwitch("铁砧交互", permission.OPEN_ANVIL);
        form.addSwitch("附魔台交互", permission.OPEN_ENCHANTING_TABLE);
        form.addSwitch("木桶交互", permission.OPEN_BARREL);
        form.addSwitch("箱子交互", permission.OPEN_CHEST);
        form.addSwitch("切石机交互", permission.OPEN_STONECUTTER_BLOCK);
        form.addSwitch("发射器交互", permission.OPEN_DISPENSER);
        form.addSwitch("投掷器交互", permission.OPEN_DROPPER);
        form.addSwitch("漏斗交互", permission.OPEN_HOPPER);
        form.addSwitch("信标交互", permission.OPEN_BEACON);
        form.addSwitch("使用打火石", permission.USE_FLINE_AND_STEEL);
        form.addSwitch("使用桶", permission.USE_BUCKET);
        form.addSwitch("展示框交互", permission.USE_FRAME);
        player.sendForm(form,(player,data)=>{
            if(data != undefined){
                permission.BREAK_BLOCK = data[0];
                permission.PLACE_BLOCK = data[1];
                permission.DROP_ITEM = data[2];
                permission.TAKE_ITEM = data[3];
                permission.ATTACK_PLAYER = data[4];
                permission.ATTACK_ENTITY = data[5];
                permission.OPEN_CRAFTING_TABLE = data[6];
                permission.OPEN_FURNACE = data[7];
                permission.OPEN_BLAST_FURNACE = data[8];
                permission.OPEN_SMOKER = data[9];
                permission.OPEN_BREWING_STAND = data[10];
                permission.OPEN_ANVIL = data[11];
                permission.OPEN_ENCHANTING_TABLE = data[12];
                permission.OPEN_BARREL = data[13];
                permission.OPEN_CHEST = data[14];
                permission.OPEN_STONECUTTER_BLOCK = data[15];
                permission.OPEN_DISPENSER = data[16];
                permission.OPEN_DROPPER = data[17];
                permission.OPEN_HOPPER = data[18];
                permission.OPEN_BEACON = data[19];
                permission.USE_FLINE_AND_STEEL = data[20];
                permission.USE_BUCKET = data[21];
                permission.USE_FRAME = data[22];
                conf.set("worldPermission",permission);
                player.tell("你已成功设置");
            }
        });
    }
};

module.exports = { Setting }