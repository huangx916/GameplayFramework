export interface ConfigContainerClass<T extends BaseConfigContainer>
{
    new (callback: Function, caller: any, arg: any): T;
}

export abstract class BaseConfigContainer 
{
    protected mTag: any;
    public get tag(): any
    {
        return this.mTag;
    }
    public set tag(value: any)
    {
        this.mTag = value;
    }
}