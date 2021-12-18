<template>
  <div id="main" :class="{ 'is-component': isComponent }">
    <div class="main-cnt">
      <main-header></main-header>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>


  export default {
    name: 'app',
    computed: {
      isComponent() {
        return /^component-/.test(this.$route.name || '');
      }
    }
  };
</script>
