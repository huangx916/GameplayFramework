const {ccclass, property} = cc._decorator;

@ccclass
export class FadeUIPlugin extends cc.Component {
    @property
    delay: number = 0;
    
    onLoad()
    {
        let action0 = cc.delayTime(this.delay);
        let action1 = cc.scaleTo(0.5, 2, 2);// - 72 * index);
        let action2 = cc.scaleTo(0.5, 0, 0);// - 72 * index);
        let action3 = cc.scaleTo(0.5, 1, 1);// - 72 * index);
        //let action4 = cc.fadeOut(0.5);

        let action = cc.sequence(action0, action1, action2, action3);
        
        this.node.runAction(action);
    }
}