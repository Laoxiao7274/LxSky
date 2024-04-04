// LiteLoader-AIDS automatic generated
/// <reference path="d:\BDS_api/dts/llaids/src/index.d.ts"/> 
const { ManageService } = require("./service/ManageService");

class ManageLand {
    /**
     * 岛屿删除
     * @param {Player} player - 岛主玩家对象
     * @param {Land} Land - 被删除的岛屿对象
     */
    static DeleteLand(player, Land) {
        player.sendModalForm("岛屿删除", "是否确认删除岛屿: " + Land.name, "是", "否", (player, res) => {
            if (res) {
                ManageService.delLandData(Land, player.name);
                player.tell("已为你删除岛屿");
            }
        });

    }

    /**
     * 岛屿转让
     * @param {Player} player - 岛主玩家对象
     * @param {Land} Land - 被转让的岛屿对象
     */
    static TransferLand(player, Land) {
        const OnlinePlayers = mc.getOnlinePlayers();
        const OnlinePlayersName = OnlinePlayers.map((ele) => { return ele.name });
        const NeedNames = OnlinePlayersName.filter((ele) => {
            if (ele == player.name || ManageService.getPlayerRight(ele) == "Member") {
                return false;
            }
            else {
                return true;
            }
        });
        if (NeedNames.length == 0) {
            player.tell("暂无可转让的玩家");
            return;
        }
        const form = mc.newCustomForm();
        form.setTitle("岛屿转让");
        form.addDropdown("请选择要转让的玩家", NeedNames);
        player.sendForm(form, (player, data) => {
            if (data != undefined) {
                player.sendModalForm("转让岛屿", "是否将岛屿: " + Land.name + "\n转让给玩家: " + NeedNames[data], "是", "否", (player, res) => {
                    if (res) {
                        if (mc.getPlayer(NeedNames[data]) != undefined) {
                            const trFile = new JsonConfigFile('./plugins/LxSky/players/' + NeedNames[data] + ".json");
                            if (ManageService.getPlayerRight(NeedNames[data]) == "none") {
                                trFile.set("Right", "Master");
                                trFile.set("IsLands", [Land]);
                                ManageService.transferLand(player.name, NeedNames[data], Land);
                                ManageService.delLandData(Land, player.name);
                                mc.getPlayer(NeedNames[data]).tell("你被转让了一个岛屿!");
                                player.tell("你已成功转让空岛！");
                            }
                            else if (ManageService.getPlayerRight(NeedNames[data]) == "Master") {
                                if (ManageService.checkPlayerLandCount(NeedNames[data])) {
                                    player.tell("该玩家空岛已满");
                                    return;
                                }
                                let newData = trFile.get("IsLands");
                                newData.push(Land);
                                trFile.set("IsLands", newData);
                                ManageService.transferLand(player.name, NeedNames[data], Land);
                                ManageService.delLandData(Land, player.name);
                                player.tell("你已成功转让空岛! ");
                                mc.getPlayer(NeedNames[data]).tell("你被转让了一个岛屿!");
                            }
                        }
                        else {
                            player.tell("该玩家已下线!");
                        }
                    }
                });
            }
        });
    }

