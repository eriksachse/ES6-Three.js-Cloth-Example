import {
  ParametricBufferGeometry,
  ParametricGeometry,
  TextureLoader,
  MeshLambertMaterial,
  DoubleSide,
  Mesh,
  ShaderMaterial,
} from "three";

export default class ClothObject {
  constructor(cloth) {
    this.cloth = cloth;
    this.createGeometry();
    this.loadTexture();
    this.createMaterial();
    this.createMesh();
  }

  createGeometry() {
    this.geometry = new ParametricBufferGeometry(
      this.cloth.clothFunction,
      this.cloth.w,
      this.cloth.h
    );
    this.geometry.dynamic = true;
  }

  loadTexture() {
    const loader = new TextureLoader();
    this.clothTexture = loader.load(
      "https://images.unsplash.com/photo-1454123253751-1fe2b9e0c10d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
    );
    this.clothTexture.anisotropy = 16;
    this.uniforms = { texture: { value: this.clothTexture } };
  }

  createMaterial() {
    this.material = new MeshLambertMaterial({
      map: this.clothTexture,
      side: DoubleSide,
      alphaTest: 0.5,
    });
  }

  createMesh() {
    this.mesh = new Mesh(this.geometry, this.material);
    this.mesh.position.set(0, 0, 0);
    this.mesh.rotation.z = 2.0;
    this.mesh.scale.set(3, 3, 3);
    this.mesh.castShadow = true;

    this.mesh.customDepthMaterial = new ShaderMaterial({
      uniforms: this.uniforms,
      side: DoubleSide,
    });
  }

  update() {
    const p = this.cloth.particles;
    for (let i = 0, il = p.length; i < il; i++) {
      const v = p[i].position;
      this.geometry.attributes.position.setXYZ(i, v.x, v.y, v.z);
    }

    this.geometry.attributes.position.needsUpdate = true;
    this.geometry.computeVertexNormals();
  }
}
