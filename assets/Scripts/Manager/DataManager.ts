import {
    _decorator,
} from 'cc';
import Singleton from '../Use/Singleton';
const {
    ccclass, property
} = _decorator;

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
    type: number;//游玩类型 0:直接游玩  1:中奖得到的免费游戏(红色)  2:购买得到的免费游戏(绿色)
}

export class RecordInfo {
    gameName: string;//游戏名称
    totalBet: number;//总下注额
    totalWin: number;//总赢分
    get: number;//净盈亏
    count: number;//总下注次数
}

@ccclass('DataManager')
export class DataManager extends Singleton<DataManager> {
    protected onLoad(): void {
        DataManager._instance = this;
    }

    date: string = "2025/06/17/12/01";

    jrData: number[] = [132121.12, 215465.33, 77541.23, 52354.11];

    betArray: number[] = [0.4, 0.8, 1.6, 3.2, 6.4, 16, 20, 80];

    baseBuyValue: number = 100;

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
    ];

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
    ];

    recordInfos: RecordInfo[] = [
        {
            gameName: "战神赛特",
            totalBet: 10100.23,
            totalWin: 9501.33,
            get: 123,
            count: 10,
        }
    ]

    deskData: number[][][] = [
        [
            [1, 1, 2, 3, 4, 5],
            [2, 7, 8, 9, 1, 1],
            [1, 3, 4, 6, 7, 9],
            [1, 2, 5, 8, 1, 3],
            [3, 5, 1, 4, 6, 8],
        ],
        [
            [1, 13, 2, 3, 12, 3],
            [3, 7, 2, 9, 3, 5],
            [3, 3, 8, 6, 4, 9],
            [2, 2, 4, 8, 7, 3],
            [3, 5, 5, 4, 6, 8],
        ],
        [
            [0, 1, 2, 1, 3, 9],
            [2, 13, 2, 9, 12, 6],
            [5, 7, 8, 6, 4, 5],
            [1, 2, 4, 8, 7, 9],
            [2, 5, 5, 4, 6, 8],
        ]
    ];

    winScore: number[] = [0.8, 3.6, 20];//20是测试免费图标使用
    totalWinScore: number = 8.0;

    playerScore: number = 1200;

    iconBetTable: number[][] = [
        [200, 500, 1000],
        [50, 200, 500],
        [40, 100, 300],
        [30, 40, 240],
        [20, 30, 200],
        [16, 24, 160],
        [10, 20, 100],
        [8, 18, 80],
        [5, 15, 40],
        [60, 100, 2000],
        [2, 9],
        [10, 19],
        [20, 29],
        [30, 500],
    ];

    iconCountTable: number[][] = [
        [8, 9],
        [10, 11],
        [12, 30],
    ];
}
