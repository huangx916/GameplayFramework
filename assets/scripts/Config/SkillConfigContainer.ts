import { BaseConfigContainer } from "./BaseConfigContainer";
import { ConstValue } from "../Data/ConstValue";

export class SkillData
{
    id:number;
    type:number;
    value1:number;
    value2:number;
    describe:string;
}

export class SkillConfigContainer extends BaseConfigContainer {
    private skillConfigData: SkillData[] = [];

    constructor(callback: Function, caller: any, arg: any)
    {
        super();
        //cc.loader.load(cc.url.raw(ConstValue.CONFIG_FILE_DIR + "SkillConfig.json"), (err, object)=>
        cc.loader.loadRes(ConstValue.CONFIG_FILE_DIR + "SkillConfig", (err, object)=>
        {
            if (err) {
                cc.log("load SkillConfig.json err");
                cc.log(err);
            }
            else {
                object = object.json;
                for(var i in object)
                {
                    this.skillConfigData[i] = object[i];
                }
                if(callback)
                {
                    callback.call(caller, arg);
                }
            }
        }
        );
    }

    getSkillConfigData(): SkillData[]
    {
        return this.skillConfigData;
    }
}