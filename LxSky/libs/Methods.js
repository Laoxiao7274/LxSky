// LiteLoader-AIDS automatic generated
/// <reference path="d:\BDS_api/dts/llaids/src/index.d.ts"/> 

class Methods {

    //TODO:初始化配置文件
    static initConfig() {
        const permissions = {
            BREAK_BLOCK: false,
            PLACE_BLOCK: false,
            DROP_ITEM: true,
            TAKE_ITEM: true,
            ATTACK_PLAYER: false,
            ATTACK_ENTITY: false,
            OPEN_CRAFTING_TABLE: false,
            OPEN_FURNACE: false,
            OPEN_BLAST_FURNACE: false,
            OPEN_SMOKER: false,
            OPEN_BREWING_STAND: false,
            OPEN_ANVIL: false,
            OPEN_ENCHANTING_TABLE: false,
            OPEN_BARREL: false,
            OPEN_CHEST: false,
            OPEN_STONECUTTER_BLOCK: false,
            OPEN_DISPENSER: false,
            OPEN_DROPPER: false,
            OPEN_HOPPER: false,
            OPEN_BEACON: false,
            USE_FLINE_AND_STEEL: false,
            USE_BUCKET: false,
            USE_FRAME: false,
        }
        const sharePermissions = {
            BREAK_BLOCK: true,
            PLACE_BLOCK: true,
            DROP_ITEM: true,
            TAKE_ITEM: true,
            ATTACK_PLAYER: true,
            ATTACK_ENTITY: true,
            OPEN_CRAFTING_TABLE: true,
            OPEN_FURNACE: true,
            OPEN_BLAST_FURNACE: true,
            OPEN_SMOKER: true,
            OPEN_BREWING_STAND: true,
            OPEN_ANVIL: true,
            OPEN_ENCHANTING_TABLE: true,
            OPEN_BARREL: true,
            OPEN_CHEST: true,
            OPEN_STONECUTTER_BLOCK: true,
            OPEN_DISPENSER: true,
            OPEN_DROPPER: true,
            OPEN_HOPPER: true,
            OPEN_BEACON: true,
            USE_FLINE_AND_STEEL: true,
            USE_BUCKET: true,
            USE_FRAME: true,
        }
        const conf = new JsonConfigFile("./plugins/LxSky/config.json");
        const isConf = new JsonConfigFile("./plugins/LxSky/data/IsData.json");
        conf.init("MoneyType","LLMoney");
        conf.init("ScoreName","money");
        conf.init("Height",20);
        conf.init("LandRange", 1000);
        conf.init("LandProtectRange", 200);
        conf.init("MaxLandCount",3);
        conf.init("MaxTpPoint",3);
        conf.init("defultPermission",permissions);
        conf.init("defultSharePermission",sharePermissions);
        isConf.init("Lands",[]);
    }

    //TODO:初始化Struct文件
    static initStructConfig() {
        const conf = new JsonConfigFile("./plugins/LxSky/data/Struct.json");
        conf.init("Struct", []);
        conf.init("CustomStruct", []);
    }

    //TODO:玩家数据文件初始化
    static initPlayerDataConfig(){
        mc.listen("onJoin",(player)=>{
            const conf = new JsonConfigFile("./plugins/LxSky/config.json");
            const pFile = new JsonConfigFile("./plugins/LxSky/players/"+player.name+".json");
            pFile.init("Right","none");
            pFile.init("IsLandCount",conf.get("MaxLandCount"));
            pFile.init("IsLands",[]);
        });
    }

    //TODO:获取模板数组下标
    /**
     * 获取模板数组下标
     * @param {string} name - 模板名称
     * @returns 
     */
    static getModalIndex(name) {
        let a = 0;
        const sfile = new JsonConfigFile("./plugins/LxSky/data/Struct.json");
        let StructData = sfile.get("Struct");
        for (let sdata of StructData) {
            if (sdata.name == name) {
                return a;
            }
            a++;
        }
    }

    //TODO:获取结构数组
    static getStruct(){
        const sFile = new JsonConfigFile("./plugins/LxSky/data/Struct.json");
        const sData = sFile.get("Struct");
        return sData;
    }

