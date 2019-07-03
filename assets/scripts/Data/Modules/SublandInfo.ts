import SublandOtherInfo from "./SublandOtherInfo";

export default class SublandInfo
{
    public objectName = "";
    public _storageKey = "";
    sublandOtherInfo: SublandOtherInfo = null;

    constructor(sublandName: string, preKey: string)
    {
        this.objectName = sublandName;
        this._storageKey = preKey + "_" + sublandName;

        this.sublandOtherInfo = new SublandOtherInfo(this._storageKey);
    }
}