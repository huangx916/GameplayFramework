declare interface PlayerManager
{
    setNumData(key, data): void;
    getNumData(key): number;
    addNumData(key, data): void;

    setObjData(key, data): void;
    getObjData(key): any;

    loadAllData(keys: string[], callback: Function): void;

    compareSaveTime(server, local): 1|2;

    getDataAuto(data, key): any;

    playerData: any = {};

}
declare const playerManager: PlayerManager;

declare interface ShareType
{
    offline;
    newdragon;
    task;
    angry;
}
declare interface GlobalManager
{
    canShare(type: string, args: any): boolean;
    shareType: ShareType;
    publicConfig: any = {};
}
declare const globalManager: GlobalManager;

declare interface PlayerInfo
{
    playerId: string;
    playerName: string;
    photo: string;
}
declare interface Fbinstant_util
{
    startGame(callback: Function): void;
    getPlayerInfo(): PlayerInfo;
    getPlayerFrineds(callback: Function, err?: Function): void;
    getPlayerFriendIds(callback: Function, err?: Function): void;

    requestRewardAd(callback?: Function, err?: Function): void;
    showRewardAd(callback: Function, err?: Function): void;

    requestInterstitialAd(callback?: Function): void;
    showInterstitialAd(callback: Function, err?: Function): void;

    chooseContext(callback: Function, err?: Function): void;
    updateContext(callback: Function, err?: Function, ext?: object, img?: string, text?: string, strategy?: string, isAuto?: boolean): void;

    createShortcut(callback?: Function): void;

    getEntryPointData(): any;

    share(callback: Function, icon: string, ext: object): void;

    getContextID(): string;

    captureScreen(node: cc.node, width: number, height: number, callback: Function, t?, h?);
}

declare interface RankInfo
{
    id: string;
    photo: string;
    name: string;
    score: number;
    level: number;
    coins: number;
    index: number;
}
declare interface Server_util
{
    login(username: string, pid: string, photo: string, callback: Function): void;
    setRankInfo(score, level, coins): void;
    getFriendsRank(friends, callback): void;
    getGlobalRank(callback): void;
    publicConfig(callback): void;
    getActivityList(callback: Function): void;
    taskReceive(taskId: string, callback: Function): void;
    saveInviter(inviterId: string, contextId: string, callback: Function): void;
}
declare const server_util: Server_util

declare interface Webimg_util
{
    load_webimg(url: string, sprite: cc.Sprite): void;
    load_web_image_cache(url: string, callback: Function, data): void;
}

declare interface Number_util
{
    unit_format(number: number): string;

    millisecondToDate(millisecond: number): string;

    isOneDay(perTime: number, nowTime: number): boolean;
}

declare interface Analytics_util
{
    login_page_event(): void;
    game_page_event(): void;
    new_player_link_click_event(type: string): void;
    create_shortcut_event(): void;
    watch_video_event(type: string): void;
    watch_video_success_event(type: string): void;
    fish_times_event(): void;
    bot_recall_event(param: string): void;
    length_id_event(type: string): void;
    strength_id_event(type: string): void;
    new_player_switch_click_event(type: string): void;
    share_type_event(type: string): void;
    upgrade_type_event(type: string): void;
}

declare interface ServerTaskReward
{
    reward_id: number;
    reward_type: number;
    reward_title: string;
    reward_desc: string;
    number: number;
}

declare interface ServerTaskData
{
    task_id: number;
    task_title: string;
    task_desc: string;
    task_obj_type: number;
    total_progress: number;
    total_task_times: number;
    scene: number;
    config: object;
    reward: ServerTaskReward[];
    // 本地存储
    //progress: number;
    //task_times: number;
    //reward_num: number;
}