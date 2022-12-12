<template>
  <div class="row bg-white m-4 text-break elevation-5">
    <div>
      <router-link :to="{ name: 'Profile' }">
        <img class="img-fluid post-img my-2" :src="post.creator.picture" alt="">
      </router-link>
    </div>
    <h5>{{ post.creator.name }}</h5>
    <p>{{ post.body }}</p>
    <div>
      <img class="img-fluid" :src="post.imgUrl" alt="">
    </div>
  </div>
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted } from 'vue';
import { Post } from "../models/Post.js";
import { Account } from "../models/Account.js";
export default {
  props: {
    post: {
      type: Post,
      required: true
    },
  },
  setup() {
    return {
      account: computed(() => AppState.account)
    }
  }
};
</script>


<style lang="scss" scoped>
.post-card {
  background-position: center;
  background-size: cover;
  height: 10vh;
  width: 10vh;
}

.post-img {
  object-fit: cover;
  height: 10vh;
  width: 10vh;
}
</style>