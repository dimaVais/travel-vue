<template>
  <section class="main-container full nav-box">
    <div class="page nav-main flex align-center space-around">
      <h1 class="main-header">WELCOME TO TRAVELVUE</h1>
      <div class="homebox flex justify-center">
        <router-link to="/"> <button class="home-btn">🌎</button></router-link>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "Nav",
};
</script>