    //TODO:获取传送点数组
    /**
     * 获取传送点数组
     * @param {string} MasterName - 岛主名称
     * @param {string} LandName - 岛屿名
     */
    static getPoint(MasterName,LandName){
        const sFile = new JsonConfigFile("./plugins/LxSky/players/"+MasterName+".json");
        const LandDatas = sFile.get("IsLands");
        const needLand = LandDatas.filter((land)=>{
            if(land.name == LandName){
                return true;
            }
            else{
                return false;
            }
        });
        return needLand.TpPoint;
    }

    //TODO:判断传送点是否满了
    static checkPointFull(MasterName,Land){
        const sFile = new JsonConfigFile("./plugins/LxSky/players/"+MasterName+".json");
        const Max = sFile.get("")
    }

    //TODO:获取玩家最大空岛数
    /**
     * 获取玩家最大空岛数
     * @param {string} name - 玩家名
     * @returns 
     */
    static getIsLandCount(name){
        const pFile = new JsonConfigFile("./plugins/LxSky/players/"+name+".json");
        return pFile.get("IsLandCount");
    }

    //TODO:根据玩家名获取玩家岛屿
    /**
     * 根据玩家名获取玩家岛屿
     * @param {string} name - 玩家名
     * @returns 
     */
    static getPlayerLand(name){
        const pFile = new JsonConfigFile("./plugins/LxSky/players/"+name+".json");
        const pData = pFile.get("IsLands");
        return pData;
    }

    //TODO:判断玩家空岛数是否上限
    /**
     * 判断玩家空岛数是否上限
     * @param {Player} player - 玩家对象
     * @returns 
     */
    static checkPlayerLandCount(player){
        const maxcount = this.getIsLandCount(player.name);
        const pLands = this.getPlayerLand(player.name);
        if(pLands.length < maxcount){
            return false;
        }
        else{
            return true;
        }
    }

    //TODO:判断岛屿传送点数是否上限
    /**
     * 判断岛屿传送点数是否上限
     * @param {Land} Land - 检查的岛屿 
     */
    static checkLandPointCount(Land){
        const point = Land.TpPoint;
        if(point.length < Land.PointCount){
            return false;
        }
        else{
            return true;
        }
    }

    //TODO:获取自定义模板数组
    static getCustomModal(){
        const sFile = new JsonConfigFile("./plugins/LxSky/data/Struct.json");
        const sData = sFile.get("CustomStruct");
        return sData;
    }

    //TODO:获取自定义模板数组下标
    /**
     * 
     * @param {string} name - 自定义模板名
     * @returns 
     */
    static getCustomModalIndex(name) {
        let a = 0;
        const sfile = new JsonConfigFile("./plugins/LxSky/data/Struct.json");
        let StructData = sfile.get("CustomStruct");
        for (let sdata of StructData) {
            if (sdata.name == name) {
                return a;
            }
            a++;
        }
    }

    //TODO:检测自定义模板名是否重复
    /**
     * 检测自定义模板名是否重复
     * @param {string} name - 自定义模板名
     * @returns 
     */
    static checkCustomStructName(name) {
        const sFile = new JsonConfigFile("./plugins/LxSky/data/Struct.json");
        let sData = sFile.get("CustomStruct");
        for (let sdata of sData) {
            if (sdata.name == name) {
                return true;
            }
        }
        return false;
    }

    //TODO判断是否存在初始化模板
    static checkHaveModal(){
        const sFile =new JsonConfigFile("./plugins/LxSky/data/Struct.json");
        const sData = sFile.get("Struct");
        if(sData.length == 0){
            return false;
        }
        return true;
    }

    //TODO:判断是否存在模板
    static checkHaveCustomModal(){
        const sFile =new JsonConfigFile("./plugins/LxSky/data/Struct.json");
        const sData = sFile.get("CustomStruct");
        if(sData.length == 0){
            return false;
        }
        return true;
    }

    //TODO:判断玩家是否存在岛屿
    /**
     * 判断玩家是否存在岛屿
     * @param {Player} player - 玩家对象
     * @returns 
     */
    static haveIsland(player){
        const pFile = new JsonConfigFile("./plugins/LxSky/players/"+player.name+".json");
        const right = pFile.get("Right");
        if(right == "none"){
            return false;
        }
        return true;
    }

    //TODO:判断传送点名是否重复
    /**
     * 判断传送点名是否重复
     * @param {string} name - 判断的传送点名
     * @param {Land} Land - 岛屿对象
     */
    static checkSamePoint(name,Land){
        for(let ele of Land.TpPoint){
            if(ele.name == name){
                return truel
            }
        }
        return false;
    }

