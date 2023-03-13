import { Player } from '/static/js/player/base.js';
import { GIF } from '/static/js/utils/gif.js';

export class Nikaid extends Player {
    constructor(root, info) {
        super(root, info);

        this.init_animations();
    }

    init_animations() {
        let outer = this;
        let offsets = [-20, -42, -42, -140, -27, -20, 0, -190, -20];
        for (let i = 0; i < 9; i++) {
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

                if (i === 8) {
                    obj.frame_rate = 10;
                }
            }
        }
    }

    update_skill1() {
        /*this.ctx.fillStyle = 'blue';

        this.ctx.fillRect(this.x, this.y, this.width, this.height);

        if (this.direction > 0) {
            this.ctx.fillStyle = 'red';
            this.ctx.fillRect(this.x + 260, this.y + 40, 120, 30);
        } else {
            this.ctx.fillStyle = 'red';
            this.ctx.fillRect(this.x + this.width - 260 - 120, this.y + 40, 120, 30);
        }

        if (this.direction > 0) {
            this.ctx.fillStyle = 'orange';
            this.ctx.fillRect(this.x + 260, this.y + 90, 120, 30);
        } else {
            this.ctx.fillStyle = 'orange';
            this.ctx.fillRect(this.x + this.width - 260 - 120, this.y + 90, 120, 30);
        }

        if (this.direction > 0) {
            this.ctx.fillStyle = 'green';
            this.ctx.fillRect(this.x + 380, this.y - 170, 50, 370);
        } else {
            this.ctx.fillStyle = 'green';
            this.ctx.fillRect(this.x + this.width - 380 - 50, this.y - 170, 50, 370);
        }*/

        let obj = this.animations.get(this.status);
        if (this.status === 7 && this.frame_current_cnt === obj.frame_rate * obj.frame_cnt - 1) {
            if (this.direction > 0) {
                this.x += 182;
            } else {
                this.x -= 182;
            }

            this.status = 0;
        }

        if (this.status === 7 && this.frame_current_cnt === 18) {
            let me = this, you = this.root.players[1 - this.id];
            let r1;
            if (this.direction > 0) {
                r1 = {
                    x1: me.x + 260,
                    y1: me.y + 40,
                    x2: me.x + 260 + 120,
                    y2: me.y + 40 + 30,
                };
            } else {
                r1 = {
                    x1: me.x + me.width - 260 - 120,
                    y1: me.y + 40,
                    x2: me.x + me.width - 260,
                    y2: me.y + 40 + 30,
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

        if (this.status === 7 && this.frame_current_cnt === 36) {

            let me = this, you = this.root.players[1 - this.id];
            let r1;
            if (this.direction > 0) {
                r1 = {
                    x1: me.x + 260,
                    y1: me.y + 90,
                    x2: me.x + 260 + 120,
                    y2: me.y + 90 + 30,
                };
            } else {
                r1 = {
                    x1: me.x + me.width - 260 - 120,
                    y1: me.y + 90,
                    x2: me.x + me.width - 260,
                    y2: me.y + 90 + 30,
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

        if (this.status === 7 && this.frame_current_cnt === 64) {

            let me = this, you = this.root.players[1 - this.id];
            let r1;
            if (this.direction > 0) {
                r1 = {
                    x1: this.x + 380,
                    y1: me.y - 170,
                    x2: me.x + 380 + 50,
                    y2: me.y - 170 + 370,
                };
            } else {
                r1 = {
                    x1: me.x + me.width - 380 - 50,
                    y1: me.y - 170,
                    x2: me.x + me.width - 380,
                    y2: me.y - 170 + 370,
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

