// LiteLoader-AIDS automatic generated
/// <reference path="d:\BDS_api/dts/llaids/src/index.d.ts"/> 
const { PerMethods } = require('./service/PerService.js');

class Permission {
    static checkPermission(player, bPos, PerName) {
        const pData = new JsonConfigFile('./plugins/LxSky/players/' + player.name + ".json");
        const pRight = pData.get("Right");
        const Land = PerMethods.getPosLand(bPos);
        if (Land == "none") {
            if (PerMethods.CheckWorldPer(PerName)) {
                return true;
            }
            else {
                return false;
            }
        }
        switch (pRight) {
            case "Master":
                //查看是否为自己岛屿
                if (PerMethods.haveOneLand(player, Land.name, Land.pos)) {
                    return true;
                }
                break;
            case "Member":
                //查看是否为当前岛屿成员并查看权限
                if (PerMethods.CheckMember(player, Land, PerName)) {
                    return true;
                }
                break;
            case "none":
                break;
            default:
                return false;
        }
        //查看共享权限
        if (PerMethods.CheckShare(player, Land, PerName)) {
            return true;
        }
        //查看公共权限
        if (PerMethods.CheckPer(Land, PerName)) {
            return true;
        }
        return false;
    }

    /**
     * 权限事件监听
     */
    static Listen() {

        //放置事件
        mc.listen("onPlaceBlock", (player, block) => {
            if (!Permission.checkPermission(player, block.pos, "PLACE_BLOCK")) {
                player.tell("§4你没有权限这么做!");
                return false;
            }
        });

        //破坏事件
        mc.listen("onDestroyBlock", (player,block) => {
            if (!Permission.checkPermission(player, block.pos, "BREAK_BLOCK")) {
                player.tell("§4你没有权限这么做!");
                return false;
            }
        });

        //丢弃物品事件
        mc.listen("onDropItem", (player) => {
            if (!Permission.checkPermission(player, player.blockPos, "DROP_ITEM")) {
                player.tell("§4你没有权限这么做!");
                return false;
            }
        });

        //捡起物品事件
        mc.listen("onTakeItem", (player) => {
            if (!Permission.checkPermission(player, player.blockPos, "TAKE_ITEM")) {
                player.tell("§4你没有权限这么做!");
                return false;
            }
        });

        //攻击玩家及实体事件
        mc.listen("onAttackEntity", (player, entity) => {
            if (entity.isPlayer()) {
                if (!Permission.checkPermission(player, entity.blockPos, "ATTACK_PLAYER")) {
                    player.tell("§4你没有权限这么做!");
                    return false;
                }
            }
            else {
                if (!Permission.checkPermission(player, entity.blockPos, "ATTACK_ENTITY")) {
                    player.tell("§4你没有权限这么做!");
                    return false;
                }
            }
        });

        //打开容器事件
        mc.listen("onOpenContainer", (player, block) => {
            switch (block.type) {
                case "minecraft:crafting_table":
                    if (!Permission.checkPermission(player, block.pos, "OPEN_CRAFTING_TABLE")) {
                        player.tell("§4你没有权限这么做!");
                        return false;
                    }
                    break;
                case "minecraft:furnace":
                    if (!Permission.checkPermission(player, block.pos, "OPEN_FURNACE")) {
                        player.tell("§4你没有权限这么做!");
                        return false;
                    }
                    break;
                case "minecraft:blast_furnace":
                    if (!Permission.checkPermission(player, block.pos, "OPEN_BLAST_FURNACE")) {
                        player.tell("§4你没有权限这么做!");
                        return false;
                    }
                    break;
                case "minecraft:smoker":
                    if (!Permission.checkPermission(player, block.pos, "OPEN_SMOKER")) {
                        player.tell("§4你没有权限这么做!");
                        return false;
                    }
                    break;
                case "minecraft:brewing_stand":
                    if (!Permission.checkPermission(player, block.pos, "OPEN_BREWING_STAND")) {
                        player.tell("§4你没有权限这么做!");
                        return false;
                    }
                    break;
                case "minecraft:anvil":
                    if (!Permission.checkPermission(player, block.pos, "OPEN_ANVIL")) {
                        player.tell("§4你没有权限这么做!");
                        return false;
                    }
                    break;
                case "minecraft:enchanting_table":
                    if (!Permission.checkPermission(player, block.pos, "OPEN_ENCHANTING_TABLE")) {
                        player.tell("§4你没有权限这么做!");
                        return false;
                    }
                    break;
                case "minecraft:barrel":
                    if (!Permission.checkPermission(player, block.pos, "OPEN_BARREL")) {
                        player.tell("§4你没有权限这么做!");
                        return false;
                    }
                    break;
                case "minecraft:chest":
                    if (!Permission.checkPermission(player, block.pos, "OPEN_CHEST")) {
                        player.tell("§4你没有权限这么做!");
                        return false;
                    }
                    break;
                case "minecraft:stonecutter_block":
                    if (!Permission.checkPermission(player, block.pos, "OPEN_STONECUTTER_BLOCK")) {
                        player.tell("§4你没有权限这么做!");
                        return false;
                    }
                    break;
                case "minecraft:dispenser":
                    if (!Permission.checkPermission(player, block.pos, "OPEN_DISPENSER")) {
                        player.tell("§4你没有权限这么做!");
                        return false;
                    }
                    break;
                case "minecraft:dropper":
                    if (!Permission.checkPermission(player, block.pos, "OPEN_DROPPER")) {
                        player.tell("§4你没有权限这么做!");
                        return false;
                    }
                    break;
                case "minecraft:hopper":
                    if (!Permission.checkPermission(player, block.pos, "OPEN_HOPPER")) {
                        player.tell("§4你没有权限这么做!");
                        return false;
                    }
                    break;
                case "minecraft:beacon":
                    if (!Permission.checkPermission(player, block.pos, "OPEN_BEACON")) {
                        player.tell("§4你没有权限这么做!");
                        return false;
                    }
                    break;
            }
        });

        //使用物品事件
        mc.listen("onUseItemOn", (player, item, block) => {
            switch (item.type) {
                case "minecraft:flint_and_steel":
                    if (!Permission.checkPermission(player, block.pos, "USE_FLINE_AND_STEEL")) {
                        player.tell("§4你没有权限这么做!");
                        return false;
                    }
                    break;
                case "minecraft:bucket":
                    if (!Permission.checkPermission(player, block.pos, "USE_BUCKET")) {
                        player.tell("§4你没有权限这么做!");
                        return false;
                    }
                    break;
            }
        });

        //使用展示框事件
        mc.listen("onUseFrameBlock",(player,block)=>{
            if (!Permission.checkPermission(player, block.pos, "USE_FRAME")) {
                player.tell("§4你没有权限这么做!");
                return false;
            }
        });
    }
}

module.exports = { Permission }