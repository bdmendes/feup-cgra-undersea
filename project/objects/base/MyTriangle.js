import { CGFobject } from '../../../lib/CGF.js';
/**
 * MyTriangle
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyTriangle extends CGFobject {
    constructor(scene, texC) {
        super(scene);
        this.initBuffers(texC);
    }

    initBuffers(texC) {
        this.vertices = [
            0, 0, 0,	//0
            0, -1, -1,	//1
            0, -1, 1,	//2
        ];

        //Counter-clockwise reference of vertices
        this.indices = [
            0, 1, 2,
            2, 1, 0,
        ];

        this.normals = [
            1, 0, 0,
            1, 0, 0,
            1, 0, 0,
        ];

        if (texC != undefined) {
            this.texCoords = texC;
        }

        //The defined indices (and corresponding vertices)
        //will be read in groups of three to draw triangles
        this.primitiveType = this.scene.gl.TRIANGLES;

        this.initGLBuffers();
    }
}