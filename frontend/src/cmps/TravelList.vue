<template>
    <section class="travel-list flex wrap align-center" v-if="travels" >
        <div v-for="travel in travels" :key="travel._id">
            <travel-preview :travel="travel" @setMainTravel="setMainTravel"/>
        </div>
    </section>
</template>

<script>
import TravelPreview from './TravelPreview.vue'

export default {
  components: { TravelPreview },
    name:'TravelList',
    props:{
        travels:Array
    },
    methods: {
        setMainTravel(travelId) {
          this.$emit('setMainTravel',travelId)
        }
    },
}
</script>