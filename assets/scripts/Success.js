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
    restartBt: {
      default: null,
      type: cc.Button
    },
    backBt: {
      default: null,
      type: cc.Button
    },
    successAudio: {
      default: null,
      type: cc.AudioClip
    }
  },

  // LIFE-CYCLE CALLBACKS:

  onLoad() {
    cc.audioEngine.play(this.successAudio, false, 1);
    this.restartBt.node.on(cc.Node.EventType.TOUCH_START, this.restart, this);
    this.backBt.node.on(cc.Node.EventType.TOUCH_START, this.backUp, this);
  },
  backUp: function() {
    cc.director.loadScene("start");
  },

  restart: function() {
    cc.director.loadScene("game");
  },

  onDestroy() {
    cc.audioEngine.stop(this.successAudio, false, 1);
    this.restartBt.node.off(cc.Node.EventType.TOUCH_START, this.restart, this);
    this.backBt.node.off(cc.Node.EventType.TOUCH_START, this.backUp, this);
  },

  start() {}

  // update (dt) {},
});
