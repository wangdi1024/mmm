<template>
     <div>
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="/index.html">首页</a> &gt;
                <a href="/goods.html">购物商城</a> &gt;
                <a href="/goods/42/1.html">商品详情</a>
            </div>
        </div>
        <div class="section">
            <div class="wrapper clearfix">
                <div class="wrap-box">
                    <div class="left-925">
                        <div class="goods-box clearfix">
                            <div class="pic-box">
                                <ProductZoomer v-if="images.normal_size.length!=0"
                                :base-images="images"
                                :base-zoomer-options="zoomerOptions"
                                />
                            </div>
                            <div class="goods-spec">
                                <h1>{{goodsinfo.title}}</h1>
                                <p class="subtitle">{{goodsinfo.sub_title}}</p>
                                <div class="spec-box">
                                    <dl>
                                        <dt>货号</dt>
                                        <dd id="commodityGoodsNo">{{goodsinfo.goods_no}}</dd>
                                    </dl>
                                    <dl>
                                        <dt>市场价</dt>
                                        <dd>
                                            <s id="commodityMarketPrice">¥{{goodsinfo.market_price}}</s>
                                        </dd>
                                    </dl>
                                    <dl>
                                        <dt>销售价</dt>
                                        <dd>
                                            <em id="commoditySellPrice" class="price">¥{{goodsinfo.sell_price}}</em>
                                        </dd>
                                    </dl>
                                </div>
                                <div class="spec-box">
                                    <dl>
                                        <dt>购买数量</dt>
                                        <dd>
                                            <div class="stock-box">
                                                <div class="el-input-number el-input-number--small">
                                                   <el-input-number size="mini" v-model="num7" @change="handleChange" :min='1' :max='10'></el-input-number>
                                                </div>
                                            </div>
                                            <span class="stock-txt">
                                                库存
                                                <em id="commodityStockNum">{{goodsinfo.stock_quantity}}</em>件
                                            </span>
                                        </dd>
                                    </dl>
                                    <dl>
                                        <dd>
                                            <div id="buyButton" class="btn-buy">
                                                <button onclick="cartAdd(this,'/',1,'/shopping.html');" class="buy">立即购买</button>
                                                <button onclick="cartAdd(this,'/',0,'/cart.html');" class="add">加入购物车</button>
                                            </div>
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                        <div id="goodsTabs" class="goods-tab bg-wrap">
                            <div id="tabHead" class="tab-head" style="position: static; top: 517px; width: 925px;">
                                <ul>
                                    <li>
                                        <a href="javascript:;" :class="{selected:tabindex==1}" @click="tabindex=1" >商品介绍</a>
                                    </li>
                                    <li>
                                        <a href="javascript:;" :class="{selected:tabindex==0}" @click="tabindex=0">商品评论</a>
                                    </li>
                                </ul>
                            </div>
                            <!--                                                             v-html是渲染为html页面-->
                            <div class="tab-content entry" v-show="tabindex==1" v-html="goodsinfo.content">
                            </div>
                            <div class="tab-content"  v-show="tabindex==0">
                                <div class="comment-box">
                                    <div id="commentForm" name="commentForm"
                                        class="form-box">
                                        <div class="avatar-box">
                                            <i class="iconfont icon-user-full"></i>
                                        </div>
                                        <div class="conn-box">
                                            <div class="editor">
                                                <textarea v-model.trim='neirong' id="txtContent" name="txtContent" sucmsg=" " datatype="*10-1000" nullmsg="请填写评论内容！"></textarea>
                                                <span class="Validform_checktip"></span>
                                            </div>
                                            <div class="subcon">
                                                <input @click='tijia' id="btnSubmit" name="submit" type="submit" value="提交评论" class="submit">
                                                <span class="Validform_checktip"></span>
                                            </div>
                                        </div>
                                    </div>
                                    <ul id="commentList" class="list-box">
                                        <p v-show="totalcount==0"  style="margin: 5px 0px 15px 69px; line-height: 42px; text-align: center; border: 1px solid rgb(247, 247, 247);">暂无评论，快来抢沙发吧！</p>
                                        <li v-for="(item) in comment" :key="item.id">
                                            <div class="avatar-box">
                                                <i class="iconfont icon-user-full"></i>
                                            </div>
                                            <div class="inner-box">
                                                <div class="info">
                                                    <span>{{item.user_name}}</span>
                                                    <span>{{item.reply_time}}</span>
                                                </div>
                                                <p>{{item.content}}</p>
                                            </div>
                                        </li>
                                    </ul>
                                    <div class="page-box" style="margin: 5px 0px 0px 62px;">
                                        <div id="pagination" class="digg">
                                                <Page :total="totalcount"  show-elevator show-sizer @on-change="pageChange"/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="left-220">
                        <div class="bg-wrap nobg">
                            <div class="sidebar-box">
                                <h4>推荐商品</h4>
                                <ul class="side-img-list">
                                    <li v-for="(item) in hotgoodslist" :key="item.id">
                                        <div class="img-box">
                                            <router-link :to="'/detail/'+item.id" class="">
                                                <img :src="item.img_url">
                                            </router-link>
                                        </div>
                                        <div class="txt-box">
                                            <router-link  :to="'/detail/'+item.id" class="">{{item.title}}</router-link>
                                            <span>{{item.add_time | shortTime}}</span>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
