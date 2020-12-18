<script>
// import { POINT_MARKER_ICON_CONFIG } from "google-maps-api-loader";
import router from "@/router";
import EventBus from "@/services/eventBus.js";

export default {
  components: {},
  props: {
    google: {
      type: Object,
      required: true,
    },
    map: {
      type: Object,
      required: true,
    },
    marker: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      currMarker: null,
    };
  },
  mounted() {
    this.currMarker = new this.google.maps.Marker({
      position: this.marker.position,
      marker: this.marker,
      label : { color: '#333', fontWeight: 'bold', fontSize: '16px', text: this.marker.name},
      infoWindow:'ddd',
      map: this.map,
      icon: require(`../assets/img/${this.selectIcon()}`),
    });
    this.currMarker.set('labelContent', this.currMarker.name);
    this.currMarker.addListener("click", function () {
      router.push(`/details/${this.marker.id}`);
      router.go();
    });
  
    this.currMarker.addListener("mouseover", function () {
      const markerId = this.marker.id;
      EventBus.$emit("setMainTravelMarker", parseInt(markerId));
    });
  },
  methods: {
      selectIcon(){
        switch(this.marker.type){
          case "Nature":
            return "markerNature.svg";
          case "Animal":
            return "markerAnimal.svg";
          case "Archiology":
            return "markerArcheo.svg";
          case "Urban":
            return "markerUrban.svg";
         default:
            return "marker.svg";
        }
      }
  },
};
</script>