import { UIManager } from "../Manager/UIManager";
import { GameController } from "../Manager/GameController";
import { ListenerManager } from "../Manager/ListenerManager";
import { ListenerType } from "../Data/ListenerType";
import { LoadingUI } from "../UI/LoadingUI";

const {ccclass, property} = cc._decorator;

@ccclass
export class GameMain extends cc.Component 
{
    @property(cc.Node)
    private preLoadPrefabList: cc.Node = null;

    onLoad()
    {
        
    }

    start()
    {
        this.preLoadPrefabList.destroy();
        
        UIManager.getInstance().openUI(LoadingUI, 10, ()=>{
            GameController.getInstance().initGame();
        });
    }

    update(dt)
    {
        ListenerManager.getInstance().trigger(ListenerType.LoopUpdate, dt);
    }
}