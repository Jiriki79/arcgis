import esriConfig from "@arcgis/core/config.js";
import Map from "@arcgis/core/Map";
import MapView from "@arcgis/core/views/MapView";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import GraphicsLayer from "@arcgis/core/layers/GraphicsLayer";
import Graphic from "@arcgis/core/Graphic";
import geometryEngine from "@arcgis/core/geometry/geometryEngine";

esriConfig.assetsPath = "./assets";
esriConfig.apiKey = "AAPK4cf070f48d9447b2af48df14234fb1c1iQX7jgpsU_O_g6eHZ7JOvND6f5_H5aiAembWWExxH_7g1-pPgwzqDxd8MJe2N5JZ";
const map = new Map({
  basemap: "topo-vector"
});
const bufferLayer = new GraphicsLayer();
const graphicsLayer = new GraphicsLayer();
const view = new MapView({
  map: map,
  center: [-97.305923,37.679377],
  zoom: 10, // scale: 72223.819286
  container: "viewDiv"
});
view.when(()=>console.log('view ready'))

const Content = {
  "title": "API Test",
  "content": "<b>ID:</b> {ObjectID}<br><b>Location:</b> {place_name}<br>"
}
const MyLayer = new FeatureLayer({
  url: "https://services8.arcgis.com/TrLhDuWxkcSkFAjt/arcgis/rest/services/api_test/FeatureServer/0"
});
map.add(bufferLayer);
map.add(graphicsLayer);
map.add(MyLayer);
var option = 0
document.getElementById('bufferBtn').addEventListener("click", submit)
function submit(){
  const e = document.getElementById('dropdown');
  option = e.value;
  const sym = {
    type: "simple-fill",
    color: [227, 139, 79, 0.25],
    style: "solid",
    outline: {
      color: [255, 255, 255, 255],
      width: 1
    }
  };
   
MyLayer.queryFeatures().then((results)=>{
  results.features.map(feat => {
    const buffer = geometryEngine.Buffer(feat.geometry, 200, "kilometers");
    
    bufferGraphic = new Graphic({geometry: buffer, symbol: sym});
    // add graphic to map
    graphicsLayer.add(bufferGraphic);
  });
})}
