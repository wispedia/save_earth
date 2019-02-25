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
    resetDuration: 0,
    launchDuration: 0,
    initalPositionY: -200,
    initalPositionX: 0,
    earth: {
      default: null,
      type: cc.Node
    }
  },

  // LIFE-CYCLE CALLBACKS:

  onLoad() {
    // 开启碰撞检测
    let manager = cc.director.getCollisionManager();
    manager.enabled = true;
  },

  onCollisionEnter: function(other, self) {
    if (other.node.group == "earth") {
      let rotation = (other.node.getRotation() * Math.PI) / 180;
      self.node.parent = other.node;
      self.node.setPosition(
        cc.v2(
          (other.world.radius + 30) * Math.sin(rotation),
          -(other.world.radius + 30) * Math.cos(rotation)
        )
      );
      self.node.rotation = 180 - other.node.getRotation();
      self.node.character = "tree";
    } else {
      if (other.node.group == "tree") {
        cc.director.pause();
        setTimeout(() => {
          cc.director.resume();
          self.node.destroy();
          this.game.gameOver();
        }, 300);
      }
    }
  },
  onDestroy: function() {},
  rotationWithEarth: function() {},
  launch: function() {},
  start() {}

  // update (dt) {},
});
