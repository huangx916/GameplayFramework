import { ListenerManager } from "../../Manager/ListenerManager";
import numberutil0 = require("../../Utils/NumberUtil.js");
import { ListenerType } from "../ListenerType";
import { GameDataManager } from "../../Manager/GameDataManager";

let numberUtil:Number_util = numberutil0;

export default class MainlandOtherInfo
{
    public _storageKey = "MainlandOtherInfo";

    constructor(prefix: string)
    {
        this._storageKey = prefix + "_" + this._storageKey;
    }

    private _mainlandCoins: string = '10';
    public get mainlandCoins(): string
    {
        return this._mainlandCoins;
    }
    public set mainlandCoins(value: string)
    {
        this._mainlandCoins = value;
        GameDataManager.getInstance().getGameData().updateMainlandOtherInfo(this);
        ListenerManager.getInstance().trigger(ListenerType.MainlandCoinsChanged);
    }
}