declare module cc
{
    interface Sprite
    {
        setState(state: ShaderType): void;		
		getState(): ShaderType;
    }

    interface Animation
    {
        // callback function
        escape();
    }

    interface Node
    {
        _touchListener;
    }

    // interface sysConstructor
    // {
    //     __audioSupport: any;
    // }
    // const sys: sysConstructor;
}

// 原sys为class无法用interface方式合并
declare module cc.sys
{
    const __audioSupport: any;
}