// LiteLoader-AIDS automatic generated
/// <reference path="d:\BDS_api/dts/llaids/src/index.d.ts"/> 
const { InitService } = require('./LxSky/libs/service/InitService.js');
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
    InitService.initStructConfig();//Struct文件初始化
    InitService.initConfig();//配置文件初始化
    InitService.initPublic();//公共岛屿初始化
    Command.register();//命令注册
    InitService.initPlayerDataConfig();//玩家数据文件初始化
    Struct.ModalFileCheck();//模板文件初始化
    Permission.Listen();//权限事件监听
})

