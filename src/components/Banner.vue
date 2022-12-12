<template>
  <section class="row my-5">
    <div>
      <img class="img-fluid" :src="banner.tall" alt="">
    </div>
  </section>
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted } from 'vue';
import { Banner } from "../models/Banner.js";
export default {
  props: {
    banner: {
      type: Banner
    }
  },
  setup() {
    return {}
  }
};
</script>


<style lang="scss" scoped>

</style>