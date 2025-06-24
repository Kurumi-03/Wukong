import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('ConstManager')
export class ConstManager {
    static initPanelCount: number = 9;//初始能够显示的图标种类数

    static simpleDropWaitTime: number = 0.07;//普通下落时间
    static fastDropWaitTime: number = 0;//快速下落时间

    //图标动画名
    static iconDropEffectName: string[] = [
        "stpr_hv1_land",
        "stpr_hv2_landing",
        "stpr_hv3_landing",
        "stpr_hv4_landing",
        "stpr_lv1_land",
        "stpr_lv2_land",
        "stpr_lv3_land",
        "stpr_lv4_land",
        "stpr_lv5_land",
        "stpr_scatter_land",
    ]

    static iconWinEffectName: string[] = [
        "stpr_hv1_win",
        "stpr_hv2_win",
        "stpr_hv3_loop",
        "stpr_hv4_win",
        "stpr_lv1_win",
        "stpr_lv2_win",
        "stpr_lv3_win",
        "stpr_lv4_win",
        "stpr_lv5_win",
        "stpr_scatter_win",
    ];

    static iconOutEffectName: string[] = [
        "stpr_hv1_out",
        "stpr_hv2_out",
        "stpr_hv3_out",
        "stpr_hv4_win_out",
        "stpr_lv1_dispear",
        "stpr_lv2_dispear",
        "stpr_lv3_dispear",
        "stpr_lv4_dispear",
        "stpr_lv5_dispear",
        "stpr_scatter_anticipate",
    ];

    static multipleDropName: string[] = [
        "stpr_green_multiplier_landing",
        "stpr_blue_multiplier_landing",
        "stpr_purple_multiplier_landing",
        "stpr_yellow_multiplier_landing",
    ]

    static multipleEfffectName: string[] = [
        "stpr_green_multiplier_loop",
        "stpr_blue_multiplier_loop",
        "stpr_purple_multiplier_loop",
        "stpr_yellow_multiplier_loop",
    ]

    static startDoubleEffectName: string[] = [
        "gool_summon_effect_1",
        "gool_summon_effect_2",
        "gool_summon_effect_3",
        "gool_summon_effect_4",
    ]

    static winEffectInName: string[] = [
        "stpr_bigwin_mega_in",
        "stpr_bigwin_nice_in",
        "stpr_bigwin_sensational_in",
        "stpr_bigwin_superb_in",
    ]

    static winEffectLoopName: string[] = [
        "stpr_bigwin_mega_loop",
        "stpr_bigwin_nice_loop",
        "stpr_bigwin_sensational_loop",
        "stpr_bigwin_superb_loop",
    ]

    static winEffectOutName: string[] = [
        "stpr_bigwin_mega_out",
        "stpr_bigwin_nice_out",
        "stpr_bigwin_sensational_out",
        "stpr_bigwin_superb_out",
    ]

    static bannerName: string[] = [
        "stpr_banner_in",
        "stpr_banner_loop",
        "stpr_banner_out",
    ]

    static multiplierEffect: string[] = [
        "stpr_multiplier_meter_idle",
        "stpr_multiplier_meter_green_fx",
        "stpr_multiplier_meter_bule_fx",
        "stpr_multiplier_meter_pink_fx",
        "stpr_multiplier_meter_pink_fx",
    ]

    static readonly SIMPLE_BGM: string = "bgm_fina";
    static readonly HIDE: string = "200Hide";
    static readonly SHOW: string = "200Show";
    static readonly BEIFLY: string = "beifly";
    static readonly BET_DOUBLE: string = "BetDouble";
    static readonly BIGWIN1: string = "bigwin";
    static readonly BIGWIN1_END: string = "bigwin_end";
    static readonly BIGWIN2: string = "bigwin0";
    static readonly BIGWIN2_END: string = "bigwin0_end";
    static readonly BIGWIN3: string = "bigwin_long2";
    static readonly BIGWIN3_END: string = "bigwin_long2_end";
    static readonly BIGWIN4: string = "bigwin4";
    static readonly BIGWIN4_END: string = "bigwin4_end";
    static readonly BURST: string = "burst";
    static readonly BUY: string = "buy20";
    static readonly SCORE: string = "calcScore";
    static readonly CLICK: string = "click"; 
    static readonly CLICK2: string = "click2";
    static readonly FUGUO: string = "fuguo";
    static readonly HITBEISHU: string = "hitbeishu";
    static readonly HITBEISHU1: string = "hitbeishu1";
    static readonly RESULt: string = "jiesuan1";
    static readonly THUNDER: string = "lei_shan";
    static readonly DROP: string = "luo";
    static readonly SCATTER1: string = "scatter1";
    static readonly SCATTER2: string = "scatter2";
    static readonly SCATTER3: string = "scatter3";
    static readonly SCATTER4: string = "scatter4";
    static readonly SLICE: string = "slice2";
    static readonly SAMLLWIN: string = "smallwin";
    static readonly ZJTX: string = "zjtx";
    static readonly ZUSE: string = "zuse4_in";
}


