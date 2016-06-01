import THREE from 'three';
import Physijs from 'whitestormjs-physijs';

class Torus extends WHS.Shape {
  constructor(params = {}) {
    super(params, 'torus');

    WHS.API.extend(params.geometry, {

      radius: 100,
      tube: 40,
      radialSegments: 8,
      tubularSegments: 6,
      arc: Math.PI * 2

    });

    this.build(params);
    super.wrap();
  }

  build(params = {}) {
    const _scope = this,
      Mesh = this.physics ? Physijs.ConvexMesh : THREE.Mesh,
      material = super._initMaterial(params.material);

    return new Promise((resolve) => {
      _scope.setNative(new Mesh(
        new THREE.TorusGeometry(
          params.geometry.radius,
          params.geometry.tube,
          params.geometry.radialSegments,
          params.geometry.tubularSegments,
          params.geometry.arc
        ),

        material,
        params.mass
      ));

      resolve();
    });
  }

  clone() {
    return new WHS.Torus(this.getParams(), this._type).copy(this);
  }
}

export {
  Torus as default
};
