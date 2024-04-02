// LiteLoader-AIDS automatic generated
/// <reference path="d:\BDS_api/dts/llaids/src/index.d.ts"/> 
const { Methods } = require("./LxSky/libs/Methods.js");
const { Struct } = require("./LxSky/libs/Struct.js");
const { Command } = require('./LxSky/libs/Command.js');
const { Permission } = require('./LxSky/libs/Permission.js');

ll.registerPlugin(
    "LxSky",
    " Lx系列空岛插件",
    [1,0,0],
    {author:"作者：Laoxiao"}
)

mc.listen("onServerStarted",()=>{
    Methods.initStructConfig();//Struct文件初始化
    Methods.initConfig();//配置文件初始化
    Command.register();//命令注册
    Methods.initPlayerDataConfig();//玩家数据文件初始化
    Struct.ModalFileCheck();//模板文件初始化
})

mc.listen("onPlaceBlock",(player,block)=>{
    if(!Permission.checkPermission(player,"PLACE_BLOCK")){
        player.tell("你没有权限这么做!");
        return false;
    }
})