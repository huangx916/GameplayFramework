import { GameDataManager } from "../../Manager/GameDataManager";
import { ListenerManager } from "../../Manager/ListenerManager";
import { ListenerType } from "../ListenerType";

export default class WorldOtherInfo
{
    public _storageKey = "WorldOtherInfo";

    constructor(prefix: string)
    {
        this._storageKey = prefix + "_" + this._storageKey;
    }

    private _worldCoins: string = '0';
    public get worldCoins(): string
    {
        if(this._worldCoins === undefined)
        {
            this._worldCoins = "0";
        }
        return this._worldCoins;
    }
    public set worldCoins(value: string)
    {
        this._worldCoins = value;
        GameDataManager.getInstance().getGameData().updateWorldOtherInfo();
        ListenerManager.getInstance().trigger(ListenerType.WorldCoinsChanged);
    }
}