    static PerSetting(player, Land) {
        const form = mc.newCustomForm();
        form.setTitle("岛屿权限设置");
        form.addSwitch("破坏方块", Land.permission.BREAK_BLOCK);
        form.addSwitch("放置方块", Land.permission.PLACE_BLOCK);
        form.addSwitch("丢弃物品", Land.permission.DROP_ITEM);
        form.addSwitch("拾取物品", Land.permission.TAKE_ITEM);
        form.addSwitch("攻击玩家", Land.permission.ATTACK_PLAYER);
        form.addSwitch("攻击生物", Land.permission.ATTACK_ENTITY);
        form.addSwitch("工作台交互", Land.permission.OPEN_CRAFTING_TABLE);
        form.addSwitch("熔炉交互", Land.permission.OPEN_FURNACE);
        form.addSwitch("高炉交互", Land.permission.OPEN_BLAST_FURNACE);
        form.addSwitch("烟熏炉交互", Land.permission.OPEN_SMOKER);
        form.addSwitch("酿造台交互", Land.permission.OPEN_BREWING_STAND);
        form.addSwitch("铁砧交互", Land.permission.OPEN_ANVIL);
        form.addSwitch("附魔台交互", Land.permission.OPEN_ENCHANTING_TABLE);
        form.addSwitch("木桶交互", Land.permission.OPEN_BARREL);
        form.addSwitch("箱子交互", Land.permission.OPEN_CHEST);
        form.addSwitch("切石机交互", Land.permission.OPEN_STONECUTTER_BLOCK);
        form.addSwitch("发射器交互", Land.permission.OPEN_DISPENSER);
        form.addSwitch("投掷器交互", Land.permission.OPEN_DROPPER);
        form.addSwitch("漏斗交互", Land.permission.OPEN_HOPPER);
        form.addSwitch("信标交互", Land.permission.OPEN_BEACON);
        form.addSwitch("使用打火石", Land.permission.USE_FLINE_AND_STEEL);
        form.addSwitch("使用桶", Land.permission.USE_BUCKET);
        form.addSwitch("展示框交互", Land.permission.USE_FRAME);
        player.sendForm(form, (player, data) => {
            if (data != undefined) {
                Land.permission.BREAK_BLOCK = data[0];
                Land.permission.PLACE_BLOCK = data[1];
                Land.permission.DROP_ITEM = data[2];
                Land.permission.TAKE_ITEM = data[3];
                Land.permission.ATTACK_PLAYER = data[4];
                Land.permission.ATTACK_ENTITY = data[5];
                Land.permission.OPEN_CRAFTING_TABLE = data[6];
                Land.permission.OPEN_FURNACE = data[7];
                Land.permission.OPEN_BLAST_FURNACE = data[8];
                Land.permission.OPEN_SMOKER = data[9];
                Land.permission.OPEN_BREWING_STAND = data[10];
                Land.permission.OPEN_ANVIL = data[11];
                Land.permission.OPEN_ENCHANTING_TABLE = data[12];
                Land.permission.OPEN_BARREL = data[13];
                Land.permission.OPEN_CHEST = data[14];
                Land.permission.OPEN_STONECUTTER_BLOCK = data[15];
                Land.permission.OPEN_DISPENSER = data[16];
                Land.permission.OPEN_DROPPER = data[17];
                Land.permission.OPEN_HOPPER = data[18];
                Land.permission.OPEN_BEACON = data[19];
                Land.permission.USE_FLINE_AND_STEEL = data[20];
                Land.permission.USE_BUCKET = data[21];
                Land.permission.USE_FRAME = data[22];
                ManageService.writeLandData(Land,player.name);
                player.tell("§a已成功设置权限");
            }
        })
    }

    /**
     * 共享权限设置
     * @param {Player} player - 玩家对象
     * @param {Land} Land - 岛屿对象
     */
    static ShareSetting(player,Land){
        const SharePlayers = Land.share;
        const SharePlayersName = SharePlayers.map((ele)=>{return ele.name});
        const form = mc.newSimpleForm();
        form.setTitle("共享权限设置")
        form.setContent("请选择要设置的玩家");
        for(let pName of SharePlayersName){
            form.addButton(pName);
        }
        player.sendForm(form,(player,data)=>{
            if(data != undefined){
                this.SharePerSetting(SharePlayersName[data],Land,player);
            }
        });
    }

