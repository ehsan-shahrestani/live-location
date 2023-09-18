import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import * as LeafLet from 'leaflet';
import { Icon, icon, latLng, LatLng, marker, Marker, Popup, tileLayer } from "leaflet";
import { interval } from 'rxjs';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [CommonModule, LeafletModule],
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  map!: LeafLet.Map
  options = {
    layers: [
      tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' })
    ],
    zoom: 15,
    center: latLng(36.35814694040165, 59.47124607890206)
  };
  markerOption = {
    icon: icon({
      ...Icon.Default.prototype.options,
      iconUrl: 'assets/dot-23.svg',
      // iconUrl: 'assets/location-29.svg',
      iconSize: [50, 50],
      iconAnchor: [25, 35],
      iconRetinaUrl: undefined,
      shadowUrl: undefined,
      shadowRetinaUrl: undefined
    })
  }

  layer!: Marker;

  locations: LatLng[] = []
  currentLocation: string = ''
  ngOnInit(): void {
    this.getCurrentLocation()

    setInterval(() => {

      this.getCurrentLocation()
    }, 1000);





  }


  onMapReady(map: LeafLet.Map) {

    this.map = map;
    
  }
  addMarker(data: any) {
    // this.currentLocation  = `${data.latlng.lat}, ${data.latlng.lng}`
    let lat = data.latlng.lat
    let lng = data.latlng.lng
    // marker([lat, lng], this.markerOption).addTo(this.map)
  }



  getCurrentLocation() {
    // console.log('get lo');
    // marker([36.35814694040165, 59.47124607890206], this.markerOption).addTo(this.map)


    // get current location with Gps
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.currentLocation = `${position.coords.latitude}, ${position.coords.longitude}`
        let markera = marker([position.coords.latitude, position.coords.longitude], this.markerOption).addTo(this.map)

      },
        error => {
          // window.alert("دسترسی به موقعیت شما امکان پذیر نمی باشد. لطفا روی نقشه مکان خود را مشخص کنید")
          // console.log(error.message);
        })
    } else {
      window.alert("No support for geolocation");
      console.log("No support for geolocation")
    }



  }


  saveCurrentLoaction(lat: number, lng: number) {
    console.log(latLng(lat, lng));

    console.log(this.locations.includes(latLng(lat, lng)));

    if (!this.locations.includes(latLng(lat, lng))) {
      this.locations.push(latLng(lat, lng));
    }
    localStorage.setItem('locations', JSON.stringify(this.locations))
  }
}
