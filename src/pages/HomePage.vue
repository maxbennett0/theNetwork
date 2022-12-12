<template>
  <div class="container-fluid">
    <section class="row">
      <div class="col-2 sidebar bg-white elevation-5 d-flex flex-column justify-content-start">
        <div>
          <div>
            <router-link :to="{ name: 'Profile' }">
              <img class="img-fluid p-2" :src="account.picture" alt="">
            </router-link>
          </div>
          <h6 class="text-grey text-wrap">{{ account.class }}</h6>
          <h6 class="text-break">{{ account.name }}</h6>
        </div>
        <div class="selectable p-2">
          <p>
            <i class="mdi mdi-github"></i>
            {{ account.github }}
          </p>
        </div>
        <div class="selectable p-2">
          <p>
            <i class="mdi mdi-linkedin"></i>
            {{ account.linkedin }}
          </p>
        </div>
        <div class="selectable p-2">
          <p>
            <i class="mdi mdi-note"></i>
            {{ account.resume }}
          </p>
        </div>
      </div>
      <div class="col-8">
        <PostCard v-for="p in post" :post="p" />
      </div>
      <div class="col-2 bg-white sidebar elevation-5">
        <Banner v-for="b in banner" :banner="b" />
      </div>
    </section>
  </div>
</template>

<script>
import { logger } from "../utils/Logger.js";
import { postsService } from "../services/PostsService.js"
import { bannersService } from '../services/BannersService.js'
import { AppState } from "../AppState.js";
import Pop from "../utils/Pop.js";
import { onMounted, computed } from "vue";
import PostCard from '../components/PostCard.vue'
import Banner from "../components/Banner.vue";

export default {
  setup() {
    async function getPosts() {
      try {
        await postsService.getPosts()
      } catch (error) {
        logger.error(error)
        Pop.error(error.message)
      }
    }
    async function getBanners() {
      try {
        await bannersService.getBanners()
      } catch (error) {
        logger.error(error)
        Pop.error(error.message)
      }
    }
    onMounted(() =>
      getPosts()
    ),
      onMounted(() =>
        getBanners()
      )
    return {
      post: computed(() => AppState.posts),
      account: computed(() => AppState.account),
      banner: computed(() => AppState.banners)
    }
  },
  components: { PostCard, Banner }
}
</script>

<style scoped lang="scss">
.home {
  display: grid;
  height: 80vh;
  place-content: center;
  text-align: center;
  user-select: none;

  .home-card {
    width: 50vw;

    >img {
      height: 200px;
      max-width: 200px;
      width: 100%;
      object-fit: contain;
      object-position: center;
    }
  }
}

.sidebar {
  min-height: 100%;
}
</style>
