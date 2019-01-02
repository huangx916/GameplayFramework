import { BaseUI } from "./BaseUI";
import { UIManager } from "../Manager/UIManager";
import { AudioManager } from "../Manager/AudioManager";
import { GameDataManager } from "../Manager/GameDataManager";
import { TaskItem } from "./Objects/TaskItem";

const {ccclass, property} = cc._decorator;

@ccclass
export default class TaskUI extends BaseUI {

    protected static className = "TaskUI";

    @property(cc.Prefab)
    private taskItemPrefab: cc.Prefab = null;
    @property(cc.Node)
    private scrollViewPivot: cc.Node = null;

    onLoad()
    {
        cc.log('onLoad');
        let serverConfigDataList = GameDataManager.getInstance().getGameData().serverTaskConfigData;
        for(let i = 0; i < serverConfigDataList.length; ++i)
        {
            let taskItemNode = cc.instantiate(this.taskItemPrefab);
            taskItemNode.parent = this.scrollViewPivot;
            let taskItem = taskItemNode.getComponent(TaskItem);
            taskItem.initItem(serverConfigDataList[i]);
        } 
    }

    onEnable()
    {
        cc.log('onEnable');
    }

    start()
    {
        cc.log('start');
    }

    onClose()
    {
        UIManager.getInstance().closeUI(TaskUI);
        AudioManager.getInstance().playSound("click_Btn");
    }
}
