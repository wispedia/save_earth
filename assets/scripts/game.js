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
    audio: {
      default: null,
      type: cc.AudioClip
    },
    treeNum: 0,
    midTreeNum: 0,
    treePool: [cc.Node],
    currentTree: cc.Node,

    treeResetDuration: 0,
    treeInitalPositionX: 0,
    treeInitalPositionY: -200,

    treeLaunchDuration: 0,
    treeLaunchPositionY: 0,

    treePrefab: {
      default: null,
      type: cc.Prefab
    },
    earth: {
      default: null,
      type: cc.Node
    },
    label: {
      default: null,
      type: cc.Label
    }
  },

  // LIFE-CYCLE CALLBACKS:

  onLoad() {
    cc.audioEngine.play(this.audio, true, 1);
    this.spawnNewTree();
    this.initTree();
    this.node.on(cc.Node.EventType.TOUCH_START, this.onTouch, this);
    this.node.on(cc.Node.EventType.TOUCH_END, this.endTouch, this);
  },

  start() {},

  initTree: function() {
    this.currentTree = this.treePool.shift();
    this.resetTreePosition();
  },

  onTouch: function() {
    this.launchAndResetTree();
  },

  onCollisionEnter: function(other, self) {
    console.log("碰撞发生game");
  },

  endTouch: function() {},

  spawnNewTree: function() {
    for (let i = 0; i < this.treeNum; i++) {
      let newTree = cc.instantiate(this.treePrefab);
      this.node.addChild(newTree);
      if(i> 5) {
        newTree.setPosition(cc.v2(130, -200 + (i - this.midTreeNum) * 40));
        // newTree.setRotation(180);
        newTree.getComponent("Tree").game = this;
      } else {
        newTree.setPosition(cc.v2(-130, -200 + i * 40));
        newTree.getComponent("Tree").game = this;
      }
      this.treePool.push(newTree);
    }
  },

  launchAndResetTree() {
    this.launchTree();
    if (this.treePool.length > 0) {
      this.currentTree = this.treePool.shift();
      this.resetTreePosition();
    } else {
      // 没有小树苗了
      this.currentTree = null;
    }
  },

  resetTreePosition: function() {
    let reset = cc.moveTo(
      this.treeResetDuration,
      this.treeInitalPositionX,
      this.treeInitalPositionY
    );
    let rotate = cc
      .rotateTo(this.treeResetDuration, -180)
      .easing(cc.easeCubicActionIn());
    let spawn = cc.spawn(reset, rotate);
    this.currentTree.runAction(spawn);
  },

  launchTree: function() {
    if (this.currentTree) {
      let launch = cc
        .moveBy(this.treeLaunchDuration, 0, this.treeLaunchPositionY)
        .easing(cc.easeCubicActionOut());
      this.currentTree.runAction(launch);
    }
  },

  onDestroy: function() {
    cc.audioEngine.stop(this.audio, true, 1);
    this.node.off(cc.Node.EventType.TOUCH_START, this.onTouch, this);
    this.node.off(cc.Node.EventType.TOUCH_END, this.endTouch, this);
  },
  gameOver: function() {
    console.log("over");
    if(this.loadFailedScene !== true) {
      cc.director.loadScene("over",this.playFailedBgm);
      this.loadFailedScene = true;
    }
  },

  update(dt) {
    if (
      this.earth.children.length == this.treeNum &&
      this.treePool.length <= 0
    ) {
      if(this.loadSuccessScene !== true) {
        cc.director.loadScene("success",this.playSuccessBgm);
        this.loadSuccessScene = true;
      }
    }
  }
});
