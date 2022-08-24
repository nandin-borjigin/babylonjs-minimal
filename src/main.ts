import {
  ArcRotateCamera,
  Engine,
  HemisphericLight,
  MeshBuilder,
  Scene,
  Vector3,
} from "@babylonjs/core";
import { app, video } from "@microsoft/teams-js";

const canvas = document.createElement("canvas");
canvas.style.width = "100%";
document.body.append(canvas);

const engine = new Engine(canvas, true);
const scene = new Scene(engine);
const camera = new ArcRotateCamera(
  "camera",
  -Math.PI / 2,
  Math.PI / 2.5,
  3,
  new Vector3(0, 0, 0),
  scene
);
camera.attachControl(canvas, true);

new HemisphericLight("light", new Vector3(0, 1, 0), scene);

MeshBuilder.CreateBox("box", {}, scene);

engine.runRenderLoop(() => {
  scene.render();
});


// Register a noop frame handler
// because TMP is waiting for 'registerForVideoFrame'
app.initialize().then(() => {
  video.registerForVideoEffect(() => {});
  video.registerForVideoFrame((_, notifySuccess) => notifySuccess(), {
    format: video.VideoFrameFormat.NV12,
  });
});
