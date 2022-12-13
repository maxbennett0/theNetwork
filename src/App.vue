<template>
  <header>
    <Navbar />
  </header>
  <main>
    <router-view />
    <!--TODO throw in some ads here  -->
    <div class="col-2 bg-white sidebar elevation-5">
      <Banner v-for="b in banner" :banner="b" />
    </div>
  </main>
</template>

<script>
import { computed, onMounted } from 'vue'
import { AppState } from './AppState'
import { bannersService } from "./services/BannersService.js";
import Navbar from './components/Navbar.vue'
import Banner from "./components/Banner.vue";

export default {
  setup() {
    async function getBanners() {
      try {
        await bannersService.getBanners()
      } catch (error) {
        logger.error(error)
        Pop.error(error.message)
      }
    }
    onMounted(() => getBanners())
    return {
      appState: computed(() => AppState),
      banner: computed(() => AppState.banners)
    }
  },
  components: { Navbar, Banner }
}
</script>
<style lang="scss">
@import "./assets/scss/main.scss";

:root {
  --main-height: calc(100vh - 32px - 64px);
}


footer {
  display: grid;
  place-content: center;
  height: 32px;
}
</style>
