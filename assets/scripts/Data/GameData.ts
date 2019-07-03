import { ListenerManager } from "../Manager/ListenerManager";
import { ListenerType } from "./ListenerType";
import { GameDataManager } from "../Manager/GameDataManager";
import { EGuideStatus } from "./EGuideStatus";
import WorldOtherInfo from "./Modules/WorldOtherInfo";
import WorldInfo from "./Modules/WorldInfo";
import { StorageUtil } from "../Utils/StorageUtil";
import MainlandOtherInfo from "./Modules/MainlandOtherInfo";
import MainlandInfo from "./Modules/MainlandInfo";
import SublandInfo from "./Modules/SublandInfo";
import SublandOtherInfo from "./Modules/SublandOtherInfo";
import { SettingInfo } from "./Modules/SettingInfo";

export class GameData
{
    //-----------------------serializeData----------------------------
    worldInfo: WorldInfo = new WorldInfo();
    //----------------------------------------------------------------

    curMainlandInfo: MainlandInfo = null;
    curSublandInfo: SublandInfo = null;

    guideStatus: EGuideStatus = EGuideStatus.none;
    serverTaskConfigData: ServerTaskData[] = null;

    constructor()
    {
        ListenerManager.getInstance().add(ListenerType.LoopUpdate, this, this.onUpdate);
    }

    onUpdate(dt)
    {

    }

    initWorldOtherInfo(worldOtherInfo: WorldOtherInfo)
    {
        if(worldOtherInfo && Object.getOwnPropertyNames(worldOtherInfo).length > 0 )
        {
            this.worldInfo.worldOtherInfo = worldOtherInfo;
            this.worldInfo.worldOtherInfo["__proto__"] = WorldOtherInfo.prototype;
        }
        else
        {
            this.updateWorldOtherInfo();
        }
    }
    updateWorldOtherInfo()
    {
        StorageUtil.setLocalItemDefer(this.worldInfo.worldOtherInfo._storageKey, this.worldInfo.worldOtherInfo);
    }

    initMainlandOtherInfo(mainlandOtherInfo: MainlandOtherInfo, destMainlandOtherInfo: MainlandOtherInfo)
    {
        if(mainlandOtherInfo && Object.getOwnPropertyNames(mainlandOtherInfo).length > 0 )
        {
            destMainlandOtherInfo = mainlandOtherInfo;
            destMainlandOtherInfo["__proto__"] = MainlandOtherInfo.prototype;
        }
        else
        {
            this.updateMainlandOtherInfo(destMainlandOtherInfo);
        }
    }
    updateMainlandOtherInfo(mainlandOtherInfo: MainlandOtherInfo)
    {
        StorageUtil.setLocalItemDefer(mainlandOtherInfo._storageKey, mainlandOtherInfo);
    }

    initSublandOtherInfo(sublandOtherInfo: SublandOtherInfo, destSublandOtherInfo: SublandOtherInfo)
    {
        if(sublandOtherInfo && Object.getOwnPropertyNames(sublandOtherInfo).length > 0 )
        {
            destSublandOtherInfo = sublandOtherInfo;
            destSublandOtherInfo["__proto__"] = SublandOtherInfo.prototype;
        }
        else
        {
            this.updateSublandOtherInfo(destSublandOtherInfo);
        }
    }
    updateSublandOtherInfo(sublandOtherInfo: SublandOtherInfo)
    {
        StorageUtil.setLocalItemDefer(sublandOtherInfo._storageKey, sublandOtherInfo);
    }

    initSettingInfo(settingInfo: SettingInfo)
    {
        if(settingInfo && Object.getOwnPropertyNames(settingInfo).length > 0 )
        {
            this.worldInfo.settingInfo = settingInfo;
            this.worldInfo.settingInfo["__proto__"] = SettingInfo.prototype;
        }
        else
        {
            this.updateSettingInfo();
        }
    }
    updateSettingInfo()
    {
        StorageUtil.setLocalItemDefer(this.worldInfo.settingInfo._storageKey, this.worldInfo.settingInfo);
    }

    getDataKeys() {
        var keys = {};
        keys[this.worldInfo.settingInfo._storageKey] = this.worldInfo.settingInfo;
        keys[this.worldInfo.worldOtherInfo._storageKey] = this.worldInfo.worldOtherInfo;
        for(let i = 0; i < this.worldInfo.mainlandInfoList.length; ++i)
        {
            let mainlandInfo = this.worldInfo.mainlandInfoList[i];
            keys[mainlandInfo.mainlandOtherInfo._storageKey] = mainlandInfo.mainlandOtherInfo;
            for(let j = 0; j < mainlandInfo.sublandInfoList.length; ++j)
            {
                let sublandInfo = mainlandInfo.sublandInfoList[j];
                keys[sublandInfo.sublandOtherInfo._storageKey] = sublandInfo.sublandOtherInfo;
            }
        }
        return keys;
    }

    unserializeData(data)
    {
        StorageUtil.register();
        StorageUtil.getAllLocalData(this.getDataKeys(), (first)=>{
            if(first)
            {
                this.initSettingInfo(null);
                this.initWorldOtherInfo(null);
                for(let i = 0; i < this.worldInfo.mainlandInfoList.length; ++i)
                {
                    let mainlandInfo = this.worldInfo.mainlandInfoList[i];
                    this.initMainlandOtherInfo(null, mainlandInfo.mainlandOtherInfo);
                    for(let j = 0; j < mainlandInfo.sublandInfoList.length; ++j)
                    {
                        let sublandInfo = mainlandInfo.sublandInfoList[j];
                        this.initSublandOtherInfo(null, sublandInfo.sublandOtherInfo);
                    }
                }
            }
            else
            {
                this.initSettingInfo(StorageUtil.getGameDataItem(this.worldInfo.settingInfo._storageKey));
                this.initWorldOtherInfo(StorageUtil.getGameDataItem(this.worldInfo.worldOtherInfo._storageKey));
                for(let i = 0; i < this.worldInfo.mainlandInfoList.length; ++i)
                {
                    let mainlandInfo = this.worldInfo.mainlandInfoList[i];
                    this.initMainlandOtherInfo(StorageUtil.getGameDataItem(mainlandInfo.mainlandOtherInfo._storageKey), mainlandInfo.mainlandOtherInfo);
                    for(let j = 0; j < mainlandInfo.sublandInfoList.length; ++j)
                    {
                        let sublandInfo = mainlandInfo.sublandInfoList[j];
                        this.initSublandOtherInfo(StorageUtil.getGameDataItem(sublandInfo.sublandOtherInfo._storageKey), sublandInfo.sublandOtherInfo);
                    }
                }
            }
        });

        ListenerManager.getInstance().trigger(ListenerType.GameStart);
    }
}