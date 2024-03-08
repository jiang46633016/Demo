import { _decorator, Component, director, instantiate, IVec2, math, Node } from 'cc';
import DataManager from '../../Global/DataManager';
import { EntityTypeEnum, InputTypeEnum } from '../../Common/Enum';
import { IActor, IBullet } from '../../Common';
import { EntityManager } from '../../Base/EntityManager';
import { EntityStateEnum, EventEnum } from '../../Enum';
import { WeaponManager } from '../Weapon/WeaponManager';
import { rad2Angle } from '../../Utils';

import EventManager from '../../Global/EventManager';
import { ExplosionStateMachine } from './ExplosionStateMachine';
const { ccclass, property } = _decorator;

@ccclass('ExplosionManager')
export class ExplosionManager extends EntityManager {
    type: EntityTypeEnum
    id: number

    init(type: EntityTypeEnum, { x, y }: IVec2) {
        this.node.setPosition(x, y);
        this.type = type;
        this.fsm = this.addComponent(ExplosionStateMachine);
        this.fsm.init(type);
        this.state = EntityStateEnum.Idle;
    }


}

