import MainlandInfo from "./MainlandInfo";
import WorldOtherInfo from "./WorldOtherInfo";
import { ConfigManager } from "../../Manager/ConfigManager";
import { WorldConfigContainer } from "../../Config/WorldConfigContainer";
import { SettingInfo } from "./SettingInfo";

export default class WorldInfo
{
    public objectName = "";
    public _storageKey = "";
    mainlandInfoList: MainlandInfo[] = [];
    worldOtherInfo: WorldOtherInfo = null;
    settingInfo: SettingInfo = null;
    
    constructor(worldName: string = "MainWorld", preKey: string = "XXGame")
    {
        this.objectName = worldName;
        this._storageKey = preKey + "_" + worldName;
        let container = ConfigManager.getInstance().getConfig(WorldConfigContainer) as WorldConfigContainer;
        let worldConfigData = container.getWorldConfigData();
        for(let i = 0; i < worldConfigData.mainlandDataList.length; ++i)
        {
            let mainlandInfo = new MainlandInfo(worldConfigData.mainlandDataList[i].storageKey, this._storageKey);
            this.mainlandInfoList.push(mainlandInfo);
        }
        this.worldOtherInfo = new WorldOtherInfo(this._storageKey);
        this.settingInfo = new SettingInfo(this._storageKey);
    }
}