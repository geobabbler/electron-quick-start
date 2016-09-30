// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
/*     const {remote} = require('electron')
const {Menu, MenuItem} = remote

const menu = new Menu()
menu.append(new MenuItem({label: 'MenuItem1', click() { console.log('item 1 clicked') }}))
menu.append(new MenuItem({type: 'separator'}))
menu.append(new MenuItem({label: 'MenuItem2', type: 'checkbox', checked: true}))

window.addEventListener('contextmenu', (e) => {
  e.preventDefault()
  menu.popup(remote.getCurrentWindow())
}, false)*/

//require('./olfuncs.js');

function createMenu(){
  const {Menu} = require('electron').remote
  const {dialog} = require('electron').remote
  var remote = require('electron').remote
  var fs = remote.require('fs')
  //const {fs} = require('remote').require('fs')
const template = [
  {
    label: 'File',
    submenu: [
      {
        label: 'Open...',
        accelerator: 'CmdOrCtrl+O',
        click (item, focusedWindow) {
          var f = dialog.showOpenDialog({properties: ['openFile', 'multiSelections'], filters: [{name: 'GeoJSON Files', extensions: ['geojson']}]}, function(data){
              var p = data[0];
              //alert(p);
              if(fs){
              fs.readFile(p, function(err, data){
                if (err) {alert(err)}
                else{addLayer(data)}
              });
              }
              else{
                alert('huh?');
              }
          });
          
         
          /*fs.readFile(p, 'utf8', function (err, data) {
            if (err) return alert(err);
            alert(data);
            // data is the contents of the text file we just read
          });*/
        }
      },
/*      {
         label: 'Dump',
        accelerator: 'CmdOrCtrl+D',
        click (item, focusedWindow) {
          let c = mainWindow.webContents;
          console.log(c);
        }
      },
      {
        type: 'separator'
      },
      {
        role: 'cut'
      },
      {
        role: 'copy'
      },
      {
        role: 'paste'
      },
      {
        role: 'pasteandmatchstyle'
      },
      {
        role: 'delete'
      },
      {
        role: 'quit'
      }*/
    ]
  }
  ]

const menu = Menu.buildFromTemplate(template)
Menu.setApplicationMenu(menu)
}

function addLayer(geojsonData){
  var vS=new ol.source.GeoJSON(
	({
		"object": JSON.parse(geojsonData),
    projection: 'EPSG:3857'
	})
);
//alert(vS);
var vL= new ol.layer.Vector({source: vS, style: new ol.style.Style({stroke: new ol.style.Stroke({color: 'blue', width: 2})})});
map.addLayer(vL);
}



function styleFunction(feature) {
  alert(feature.getGeometry().getType());
  var styles = {
  'Point': new ol.style.Style({
    image: image
  }),
  'LineString': new ol.style.Style({
    stroke: new ol.style.Stroke({
      color: 'green',
      width: 1
    })
  }),
  'MultiLineString': new ol.style.Style({
    stroke: new ol.style.Stroke({
      color: 'green',
      width: 1
    })
  }),
  'MultiPoint': new ol.style.Style({
    image: image
  }),
  'MultiPolygon': new ol.style.Style({
    stroke: new ol.style.Stroke({
      color: 'yellow',
      width: 1
    }),
    fill: new ol.style.Fill({
      color: 'rgba(255, 255, 0, 0.1)'
    })
  }),
  'Polygon': new ol.style.Style({
    stroke: new ol.style.Stroke({
      color: 'blue',
      lineDash: [4],
      width: 3
    }),
    fill: new ol.style.Fill({
      color: 'rgba(0, 0, 255, 0.1)'
    })
  }),
  'GeometryCollection': new ol.style.Style({
    stroke: new ol.style.Stroke({
      color: 'magenta',
      width: 2
    }),
    fill: new ol.style.Fill({
      color: 'magenta'
    }),
    image: new ol.style.Circle({
      radius: 10,
      fill: null,
      stroke: new ol.style.Stroke({
        color: 'magenta'
      })
    })
  }),
  'Circle': new ol.style.Style({
    stroke: new ol.style.Stroke({
      color: 'red',
      width: 2
    }),
    fill: new ol.style.Fill({
      color: 'rgba(255,0,0,0.2)'
    })
  })
};

  return styles[feature.getGeometry().getType()];
};

createMenu();
