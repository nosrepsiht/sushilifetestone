import React, { useEffect, useState } from 'react'
import Feature from 'ol/Feature.js';
import Geolocation from 'ol/Geolocation.js';
import Map from 'ol/Map.js';
import Point from 'ol/geom/Point.js';
import View from 'ol/View.js';
import {fromLonLat, transform} from 'ol/proj.js';
import {Circle as CircleStyle, Icon, Fill, Stroke, Style} from 'ol/style.js';
import {OSM, Vector as VectorSource} from 'ol/source.js';
import {Layer, Tile as TileLayer, Vector as VectorLayer} from 'ol/layer.js';
import axios from 'axios';
import GlobalVars from '../globalVariables/GlobalVars'
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const MapDetails = () => {
  
    const {t, i18n } = useTranslation()
        const locales = {
            en: {title: 'English'},
            ru: {title: 'Русский'},
            uz: {title: 'O\'zbek'}
        }

    // const [orderLocation, setOrderLocation] = useState([])

        let map;
        let view;
        let geolocation;
        let coordinates2;
        useEffect(()=>{

            view = new View({
              center: fromLonLat([69.275128, 41.311220]),
              zoom: 18,
            })
        
            map = new Map({
              layers: [
                new TileLayer({
                  source: new OSM(),
                }),
              ],
              target: 'map',
              view: view,
            })
        
            geolocation = new Geolocation({
              // enableHighAccuracy must be set to true to have the heading value.
              trackingOptions: {
                enableHighAccuracy: true,
              },
              projection: view.getProjection(),
            })
        
            geolocation.setTracking(true)
            // console.log(fromLonLat([69.275128, 41.311220]))
            // console.log(geolocation.getPosition())
            // view.centerOn(fromLonLat([69.275128, 41.311220]), map.getSize(), [570, 500])
        
            function el(id) {
              return document.getElementById(id)
            }
        
            if (el('track') != null) {
              el('track').addEventListener('change', function () {
                geolocation.setTracking(this.checked)
              })
            }
        
            // update the HTML page when the position changes.
            geolocation.on('change', function () {
              
              // console.log("pos: " + geolocation.getPosition())
              // view.centerOn(fromLonLat([69.275128, 41.311220]), [0,0], [0,0])
              // view.centerOn(geolocation.getPosition(), [0,0], [0,0])
        
        
              // el('accuracy').innerText = geolocation.getAccuracy() + ' [m]'
              // el('altitude').innerText = geolocation.getAltitude() + ' [m]'
              // el('altitudeAccuracy').innerText = geolocation.getAltitudeAccuracy() + ' [m]'
              // el('heading').innerText = geolocation.getHeading() + ' [rad]'
              // el('speed').innerText = geolocation.getSpeed() + ' [m/s]'
            })
        
            // handle geolocation error.
            geolocation.on('error', function (error) {
              // const info = document.getElementById('info')
              // info.innerHTML = error.message;
              // info.style.display = ''
            })
        
            const accuracyFeature = new Feature();
            geolocation.on('change:accuracyGeometry', function () {
              // accuracyFeature.setGeometry(geolocation.getAccuracyGeometry())
            })
        
            const positionFeature = new Feature();
            positionFeature.setStyle(
              new Style({
                image: new CircleStyle({
                  radius: 6,
                  fill: new Fill({
                    color: '#3399CC',
                  }),
                  stroke: new Stroke({
                    color: '#fff',
                    width: 2,
                  }),
                }),
              })
            )

            const fetchLocation = async ()=>{
              const res = await axios.delete(GlobalVars.backend_server + "/getOrder/" + window.location.pathname.split("/").pop())
              // console.log(res.data[0][0])
              // setOrderLocation(res.data[0][0])
            
            // console.log(res.data[0][0].locationX)
            coordinates2 = fromLonLat([res.data[0][0].locationY, res.data[0][0].locationX])
            positionFeature2.setGeometry(coordinates2 ? new Point(coordinates2) : null)
            // console.log("Red: " + map.getEventCoordinate(event))
            // console.log("Blue: " + geolocation.getPosition())

            view.centerOn(fromLonLat([res.data[0][0].locationY, res.data[0][0].locationX]), [0,0], [0,0])

            new VectorLayer({
                map: map,
                source: new VectorSource({
                  features: [positionFeature2]
                })
              })

            }

            fetchLocation()
        
            geolocation.on('change:position', function () {
              const coordinates = geolocation.getPosition();
              // console.log(geolocation.getPosition())
              positionFeature.setGeometry(coordinates ? new Point(coordinates) : null)
            })
        
            new VectorLayer({
              map: map,
              source: new VectorSource({
                features: [accuracyFeature, positionFeature],
              }),
            })
        }, [])

        const positionFeature2 = new Feature();
        positionFeature2.setStyle(
            new Style({
            image: new CircleStyle({
                radius: 6,
                fill: new Fill({
                color: '#FFFF00',
                }),
                stroke: new Stroke({
                color: '#000',
                width: 2,
                }),
            }),
            })
        )

        return (
            <div>
                <h1 style={{textAlign: "center"}}>{t('map')}</h1>
                <div id="map" className="map" style={{width: "100%", height: "400px"}}></div>
                {/* <div id="info"></div>
                <label htmlFor="track">
                  track position hehe2
                  <input id="track" type="checkbox"/>
                </label>
                <p>
                  position accuracy : <code id="accuracy"></code>&nbsp;&nbsp;
                  altitude : <code id="altitude"></code>&nbsp;&nbsp;
                  altitude accuracy : <code id="altitudeAccuracy"></code>&nbsp;&nbsp;
                  heading : <code id="heading"></code>&nbsp;&nbsp;
                  speed : <code id="speed"></code>
                </p> */}
                {/* <button onClick={showMyPosition}>{t('show_my_location')}</button>
                <button onClick={()=> {sendMyLocation("blue")}}>{t('send_blue_location')}</button>
                <button onClick={()=> {sendMyLocation("red")}}>{t('send_red_location')}</button> */}
            </div>
        )
}

export default MapDetails