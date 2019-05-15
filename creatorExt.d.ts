module cc
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
}