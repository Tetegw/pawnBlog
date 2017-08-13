<template>
  <div id="main">
    <v-header></v-header>
    <router-view></router-view>
  </div>
</template>

<script>
import Header from './components/A_header/header.vue';
export default{
  data(){
    return {
    }
  },
  components:{
    'v-header': Header
  },
}
</script>

