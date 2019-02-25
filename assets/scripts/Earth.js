// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

cc.Class({
  extends: cc.Component,

  properties: {
    // foo: {
    //     // ATTRIBUTES:
    //     default: null,        // The default value will be used only when the component attaching
    //                           // to a node for the first time
    //     type: cc.SpriteFrame, // optional, default is typeof default
    //     serializable: true,   // optional, default is true
    // },
    // bar: {
    //     get () {
    //         return this._bar;
    //     },
    //     set (value) {
    //         this._bar = value;
    //     }
    // },
  },

  // LIFE-CYCLE CALLBACKS:

  onLoad() {
    // 开启碰撞检测
    cc.director.getCollisionManager().enabled = true;
    //  cc.director.getCollisionManager().enabledDebugDraw = true;
  },
  start() {
    this.timer = 0;
    this.rand = 0;
  },

  update: function(dt) {
    //  这个决定每次改变方几率的频率
    if (this.timer % 30 == 0) {
      this.rand = Math.random();
    }
    //  这个决定改变方向旋转的概率
    let flag = -1;
    if (this.rand > 0.3) {
      flag = 1;
    }
    // 这个参数决定旋转的速度
    let step = 1;
    let rotation = step * flag;
    this.node.rotation = this.node.rotation + rotation;
    this.timer++;
  }

  // update (dt) {},
});
