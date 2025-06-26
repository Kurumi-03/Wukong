import { _decorator, Component, Node, PageView } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Help')
export class Help extends Component {
    @property(PageView)
    pages: PageView | null = null;

    protected start(): void {
        // 结合缓冲机制优化
        const PRELOAD_RANGE = 1;//每次翻页页数
        this.pages.node.on('scroll-ended', () => {
            const centerIndex = this.pages.getCurrentPageIndex();//当前所在页面index
            const startIdx = Math.max(0, centerIndex - PRELOAD_RANGE);
            const endIdx = Math.min(this.pages.content.children.length - 1, centerIndex + PRELOAD_RANGE);

            this.pages.content.children.forEach((page, index) => {
                page.active = index >= startIdx && index <= endIdx;
            });
        });
    }
}


