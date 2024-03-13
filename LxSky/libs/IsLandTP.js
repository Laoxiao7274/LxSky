// LiteLoader-AIDS automatic generated
/// <reference path="d:\BDS_api/dts/llaids/src/index.d.ts"/> 

class IsLandTP{
    constructor(defultTP,Point){
        this.defultTP = defultTP;
        this.Point = Point;
    }


    static TPMenu(player,Land){
        const form = mc.newSimpleForm();
        form.setTitle("空岛传送菜单");
        form.addButton("返回默认传送点");
        form.addButton("设置默认传送点");
        form.addButton("空岛传送点菜单");
        player.sendForm(form,(player,data)=>{
            if(data != undefined){
                switch(data){
                    case 1:
                        backDefult(player,Land);
                        break;
                    case 2:
                        setDefult(player,Land);
                        break;
                    case 3:
                        break;
                }
            }
        });
    }

    static backDefult(player,Land){
        player.teleport(Land.defultTP.x,Land.defultTP.y,Land.defultTP.z,0);
    }

    static setDefult(player,Land){
        player.sendModalForm("默认传送点设置","是否设置你目前所在坐标为该空岛默认传送点")
        //TODO:methods中判断目前位置是否在该空岛!
    }
};

module.exports = { IsLandTP };