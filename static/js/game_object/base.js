let GAME_OBJECT = [];

class GameObject {
    constructor() {
        GAME_OBJECT.push(this);

        this.timedelta = 0;
        this.has_call_start = false;
    }

    start() { // 初始执行一次

    }

    update() { // 每一帧执行一次

    }

    destroy() { //  删除当前对象
        for (let i in GAME_OBJECT) { //遍历数组(枚举下标)
            if (GAME_OBJECT[i] === this) {
                GAME_OBJECT.splice(i, 1) //从i开始删除一个元素，即删除当前对象
                break;
            }
        }
    }
}

//实现每一帧执行一次
let last_timestamp;

let GAME_OBJECT_FRAME = (timestamp) => {
    for (let obj of GAME_OBJECT) {
        if (!obj.has_call_start) {
            obj.start();
            obj.has_call_start = true;
        } else {
            obj.timedelta = timestamp - last_timestamp;
            obj.update();
        }
    }

    last_timestamp = timestamp;
    requestAnimationFrame(GAME_OBJECT_FRAME);
}

requestAnimationFrame(GAME_OBJECT_FRAME);

export {
    GameObject
}