// LiteLoader-AIDS automatic generated
/// <reference path="d:\BDS_api/dts/llaids/src/index.d.ts"/> 

class Methods {

    //TODO:初始化配置文件
    static initConfig() {
        const conf = new JsonConfigFile("./plugins/LxSky/config.json");
        const isConf = new JsonConfigFile("./plugins/LxSky/data/IsData.json");
        conf.init("MoneyType","LLMoney");
        conf.init("ScoreName","money");
        conf.init("Height",20);
        conf.init("LandRange", 1000);
        conf.init("LandProtectRange", 200);
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
            const pFile = new JsonConfigFile("./plugins/LxSky/players/"+player.name+".json");
            pFile.init("Right","none");
            pFile.init("IsLands",[]);
        });
    }

    //TODO:获取模板数组下标
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

    //TODO:获取自定义模板数组
    static getCustomModal(){
        const sFile = new JsonConfigFile("./plugins/LxSky/data/Struct.json");
        const sData = sFile.get("CustomStruct");
        return sData;
    }

    //TODO:获取自定义模板数组下标
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

    //TODO:判断是否存在模板
    static checkHavaCustomModal(){
        const sFile =new JsonConfigFile("./plugins/LxSky/data/Struct.json");
        const sData = sFile.get("CustomStruct");
        if(sData.length == 0){
            return false;
        }
        return true;
    }

    //TODO:判断玩家是否存在岛屿
    static haveIsland(player){
        const pFile = new JsonConfigFile("./plugins/LxSky/players/"+player.name+".json");
        const right = pFile.get("Right");
        if(right == "none"){
            return false;
        }
        return true;
    }

    //TODO:获取偏移量
    static getSkew(name){
        const sFile = new JsonConfigFile("./plugins/LxSky/data/Struct.json");
        const sData = sFile.get("Struct");
        const needData = sData.filter((ele)=>{
            if(ele.name == name){
                return ele;
            }
        });
        const px = needData[0].x;
        const py = needData[0].y;
        const pz = needData[0].z;
        return {px,py,pz};
    }

    //TODO:让玩家以管理员权限执行命令
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
};

module.exports = { Methods } 