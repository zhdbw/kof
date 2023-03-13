import { Player } from '/static/js/player/base.js';
import { GIF } from '/static/js/utils/gif.js';

export class Kyo extends Player {
    constructor(root, info) {
        super(root, info);

        this.init_animations();
    }

    init_animations() {
        let outer = this;
        let offsets = [0, -22, -22, -140, 0, 0, 0, -180, 0];
        for (let i = 0; i < 8; i++) {
            let gif = GIF();
            let image = gif.image;
            gif.load(`/static/images/player/kyo/${i}.gif`);
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

                if (i === 5) {
                    obj.frame_rate = 6;
                }
            }
        }
    }

    update_attack() {
        if (this.status === 4 && this.frame_current_cnt === 17) {
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
                    x2: me.x + me.width - 120,
                    y2: me.y + 40 + 20,
                }
            }

            let r2 = {
                x1: you.x,
                y1: you.y,
                x2: you.x + you.width,
                y2: you.x + you.height,
            }
            if (this.id_collision(r1, r2)) {
                you.is_attack()
            }
        }
    }

    update_skill1() {
        /*this.ctx.fillStyle = 'blue';

        this.ctx.fillRect(this.x, this.y, this.width, this.height);

        if (this.direction > 0) {
            this.ctx.fillStyle = 'red';
            this.ctx.fillRect(this.x + 120, this.y - 40, 100, 100);
        } else {
            this.ctx.fillStyle = 'red';
            this.ctx.fillRect(this.x + this.width - 120 - 100, this.y - 40, 100, 100);
        }

        if (this.direction > 0) {
            this.ctx.fillStyle = 'orange';
            this.ctx.fillRect(this.x + 90, this.y - 140, 130, 100);
        } else {
            this.ctx.fillStyle = 'orange';
            this.ctx.fillRect(this.x + this.width - 90 - 130, this.y - 140, 130, 100);
        }*/
        let obj = this.animations.get(this.status);
        if (this.status === 7 && this.frame_current_cnt === obj.frame_rate * obj.frame_cnt - 1) {
            if (this.direction > 0) {
                this.x += 84;
            } else {
                this.x -= 84;
            }

            this.status = 0;
        }

        if (this.status === 7 && this.frame_current_cnt === 22) {
            let me = this, you = this.root.players[1 - this.id];
            let r1;
            if (this.direction > 0) {
                r1 = {
                    x1: me.x + 120,
                    y1: me.y - 40,
                    x2: me.x + 120 + 100,
                    y2: me.y - 40 + 100,
                };
            } else {
                r1 = {
                    x1: me.x + me.width - 120 - 100,
                    y1: me.y - 40,
                    x2: me.x + me.width - 120,
                    y2: me.y - 40 + 100,
                }
            }

            let r2 = {
                x1: you.x,
                y1: you.y,
                x2: you.x + you.width,
                y2: you.y + you.height,
            }

            console.log(r1, r2);
            if (this.id_collision(r1, r2)) {
                you.is_attack();
                you.vy -= 1000;
                console.log("a1")
                you.gracity = 40;
                you.status = 8;
            }
        }

        if (this.status === 7 && this.frame_current_cnt === 62) {

            let me = this, you = this.root.players[1 - this.id];
            you.gracity = 50;
            let r1;
            if (this.direction > 0) {
                r1 = {
                    x1: me.x + 90,
                    y1: me.y - 140,
                    x2: me.x + 90 + 130,
                    y2: me.y - 40 + 100,
                };
            } else {
                r1 = {
                    x1: me.x + me.width - 90 - 130,
                    y1: me.y - 140,
                    x2: me.x + me.width - 90,
                    y2: me.y - 40 + 100,
                }
            }

            let r2 = {
                x1: you.x,
                y1: you.y,
                x2: you.x + you.width,
                y2: you.y + you.height,
            }

            console.log(r1, r2);
            if (this.id_collision(r1, r2)) {
                you.is_attack();
                console.log("a2")
            }
        }
    }

}