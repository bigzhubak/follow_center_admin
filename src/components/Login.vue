<template>
  <login v-on:login_done="go"> </login>
</template>

<script>
  import Login from 'bz-login'
  export default {
    props: [],
    components: {
      Login
    },
    data: function () {
      return {
      }
    },
    methods: {
      go: function () {
        this.$router.push('/')
      }
    }
  }
</script>

<style>
</style>
