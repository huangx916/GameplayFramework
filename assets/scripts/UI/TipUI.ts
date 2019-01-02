import { BaseUI } from "./BaseUI";
import { Tip } from "./Objects/Tip";

const {ccclass, property} = cc._decorator;

@ccclass
export class TipUI extends BaseUI {

    protected static className = "TipUI";

    @property(cc.Prefab)
    private tipPrefab: cc.Prefab = null;
    private tipPool: Tip[] = [];

    showTip(message: string)
    {
        for(let i = 0; i < this.tipPool.length; ++i)
        {
            if(this.tipPool[i] != null && this.tipPool[i].isReady())
            {
                this.tipPool[i].playTip(message);
                return;
            }
        }
        cc.log("create tip");
        let TipNode = cc.instantiate(this.tipPrefab);
        TipNode.parent = this.node
        let tip = TipNode.getComponent(Tip);
        this.tipPool.push(tip);
        tip.playTip(message);
    }
}