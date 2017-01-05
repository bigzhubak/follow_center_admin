<style >
</style>

<template>
  <div class="ui container">
    <bz-rich-text v-model="rich_text" @save="save">
    </bz-rich-text>
  </div>
</template>

<script>
  import toastr from 'toastr'
  import BzRichText from 'bz-rich-text'
  export default {
    props: [],
    components: {
      BzRichText
    },
    computed: {
      rich_text: function () {
        return this.$store.state.p.rich_text
      },
      id: function () {
        return this.$route.params.id
      }
    },
    data: function () {
      return {
      }
    },
    mounted () {
      if (this.id) {
        this.$store.dispatch('getRichText', {id: this.id})
      } else {
        this.$store.commit('CLEAN_RICH_TEXT')
      }
    },
    methods: {
      save: function () {
        toastr.info('保存完毕!')
      }
    }
  }
</script>
