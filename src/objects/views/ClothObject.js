import { ParametricBufferGeometry, Mesh, MeshNormalMaterial } from "three";

export default class ClothObject {
  constructor(cloth) {
    this.cloth = cloth;
    this.createGeometry();
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

  createMaterial() {
    this.material = new MeshNormalMaterial({
      wireframe: true,
    });
  }

  createMesh() {
    this.mesh = new Mesh(this.geometry, this.material);
    this.mesh.position.set(400, 0, 0);
    this.mesh.scale.set(3, 3, 3);
    this.mesh.rotation.z = Math.PI / 2;
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
