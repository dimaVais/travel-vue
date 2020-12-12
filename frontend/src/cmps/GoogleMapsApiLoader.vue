<template>
  <div>
    <div class="google-map" ref="googleMap"></div>
    <template v-if="this.google && this.map">
      <GoogleMapMarker
        v-for="marker in markers"
        :key="marker.id"
        :marker="marker"
        :label="marker.lable"
        :google="google"
        :map="map"
      >
      </GoogleMapMarker>
      <!-- <gmap-info-window
        @closeclick="windowOpen"
        :opened="windowOpen"
        position="{ lat: 32,lng: 35 }"
      >
        Hello world!
      </gmap-info-window> -->
    </template>
  </div>
</template>

<script>
import GoogleMapsApiLoader from "google-maps-api-loader";
import GoogleMapMarker from "@/cmps/GoogleMapMarker.vue";

export default {
  name: "GoogleMapsApiLoader",
  props: {
    mapConfig: Object,
    apiKey: String,
  },
  components: {
    GoogleMapMarker,
  },
  data() {
    return {
      google: null,
      map: null,
      // infowindow: null,
      // windowOpen: false,
      markers: [
        { id: "a", position: { lat: 32, lng: 34 }, lable: "ddd" },
        { id: "b", position: { lat: 32, lng: 35 }, lable: "aaa" },
        { id: "c", position: { lat: 32, lng: 36 }, lable: "bbb" },
      ],
    };
  },
  comouted: {
  },
  async mounted() {
    const googleMapApi = await GoogleMapsApiLoader({
      apiKey: this.apiKey,
    });
    this.google = googleMapApi;
    this.initializeMap();
  },
  methods: {
    initializeMap() {
      const mapContainer = this.$refs.googleMap;
      this.map = new this.google.maps.Map(mapContainer, this.mapConfig);
    }
  },
};
</script>