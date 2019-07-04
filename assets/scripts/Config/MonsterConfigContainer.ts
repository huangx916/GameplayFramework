import { BaseConfigContainer } from "./BaseConfigContainer";
import { ConstValue } from "../Data/ConstValue";

export class MonsterData
{
    id:number;
    blood:number;
    defense:number;
    speed:number;
    anim:string;
    icon:string;
    output:number;
}

export class MonsterConfigContainer extends BaseConfigContainer {
    private monsterConfigData: MonsterData[] = [];

    constructor(callback: Function, caller: any, arg: any)
    {
        super();
        //cc.loader.load(cc.url.raw(ConstValue.CONFIG_FILE_DIR + "MonsterConfig.json"), (err, object)=>
        cc.loader.loadRes(ConstValue.CONFIG_FILE_DIR + "MonsterConfig", (err, object)=>
        {
            if (err) {
                cc.log("load MonsterConfig.txt err");
                cc.log(err);
            }
            else {
                let encode = object.text;
                let decode = window.atob(encode);
                object = JSON.parse(decode);
                for(var i in object)
                {
                    this.monsterConfigData[i] = object[i];
                }
                if(callback)
                {
                    callback.call(caller, arg);
                }
            }
        }
        );
    }

    getMonsterConfigData(): MonsterData[]
    {
        return this.monsterConfigData;
    }
}