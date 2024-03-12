// LiteLoader-AIDS automatic generated
/// <reference path="d:\BDS_api/dts/llaids/src/index.d.ts"/> 
const { Methods } = require("./LxSky/libs/Methods.js");
const { Struct } = require("./LxSky/libs/Struct.js");
const { Command } = require('./LxSky/libs/Command.js');

ll.registerPlugin(
    "LxSky",
    " Lx系列空岛插件",
    [1,0,0],
    {author:"作者：Laoxiao"}
)

mc.listen("onServerStarted",()=>{
    Struct.ModalFileCheck();//模板文件初始化
    Methods.initStructConfig();//Struct文件初始化
    Methods.initConfig();//配置文件初始化
    Command.register();//命令注册
    Methods.initPlayerDataConfig();//玩家数据文件初始化
})