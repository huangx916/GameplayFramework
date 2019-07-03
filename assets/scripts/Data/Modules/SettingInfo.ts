import { GameDataManager } from "../../Manager/GameDataManager";

export class SettingInfo
{
    public _storageKey = "SettingInfo";

    constructor(prefix: string)
    {
        this._storageKey = prefix + "_" + this._storageKey;
    }

    private _closeAudio: boolean = false;
    public get closeAudio(): boolean
    {
        return this._closeAudio;
    }
    public set closeAudio(value: boolean)
    {
        this._closeAudio = value;
        GameDataManager.getInstance().getGameData().updateSettingInfo();
    }
}