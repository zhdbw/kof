import { GameObject } from '/static/js/game_object/base.js';


export class Player extends GameObject {
    constructor(root, info) {
        super();

        this.root = root;
        this.id = info.id;
        this.x = info.x;
        this.y = info.y;
        this.width = info.width;
        this.height = info.height;
        this.color = info.color;

        this.direction = 1;

        this.vx = 0;
        this.vy = 0;

        this.speedx = 400; // 水平速度
        this.speedy = 1000; // 跳起的初始速度

        this.gracity = 50;

        this.ctx = this.root.game_map.ctx;

        this.pressed_keys = this.root.game_map.controller.pressed_keys;

        this.status = 3; //0: idle, 1: 向前， 2： 向后， 3：跳跃， 4： 攻击， 5： 受击， 6： 死亡,  7:  技能1,  8:  空中硬d直
        this.animations = new Map();
        this.frame_current_cnt = 0;

        this.attack_cd = 0; //攻击间隔
        //this.stiff = 0; //受击僵直

        this.hp = 100;
        this.$hp = this.root.$kof.find(`.kof-head-hp${this.id}>div`);
    }

    start() { // 初始执行一次

    }

    update_move() {
        this.vy += this.gracity;

        this.x += this.vx * this.timedelta / 1000;
        this.y += this.vy * this.timedelta / 1000;

        /*      给人物增加碰撞体积，但人物会卡住
        if (this.status !== 3) {
            let me = this, you = this.root.players[1 - this.id];
            let r1 = {
                x1: me.x,
                y1: me.y,
                x2: me.x + me.width,
                y2: me.y + me.height,
            };

            let r2 = {
                x1: you.x,
                y1: you.y,
                x2: you.x + you.width,
                y2: you.y + you.height,
            };

            if (this.id_collision(r1, r2)) {
                this.x -= this.vx * this.timedelta / 1000;
                //this.status = 0;
            }
    } */

        if (this.y > 450) {
            this.y = 450;
            this.vy = 0;
            if (this.status == 3) {
                this.status = 0;
            }
        }

        if (this.x < 0) {
            this.x = 0;
        } else if (this.x + this.width > this.root.game_map.$canvas.width()) {
            this.x = this.root.game_map.$canvas.width() - this.width;
        }
    }

    update_control() {
        let w, a, d, attack, skill1;
        if (this.id === 0) {
            w = this.pressed_keys.has('w');
            a = this.pressed_keys.has('a');
            d = this.pressed_keys.has('d');
            attack = this.pressed_keys.has('j');
            skill1 = this.pressed_keys.has('k')
        } else {
            w = this.pressed_keys.has('ArrowUp');
            a = this.pressed_keys.has('ArrowLeft');
            d = this.pressed_keys.has('ArrowRight');
            attack = this.pressed_keys.has('1');
            skill1 = this.pressed_keys.has('2')
        }

        if (this.status === 0 || this.status === 1) {
            if (attack && this.attack_cd === 0) {
                this.attack_cd = 60;
                this.status = 4;
                this.vx = 0;
                this.frame_current_cnt = 0;
            } else if (skill1) {
                this.attack_cd = 60;
                this.status = 7;
                this.vx = 0;
                this.frame_current_cnt = 0;
            } else if (w) {
                this.frame_current_cnt = 0;
                if (d) {
                    this.vx = this.speedx;
                } else if (a) {
                    this.vx = -this.speedx;
                }
                else {
                    this.vx = 0;
                }
                this.vy = -this.speedy;
                this.status = 3;
            } else if (d) {
                this.vx = this.speedx;
                this.status = 1;
            } else if (a) {
                this.vx = -this.speedx;
                this.status = 1;
            } else {
                this.vx = 0;
                this.status = 0;
            }
        }
    }

    update_direction() {
        if (this.status === 6) return; //逝者安息

        if (this.status === 7) return; //禁止瞬移

        let players = this.root.players;
        if (players[0] && players[1]) {
            let me = this, you = players[1 - this.id];
            if (me.x < you.x) me.direction = 1;
            else me.direction = -1;
        }
    }

