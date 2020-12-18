<template>
  <section v-if="travels.length > 0">
    <GoogleMapsApiLoader
      class="google-map"
      ref="googleMap"
      :mapConfig="mapConfig"
      :apiKey="key"
      :streetView="true"
      :travels="travels"
    />
  </section>
</template>

<script>
import GoogleMapsApiLoader from "@/cmps/GoogleMapsApiLoader.vue";

export default {
  props: {
    travels: Array,
    mapMain: Object,
  },
  data() {
    return {
      key: "AIzaSyA7wFxeGayDFtxLfft53sDr7sMu9cj7Vio",
    };
  },
  computed: {
    mapConfig() {
      return {
        center: (Object.keys(this.mapMain).length >0) ?this.mapMain.location: { lat: 31.4, lng: 34.855499 },
        zoom:  (Object.keys(this.mapMain).length >0) ? 12 : 7,
        mapTypeId: "terrain",
      };
    },
  },
  components: { GoogleMapsApiLoader },
  methods: {
    setMainTravel(showTravel) {
      this.$emit("setMainTravel", showTravel);
    },
  },
};
</script>