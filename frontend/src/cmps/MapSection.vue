<template>
  <section>
    <GoogleMapsApiLoader
      class="google-map"
      ref="googleMap"
      :mapConfig="mapConfig"
      :apiKey="key"
      :streetView="true"
    />  </section>
</template>

<script>
import GoogleMapsApiLoader from "@/cmps/GoogleMapsApiLoader.vue";

export default {
  data() {
    return {
      key: "AIzaSyA7wFxeGayDFtxLfft53sDr7sMu9cj7Vio",
    };
  },
  computed: {
    mapConfig() {
      return {
        center: { lat: 32.109333, lng: 34.855499 },
        zoom: 10,
        mapTypeId: "terrain",
      };
    },
  },
  components: { GoogleMapsApiLoader },
};
</script>