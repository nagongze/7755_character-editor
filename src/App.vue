<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'jfOpenHuninn', 'Microsoft JhengHei', Arial, sans-serif;
  background: linear-gradient(135deg, #ffffff 0%, #fa8fc5 100%);
  min-height: 100vh;
}

#app {
  min-height: 100vh;
}

.el-icon {
  margin: 0.25rem;
}

.el-button {
  word-break: word-break;
}

</style>
