<template>
  <section
    v-if="travelMain" class="travel-main flex column align-center justify-center" :class="travelMain.type">
    <img :src="travelMain.img" :alt="travelMain.name" />
    <h1>{{ travelMain.name }}</h1>
    <h2>{{ travelMain.title }}</h2>
    <div class="flex">
        <p>Dificulty Level: {{ travelMain.Level }}</p>
        <p>Duration: {{ travelMain.duration }} Hours</p>
        <p>Recomended Seasones: {{ travelMain.Level }}</p>
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