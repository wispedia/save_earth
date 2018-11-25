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
    treeNum: 0,
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
    label : {
      default:null,
      type:cc.Label,
    }
  },

  // LIFE-CYCLE CALLBACKS:

  onLoad() {
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
    for (let i = 0; i <= this.treeNum; i++) {
      let newTree = cc.instantiate(this.treePrefab);
      this.node.addChild(newTree);
      newTree.setPosition(cc.v2(-130, -200 + i * 40));
      newTree.getComponent("Tree").game = this;
      this.treePool.push(newTree);
    }
  },

  launchAndResetTree() {
    this.launchTree();
    if (this.treePool.length > 0) {
      this.currentTree = this.treePool.shift();
      this.resetTreePosition();
    } else {
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
    this.node.off(cc.Node.EventType.TOUCH_START, this.onTouch, this);
    this.node.off(cc.Node.EventType.TOUCH_END, this.endTouch, this);
  },
  gameOver: function() {
    this.label.string = "Game Over";
  }
  // update (dt) {},
});
