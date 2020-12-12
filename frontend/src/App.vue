<template>
  <div id="app" class="main-container">
    <Nav/>
    <router-view/>
    <Footer/>
  </div>
</template>

<script>
import Nav from '@/cmps/Nav.vue';
import Footer from './cmps/footer.vue';

export default {
  name: 'App',
  components: {
    Nav,
    Footer
  }
}
</script>

