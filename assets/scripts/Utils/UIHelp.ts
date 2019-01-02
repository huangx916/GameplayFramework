import { UIManager } from "../Manager/UIManager";
import { TipUI } from "../UI/TipUI";

export class UIHelp
{
    public static showTip(message: string)
    {
        let tipUI = UIManager.getInstance().getUI(TipUI) as TipUI;
        if(!tipUI)
        {
            UIManager.getInstance().openUI(TipUI, 200, ()=>{
                UIHelp.showTip(message);
            });
        }
        else
        {
            tipUI.showTip(message);
        }
    }
}

