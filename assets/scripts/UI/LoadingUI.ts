import { ListenerManager } from "../Manager/ListenerManager";
import { ListenerType } from "../Data/ListenerType";
import { BaseUI } from "./BaseUI";
import { UIManager } from "../Manager/UIManager";

import { MainUI } from "./MainUI";

const {ccclass, property} = cc._decorator;

@ccclass
export class LoadingUI extends BaseUI {

    protected static className = "LoadingUI";

    @property(cc.ProgressBar)
    private progressBar: cc.ProgressBar = null;
    @property(cc.Label)
    private progressLabel: cc.Label = null;
    @property(cc.Node)
    private dragonNode: cc.Node = null;

    onLoad()
    {
        ListenerManager.getInstance().add(ListenerType.GameStart, this, this.onGameStart);
    }

    private onGameStart()
    {
        let onProgress = (completedCount: number, totalCount: number, item: any)=>{
            this.progressBar.progress = completedCount/totalCount;
            let value = Math.round(completedCount/totalCount * 100);
            this.progressLabel.string = value.toString() + '%';
            let posX = completedCount/totalCount * 500 - 250;
            this.dragonNode.x = posX;
        };

        UIManager.getInstance().openUI(MainUI,0,()=>{
            let action0 = cc.fadeOut(1);
            let callback = cc.callFunc(()=>{
                UIManager.getInstance().closeUI(LoadingUI);
            }, this);
            let action = cc.sequence(action0, callback);
            this.node.runAction(action);
        }, onProgress);
    }
}