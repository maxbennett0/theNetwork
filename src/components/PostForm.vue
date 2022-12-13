<template>
  <form @submit.prevent="createPost()" class="row justify-content-end">
    <div class="mb-3 col-3">
      <label for="" class="form-label">Write something for me plz</label>
      <input type="text" class="form-control" v-model="editable.body" name="" id="" aria-describedby="helpId"
        placeholder="">
      <small id="helpId" class="form-text text-muted">{{ editable.body }}</small>
    </div>
    <div class="mb-3 col-3">
      <label for="" class="form-label">link</label>
      <input type="text" class="form-control" v-model="editable.imgUrl" name="" id="" aria-describedby="helpId"
        placeholder="">
      <small id="helpId" class="form-text text-muted">{{ editable.imgUrl }}</small>
    </div>
    <button class="btn btn-primary">Submit</button>
  </form>
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted, ref } from 'vue';
import { logger } from "../utils/Logger.js";
import Pop from "../utils/Pop.js";
import { postsService } from "../services/PostsService.js";
export default {
  setup() {
    const editable = ref({})
    async function createPost() {
      try {
        await postsService.createPost(editable.value)
        editable = {}
      } catch (error) {
        logger.error(error)
        Pop.error(error.message)
      }
    }
    return {
      editable,
      createPost
    }
  }
};
</script>


<style lang="scss" scoped>

</style>