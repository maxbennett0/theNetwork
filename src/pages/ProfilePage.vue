<template>
  <div class="container-fluid">
    <div v-if="profile" class="row cover-img" :style="`background-image: url(${profile.coverImg})`">
      <div class="col-12 d-flex align-items-center justify-content-around">
        <img :src="profile.picture" alt="" class="img-fluid profile-picture rounded-circle elevation-5">
        <div class="bg-transparent rounded elevation-5 p-5">
          <h1 class="elevation-1">
            {{ profile.name }}
          </h1>
          <h2>
            {{ profile.bio }}
          </h2>
        </div>
      </div>
    </div>
    <div class="row">
      <div v-for="p in post" class="col-md-4 col-12 p-4">
        <PostCard :post="p" />
      </div>
      <button class="btn btn-primary" @click="pages(previousPage)">Previous Page</button>
      <button class="btn btn-primary" @click="pages(nextPage)">Next Page</button>
    </div>
  </div>
</template>


<script>

import { AppState } from '../AppState';
import { logger } from "../utils/Logger.js";
import Pop from "../utils/Pop.js";
import { profilesService } from '../services/ProfilesService.js'
import { postsService } from "../services/PostsService.js";
import { computed, reactive, onMounted, ref } from 'vue';
import { Post } from "../models/Post.js";
import PostCard from "../components/PostCard.vue";
import { useRoute } from "vue-router";
import { Account } from "../models/Account.js";

export default {
  props: {
    // post: {
    //   type: Post,
    //   required: true
    // },
    // profile: {
    //   type: Account,
    //   required: true
    // }
  },
  setup(props) {
    const route = useRoute()

    async function getPageById() {
      try {
        await postsService.getPageById(route.params.profileId)
      } catch (error) {
        logger.error(error)
        Pop.error(error.message)
      }
    }

    async function getProfileById() {
      try {
        await profilesService.getProfileById(route.params.profileId)
      } catch (error) {
        logger.error(error)
        Pop.error(error.message)
      }
    }
    async function getPageById() {
      try {
        await profilesService.getPageById(route.params.profileId)
      } catch (error) {
        logger.error(error)
        Pop.error(error.message)
      }
    }
    onMounted(() => {
      getProfileById(),
        getPageById()
    })
    return {

      async pages(url) {
        try {
          await postsService.pages(url)
        } catch (error) {
          logger.error(error)
          Pop.error(error.message)
        }
      },
      profile: computed(() => AppState.activeProfile),
      post: computed(() => AppState.posts),
      account: computed(() => AppState.account),
      nextPage: computed(() => AppState.nextPage),
      previousPage: computed(() => AppState.previousPage)
    };
  },
  // components: { PostCard }
};
</script>


<style lang="scss" scoped>

</style>