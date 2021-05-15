import {
  Scene,
  AmbientLight,
  DirectionalLight,
  PerspectiveCamera,
  WebGLRenderer,
} from "three";

export default class MainScene {
  constructor() {
    this.scene = new Scene();

    this.camera();
    this.renderer();
    this.listeners();
    this.appendChild();
  }

  camera() {
    this.camera = new PerspectiveCamera(
      80,
      window.innerWidth / window.innerHeight,
      1,
      10000
    );
    this.camera.position.z = 700;
    this.camera.lookAt(this.scene.position);
    this.scene.add(this.camera);
  }

  appendChild() {
    this.container = document.createElement("div");
    document.body.appendChild(this.container);
    this.container.style.position = "fixed";
    this.container.style.top = "0";
    this.container.style.left = "0";
    this.container.appendChild(this.renderer.domElement);
  }

  renderer() {
    this.renderer = new WebGLRenderer();
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setClearColor(0xffffff);

    this.renderer.gammaInput = true;
    this.renderer.gammaOutput = true;

    this.renderer.shadowMap.enabled = true;
  }

  listeners() {
    window.addEventListener(
      "resize",
      () => {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
      },
      false
    );
  }

  render() {
    this.renderer.render(this.scene, this.camera);
  }
}
