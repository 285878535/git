<template>
  <div class="main">
    <mt-header fixed title="我的知乎">
      <router-link to="/" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
      <mt-button icon="more" slot="right"></mt-button>
    </mt-header>
    <div class="imgBox">
      <img class="topImg" :src="pageData.image" alt="">
      <div class="topTitle">
        {{pageData.title}}
      </div>
      <div class="bomTitle">图片：{{pageData.image_source}}</div>
    </div>


    <div class="con" v-html="pageData.body">main</div>
  </div>

</template>

<script>
  import {
    Header
  } from 'mint-ui';
  import Vue from "vue";
  import {
    Button
  } from 'mint-ui';

  Vue.component(Button.name, Button);
  Vue.component(Header.name, Header);
  export default {
    name: 'Main',
    data() {
      return {
        pageParams: '',
        pageData: '',
        type: '',
        url: '',
      }
    },
    created() {
      var _this = this
      _this.pageParams = _this.$route.params;
      _this.type = _this.pageParams.type
      if (_this.type === 'hot') {
        _this.url = _this.pageParams.url;
      } else if (_this.type === 'lastest') {
        _this.url = 'https://news-at.zhihu.com/api/4/news/' + _this.pageParams.id
      }
      //   else if(_this.type === 'themes'){
      //       _this.url = 'https://news-at.zhihu.com/api/4/theme/'+_this.pageParams.id
      //   }
      console.log(this.url)
      this.axios.get(this.url, {})
        .then(function (res) {
          console.log(JSON.stringify(res))
          _this.pageData = res.data
        })
      console.log(JSON.stringify(this.$route.params))
    },
  }

</script>

<style lang="scss">
  // .question{
  //     margin-top: .3rem;
  // }
  .main {
    padding-top: .3rem;
  }

  .mint-header.is-fixed {
    padding-top: 35px;
    padding-bottom: 20px;
  }

  .heading,
  .heading-content {
    font-size: .26rem
  }

  .question-title {
    font-size: .46rem;
  }

  .author {
    font-size: .3rem;
  }

  .bio {
    font-size: .28rem;
  }

  .content {
    font-size: .3rem;
    // color: #666;

  }

  .imgBox {
    width: 100%;
    margin-top: 40px;
    height: 4rem;
    position: relative;
  }

  .topImg {
    width: 100%;
    height: 100%;
  }

  .topTitle {
    color: #fff;
    position: absolute;
    width: 100%;
    padding: 0 .24rem;
    bottom: .4rem;
    // top: .8rem;
    font-size: .4rem;
  }
.bomTitle{
    color: #999;
     font-size: .2rem;
    position: absolute;
    bottom: .1rem;
    right: .1rem;
}
  .con {
    padding: 0 .24rem;
    // margin-top: 50px
  }

  .content {
    p {
      //   text-indent: 1cm;

      img {
        width: 100%;
        height: auto;
      }
    }

    figure {
      img {
        width: 100%;
        height: auto;
      }
    }
  }

  .view-more {
    font-size: .3rem;
  }

</style>