    //TODO:判断玩家是否存在某个岛屿
    /**
     * 判断玩家是否存在某个岛屿
     * @param {Player} player - 玩家对象
     * @param {string} LandName -岛屿名称
     * @returns 
     */
    static haveOneLand(player,LandName){
        const pFile = new JsonConfigFile("./plugins/LxSky/players/"+player.name+".json");
        const pLands = pFile.get("IsLands");
        const result = pLands.filter((ele)=>{
            if(ele.name == LandName){
                return true;
            }
            else{
                return false;
            }
        });
        if(result.length == 0){
            return false;
        }
        else{
            return true;
        }
    }

    //TODO:判断该玩家是否在分享名单中
    /** 
    * 判断该玩家是否在分享名单中
    * @param { Player } sPlayer - 被分享玩家
    * @param { Land } Land - 当前岛屿   
     */ 
    static hasSharePlayer(sPlayer,Land){
        const SharePlayers = Land.share;
        const result = SharePlayers.filter((ele)=>{
            if(ele.name == sPlayer.name){
                return true;
            }
            else{
                return false;
            }
        });
        if(result.length == 0){
            return false;
        }
        else{
            return true;
        }
    }

    //TODO:获取模板偏移量
    /**
     * 获取模板偏移量
     * @param {string} name - 模板名称
     * @returns 
     */
    static getSkew(name){
        const sFile = new JsonConfigFile("./plugins/LxSky/data/Struct.json");
        const sData = sFile.get("Struct");
        const needData = sData.filter((ele)=>{
            if(ele.name == name){
                return true;
            }
            else{
                return false;
            }
        });
        const px = needData[0].x;
        const py = needData[0].y;
        const pz = needData[0].z;
        return {px,py,pz};
    }

    //TODO:让玩家以管理员权限执行命令
    /**
     * 让玩家以管理员权限执行命令
     * @param {string} cmdText - 命令字符串
     * @param {Player} player - 玩家对象
     */
    static runOPCmd(cmdText,player){
        if(player.isOP){
            player.runcmd(cmdText);
        }
        else{
            player.setPermLevel(1);
            player.runcmd(cmdText);
            player.setPermLevel(0);
        }
    }

    //TODO:扣除钱
    /**
     * 扣除钱
     * @param {number} money - 扣除金币数
     * @param {Player} player - 玩家对象
     * @returns 
     */
    static reMoney(money,player){
        const conf = new JsonConfigFile("./plugins/LxSky/config.json");
        const MoneyType = conf.get("MoneyType");
        const ScoreName = conf.get("ScoreName");
        if(money == 0){
            return;
        }
        if(MoneyType == "LLMoney"){
            player.reduceMoney(money);
            player.tell("已扣除你"+money+"金币");
        }
        else if(MoneyType == "ScoreMoney"){
            const cmd = mc.runcmdEx("scoreboard players remove "+player.name+" "+ScoreName+" "+String(money));
            if(cmd.success){
                player.tell("已扣除你"+money+"金币");
            }
        }
    }

    //TODO:根据岛屿名写入分享岛屿数据
    /**
     * 根据岛屿名写入分享岛屿数据
     * @param {Land} Land - 岛屿对象 
     * @param {string} MasterName - 岛主名称
     */
    static writeLandData(Land,MasterName){
        const sFile = new JsonConfigFile("./plugins/LxSky/players/"+MasterName+".json");
        let LandData = sFile.get("IsLands");
        LandData = LandData.map((ele)=>{
            if(ele.name == Land.name){
                return Land;
            }
            else{
                return ele;
            }
        });
        sFile.set("IsLands",LandData);
    }

    //TODO:判断玩家是否在某个空岛中
    /**
     * 判断玩家是否在某个空岛中
     * @param {Player} player 
     * @param {Land} Land 
     */
    static checkInLand(player,Land){
        const range = Land.ProtectRange;
        if(player.blockPos.x <= Land.pos.x + range && player.blockPos.x >= Land.pos.x - range){
            if(player.blockPos.z <= Land.pos.z + range && player.blockPos.z >= Land.pos.z - range){
                return true;
            }
        }
        return false;
    }
};

module.exports = { Methods } 