import { ListenerManager } from "../Manager/ListenerManager";
import { ListenerType } from "./ListenerType";
import { GameDataManager } from "../Manager/GameDataManager";
import { EGuideStatus } from "./EGuideStatus";

export class PlayerInfo
{
    public static className = "PlayerInfo";

    private _gold: number = 2000;
    public get gold(): number
    {
        return this._gold;
    }
    public set gold(value: number)
    {
        this._gold = value;
        GameDataManager.getInstance().getGameData().updatePlayerInfo();

        ListenerManager.getInstance().trigger(ListenerType.GoldChanged);
    }

    private _level: number = 1;
    public get level(): number
    {
        return this._level;
    }
    public set level(value: number)
    {
        this._level = value;
        GameDataManager.getInstance().getGameData().updatePlayerInfo();
    }

    private _closeAudio: boolean = false;
    public get closeAudio(): boolean
    {
        return this._closeAudio;
    }
    public set closeAudio(value: boolean)
    {
        this._closeAudio = value;
        GameDataManager.getInstance().getGameData().updatePlayerInfo();
    }
}

export class GameData
{
    //-----------------------serializeData----------------------------
    playerInfo: PlayerInfo = new PlayerInfo();
    //----------------------------------------------------------------

    guideStatus: EGuideStatus = EGuideStatus.none;

    serverTaskConfigData: ServerTaskData[] = null;

    constructor()
    {
        ListenerManager.getInstance().add(ListenerType.LoopUpdate, this, this.onUpdate);
    }

    onUpdate(dt)
    {

    }

    initPlayerInfo(playerInfo: PlayerInfo)
    {
        if(playerInfo)
        {
            this.playerInfo = playerInfo;
            this.playerInfo["__proto__"] = PlayerInfo.prototype;
        }
        else
        {
            this.updatePlayerInfo();
        }
    }

    updatePlayerInfo()
    {
        // serializeData
        //playerManager.setObjData(PlayerInfo.className, this.playerInfo);
    }

    unserializeData(data)
    {
        if(data == null)
        {
            this.initPlayerInfo(null);
        }
        else
        {
            // unserializeData
        }

        ListenerManager.getInstance().trigger(ListenerType.GameStart);
    }
}