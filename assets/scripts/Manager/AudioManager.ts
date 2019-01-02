import { ConstValue } from "../Data/ConstValue";
import { GameDataManager } from "./GameDataManager";

export class AudioManager
{
    private static instance: AudioManager = null;

    private bgm: string = "";

    public static getInstance(): AudioManager
    {
        if(this.instance == null)
        {
            this.instance = new AudioManager();
        }
        return this.instance;
    }

    public playSound(soundName: string, loop?: boolean, volume?: number)
    {
        if(GameDataManager.getInstance().getGameData().playerInfo.closeAudio)
        {
            return;
        }
        let path = ConstValue.AUDIO_DIR + soundName;
        //cc.audioEngine.play(cc.url.raw(path), loop?loop:false, volume?volume:1);
        cc.loader.loadRes(path, cc.AudioClip, function (err, clip) {
            if(err)
            {
                cc.error(err);
                return;
            }
		    var audioID = cc.audioEngine.play(clip, loop?loop:false, volume?volume:1);
		});
    }

    public stopAll()
    {
        cc.audioEngine.stopAll();
    }

    public pauseAll()
    {
        cc.audioEngine.pauseAll();
    }

    public resumeAll()
    {
        cc.audioEngine.resumeAll();
    }

    public playBGM(soundName: string)
    {
        if(this.bgm == soundName)
        {
            return;
        }
        this.bgm = soundName;
        if(GameDataManager.getInstance().getGameData().playerInfo.closeAudio)
        {
            return;
        }
        cc.audioEngine.stopMusic();
        let path = ConstValue.AUDIO_DIR + soundName;
        //cc.audioEngine.play(cc.url.raw(path), loop?loop:false, volume?volume:1);
        cc.loader.loadRes(path, cc.AudioClip, function (err, clip) {
            if(err)
            {
                cc.error(err);
                return;
            }
		    cc.audioEngine.playMusic(clip, true);
		});
    }

    public resumeBGM()
    {
        cc.audioEngine.stopMusic();
        let path = ConstValue.AUDIO_DIR + this.bgm;
        //cc.audioEngine.play(cc.url.raw(path), loop?loop:false, volume?volume:1);
        cc.loader.loadRes(path, cc.AudioClip, function (err, clip) {
            if(err)
            {
                cc.error(err);
                return;
            }
		    cc.audioEngine.playMusic(clip, true);
		});
    }
}