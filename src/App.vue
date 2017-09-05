<template>
  <div id="main">
    <v-header></v-header>
    <router-view></router-view>
  </div>
</template>

<script>
import Header from '@/components/common/header/index';
export default {
  data() {
    return {
    }
  },
  components: {
    'v-header': Header
  },
}
</script>


