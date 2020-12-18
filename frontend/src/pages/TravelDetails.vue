<template>
  <section class="page flex justify-center align-center">
    <button class="move-btn prev" @click="getAnotherTravel('Prev')"></button>

    <div v-if="travel" class="details-page flex column align-center">
      <h1 :class="travel.type">{{ travel.name }}</h1>
      <div class="img-box flex column align-center justify-center"  :class="travel.type">
        <img :src="travel.img" :alt="travel.name" />
      </div>
      <h2>{{ travel.title }}</h2>
      <h3><font-awesome-icon :icon="['fas', 'users']" />(Difficulty level) - {{ travel.Level }}</h3>
      <h3><font-awesome-icon :icon="['fas', 'clock']" />(Duration) - {{ travel.duration }} Hours</h3>
      <h3><font-awesome-icon :icon="['fas', 'cloud-sun-rain']"/>(Recomanded Seasone) - {{ travel.seasone }}</h3>
       <h3>
          <font-awesome-icon :icon="['fas', 'map-marked-alt']" /> (Location) -  <h3> latitude:
              {{ travel.location.lat }}, longtitude: {{ travel.location.lng }}  </h3>
      </h3>
      <pre>{{ travel.description }}</pre>
      <router-link to="/"> <button class="back-btn"><img src="@/assets/img/back.svg"/></button> </router-link>
    </div>

    <button class="move-btn next" @click="getAnotherTravel('Next')"></button>
  </section>
</template>

<script>
import { travelService } from "@/services/travelService.js";

export default {
  name: "TravelDeails",
  data() {
    return {
      travel: null,
    };
  },
  async created() {
    let travelId = this.$route.params.id;
    this.travel = await travelService.getById(travelId);
  },
  methods: {
    getAnotherTravel(direction) {
        let travelId = '';
        if (direction==="Next"){
            travelId = travelService.getNextId(this.travel._id);
            console.log('travelId',travelId);
        } else if (direction==="Prev"){
            travelId = travelService.getPrevId(this.travel._id);
        }
        this.$router.push(`/details/${travelId}`);
        this.$router.go();
    }, 
  },
};
</script>