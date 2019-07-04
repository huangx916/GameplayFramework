import { BaseConfigContainer } from "./BaseConfigContainer";
import { ConstValue } from "../Data/ConstValue";

export class SublandData
{
    id: number;
    storageKey: string;
    name: string;
    unlockPrice: string;
    maxDragon: number;
    inputRate: number;
    outputRate: number;
}

export class MainlandData
{
    id: number;
    storageKey: string;
    name: string;
    sublandDataList: SublandData[] = [];
}

export class WorldData
{
    mainlandDataList: MainlandData[] = [];
}

export class WorldConfigContainer extends BaseConfigContainer {
    private worldConfigData: WorldData = null;

    constructor(callback: Function, caller: any, arg: any)
    {
        super();
        //cc.loader.load(cc.url.raw(ConstValue.CONFIG_FILE_DIR + "WorldConfig.json"), (err, object)=>
        cc.loader.loadRes(ConstValue.CONFIG_FILE_DIR + "WorldConfig", (err, object)=>
        {
            if (err) {
                cc.log("load WorldConfig.txt err");
                cc.log(err);
            }
            else {
                let encode = object.text;
                let decode = window.atob(encode);
                object = JSON.parse(decode);
                this.worldConfigData = object;
                if(callback)
                {
                    callback.call(caller, arg);
                }
            }
        }
        );
    }

    getWorldConfigData(): WorldData
    {
        return this.worldConfigData;
    }

    getMainlandDataByName(mainlandName: string): MainlandData
    {
        for(let i = 0; i < this.worldConfigData.mainlandDataList.length; ++i)
        {
            if(this.worldConfigData.mainlandDataList[i].name == mainlandName)
            {
                return this.worldConfigData.mainlandDataList[i];
            }
        }
        return null;
    }

    getSublandDataByName(sublandName: string, mainlandName: string): SublandData
    {
        let mainlandConfigData = this.getMainlandDataByName(mainlandName);
        for(let i = 0; i < mainlandConfigData.sublandDataList.length; ++i)
        {
            if(mainlandConfigData.sublandDataList[i].name == sublandName)
            {
                return mainlandConfigData.sublandDataList[i];
            }
        }
        return null;
    }
}