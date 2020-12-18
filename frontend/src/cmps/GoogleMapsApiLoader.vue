<template>
  <div>
    <div class="google-map" ref="googleMap">
      <slot v-if="this.google && this.map" @click="setMainTravel">
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
        :options="infoOptions"
        :position="infoWindowPos"
        :opened="infoWinOpen"
        @closeclick="infoWinOpen=false"
      > -->
      </slot>
    </div>
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
    travels: Array,
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
      markers: [],
    };
  },
  comouted: {},
  async mounted() {
    this.markers = this.travels.map((travel) => {
      return {
        id: travel._id.toString(),
        position: { lat: travel.location.lat, lng: travel.location.lng },
        name: travel.name,
        img: travel.img,
        type: travel.type
      };
    });
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
    },
    setMainTravel(showTravel) {
      console.log("mouseMoved", showTravel);
      this.$emit("setMainTravel", showTravel);
    },
  },
};
</script>