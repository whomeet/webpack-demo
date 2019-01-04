<template>
  <div class="example">
    {{ msg }}
    <p>Vue Loader!!!!</p>
    <p :class="$style.green">CSS Modules</p>
  </div>
</template>

<script>
export default {
  data () {
    return {
      msg: 'Hello world!'
    }
  }
}
</script>

<style>
p {
  color: blue;
}
</style>

<style module>
.green {
  color: green;
}
.p {
  color: #ff6633;
}
</style>

<style scoped>
div {
  color: red;
}
</style>