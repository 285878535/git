<template>
  <div class="first">
    <mt-header fixed title="我的知乎">
      <router-link to="/" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
      <mt-button icon="more" slot="right"></mt-button>
    </mt-header>
    <mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore">
      <mt-tab-container v-model="active">
        <mt-tab-container-item id="hot">
          <mt-cell v-for="item in hotList" :key="item.news_id" @click.native="listHandle(item,'hot')">
            <div class="title">{{item.title}}</div>
            <div class="img"><img :src="item.thumbnail" alt=""></div>
          </mt-cell>
        </mt-tab-container-item>
        <mt-tab-container-item id="lastest">
          <mt-cell v-for="item in lastestList" :key="item.id" @click.native="listHandle(item,'lastest')">
            <div class="title">{{item.title}}</div>
            <div class="img"><img :src="item.images[0]" alt=""></div>
          </mt-cell>
        </mt-tab-container-item>
        <mt-tab-container-item id="themes">
          <mt-cell v-for="item in themesList" :key="item.id" @click.native="listHandle(item,'themes')">
            <div class="title">{{item.name}}</div>
            <div class="description">{{item.description}}</div>
            <div class="img"><img :src="item.thumbnail" alt=""></div>
          </mt-cell>
        </mt-tab-container-item>
        <mt-tab-container-item id="section">
          <mt-cell v-for="item in sectionsList" :key="item.id" @click.native="listHandle(item,section)">
            <div class="title">{{item.name}}</div>
            <div class="description">{{item.description}}</div>
            <div class="img"><img :src="item.thumbnail" alt=""></div>
          </mt-cell>
        </mt-tab-container-item>
      </mt-tab-container>
    </mt-loadmore>

    <!-- <router-view></router-view> -->
    <mt-tabbar v-model="active" fixed>
      <mt-tab-item id="hot">
        <i slot="icon" class="iconfont icon-remenx"></i>
        热门
      </mt-tab-item>
      <mt-tab-item id="lastest">
        <i slot="icon" class="iconfont icon-zuixin"></i>
        最新
      </mt-tab-item>
      <mt-tab-item id="themes">
        <i slot="icon" class="iconfont icon-zhuti"></i>
        主题
      </mt-tab-item>
      <mt-tab-item id="section">
        <i slot="icon" class="iconfont icon-lanmu"></i>
        栏目
      </mt-tab-item>
    </mt-tabbar>


  </div>

</template>

<script>
  import Vue from "vue";
  // import axios from "axios";
  import Main from "./Main";
  import {
    Tabbar,
    TabItem
  } from "mint-ui";
  import {
    TabContainer,
    TabContainerItem
  } from "mint-ui";
  import {
    Cell
  } from "mint-ui";
  import {
    Indicator
  } from "mint-ui";
  import {
    Loadmore
  } from "mint-ui";
  import {
    Header
  } from 'mint-ui';
  import {
    Button
  } from 'mint-ui';

  Vue.component(Button.name, Button);
  Vue.component(Header.name, Header);

  import "../assets/icon/iconfont.css";

  Vue.component(Cell.name, Cell);
  Vue.component(TabContainer.name, TabContainer);
  Vue.component(TabContainerItem.name, TabContainerItem);
  Vue.component(Tabbar.name, Tabbar);
  Vue.component(TabItem.name, TabItem);
  Vue.component(Loadmore.name, Loadmore);
  export default {
    name: "HelloWorld",
    data() {
      return {
        active: "hot",
        hotList: [],
        lastestList: [],
        themesList: [],
        sectionsList: [],
        allLoaded: false
      };
    },

    components: {},
    created() {
      Indicator.open("加载中...");
      this.getHot();
      this.getLatest();
      this.getThemes();
      this.getSections();
    },
    methods: {
      getHot() {
        var _this = this;
        _this.axios
          .get("https://news-at.zhihu.com/api/2/news/hot", {})
          .then(function (response) {
            _this.hotList = response.data.recent;
            Indicator.close();
            // console.log(JSON.stringify(_this.hotList))
          })
          .catch(function (error) {
            console.log(error);
          });
      },
      getLatest() {
        var _this = this;
        _this.axios
          .get("https://news-at.zhihu.com/api/4/news/latest")
          .then(function (response) {
            // console.log(response.data)
            _this.lastestList = response.data.stories;
            Indicator.close();
          })
          .catch(function (error) {
            console.log(error);
          });
      },
      getThemes() {
        var _this = this;
        _this.axios
          .get("https://news-at.zhihu.com/api/4/themes")
          .then(function (response) {
            // console.log(JSON.stringify(response))
            _this.themesList = response.data.others;
            Indicator.close();
          })
          .catch(function (error) {
            console.log(error);
          });
      },
      getSections() {
        var _this = this;
        _this.axios
          .get("https://news-at.zhihu.com/api/3/sections")
          .then(function (response) {
            // console.log(JSON.stringify(response))
            _this.sectionsList = response.data.data;
          })
          .catch(function (error) {
            console.log(error);
          });
      },
      loadTop() {
        if (this.active === "hot") {
          this.hotList = [];
          this.getHot();
        } else if (this.active === "lastest") {
          this.lastestList = [];
          this.getLatest();
        } else if (this.active === "zhuti") {
          this.themesList = [];
          this.getThemes();
        } else {
          this.sectionsList = [];
          this.getSections();
        }
        this.$refs.loadmore.onTopLoaded();
      },
      loadBottom() {
        this.allLoaded = true; // 若数据已全部获取完毕
        this.$refs.loadmore.onBottomLoaded();
      },
      listHandle(item, type) {
        var item = item;
        var _this = this;
        item.type = type;
        _this.$router.push({
          name: 'Main',
          params: item
        })

      }
    }
  };

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  .mint-tabbar {
    z-index: 999;
    bottom: 0;
  }
  .mint-header.is-fixed {
    padding-top: 35px;
    padding-bottom: 20px;
  }

  .heading,
  .heading-content {
    font-size: .26rem
  }
  .first {
    padding-top: 30px;
  }

  .mint-tab-container {
    padding-top: .5rem;
    padding-bottom: 1rem;
  }

  .mint-cell {
    margin-top: 0.1rem;
  }

  .mint-loadmore-text {
    font-size: 0.32rem;
  }

  // .mint-cell-wrapper{
  //   // background:#fff;
  // }
  .img img {
    width: 2.1rem;
    height: 2.1rem;
    background: url('../img/lose.png') 100% 100%
  }

  .mint-cell-value {
    .title {
      line-height: 0.4rem;
      padding: 0 0.24rem;
    }
  }

</style>
