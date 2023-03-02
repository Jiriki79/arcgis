import esriConfig from "@arcgis/core/config";
import Map from "@arcgis/core/Map";
import MapView from "@arcgis/core/views/MapView";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import GraphicsLayer from "@arcgis/core/layers/GraphicsLayer";
import Graphic from "@arcgis/core/Graphic";
import * as geometryEngine from "@arcgis/core/geometry/geometryEngine";
import FeatureTable from '@arcgis/core/widgets/FeatureTable'
import Editor from "@arcgis/core/widgets/Editor"

esriConfig.assetsPath = "./assets";
esriConfig.apiKey = "AAPK4cf070f48d9447b2af48df14234fb1c1iQX7jgpsU_O_g6eHZ7JOvND6f5_H5aiAembWWExxH_7g1-pPgwzqDxd8MJe2N5JZ";
const map = new Map({
  basemap: "arcgis-dark-gray"
});
const bufferLayer = new GraphicsLayer();
const graphicsLayer = new GraphicsLayer();
const view = new MapView({
  map: map,
  center: [-97.305923,37.679377],
  zoom: 9,
  container: "viewDiv"
});
var point
view.on('click',(event)=>{
  point = event.mapPoint;
  const e = document.getElementById('dropdown');
  var option = e.value;
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
      const buffer = geometryEngine.geodesicBuffer(point, option, "nautical-miles");
      graphicsLayer.removeAll()
      var bufferGraphic = new Graphic({geometry: buffer, symbol: sym});
      // add graphic to map
      graphicsLayer.add(bufferGraphic);
    });
  })
})

const Content = {
  "title": "API Test",
  "content": "<b>ID:</b> {ObjectID}<br><b>Location:</b> {place_name}<br>"
}

const MyLayer = new FeatureLayer({
  url: "https://services8.arcgis.com/TrLhDuWxkcSkFAjt/arcgis/rest/services/api_test/FeatureServer/0",
  outFields:['*'],
  popupTemplate: Content
});

map.add(bufferLayer);
map.add(graphicsLayer);
map.add(MyLayer);

var option = 0
document.getElementById('bufferBtn').addEventListener("click", submit)
function submit(){
  const e = document.getElementById('dropdown');
  var option = e.value;
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
      const buffer = geometryEngine.geodesicBuffer(feat.geometry, option, "nautical-miles");
      graphicsLayer.removeAll()
      var bufferGraphic = new Graphic({geometry: buffer, symbol: sym});
      // add graphic to map
      graphicsLayer.add(bufferGraphic);
    });
  })
};

const featureTable = new FeatureTable({
  view:view,
  autoRefreshEnabled:true,
  layer:MyLayer,
  container:"tableDiv",
  editingEnabled:true,
  hiddenFields:['OBJECTID']  
})

document.getElementById('clearBtn').addEventListener("click", ()=>{graphicsLayer.removeAll()});

const editor = new Editor({
  view:view
})

const checkbox = document.getElementById('checkboxId')

checkbox.onchange=()=>{toggle();}

function toggle(){
  if (checkbox.checked){
    view.ui.add(editor, 'top-right')
  } else {
    view.ui.remove(editor)
  }
}

