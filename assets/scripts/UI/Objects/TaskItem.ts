
import { UIHelp } from "../../Utils/UIHelp";
import { GameDataManager } from "../../Manager/GameDataManager";
import { UIManager } from "../../Manager/UIManager";
import TaskUI from "../TaskUI";
import { AudioManager } from "../../Manager/AudioManager";

import { ETaskType } from "../../Data/EnumTaskType";

const {ccclass, property} = cc._decorator;

var BtnState = {
    claim : 0,
    unable: 1,
    unClaim: 2,
}

@ccclass
export class TaskItem extends cc.Component {

    @property(cc.Label)
    private describeLabel: cc.Label = null;
    @property(cc.Label)
    private coinsLabel: cc.Label = null;
    @property(cc.Label)
    private progressLabel: cc.Label = null;
    @property(cc.Label)
    private totalProgressLabel: cc.Label = null;
    @property(cc.Button)
    private btn: cc.Button = null;
    @property(cc.Label)
    private btnLabel: cc.Label = null;
    @property(cc.SpriteAtlas)
    private taskAtlas: cc.SpriteAtlas = null;
    @property(cc.Sprite)
    private taskSprite: cc.Sprite = null;

    private _task: ServerTaskData;
    private _btnState: number;
    private _taskType: ETaskType;
    private _reward: number;

    initItem(task: ServerTaskData)
    {
        this.updateItem(task);
    }

    updateItem(task: ServerTaskData)
    {
        
    }

    onBtnClaimOrGo()
    {
        
    }
}