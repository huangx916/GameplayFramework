import SublandInfo from "./SublandInfo";
import { ConfigManager } from "../../Manager/ConfigManager";
import { WorldConfigContainer } from "../../Config/WorldConfigContainer";
import MainlandOtherInfo from "./MainlandOtherInfo";

export default class MainlandInfo
{
    public objectName = "";
    public _storageKey = "";
    sublandInfoList: SublandInfo[] = [];
    mainlandOtherInfo: MainlandOtherInfo = null;

    constructor(mainlandName: string, preKey: string)
    {
        this.objectName = mainlandName;
        this._storageKey = preKey + "_" + mainlandName;
        let container = ConfigManager.getInstance().getConfig(WorldConfigContainer) as WorldConfigContainer;
        let mainlandConfigData = container.getMainlandDataByName(mainlandName);
        for(let i = 0; i < mainlandConfigData.sublandDataList.length; ++i)
        {
            let sublandInfo = new SublandInfo(mainlandConfigData.sublandDataList[i].storageKey, this._storageKey);
            this.sublandInfoList.push(sublandInfo);
        }
        this.mainlandOtherInfo = new MainlandOtherInfo(this._storageKey);
    }
}