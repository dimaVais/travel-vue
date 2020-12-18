<template>
  <section class="page">
    <!-- <div class="flex align-center">
      <h2>LEGEND:</h2>
      <div class="flex wrap">
        <h2>Green - Nature</h2>
        <h2>Brown - Animal Watch</h2>
        <h2>Yellow - Archiology</h2>
        <h2>Gray - Urban</h2>
        <h2>Lightblue - General</h2>
      </div>
    </div> -->
    <div class="flex space-around">
      <div>
        <div class="flex column align-center">
          <travel-main :travelMain="travelMain" />
          <map-section :travels="travels" :mapMain="mapMain" :key="keyForMap" />
        </div>
      </div>
      <travel-list :travels="travels" @setMainTravel="setMainTravel" />
    </div>
  </section>
</template>

<script>
import MapSection from "@/cmps/MapSection.vue";
import TravelList from "@/cmps/TravelList.vue";
import { travelService } from "@/services/travelService.js";
import TravelMain from "../cmps/TravelMain.vue";
import EventBus from "@/services/eventBus.js";

export default {
  name: "TravelApp",
  components: {
    MapSection,
    TravelList,
    TravelMain,
  },
  data() {
    return {
      travels: [],
      travelMain: null,
      mapMain: {},
      keyForMap: null,
    };
  },
  async created() {
    await this.getTravels();
    EventBus.$on("setMainTravelMarker", (markerId) => {
      this.setMainTravel(markerId, true);
    });
  },
  methods: {
    async getTravels() {
      this.travels = await travelService.query();
      this.travelMain = this.travels[0];
    },

    async setMainTravel(travelId, isOnMap = false) {
      this.travelMain = await this.travels.find(
        (travel) => travel._id === travelId
      );
      if (!isOnMap && this.travelMain) {
        this.mapMain = this.travelMain;
        this.keyForMap = this.mapMain._id;
      } else {
        this.keyForMap = this.mapMain._id;
      }

      if (!this.travelMain) {
        this.travelMain = this.travels[0];
      }
    },
  },
};
</script>>

