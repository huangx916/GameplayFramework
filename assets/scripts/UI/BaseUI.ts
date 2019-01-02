import { ConstValue } from "../Data/ConstValue";
import { ListenerManager } from "../Manager/ListenerManager";

export interface UIClass<T extends BaseUI>
{
    new(): T;
    getUrl(): string;
}

const {ccclass, property} = cc._decorator;
@ccclass
export abstract class BaseUI extends cc.Component
{
    protected static className = "BaseUI";

    protected mTag: any;
    public get tag(): any
	{
		return this.mTag;
	}
	public set tag(value: any)
	{
		this.mTag = value;
    }
    
    public static getUrl(): string
    {
        cc.log(this.className);
        return ConstValue.PREFAB_UI_DIR + this.className;
    }

    onDestroy(): void
    {
        ListenerManager.getInstance().removeAll(this);
    }

    onShow()
    {
        cc.log("BaseUI onShow");
    }
}