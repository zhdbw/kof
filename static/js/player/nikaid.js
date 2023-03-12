import { Player } from '/static/js/player/base.js';
import { GIF } from '/static/js/utils/gif.js';

export class Nikaid extends Player {
    constructor(root, info) {
        super(root, info);

        this.init_animations();
    }

    init_animations() {
        let outer = this;
        let offsets = [-20, -42, -42, -140, -27, 0, 0, -180];
        for (let i = 0; i < 8; i++) {
            let gif = GIF();
            let image = gif.image;
            gif.load(`/static/images/player/nikaid/${i}.gif`);
            this.animations.set(i, {
                gif: gif,
                frame_cnt: 0, //动画总图片数
                frame_rate: 5, //控制动画播放速率
                offset_y: offsets[i], //y方向偏移量
                loaded: false, //是否加载完成
                scale: 2, //放大多少倍
            });

            gif.onload = function () {
                let obj = outer.animations.get(i);
                obj.frame_cnt = gif.frames.length;
                obj.loaded = true;

                if (i === 3) {
                    obj.frame_rate = 4;
                }
            }
        }
    }

    update_attack() {
        if (this.status === 4 && this.frame_current_cnt === 18) {
            let me = this, you = this.root.players[1 - this.id];
            let r1;
            if (this.direction > 0) {
                r1 = {
                    x1: me.x + 120,
                    y1: me.y + 40,
                    x2: me.x + 120 + 100,
                    y2: me.y + 40 + 20,
                };
            } else {
                r1 = {
                    x1: me.x + me.width - 120 - 100,
                    y1: me.y + 40,
                    x2: me.x + me.width - 120 - 100 + 100,
                    y2: me.y + 40 + 20,
                }
            }

            let r2 = {
                x1: you.x,
                y1: you.y,
                x2: you.x + you.width,
                y2: you.y + you.height,
            }
            if (this.id_collision(r1, r2)) {
                you.is_attack()
            }
        }
    }
}

