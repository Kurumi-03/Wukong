import {
    _decorator, Component, Node
}
    from 'cc';
import Singleton from '../Use/Singleton';
const {
    ccclass, property
}
    = _decorator;

export class DeskInfo {
    state: number;//状态 0:没有人  1:有人  2:已经被锁定 3:被自己锁定
    index: number; // 桌子编号
    percent: number; // 赔率
    data: {
        data1: number;//上面三個数据
        data2: number;
        data3: number;
        todayAll: number;//今日总得分
        totalPercent: number;//今日赔率
        lastAll: number;//最近30天得分
        lastPercent: number;//最近30天赔率
    }
}

export class HistoryInfo {
    date: string;//日期和注单号码
    gameName: string;//游戏名称
    betCount: number;//投注金额
    get: number;//盈亏
    type: number;//游玩类型 0:直接游玩  1:中奖得到的免费游戏  2:购买得到的免费游戏
}

@ccclass('ConstManager')
export class ConstManager extends Singleton<ConstManager> {
    protected onLoad(): void {
        ConstManager._instance = this;
    }

    jrData: number[] = [132121.12, 215465.33, 77541.23, 52354.11];

    betArray: number[] = [0.4, 0.8, 1.6, 3.2, 6.4, 16, 20, 80];

    countArray: number[] = [10, 20, 30, 40, 50, 60, 70, 80, 90];

    currentDeskIndex: number = 1003;//当前默认进入房间为被自己锁定的房间

    deskInfos: DeskInfo[][] = [
        [
            {
                state: 0, index: 1001, percent: 87.12, data: {
                    data1: 11,
                    data2: 12,
                    data3: 13,
                    todayAll: 123154,
                    totalPercent: 123.21,
                    lastAll: 546531,
                    lastPercent: 121.1,
                }
            },
            {
                state: 2, index: 1002, percent: 87.12, data: {
                    data1: 11,
                    data2: 12,
                    data3: 13,
                    todayAll: 123154,
                    totalPercent: 123.21,
                    lastAll: 546531,
                    lastPercent: 121.1,
                }
            },
            {
                state: 3, index: 1003, percent: 87.12, data: {
                    data1: 11,
                    data2: 12,
                    data3: 13,
                    todayAll: 123154,
                    totalPercent: 123.21,
                    lastAll: 546531,
                    lastPercent: 121.1,
                }
            },
            {
                state: 0, index: 1005, percent: 87.12, data: {
                    data1: 11,
                    data2: 12,
                    data3: 13,
                    todayAll: 123154,
                    totalPercent: 123.21,
                    lastAll: 546531,
                    lastPercent: 121.1,
                }
            },
            {
                state: 1, index: 1006, percent: 87.12, data: {
                    data1: 11,
                    data2: 12,
                    data3: 13,
                    todayAll: 123154,
                    totalPercent: 123.21,
                    lastAll: 546531,
                    lastPercent: 121.1,
                }
            },
            {
                state: 0, index: 1007, percent: 87.12, data: {
                    data1: 11,
                    data2: 12,
                    data3: 13,
                    todayAll: 123154,
                    totalPercent: 123.21,
                    lastAll: 546531,
                    lastPercent: 121.1,
                }
            },
            {
                state: 2, index: 1008, percent: 87.12, data: {
                    data1: 11,
                    data2: 12,
                    data3: 13,
                    todayAll: 123154,
                    totalPercent: 123.21,
                    lastAll: 546531,
                    lastPercent: 121.1,
                }
            },
        ],
        [
            {
                state: 0, index: 1009, percent: 87.12, data: {
                    data1: 11,
                    data2: 12,
                    data3: 13,
                    todayAll: 123154,
                    totalPercent: 123.21,
                    lastAll: 546531,
                    lastPercent: 121.1,
                }
            },
            {
                state: 0, index: 1010, percent: 87.12, data: {
                    data1: 11,
                    data2: 12,
                    data3: 13,
                    todayAll: 123154,
                    totalPercent: 123.21,
                    lastAll: 546531,
                    lastPercent: 121.1,
                }
            },
            {
                state: 0, index: 1011, percent: 87.12, data: {
                    data1: 2,
                    data2: 12,
                    data3: 13,
                    todayAll: 123154,
                    totalPercent: 123.21,
                    lastAll: 546531,
                    lastPercent: 121.1,
                }
            },
            {
                state: 1, index: 1012, percent: 88.12, data: {
                    data1: 11,
                    data2: 3,
                    data3: 13,
                    todayAll: 123154,
                    totalPercent: 123.21,
                    lastAll: 546531,
                    lastPercent: 121.1,
                }
            },
            {
                state: 2, index: 1025, percent: 87.30, data: {
                    data1: 11,
                    data2: 12,
                    data3: 1,
                    todayAll: 123154,
                    totalPercent: 123.21,
                    lastAll: 546531,
                    lastPercent: 121.1,
                }
            },
        ]
    ]

    historyInfos: HistoryInfo[] = [
        { date: "2025/05/09 16:20:26\n16818048747", gameName: "战神赛特", betCount: 2.6, get: 2.0, type: 0 },
        { date: "2025/05/09 16:21:50\n16818048747", gameName: "战神赛特", betCount: 0.6, get: -1.6, type: 1 },
        { date: "2025/05/09 16:20:26\n16818048747", gameName: "战神赛特", betCount: 2.6, get: 2.0, type: 2 },
        { date: "2025/05/09 16:20:26\n16818048747", gameName: "战神赛特", betCount: 1.6, get: 2.0, type: 0 },
        { date: "2025/05/09 16:20:26\n16818048747", gameName: "战神赛特", betCount: 3.0, get: 1.0, type: 0 },
        { date: "2025/05/09 16:20:26\n16818048747", gameName: "战神赛特", betCount: 22.6, get: -3.0, type: 1 },
        { date: "2025/05/09 16:20:26\n16818048747", gameName: "战神赛特", betCount: 2.6, get: 2.0, type: 0 },
        { date: "2025/05/09 16:20:26\n16818048747", gameName: "战神赛特", betCount: 2.6, get: 2.0, type: 0 },
        { date: "2025/05/09 16:20:26\n16818048747", gameName: "战神赛特", betCount: 2.6, get: 2.0, type: 0 },
    ]
}
