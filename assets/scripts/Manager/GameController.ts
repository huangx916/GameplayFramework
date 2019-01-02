import { ConfigManager } from "./ConfigManager";
import { GameDataManager } from "./GameDataManager";

export class GameController
{
    private static instance: GameController ;
    public static getInstance(): GameController
    {
        if(this.instance == null)
        {
            this.instance = new GameController();
        }
        return this.instance;
    }

    public initGame()
    {
        ConfigManager.getInstance().loadAllConfig(
            ()=>{
                cc.log("out call back");
                GameDataManager.getInstance().unserializeData(null);
            }
        );

        //let manager = cc.director.getCollisionManager();
        //manager.enabled = true;

        //manager.enabledDebugDraw = true;
        //manager.enabledDrawBoundingBox = true;
    }

    
    
    
}