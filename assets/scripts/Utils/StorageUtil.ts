

export class StorageUtil
{
    private static gameName = "DragonWar";
    private static pureDataCache = {};  // 只包含成员变量，不包含成员函数
    private static gameDataRef = {};  // 游戏数据引用
    private static keyMap = {}; // 需存储的已改变的数据
    private static intervalId = null;
    private static syncLocalDataInterval = 500; // 数据存储同步间隔(单位毫秒)

    static register()
    {
        cc.game.on(cc.game.EVENT_HIDE, (event)=>{
            cc.log("game onPause - StorageUtil");
            if(this.intervalId) 
            {
                clearTimeout(this.intervalId);
                this.intervalId = null;
            }
        });
        cc.game.on(cc.game.EVENT_SHOW, (event)=>{
            cc.log("game onResume - StorageUtil");
        });
    }

    static getAllLocalData(gameData, callback: Function)
    {
        let firstLoginKey = this.gameName + "_firstLogin";
        gameData[firstLoginKey] = false;
        for (let key in gameData)
        {
            if(typeof gameData[key] === "object")
            {
                this.pureDataCache[key] = {...gameData[key]};
            }
            else
            {
                this.pureDataCache[key] = gameData[key];
            }
            this.gameDataRef[key] = gameData[key];
        }
        let isFirstLogin = this.getLocalItem(firstLoginKey, true);
        if(!isFirstLogin)
        {
            for(let key in this.pureDataCache)
            {
                let value = this.pureDataCache[key];
                if(value && typeof value === "object")
                {
                    for(let childKey in value)
                    {
                        let localValue = this.getLocalItem(key+childKey, value[childKey]);
                        this.pureDataCache[key][childKey] = {...localValue};
                        gameData[key][childKey] = localValue;
                    }
                }
                else
                {
                    let localValue = this.getLocalItem(key, value);
                    this.pureDataCache[key] = localValue;
                    gameData[key] = localValue;
                }
            }
        }
        else
        {
            for(let key in this.pureDataCache)
            {
                let value = this.pureDataCache[key];
                if(value && typeof value === "object")
                {
                    for(let childKey in value)
                    {
                        if(childKey === "_storageKey")
                        {
                            continue;
                        }
                        this.setLocalItemImmediately(key+childKey, value[childKey]);
                    }
                }
                else
                {
                    this.setLocalItemImmediately(key, value);
                }
            }
        }
        callback && callback(isFirstLogin);
    }

    static setLocalItemDefer(key, value)
    {
        // 过滤掉函数字段并断开引用关系
        let cloneValue = {...value};
        this.pushChangedKey(key, cloneValue);
        this.pureDataCache[key] = cloneValue;
    }

    static setLocalItemImmediately(key, value)
    {
        this._setData(key, value);
    }

    static getLocalItem(key, defaultValue?): any
    {
        let value = this._getData(key,defaultValue);
        if (typeof defaultValue == 'boolean')
        {
            value = this._toBoolean(value,defaultValue);
        }
        else if (typeof defaultValue == 'number')
        {
            value = this._toNumber(value,defaultValue);
        }
        else if (typeof defaultValue == 'object')
        {
            value = this._toJSON(value,defaultValue);
        }
        return value;
    }

    static getGameDataItem(key)
    {
        return this.gameDataRef[key];
    }

    private static pushChangedKey(key, value)
    {
        if(typeof value === "object")
        {
            for(let subKey in value)
            {
                if(subKey === "_storageKey")
                {
                    continue;
                }
                let subValue = value[subKey];
                if(this.pureDataCache[key])
                {
                    if(JSON.stringify(this.pureDataCache[key][subKey]) !== JSON.stringify(subValue))
                    {
                        this.keyMap[key+subKey] = {"key":key, "subKey":subKey};
                        this._syncLocalDataInterval();
                    }
                }
                else
                {
                    this.keyMap[key+subKey] = {"key":key, "subKey":subKey};
                    this._syncLocalDataInterval();
                }
            }
        }
        else
        {
            if(JSON.stringify(this.pureDataCache[key]) !== JSON.stringify(value))
            {
                this.keyMap[key] = {"key":key, "subKey":null};
                this._syncLocalDataInterval();
            }
        }
    }

    private static _syncLocalDataInterval()
    {
        if(!this.intervalId) 
        {
            this.intervalId = setTimeout(()=>{
                this.intervalId = null;
                this._syncLocalData();
            },this.syncLocalDataInterval);
        }
    }

    private static _syncLocalData()
    {
        for(let uniKey in this.keyMap)
        {
            let keysObj = this.keyMap[uniKey];
            let key = keysObj["key"];
            let subKey = keysObj["subKey"];
            if(!subKey)
            {
                this._setData(uniKey, this.gameDataRef[key]);
            }
            else
            {
                this._setData(uniKey, this.gameDataRef[key][subKey]);
            }
        }
        this.keyMap = {};
    }

    private static _setData(key, value)
    {
        if(typeof value === "object")
        {
            value = JSON.stringify(value);
        }
        cc.sys.localStorage.setItem(key, value);
    }

    private static _getData(key, defaultValue)
    {
        let ret = cc.sys.localStorage.getItem(key);
        if ((ret == null || ret == "null") && defaultValue != null)
        {
            ret = defaultValue;
        }
        return ret;
    }

    private static _toBoolean(src,def)
    {
        if (typeof src == 'boolean')
        {
            return src;
        }
        else if (src == null || src == "")
        {
            return def;
        }
        else if (src == "false")
        {
            return false;
        }
        else if (src == "true")
        {
            return true;
        }
    }

    private static _toNumber(src,def)
    {
        let ret = Number(src);
        if (isNaN(ret))
        {
            return def;
        }
        else
        {
            return ret;
        }
    }

    private static _toJSON(src,def)
    {
        try
        {
            let ret = JSON.parse(src);
            if(typeof ret == 'object' && ret)
            {
                return ret;
            }
            else
            {
                return def;
            }
        }
        catch(e)
        {
            return def;
        }
    }
}