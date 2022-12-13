<template>
  <div class="row bg-white m-4 text-break elevation-5">
    <div>
      <router-link :to="{ name: 'Profile', params: { profileId: post?.creatorId } }">
        <img class="img-fluid post-img my-2" :src="post.creator.picture" alt="">
      </router-link>
    </div>
    <h5>{{ post.creator.name }}</h5>
    <p>{{ post.body }}</p>
    <div>
      <img class="img-fluid" :src="post.imgUrl" alt="">
    </div>
    <button class="btn btn-primary" @click.prevent="createLikes">
      {{ post.likeIds.length }}
    </button>
    <h6>{{ new Date(post.createdAt).toLocaleDateString() }}</h6>
    <button v-if="(post.creatorId == account.id)" @click="removePost(post.id)"
      class="btn btn-danger delete-btn rounded-pill"><i class="  px-2 mdi mdi-delete-forever"></i></button>
  </div>
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted } from 'vue';
import { Post } from "../models/Post.js";
import { Account } from "../models/Account.js";
import { postsService } from "../services/PostsService.js";
export default {
  props: {
    post: {
      type: Post,
      required: true
    },
  },
  setup(props) {
    return {
      async createLikes() {
        await postsService.createLikes(props.post.id)
      },
      async removePost() {
        await postsService.removePost(props.post.id)
      },
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