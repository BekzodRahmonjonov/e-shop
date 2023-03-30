<template>
  <q-layout view="hHh lpR fFr">
    <c-header />


    <q-page-container>
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script>
import CHeader from 'src/components/CHeader.vue'
export default {
  components: { CHeader },
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Ubuntu');
* {
    -webkit-box-sizing: border-box;
            box-sizing: border-box;
    margin: 0;
    padding: 0;
}


body {
    font-family: 'Ubuntu', sans-serif;
}
</style>