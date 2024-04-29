var runLevels = function (window) {
  window.opspark = window.opspark || {};

  var draw = window.opspark.draw;
  var createjs = window.createjs;
  let currentLevel = 0;

  window.opspark.runLevelInGame = function (game) {
    // some useful constants
    var groundY = game.groundY;
    
    // this data will allow us to define all of the
    // behavior of our game
    var levelData = window.opspark.levelData;

    // set this to true or false depending on if you want to see hitzones
    game.setDebugMode(true);

    // TODOs 5 through 11 go here
    // BEGIN EDITING YOUR CODE HERE
    var hitZoneSize = 25;
    var damageFromObstacle = 10;
    var sawBladeHitZone = game.createObstacle(hitZoneSize, damageFromObstacle);
    
    sawBladeHitZone.x = 1950;
    sawBladeHitZone.y = 775;
    game.addGameItem(sawBladeHitZone);

    var obstacleImage = draw.bitmap("img/sawblade.png");
    sawBladeHitZone.addChild(obstacleImage);

    function createSawBlade(x, y){
    var hitZoneSize = 25;
    var damageFromObstacle = 10;
    var sawBladeHitZone = game.createObstacle(hitZoneSize, damageFromObstacle);
    sawBladeHitZone.x = x;
    sawBladeHitZone.y = y;
    game.addGameItem(sawBladeHitZone);
    var obstacleImage = draw.bitmap("img/sawblade.png");
    sawBladeHitZone.addChild(obstacleImage);
    }
    createSawBlade(1750, 850);
    createSawBlade(1800, 700);
    createSawBlade(2000, 650);

    
    
    function createEnemy(x, y){
      var enemy = game.createGameItem("enemy", 25);
    var redSquare = draw.rect(75, 75, "red");
    redSquare.x = -25;
    redSquare.y = -25;
    enemy.addChild(redSquare);
    enemy.x = x;
    enemy.y = y;
    game.addGameItem(enemy);
    enemy.velocityX = -3
    enemy.rotationalVelocity = 3    
    enemy.onProjectileCollision = function () {
      game.increaseScore(100);
      enemy.shrink();
    }
    enemy.onPlayerCollision = function () {
      game.changeIntegrity(-10)
    };
  }
  createEnemy(400, groundY - 10);
  createEnemy(800, groundY - 115);
  createEnemy(1200, groundY - 50);
  
  function createReward(x, y){
    var reward = game.createGameItem("gemstone", 25);
    var gemstone = draw.rect(75, 75, "green");
    gemstone.x = -25;
    gemstone.y = -25;
    reward.addChild(gemstone);
    reward.x = x;
    reward.y = y;
    game.addGameItem(reward);
    reward.onPlayerCollision = function () {
      game.increaseScore(1000);
      reward.shrink();
    };
    reward.velocityX = -3
  }
  createReward(2000, 800);
  
  function createMarker(x,y){
    var end = game.createGameItem("marker", 25);
    var marker = draw.rect(75, 75, "yellow");
    marker.x = -25;
    marker.y = -25;
    end.addChild(marker);
    end.x = x;
    end.y = y;
    game.addGameItem(end);
    end.velocityX = -2
    end.onPlayerCollision = function startLevel() {
      end.shrink();
    };
    end.onProjectileCollision = function startLevel() {
      end.shrink();
    }
  }
  createMarker(2500, groundY - 100)

    
    function startLevel() {
      // TODO 13 goes below here



      //////////////////////////////////////////////
      // DO NOT EDIT CODE BELOW HERE
      //////////////////////////////////////////////
      if (++currentLevel === levelData.length) {
        startLevel = () => {
          console.log("Congratulations!");
        };
      }
    }
    startLevel();
  };
};

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if (
  typeof process !== "undefined" &&
  typeof process.versions.node !== "undefined"
) {
  // here, export any references you need for tests //
  module.exports = runLevels;
}
