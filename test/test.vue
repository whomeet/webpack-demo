<template>
  <div class="example">
    {{ msg }}
    <p>Webpack demo test!!!!</p>
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
  color: red;
}
</style>