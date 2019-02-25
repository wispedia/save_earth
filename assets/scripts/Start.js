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
    startBt: {
      default: null,
      type: cc.Button
    },
    audio: {
      default: null,
      type: cc.AudioClip
    }
  },

  // LIFE-CYCLE CALLBACKS:

  onLoad() {
    cc.audioEngine.play(this.audio, true, 1);
    this.startBt.node.on(cc.Node.EventType.TOUCH_END, this.auth, this);
  },
  auth: function() {
    wx.getSetting({
      success: this.getSettingSuccess.bind(this)
    });
  },

  getSettingSuccess: function(res) {
    if (!res.authSetting["scope.userInfo"]) {
      wx.authorize({
        scope: "scope.userInfo",
        success:this.begin,
      });
    } else {
      this.begin();
    }
  },

  begin() {
    wx.cloud.init({
      env: "zzfun-8ba6fb",
      traceUser: true
    });
    cc.audioEngine.stop(this.audio, true, 1);
    cc.loader.release(this.audio);
    cc.director.loadScene("game");
  },

  onDestroy() {
    cc.audioEngine.stop(this.audio, true, 1);
    this.startBt.node.off(cc.Node.EventType.TOUCH_END, this.begin, this);
  },
  start() {}

  // update (dt) {},
});
