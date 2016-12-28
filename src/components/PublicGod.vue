<template>
  <div class="ui main container">
    <div class="ui stackable grid">
      <div class="row">
        <div class="four wide column top-margin">
          <cat route_name="PublicGod">
          </cat>
        </div>
        <div class="twelve wide column no-padding-bz">
          <div v-show="not_my_gods.length === 0 && no_more && !loading && stat!=='adding'" class="ui icon message">
            <i class="notched circle loading icon"></i>
            <div class="content">
              <div v-show="$route.params.cat!=='recommand'" class="header">
                {{$route.params.cat}}缺货了
              </div>
              <div v-show="$route.params.cat==='recommand'" class="header">
                你全关注完了？猛!
              </div>
              <p>要不你来加一个?</p>
            </div>
          </div>
          <god-item v-for="god in not_my_gods" :god="god" class="god-item">
            <div class="ui toggle checkbox">
              <input :checked = "god.is_public == 1 || god.is_public == 2" @click="togglePublic(god)" type="checkbox" name="public" >
              <label></label>
            </div>
            <select v-model="god.cat">
              <option>18+</option>
              <option>{{god.cat}}</option>
              <option v-for="cat in cats">{{cat.cat}}</option>
            </select>
            <div class="ui mini input">
              <input @keyup.13="changeCat(god)" v-model="god.cat" type="text">
            </div>
            <a :href="'https://follow.center/God/'+god.name" target="_blank">{{god.name}}</a>
          </god-item>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'
  import $ from 'jquery'
  import GodItem from './GodItem'
  import Cat from './Cat'
  import BottomLoader from 'bz-bottom-loader'

  export default {
    props: {
      message: {
        type: Object
      }
    },
    components: {
      Cat,
      GodItem,
      BottomLoader
    },
    directives: {
    },
    data: function () {
      return {
        no_more: false,
        god_name: '',
        input_name: '',
        stat: 'button'
      }
    },
    watch: {
      '$route.params': {
        handler: function () {
          this.getGods()
          this.stat = 'button'
        },
        deep: true
      }
    },
    mounted () {
      this.getGods()
      $('body').visibility()
    },
    computed: {
      cats: function () {
        return this.$store.state.cats
      },
      loading () {
        return this.$store.state.p.loading
      },
      not_my_gods () {
        if (this.$store.state.cat_gods[this.$route.params.cat]) {
          return this.$store.state.cat_gods[this.$route.params.cat]
        } else {
          return []
        }
      },
      href: function () {
        if (this.message.m_type === 'github') {
          return `https://github.com/${this.message.name}`
        }
        return this.message.href
      },
      god_info: function () {
        let god_info = this.$store.state.god_infos[this.message.user_name.toLowerCase()]
        if (god_info) {
          return god_info
        }
        return {god_id: 0}
      },
      avatar: function () {
        var avatar, url
        if (this.message.m_type === 'tumblr') {
          url = 'https://api.tumblr.com/v2/blog/' + this.message.name + '.tumblr.com/avatar/512'
          return url
        }
        avatar = window.btoa(window.btoa(this.message.avatar))
        return (window.bz_url || '') + '/api_sp/' + avatar
      }
    },
    methods: {
      test: function (god) {
        console.log('test')
        console.log(god)
      },
      changeCat: function (god) {
        let self = this
        let new_god = {}
        new_god.name = god.name
        new_god.cat = god.cat
        this.$store.dispatch('putGod', new_god).then(function (data) {
          god.cat = new_god.cat
          self.getGods()
          self.$store.dispatch('getCat')
        })
      },
      togglePublic: function (god) {
        let new_god = {}
        new_god.name = god.name
        if (god.is_public === 2) {
          return
        }
        if (god.is_public === 1) {
          new_god.is_public = 0
        } else {
          new_god.is_public = 1
        }
        this.$store.dispatch('putGod', new_god).then(function (data) {
          god.is_public = new_god.is_public
        })
      },
      add: function () {
        this.god_name = this.input_name.trim()
        this.stat = 'adding'
      },
      showAddGodInput: function () {
        this.input_name = '' // 清空上次的输入
        this.stat = 'input'
        Vue.nextTick(
          function () {
            $('#id_add_god').focus()
          }
        )
        // 这时要重新取一下god，以处理连续添加的情况
        // 先不取了，连续添加很少见
        // this.queryNotMyGods(this.$route.params.cat)
      },
      disableGodLoading: function () {
        this.loading = false
        if (this.not_my_gods.length === 0) {
          this.no_more = true
        } else {
          this.no_more = false
        }
      },
      getGods: function () {
        let self = this
        this.$store.dispatch('getGods', this.$route.params.cat).then(function (data) {
          self.disableGodLoading()
        })
      }
    }
  }
</script>

<style>
  .clear-button-bz {
    color: inherit!important;
    background-color: inherit!important;
    box-shadow: 0 0 0 1px rgba(34, 36, 38, 0.15) inset !important;
  }
  .ui.basic.negative.button.clear {
    color: inherit!important;
    background-color: inherit!important;
    box-shadow: 0 0 0 1px rgba(34, 36, 38, 0.15) inset !important;
  }
  .ui.basic.positive.button.clear {
    color: inherit!important;
    background-color: inherit!important;
    box-shadow: 0 0 0 1px rgba(34, 36, 38, 0.15) inset !important;
  }
  .ui.grid > .row > .column.top-margin {
    margin-top: 1em;
  }
  .ui.segment.add-newgod-bz {
    padding: 0;
  }
  .ui.segment.add-newgod:first-child {
    margin-top: 1em;
  }
  .newgod-style {
    width: 100%;
    color: #515151;
  }
  .ui.inverted.dimmer.transparent-bz {
    background-color: inherit;
  }
  .ui.add-newgod-style {
    width: 100%;
    color: #515151;
  }
  .ui.add-newgod-style:hover {
    width: 100%;
    color: #515151;
    color: #494949;
  }
  .ui.add-newgod-style:focus {
    width: 100%;
    color: #515151;
  }
</style>
