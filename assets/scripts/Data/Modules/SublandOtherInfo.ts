import { GameDataManager } from "../../Manager/GameDataManager";
import { ListenerManager } from "../../Manager/ListenerManager";
import { ListenerType } from "../ListenerType";

export default class SublandOtherInfo
{
    public _storageKey = "SublandOtherInfo";

    constructor(prefix: string)
    {
        this._storageKey = prefix + "_" + this._storageKey;
    }

    private _sublandCoins: string = '100';
    public get sublandCoins(): string
    {
        if(this._sublandCoins === undefined)
        {
            this._sublandCoins = "0";
        }
        return this._sublandCoins;
    }
    public set sublandCoins(value: string)
    {
        this._sublandCoins = value;
        GameDataManager.getInstance().getGameData().updateSublandOtherInfo(this);
        ListenerManager.getInstance().trigger(ListenerType.SublandCoinsChanged);
    }
}