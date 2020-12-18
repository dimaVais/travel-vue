<template>
  <section v-if="travelMain" class="travel-main flex column align-center justify-center">
    <div class="innerbox flex column align-center justify-center" :class="travelMain.type">
      <img :src="travelMain.img" :alt="travelMain.name" />
      <h1>{{ travelMain.name }}</h1>
      <h2>{{ travelMain.title }}</h2>
      <div class="icon-data flex space-between">
          <p> <font-awesome-icon :icon="['fas', 'users']" /> - {{ travelMain.Level }}</p>
          <p> <font-awesome-icon :icon="['fas', 'clock']" /> - {{ travelMain.duration }} Hours</p>
          <p> <font-awesome-icon :icon="['fas', 'cloud-sun-rain']"/> - {{ travelMain.seasone }}</p> 
      </div>
    </div>
  </section>
</template>

<script>

export default {
  props: {
    travelMain: Object,
  },
};
</script>