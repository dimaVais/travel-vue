<template>
  <router-link :to="`/details/${travel._id}`">
    <div
      v-if="travel"
      class="travel-prev flex column align-center justify-center"
      :class="travel.type"
      @mouseenter="setMainTravel(travel._id)"
    >
      <div class="inner-box flex column align-center">
        <img :src="travel.img" :alt="travel.name" />
        <div class="bg-name flex column align-center">
            <h2>{{ travel.name }}</h2>
        </div>
      </div>
    </div>
  </router-link>
</template>

<script>
export default {
  props: {
    travel: Object,
  },
  methods: {
    setMainTravel(showTravel) {
      this.$emit("setMainTravel", showTravel);
    },
  },
};
</script>