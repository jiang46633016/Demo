import { _decorator, Component, EventTouch, input, Input, Node, UITransform, Vec2 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('JoyStickManager')
export class JoyStickManager extends Component {
    input: Vec2 = Vec2.ZERO;

    private body: Node
    private stick: Node
    private defaultPos: Vec2
    private radius: number;
    onLoad() {
        this.body = this.node.getChildByName("Body");
        this.stick = this.body.getChildByName("Stick");
        this.radius = this.body.getComponent(UITransform).contentSize.x / 2;
        this.defaultPos = new Vec2(this.body.position.x, this.body.position.y);
        input.on(Input.EventType.TOUCH_START, this.onTouchStart, this);
        input.on(Input.EventType.TOUCH_MOVE, this.onTouchMove, this);
        input.on(Input.EventType.TOUCH_END, this.onTouchEnd, this);
    }

    onDestroy() {

    }

    onTouchStart(e: EventTouch) {
        const touchPos = e.getUILocation();
        this.body.setPosition(touchPos.x, touchPos.y);
    }

    onTouchMove(e: EventTouch) {
        const touchPos = e.getUILocation();
        const stickPos = new Vec2(touchPos.x - this.body.position.x, touchPos.y - this.body.position.y);
        if (stickPos.length() > this.radius) {
            stickPos.multiplyScalar(this.radius / stickPos.length());
        }
        this.stick.setPosition(stickPos.x, stickPos.y);
        this.input = stickPos.clone().normalize();
    }

    onTouchEnd() {
        this.body.setPosition(this.defaultPos.x, this.defaultPos.y);
        this.stick.setPosition(0, 0);
        this.input = Vec2.ZERO;
    }
}

