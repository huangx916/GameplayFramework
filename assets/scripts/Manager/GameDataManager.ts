import { GameData } from "../Data/GameData";

export class GameDataManager
{
    private static instance: GameDataManager;

    private gameData: GameData = new GameData();

    static getInstance(): GameDataManager
    {
        if(this.instance == null)
        {
            this.instance = new GameDataManager();
        }
        return this.instance;
    }

    getGameData(): GameData
    {
        return this.gameData;
    }

    unserializeData(data)
    {
        this.gameData.unserializeData(data);
    }
}