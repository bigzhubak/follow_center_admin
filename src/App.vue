<template>
  <div id="app">
    <header class="main-header">
      <div class="ui borderless main menu bar-above">
        <div class="ui container">
          <a @click="backToMain" href="javascript:;" class="header item logo-font-bz no-highlight">
            <transition name="expand">
              <img v-show="show_bar" class="logo first-logo" src="../static/assets/logo.svg">
            </transition>
            <div id="header">Follow Center</div>
          </a>
          <div class="right menu ">
            <div class="item large monitor only">
            </div>
            <div class="ui simple dropdown item user-imfor-bz">
              <img :src="avatar" class="ui avatar image">
              <div class="menu login-menu-bz">
                <a @click="logout" class="item">退出登录</a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <transition name="expand">
        <nav v-show="show_bar" class="ui borderless main menu fix-bz bar-blow">
          <div class="ui container bar-selection">
            <router-link :to="{ name: 'ApplyDel'}" :class="{'active': this.$route.name==='ApplyDel'}" class="item navi-bz move-left-bz">申请删除</router-link>
            <router-link :to="{ name: 'ApplyDel'}" :class="{'active': this.$route.name==='PublicGod'}" class="item navi-bz move-left-bz">审核大神</router-link>
            <router-link :to="{ name: 'ApplyDel'}" :class="{'active': this.$route.name==='BioList'}" class="item navi-bz move-left-bz">编辑故事</router-link>
          </div>
        </nav>
      </transition>
    </header>
    <div class="ui container" >
      <router-view :call_back="login_call_back"></router-view>
    </div>
  </div>
</template>

<script>
  import $ from 'jquery'
  import store from './store'
  import CountUp from 'bz-count-up'
  import 'bz-semantic-ui-site'
  import 'bz-semantic-ui-reset'
  import 'bz-semantic-ui-container'
  //  import 'bz-semantic-ui-grid'
  //  import 'bz-semantic-ui-header'
  //  import 'bz-semantic-ui-button'
  //  import 'bz-semantic-ui-popup'
  //  import 'bz-semantic-ui-transition'
  import 'bz-semantic-ui-menu'
  import 'bz-semantic-ui-table'
  import 'bz-semantic-ui-dropdown'
  import 'bz-semantic-ui-visibility'
  import 'bz-semantic-ui-image'
  export default {
    store,
    data () {
      return {
        key: '',
        is_scroll: false,
        last_scroll_top: 0,
        nav_bar_height: 0,
        show_bar: true,
        scroll_wait: false // 不让checkBar因为触发太多次而影响效率
      }
    },
    components: {
      CountUp
    },
    watch: {
      'unread_message_count': function (val, oldVal) {
        if (this.unread_message_count === 0) {
          document.title = 'Follow Center'
        } else {
          document.title = `(${this.unread_message_count}) Follow Center`
        }
      },
      'loading': function (val, oldVal) {
        if (val) {
          window.NProgress.start()
        } else {
          window.NProgress.done()
        }
      }
    },
    computed: {
      loading () {
        return store.state.loading
      },
      unread_message_count () {
        return store.state.unread_message_count
      },
      user_name () {
        return store.state.p.user_info.user_name
      },
      avatar () {
        return store.state.p.user_info.picture
      }
    },
    mounted: function () {
      this.queryUserInfo()
      this.$nextTick(function () {
        $('.fix-bz').visibility(
          {
            type: 'fixed'
          }
        )
        $('.first-logo').visibility(
          {
            once: false,
            onTopPassed: function () {
              var y = $('.first-logo').offset().left
              $('.first-logo').css('left:' + y)
              $('.first-logo').addClass('fixed')
              $('#header').addClass('padding-left-bz')
              $('.move-left-bz').addClass('move-titile')
            },
            onTopPassedReverse: function () {
              // this.checkBar()
              // this.show_bar = true
              $('.first-logo').removeClass('fixed')
              $('#header').removeClass('padding-left-bz')
              $('.move-left-bz').removeClass('move-titile')
            }
          }
        )
        this.$on('checkBar',
          function () {
            if (this.scroll_wait) return
            else {
              this.checkBar()
              this.scroll_wait = true
              let _this = this
              window.setTimeout(
                function () {
                  _this.scroll_wait = false
                }
              , 200)
            }
          }
        )
        this.$on('showBar',
          function () {
            if (this.show_bar) return
            this.show_bar = true
          }
        )
      })
    },
    methods: {
      queryUserInfo: function () {
        this.$store.dispatch('queryUserInfo')
      },
      checkBar: function () {
        var st = $(window).scrollTop()
        this.nav_bar_height = $('header').outerHeight()

        if (Math.abs(this.last_scroll_top - st) <= 5) return

        if (st > this.last_scroll_top && st > this.nav_bar_height) {
          this.show_bar = false
        } else {
          if (st + $(window).height() < $(document).height()) {
            this.show_bar = true
          }
        }

        this.last_scroll_top = st
      },
      logout: function () {
        if (window.bz_url) {
          window.localStorage.removeItem('user_id')
          window.location.href = 'login.html'
        } else {
          window.location.href = '/api_logout'
        }
      },
      login_call_back: function () {
        this.$router.go({name: 'Main'})
      },
      search: function () {
        if (this.key) {
          store.state.search_messages = [] // 清空上次的查找
          this.$router.go({name: 'Search', params: {key: this.key}})
        } else {
          this.$router.go({name: 'Main'})
        }
      },
      backToMain: function () {
        this.$router.go({name: 'Main', replace: true})
        // $('html, body').animate(
          //   {
            //     scrollTop: '0'
            //   }, 500
        // )
      }
    }
  }
