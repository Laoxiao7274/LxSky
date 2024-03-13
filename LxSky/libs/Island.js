// LiteLoader-AIDS automatic generated
/// <reference path="d:\BDS_api/dts/llaids/src/index.d.ts"/> 

const { Methods } = require("./Methods");

//玩家数据中的空岛
class Island {
    constructor(name, pos, ProtectRange, introduct, defultTp, TpPoint, permission, sharePermission, invite, share) {
        this.name = name;
        this.pos = pos;
        this.ProtectRange = ProtectRange;
        this.introduct = introduct;
        this.permission = permission;
        this.sharePermission = sharePermission;
        this.invite = invite;
        this.share = share;
        this.defultTp = defultTp;
        this.TpPoint = TpPoint;
    }
};

//data中的空岛
class IsLandData {
    constructor(Mastername, pos, ProtectRange) {
        this.Mastername = Mastername;
        this.pos = pos;
        this.ProtectRange = ProtectRange;
    }
};

class IsLandCreate {

    static createOne(name, introduct, player, filename) {
        const conf = new JsonConfigFile("./plugins/LxSky/config.json");
        let x = 0, z = 0;
        const step = conf.get("LandRange");
        let direction = "right";
        let i = 0
        while (i != 5) {
            i++;
            //根据方向添加step
            if (direction == "right") {
                x += step;
            }
            else if (direction == "left") {
                x -= step;
            }
            else if (direction == "up") {
                z += step;
            }
            else if (direction == "down") {
                z -= step;
            }
            //判断目前位置是否存在岛屿
            const IsDataConf = new JsonConfigFile("./plugins/LxSky/data/IsData.json");
            const IsLands = IsDataConf.get("Lands");
            const checkLand = IsLands.filter((ele) => {
                if (ele.pos.x == x && ele.pos.z == z) {
                    return true;
                }
                else {
                    return false;
                }
            })
            if (checkLand.length == 0) {
                this.create(x, z, name, introduct, player, filename);
                return;
            }


            //根据位置与坐标改变方向
            if (direction == "right") {
                if (x > z) {
                    direction = "down";
                }
                else if (x <= z) {
                    direction = "right";
                }
            }
            else if (direction == "down") {
                if (x == -z) {
                    direction = "left";
                }
                else if (x > z) {
                    direction = "down";
                }
            }
            else if (direction == "left") {
                if (x == z) {
                    direction = "up";
                }
                else if (x < -z) {
                    direction = "left";
                }
            }
            else if (direction == "up") {
                if (-x == z) {
                    direction = "right";
                }
                else if (x < z) {
                    direction = "up";
                }
            }
        }
    }

    static create(x, z, name, introduct, player, filename) {
        //设置数据文件
        const conf = new JsonConfigFile("./plugins/LxSky/config.json");
        const height = conf.get("Height");
        const protectRange = conf.get("LandProtectRange");
        const pos = {
            x: x,
            y: height,
            z: z
        }
        const island = new Island(name, pos, protectRange, introduct, pos, [], conf.get("defultPermission"), conf.get("defultSharePermission"), [], []);
        const island_data = new IsLandData(player.name, pos, protectRange);
        const IsLandConf = new JsonConfigFile("./plugins/LxSky/data/IsData.json");
        const IsLands = IsLandConf.get("Lands");
        IsLands.push(island_data);
        IsLandConf.set("Lands", IsLands);
        const PlayerConf = new JsonConfigFile("./plugins/LxSky/players/" + player.name + ".json");
        const PlayerLand = PlayerConf.get("IsLands");
        PlayerLand.push(island);
        PlayerConf.set("IsLands", PlayerLand);
        PlayerConf.set("Right", "Master");
        //创建岛屿
        let { px, py, pz } = Methods.getSkew(filename);
        const cmd = mc.runcmdEx("structure load " + filename + " " + (x - px) + " " + (height - py) + " " + (z - pz) + " 0_degrees none true true true");
        if (cmd.success) {
            player.tell("已成功为你创建空岛!");
            player.teleport(x, height, z, 0);
        }
        else {
            player.tell("创建空岛失败");
        }
    }
}

module.exports = { IsLandCreate };