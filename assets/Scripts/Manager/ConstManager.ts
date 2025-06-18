import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('ConstManager')
export class ConstManager {
    static initPanelCount: number = 9;//初始能够显示的图标种类数

    //图标动画名
    static dropEffectName: string[] = [
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

    static winEffectName: string[] = [
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

    static outEffectName: string[] = [
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
}