    static SharePerSetting(ShareName,Land,player){
        const ShareData = Land.share.filter((ele)=>{
            if(ele.name == ShareName){
                return true;
            }
            else{
                return false;
            }
        })[0];
        const form = mc.newCustomForm();
        form.setTitle(ShareName+"权限设置");
        form.addSwitch("破坏方块", ShareData.permission.BREAK_BLOCK);
        form.addSwitch("放置方块", ShareData.permission.PLACE_BLOCK);
        form.addSwitch("丢弃物品", ShareData.permission.DROP_ITEM);
        form.addSwitch("拾取物品", ShareData.permission.TAKE_ITEM);
        form.addSwitch("攻击玩家", ShareData.permission.ATTACK_PLAYER);
        form.addSwitch("攻击生物", ShareData.permission.ATTACK_ENTITY);
        form.addSwitch("工作台交互", ShareData.permission.OPEN_CRAFTING_TABLE);
        form.addSwitch("熔炉交互", ShareData.permission.OPEN_FURNACE);
        form.addSwitch("高炉交互", ShareData.permission.OPEN_BLAST_FURNACE);
        form.addSwitch("烟熏炉交互", ShareData.permission.OPEN_SMOKER);
        form.addSwitch("酿造台交互", ShareData.permission.OPEN_BREWING_STAND);
        form.addSwitch("铁砧交互", ShareData.permission.OPEN_ANVIL);
        form.addSwitch("附魔台交互", ShareData.permission.OPEN_ENCHANTING_TABLE);
        form.addSwitch("木桶交互", ShareData.permission.OPEN_BARREL);
        form.addSwitch("箱子交互", ShareData.permission.OPEN_CHEST);
        form.addSwitch("切石机交互", ShareData.permission.OPEN_STONECUTTER_BLOCK);
        form.addSwitch("发射器交互", ShareData.permission.OPEN_DISPENSER);
        form.addSwitch("投掷器交互", ShareData.permission.OPEN_DROPPER);
        form.addSwitch("漏斗交互", ShareData.permission.OPEN_HOPPER);
        form.addSwitch("信标交互", ShareData.permission.OPEN_BEACON);
        form.addSwitch("使用打火石", ShareData.permission.USE_FLINE_AND_STEEL);
        form.addSwitch("使用桶", ShareData.permission.USE_BUCKET);
        form.addSwitch("展示框交互", ShareData.permission.USE_FRAME);
        player.sendForm(form,(player,data)=>{
            if(data != undefined){
                ShareData.permission.BREAK_BLOCK = data[0];
                ShareData.permission.PLACE_BLOCK = data[1];
                ShareData.permission.DROP_ITEM = data[2];
                ShareData.permission.TAKE_ITEM = data[3];
                ShareData.permission.ATTACK_PLAYER = data[4];
                ShareData.permission.ATTACK_ENTITY = data[5];
                ShareData.permission.OPEN_CRAFTING_TABLE = data[6];
                ShareData.permission.OPEN_FURNACE = data[7];
                ShareData.permission.OPEN_BLAST_FURNACE = data[8];
                ShareData.permission.OPEN_SMOKER = data[9];
                ShareData.permission.OPEN_BREWING_STAND = data[10];
                ShareData.permission.OPEN_ANVIL = data[11];
                ShareData.permission.OPEN_ENCHANTING_TABLE = data[12];
                ShareData.permission.OPEN_BARREL = data[13];
                ShareData.permission.OPEN_CHEST = data[14];
                ShareData.permission.OPEN_STONECUTTER_BLOCK = data[15];
                ShareData.permission.OPEN_DISPENSER = data[16];
                ShareData.permission.OPEN_DROPPER = data[17];
                ShareData.permission.OPEN_HOPPER = data[18];
                ShareData.permission.OPEN_BEACON = data[19];
                ShareData.permission.USE_FLINE_AND_STEEL = data[20];
                ShareData.permission.USE_BUCKET = data[21];
                ShareData.permission.USE_FRAME = data[22];
                Land.share.map((ele)=>{
                    if(ele.name == ShareName){
                        return ShareData;
                    }
                    else{
                        return ele;
                    }
                });
                ManageService.writeLandData(Land,player.name);
                player.tell("§a已成功设置权限");
            }
        });
    }
}

module.exports = { ManageLand };