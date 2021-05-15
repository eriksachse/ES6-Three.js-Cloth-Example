import MainScene from "./objects/scenes/Main.js";
import Cloth from "./objects/models/Cloth";
import ClothView from "./objects/views/ClothObject.js";

const mainScene = new MainScene();

const cloth = new Cloth();
const clothView = new ClothView(cloth);

mainScene.scene.add(clothView.mesh);

function animate() {
  window.requestAnimationFrame(animate);
  const time = Date.now();

  cloth.simulate(time, clothView.geometry);
  clothView.update();
  mainScene.render();
}

animate();
