import { UIManager } from "../Manager/UIManager";
import { GameController } from "../Manager/GameController";
import { ListenerManager } from "../Manager/ListenerManager";
import { ListenerType } from "../Data/ListenerType";
import { LoadingUI } from "../UI/LoadingUI";
import { LogWrap } from "../Utils/LogWrap";

const {ccclass, property} = cc._decorator;

@ccclass
export class GameMain extends cc.Component 
{
    @property(cc.Node)
    private preLoadPrefabList: cc.Node = null;

    onLoad()
    {
        LogWrap.log("test log");
        LogWrap.info("test info");
        LogWrap.warn("test warn");
        LogWrap.err("test err");


        let frameSize = cc.view.getFrameSize();
        let bFitWidth = (frameSize.width / frameSize.height) < (750 / 1334)
        cc.Canvas.instance.fitWidth = bFitWidth;
        cc.Canvas.instance.fitHeight = !bFitWidth;
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

    public lateUpdate() {
        let context = cc.sys.__audioSupport.context;
        if (context.state === 'suspended') {
            context.resume();
            console.log(context.state);
        }
    }
}