    id_collision(r1, r2) {
        if (Math.max(r1.x1, r2.x1) > Math.min(r1.x2, r2.x2))
            return false;
        if (Math.max(r1.y1, r2.y1) > Math.min(r1.y2, r2.y2))
            return false;
        return true;
    }

    is_attack() {

        if (this.status === 6) return; //逝者安息

        this.status = 5;
        this.vx = 0;
        this.frame_current_cnt = 0;

        console.log(this.$hp);
        this.hp = Math.max(this.hp - 1, 0);

        this.$hp.animate({
            width: this.$hp.parent().width() * this.hp / 100
        })

        if (this.hp <= 0) {
            this.vx = 0; //迁坟
            this.status = 6;
            this.frame_current_cnt = 0;
        }
    }

    update_reset() {
        if (this.status === 6) {
            let me = this, you = this.root.players[1 - this.id];
            if (me.id === 0) {
                me.x = 200;
                me.y = 0;
                me.status = 3;
                me.hp = 100;
                me.$hp.animate({
                    width: me.$hp.parent().width() * me.hp / 100
                })

                you.x = 900;
                you.y = 0;
                you.status = 3;
                you.hp = 100;
                you.$hp.animate({
                    width: you.$hp.parent().width() * you.hp / 100
                })
            } else {
                me.x = 900;
                me.y = 0;
                me.status = 3;
                me.hp = 100;
                me.$hp.animate({
                    width: me.$hp.parent().width() * me.hp / 100
                })

                you.x = 200;
                you.y = 0;
                you.status = 3;
                you.hp = 100;
                you.$hp.animate({
                    width: you.$hp.parent().width() * you.hp / 100
                })
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

            console.log(r1, r2);
            if (this.id_collision(r1, r2)) {
                you.is_attack()
            }
        }
    };

    update_skill1() {

    };

    update() { // 每一帧执行一次
        this.update_move();
        //console.log(this.status);
        this.update_control();
        this.update_direction();
        this.update_attack();
        this.update_skill1();
        this.update_reset();
        //console.log(this.status);
        this.render();
    }

    render() {

        let status = this.status;

        if (this.status == 1 && this.direction * this.vx < 0) {
            status = 2;
        }

        let obj = this.animations.get(status);
        if (obj && obj.loaded) {
            if (this.direction > 0) {
                let k = parseInt(this.frame_current_cnt / obj.frame_rate) % obj.frame_cnt;
                let image = obj.gif.frames[k].image;
                this.ctx.drawImage(image, this.x, this.y + obj.offset_y, image.width * obj.scale, image.height * obj.scale);
            }
            else {
                this.ctx.save();
                this.ctx.scale(-1, 1);
                this.ctx.translate(-this.root.game_map.$canvas.width(), 0);

                let k = parseInt(this.frame_current_cnt / obj.frame_rate) % obj.frame_cnt;
                let image = obj.gif.frames[k].image;
                this.ctx.drawImage(image, this.root.game_map.$canvas.width() - this.x - this.width, this.y + obj.offset_y, image.width * obj.scale, image.height * obj.scale);

                this.ctx.restore();
            }
        }

        if (status === 4 && this.frame_current_cnt === obj.frame_rate * obj.frame_cnt - 1) {
            this.status = 0;
        }

        /*if (status === 3 && this.frame_current_cnt === obj.frame_rate * (obj.frame_cnt - 6)) {
            this.frame_current_cnt--;
            console.log(obj.frame_cnt);
        }*/

        if (status === 3 && this.frame_current_cnt === obj.frame_rate * (obj.frame_cnt - 1)) {
            this.frame_current_cnt--;
            console.log(obj.frame_cnt);
        }

        if (status === 5 && this.frame_current_cnt === obj.frame_rate * obj.frame_cnt - 1) {
            this.status = 0;
        }

        if (status === 6 && this.frame_current_cnt === obj.frame_rate * obj.frame_cnt - 1) {
            this.frame_current_cnt--;
        }



        this.frame_current_cnt++;
        if (this.attack_cd > 0) this.attack_cd--;
    }
}