// import axios from "axios"
// import moment from "moment"
export default {
  name: 'detail',
  data: function() {
    return {
      artID: '',
      goodsinfo: [],
      hotgoodslist: [],
      imglist: [],
      num7: 1,
      buycount: '',
      tabindex: 1,
      comment: [],
      pageSize: 1,
      totalcount: 0,
      pageIndex: 1,
      neirong: '',
      images: {
        // required 必须
        normal_size: [
        
         
        ],
      },
      zoomerOptions: {
        zoomFactor: 3,
        pane: 'pane',
        hoverDelay: 0,
        namespace: 'zoomer',
        move_by_click: false,
        scroll_items: 7,
        choosed_thumb_border_color: '#dd2c00',
      },
    };
  },
  methods: {
    handleChange(value) {
    //   console.log(value);
    },
    //初始化数据,由于侦听器不能直接调用create()函数,所以写在methods里面 在用this调用
    initdata() {
      this.num7 = 1;
      this.artID = this.$route.params.artID;
      this.axios
        .get(
          `http://111.230.232.110:8899/site/goods/getgoodsinfo/${this.artID}`
        )
        .then(result => {
          console.log(result);
          this.goodsinfo = result.data.message.goodsinfo;
          this.hotgoodslist = result.data.message.hotgoodslist;
          this.imglist = result.data.message.imglist;
          this.imglist.forEach(v => {
              this.images.normal_size.push({
                  id:v.id,
                  url:v.original_path
              })
          });
        });
      this.initcoment();
    },
    initcoment() {
      this.axios
        .get(
          `http://111.230.232.110:8899/site/comment/getbypage/goods/${
            this.artID
          }?pageIndex=${this.pageIndex}&pageSize=10`
        )
        .then(result => {
        //   console.log(result);
          this.comment = result.data.message;
          //   console.log(this.comment);
          this.totalcount = result.data.totalcount;
        });
    },
    pageChange(pageIndex) {
      this.pageIndex = pageIndex;
      this.initcoment();
    },
    tijia() {
      if (this.neirong == '') {
        this.$Message.warning('请填写内容');
      } else {
        this.axios
          .post(
            `http://111.230.232.110:8899/site/validate/comment/post/goods/${
              this.artID
            }`,
            { commenttxt: this.neirong }
          )
          .then(result => {
            // console.log(result);
            if (result.data.status == 0) {
              this.$Message.success(result.data.message);
              // 清空评论
              this.neirong = '';
              // 初始化页面为 1 才能看到自己的评论
              this.pageIndex = 1;
              // 重新获取评论
              this.initcoment();
            }
          });
      }
    },
  },
  created() {
    this.initdata();
    // 让放大镜的组件为空,重新生成
    this.images.normal_size=[];
  },
  //侦听器 要侦听谁就写谁 ,这里写的是$route 因为router-link :to过来的id存在$route中
  watch: {
    // 如果 `$route` 发生改变，这个函数就会运行
    $route(newVal, oldVal) {
      //  console.log('变了');
      this.initdata();
      
    },
  },
};
</script>
<style>
.tab-content img {
  vertical-align: middle;
  max-width: 100%;
}
.zoomer-zoomer-box img{
    width: 100px;
    height: 100px;
}
.preview-box img{
    width: 395px;
    height: 395px;
    /* height: 320px; */
}
#zoomer-pane-container{
    width: 395px !important; 
    height: 395px !important;
     left: 400px !important; 
     top: 30px !important; 
     z-index: 2;
}
</style>

