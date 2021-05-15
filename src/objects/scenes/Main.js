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
    this.lights();
    this.renderer();
    this.listeners();
    this.appendChild();
  }

  camera() {
    this.camera = new PerspectiveCamera(
      30,
      window.innerWidth / window.innerHeight,
      1,
      10000
    );
    this.camera.position.x = 1000;
    this.camera.position.y = 50;
    this.camera.position.z = 1500;
    this.scene.add(this.camera);
  }

  lights() {
    // this.scene.add(new AmbientLight(0x111111));

    this.light = new AmbientLight(0xffffff);

    this.scene.add(this.light);
  }

  appendChild() {
    this.container = document.createElement("div");
    document.body.appendChild(this.container);
    this.container.appendChild(this.renderer.domElement);
  }

  renderer() {
    this.renderer = new WebGLRenderer({ antialias: true });
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setClearColor(0x000000);

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
    this.camera.lookAt(this.scene.position);
    this.renderer.render(this.scene, this.camera);
  }
}