</script>

<style>
  body {
    font-family: "Lato", arial, sans-serif;
    line-height: 1.5;
    font-weight: normal;
    background-color: #fafafa;
    color: rgba(0,0,0,.76);
  }
  /* 必需 */
  .expand-enter-active, .expand-leave-active {
    transition: all .3s ease;
    overflow: hidden;
    height: 0;
    padding: 0;
    opacity: 0;
  }

  a {
    color: #2EA974;
    -webkit-transition: all 0.3s ease;
    -moz-transition: all 0.3s ease;
    -ms-transition: all 0.3s ease;
    -o-transition: all 0.3s ease;
    transition: all 0.3s ease;
  }
  a:hover, a:focus, a:active {
    color: #168454;
  }
  // 全局的人物名字----------------------------
  .user-name-a {
    color: rgba(0,0,0,.8);
    transition: color 0.3s linear;
  }
  .user-name-a:hover {
    color: rgba(0,0,0,.6);
  }
  // 设置社交图标------------------------------
  i.icon.god-icon-bz {
    transition: color 0.3s;
    color: #999999;
  }
  .github-light {
    color: rgba(0,0,0,0.7);
  }
  .twitter-light {
    color: #41ABE1;
  }
  .instagram-light {
    color: #7E4532;
  }
  .tumblr-light {
    color: #36465D;
  }
  .facebook-light {
    color: #3B5998;
  }
  .github.light-bz {
    color: rgba(0,0,0,0.7);
  }
  .twitter.light-bz {
    color: #41ABE1;
  }
  .instagram.light-bz {
    color: #7E4532;
  }
  .facebook.light-bz {
    color: #3B5998;
  }
  i.icon.github.god-icon-bz:hover {
    color: rgba(0,0,0,0.7);
  }
  i.icon.twitter.god-icon-bz:hover {
    color: #41ABE1;
  }
  i.icon.instagram.god-icon-bz:hover {
    color: #7E4532;
  }
  i.icon.tumblr.god-icon-bz:hover {
    color: #36465D;
  }
  i.icon.facebook.god-icon-bz:hover {
    color: #3B5998;
  }
  // 设置导航--------------------------------
  .ui.menu.bar-above {
    margin-bottom: 0;
    border: none;
    box-shadow: none;
    height: 65px;
  }
  .ui.menu .header.item.logo-font-bz div {
    font-size: 1.5em;
    font-weight: 600;
    padding-left: 0.5em;
  }
  .ui.bar-num-bz {
    color: #54B98F;
  }
  .ui.menu.bar-blow {
    margin-top: 0;
    border: none;
    height: 50px;
    box-shadow: 1px 1px 1px rgba(0,0,0,.09);
    border-radius: 0em;
  }
  .ui.bar-selection {
    border-top: 0.5px solid rgba(0,0,0,.05);
  }
  .ui.menu .item.navi-bz {
    padding: 1em 2em;
    color: rgba(0,0,0,.5);
  }
  .ui.menu .item.navi-bz:hover {
    color: rgba(0,0,0,.7);
  }
  .first-logo.fixed {
    position: fixed;
    top: 13px;
    z-index: 999999;
  }
  .ui.menu a.item.no-highlight:hover {
    background:inherit;
    color:inherit;
  }
  .ui.menu .header.item.logo-font-bz .padding-left-bz {
    padding-left: 2.16em;
  }
  .move-left-bz.move-titile {
    margin-left: 4em;
  }
  .ui.menu .dropdown.item .menu.login-menu-bz {
    border-radius: 0.06em;
    border: none;
    box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.05), 0 1px 3px 0 rgba(0, 0, 0, 0.13);
  }
  @media (max-width : 767px) {
    .ui.menu .item.user-imfor-bz {
      padding: 1rem 2rem;
    }
  } 
</style>
