import ShaderLab from "./ShaderLab";
import ShaderMaterial from "./ShaderMaterial";

export enum ShaderType {
    Default = 0,
    Gray,
    GrayScaling = 100,
    Stone,
    Ice,
    Frozen,
    Mirror,
    Poison,
    Banish,
    Vanish,
    Invisible,
    Blur,
    GaussBlur,
    Dissolve,
    Fluxay,
    FluxaySuper,
    Pure,
}

export default class ShaderManager {
    static useShader(sprite: cc.Sprite, shader: ShaderType): ShaderMaterial {
        if (cc.game.renderType === cc.game.RENDER_TYPE_CANVAS) {
            console.warn('Shader not surpport for canvas');
            return;
        }
        // 隐藏后重新显示错误修正
        //if (!sprite || !sprite.spriteFrame || sprite.getState() === shader) {
        if (!sprite || !sprite.spriteFrame) {
            return;
        }
        if (shader > ShaderType.Gray) {
            let name = ShaderType[shader];
            let lab = ShaderLab[name];
            if (!lab) {
                console.warn('Shader not defined', name);
                return;
            }
            cc.dynamicAtlasManager.enabled = false;
            let material = new ShaderMaterial(name, lab.vert, lab.frag, lab.defines || []);
            let texture = sprite.spriteFrame.getTexture();
            material.setTexture(texture);
            material.updateHash();
            let sp = sprite as any;
            sp._material = material;
            sp._renderData._material = material;
            sp._state = shader;
            return material;
        }
        else {
            sprite.setState(shader);
        }
    }
}
