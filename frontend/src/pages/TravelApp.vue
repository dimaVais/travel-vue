<template>
  <section class="page">
    <div class="flex space-around">
      <map-section />
      <div>
        <div class="flex column align-center">
          <!-- <div class="flex column align-center">
            <h2>LEGEND:</h2>
            <div class="flex wrap">
              <h2>Green - Nature</h2>
              <h2>Brown - Animal Watch</h2>
              <h2>Yellow - Archiology</h2>
              <h2>Gray - Urban</h2>
              <h2>Lightblue - General</h2>
            </div>
          </div> -->
          <travel-main :travelMain="travelMain" />
          <travel-list :travels="travels" @setMainTravel="setMainTravel" />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import MapSection from "@/cmps/MapSection.vue";
import TravelList from "@/cmps/TravelList.vue";
import { travelService } from "@/services/travelService.js";
import TravelMain from "../cmps/TravelMain.vue";

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
    };
  },
  async created() {
    await this.getTravels();
  },
  methods: {
    async getTravels() {
      this.travels = await travelService.query();
    },
    setMainTravel(travelId) {
      this.travelMain = this.travels.find((travel) => travel.id === travelId);
    },
  },
};
</script>>

