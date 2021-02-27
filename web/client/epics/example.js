import axios from "../libs/ajax";
import Rx from "rxjs";
import {ASK_FOR_VERSION,setVersion,setannot} from "../actions/example";
import {CLICK_ON_MAP} from '../actions/map';
import {drawingFeatures} from '../actions/draw';
import {CHANGE_DRAWING_STATUS} from '../actions/draw';

import {reproject, reprojectBbox, normalizeLng, normalizeSRS} from '../utils/CoordinatesUtils';



export const askVersion = actions$ => actions$
    .ofType(ASK_FOR_VERSION)
    .debounceTime(500)
    .switchMap( () =>
        Rx.Observable.defer( () => axios.get('version.txt'))
            .switchMap(response => Rx.Observable.of(setVersion(response.data)))
    );




// export const tesst = actions$ => actions$
//   .ofType(CHANGE_DRAWING_STATUS)
//   .switchMap(() =>
//     Rx.Observable.defer(() => axios.get('version.txt'))
//       .switchMap(response => Rx.Observable.of(setVersion(response.data)))
//   );


export const SelectByRectangle = (action$,store) =>
action$.ofType(CHANGE_DRAWING_STATUS)
.switchMap(({status,
  method,
  owner,
  features,
  options,
  style}) => {


    // const coords = reproject(features[0].extent, "EPSG:3857", "EPSG:4326");

    var ext = features[0].extent
    var coords = {
      x1:reproject([ext[0],ext[1]], "EPSG:3857", "EPSG:4326").x,
      y1:reproject([ext[0],ext[1]], "EPSG:3857", "EPSG:4326").y,
      x2:reproject([ext[2],ext[3]], "EPSG:3857", "EPSG:4326").x,
      y2:reproject([ext[2],ext[3]], "EPSG:3857", "EPSG:4326").y
    }


    // var newarray = ext.map(myFunction)
    // var t = []
    // function myFunction(num) {
    //   console.log(reproject(num, "EPSG:3857", "EPSG:4326"))
    //   return "w"
    // }

    // const projectionExtent = reprojectBbox(projectionExtent, "EPSG:3857", "EPSG:4326");

    // console.log(newarray)
    // console.log(projectionExtent)

    return Rx.Observable.of(setannot(coords))
  })


export const onMapClicks = (action$, store) =>

    action$.ofType(CLICK_ON_MAP)
        .switchMap(({point, layer}) => {
            //const projection = projectionSelector(store.getState());
            let ggg = [
                {
                  type: 'Feature',
                  geometry: {
                    coordinates: [
                      point.latlng.lng,
                      point.latlng.lat
                    ],
                    type: 'Point'
                  },
                  properties: {
                    id: '4be0d070-5feb-11eb-98f1-dbfb226d7aee',
                    isValidFeature: false,
                    canEdit: true
                  }
                }
              ]

            return Rx.Observable.of(setVersion(point.latlng))
            // return Rx.Observable.of(featureInfoClick(updatePointWithGeometricFilter(point, projection), layer), cancelSelectedItem())
                // .merge(Rx.Observable.of(addPopup(uuid(),
                //     { component: IDENTIFY_POPUP, maxWidth: 600, position: {  coordinates: point ? point.rawPos : []}}))
                //     .filter(() => isMapPopup(store.getState()))
                // );
        });
    