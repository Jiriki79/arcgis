require([
    "esri/config",
     "esri/Map",
     "esri/views/MapView",
     "esri/layers/FeatureLayer"
   ], function (esriConfig,Map, MapView,FeatureLayer) {

     esriConfig.apiKey = "AAPK4cf070f48d9447b2af48df14234fb1c1iQX7jgpsU_O_g6eHZ7JOvND6f5_H5aiAembWWExxH_7g1-pPgwzqDxd8MJe2N5JZ";
     const map = new Map({
       basemap: "arcgis-topographic" // Basemap layer
     });

     const view = new MapView({
       map: map,
       center: [-97.305923,37.679377],
       zoom: 10, // scale: 72223.819286
       container: "viewDiv"
     });
     const popupTrails = {
        title: "Trail Information",
        content: [{
         type: "media",
          mediaInfos: [{
            type: "column-chart",
            caption: "",
            value: {
              fields: [ "place_name","ObjectID" ],
              normalizeField: null,
              tooltipField: "test"
              }
            }]
        }]
      };
      const popupOpenspaces = {
        "title": "test",
        "content": [{
          "type": "fields",
          "fieldInfos": [
            {
              "fieldName": "place_name",
              "label": "location name",
              "isEditable": true,
              "tooltip": "",
              "visible": true,
              "format": null,
              "stringFieldOption": "text-box"
            },
            {
              "fieldName": "ObjectId",
              "label": "ID",
              "isEditable": true,
              "tooltip": "",
              "visible": true,
              "format": null,
              "stringFieldOption": "text-box"
            }
          ]
        }]
      };

     const Content = {
        "title": "API Test",
        "content": "<b>ID:</b> {ObjectID}<br><b>Location:</b> {place_name}<br>"
      }
     const MyLayer = new FeatureLayer({
        url: "https://services8.arcgis.com/TrLhDuWxkcSkFAjt/arcgis/rest/services/api_test/FeatureServer/0",
        outFields: ["place_name",'ObjectID'],
        popupTemplate: popupOpenspaces
      });
      map.add(MyLayer);

   });