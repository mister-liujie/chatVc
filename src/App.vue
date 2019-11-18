<template>
  <div class="app">

    <chatvc class="chatVc" :chatListArr ='listArr' @addquestion = "clickItemquestion" @addappraise = "addAppraise" ref="chatvc" id="chatvc"></chatvc>
     <div class="operate-section" >
        <ul class="preview-section" >
          <li v-for="(item,index) in searchList" :key="index">
             <a href="" @click.prevent="clickItemquestion(item)">{{index+1+'.'}}{{item.question}}</a>
          </li>
        </ul>
        <div class="input-box">
            <textarea class="input" placeholder="请输入问题关键字" v-model="keyword" ref="elememt"  @keyup="getFullname"></textarea>
            <i class="clear"  @click="clearBtnclick" v-show="clearshow"></i>
        </div>
        <div class="button" @click="messageBtnClick">
          <span>发送</span>
        </div>
    </div> 
  </div>
  
</template>

<script>

import chatvc from './chatListVc.vue'
const axios = require('axios');
// import globalVariable from './global_variable.js'

export default{

  data(){
    return{
      listArr:[],
      keyword:'',
      clearshow:false,
      searchList:[],
      styleObj2: {'overflow-y': 'hidden','height':''}
    }
  },
  created(){
      this.getMessageList();
  },

  methods:{

     getMessageList(){
        // var that = this;
         axios.post('fqa-service-h5/api/v1/fqa/recommend',{application: this.GLOBAL.applicationID})
          .then((response) => {
              var result = response.data
              if(result.code =='S00000'){

                // var application = result.data.application;
                var headImage = result.data.application.logo;
                this.define.setHeadImage(headImage) 
                // console.log('------log-----',headImage,this.define.headImage,result.data.application.logo)

                this.listArr.push({type:'1',logo:result.data.application.log,title:'欢迎使用 FQA，我是你的小助手，您是否想问:',menuArr:result.data.recommend});
              }else{
                console.log('请求数据失败--')
              }
          }).catch(function(err){
             console.log('---数据失败--catch--'+err)
          })
     },
      
      //发送问题请求
      clickItemquestion(item){

        if(this.searchList.length > 0){
           this.clearBtnclick();
        }
        
        setTimeout(()=>{
            this.listArr.push({type:'4',title:item.question});
        },300)
       
        // 发送请求的数据
        this.postRequest('fqa-service-h5/api/v1/fqa/search/id',{application:this.GLOBAL.applicationID,id:item._id});
      },
      
      //发送消息
      messageBtnClick(){

        if (this.keyword !== null && this.keyword !== undefined && this.keyword !== '') {
            
           setTimeout(()=>{
              this.listArr.push({type:'4',title:this.keyword});
              this.keyword = '';
           },300)
           // 发送请求的数据
           this.postRequest('fqa-service-h5/api/v1/fqa/search/question',{application:this.GLOBAL.applicationID,question:this.keyword});
        
        }
      },

      //搜索  textare 自适应盖度
      getFullname(e){

          let o = e.target;
          o.style.height = o.scrollTop + o.scrollHeight + "px";
      },

       //添加评价
      addAppraise(data){

          var appraiseStr;
          if(data.appraise == 1){
            appraiseStr='满意'
          }else{
            appraiseStr='不满意'
          }
          setTimeout(()=>{
              this.listArr.push({type:'4',title:appraiseStr});
           },300)
          // 发送请求的数据
          this.postRequest('fqa-service-h5/api/v1/fqa/appraise',data);
      },

      postRequest(url,data){
        
         axios.post(url,data)
          .then((response) => {
            var result = response.data

            setTimeout( () => {
                if(result.code =='S00000'){

                if(url.indexOf("search/id") != -1){
                    this.listArr.push({type:'2',title:result.data.answer,object:result.data});
                }else if(url.indexOf("appraise") != -1){
                   var appraiseStr
                   if(data.appraise == 1){
                      appraiseStr='感谢您的评价，祝您生活愉快'
                    }else{
                      appraiseStr='感谢您的评价，小Q会继续努力加油的...555~~'
                    }
                    this.listArr.push({type:'3',title:appraiseStr});
                }else if(url.indexOf("search/keyword") != -1){
                    this.searchList = result.data;
                }else if(url.indexOf("search/question") != -1){
                   
                   if(result.data.recommend){
                      this.listArr.push({type:'1',title:'哎呀，十分的抱歉，小Q也不知道如何对打您，找了几个常见的问题，小Q也会继续进步的...555~~~:',menuArr:result.data.recommend});
                   }else{
                      this.listArr.push({type:'2',title:result.data.answer,object:result.data});
                   }
                }
              }else{
                this.listArr.push({type:'3',title:result.msg}); 
              }
            },300);

          }).catch(function(err){
             console.log('-数据失败--catch--',err)
          })
      },

      //点击清除按钮
      clearBtnclick(){
          this.searchList = [];
          this.keyword = '';
          this.clearshow = false;
      },


      autoTextarea() 
      {
         var extra = 0;   //设置光标与输入框保持的距离(默认0)
  　　　  var　maxHeight = 400; //设置最大高度(可选)
  　　　　var _that = this;
  　　　　var isFirefox = !!document.getBoxObjectFor || 'mozInnerScreenX' in window,
  　　　　isOpera = !!window.opera && !!window.opera.toString().indexOf('Opera');
　　　　　 var paddingTop,paddingBottom
         var style,_length,valueLength,stylHeight,scrollHeight,currHeight;

          this.$nextTick(function () {
              if(this.isHeight){
                this.isHeight =  false
                this.minHeight = parseFloat(window.getComputedStyle(this.$refs.elememt).height)
              }

              paddingTop = parseInt(window.getComputedStyle(this.$refs.elememt).paddingTop)
              paddingBottom = parseInt(window.getComputedStyle(this.$refs.elememt).paddingBottom)
              style = this.$refs.elememt.style
              _length = this.$refs.elememt._length
              valueLength = this.$refs.elememt.value.length
              stylHeight = this.$refs.elememt.style.height
              scrollHeight = this.$refs.elememt.scrollHeight
              currHeight = this.$refs.elememt.currHeight

               change()
          })

        function change(){
          var  height, padding = 0;

          if (_length === valueLength) return;
              _length = valueLength;

          if (!isFirefox && !isOpera) {
            padding = paddingTop + paddingBottom;
          };
          stylHeight = _that.minHeight + 'px';  //30px
          // console.log(scrollHeight,_that.minHeight,maxHeight,padding)
          if (scrollHeight > _that.minHeight) {
            if (maxHeight && scrollHeight > maxHeight) {
              height = maxHeight - padding;
//              style.overflowY = 'auto';
              style.overflowY = 'hidden';
            } else {
              height = scrollHeight - padding;      //undefined 30 9
              style.overflowY = 'hidden';
            };

            style.height = height + extra + 'px';
            currHeight = parseInt(style.height);
          };
        }
      },
  },
  
  watch:{

    'keyword': function(newValue, oldValue){ 
      if(this.keyword == null || this.keyword.length == 0){
          this.clearshow = false;
          //清空数据
          this.searchList = [];
      } else{

         this.clearshow = true;
         // 发送请求的数
         this.postRequest('fqa-service-h5/api/v1/fqa/search/keywords',{application:this.GLOBAL.applicationID,keyword:this.keyword});
      }
    }
  },
  
  //计算属性
  computed:{
   
  },

  components:{
    chatvc,
  },

  updated:function(){

    this.$nextTick(() => {
      
      // var div = document.getElementById('chatvc');
      // console.log('this.$refs -----22',this.$refs.chatvc)
      var div = this.$refs.chatvc.$el;
      div.scrollTop = div.scrollHeight;
    })
  }

}

</script>

<style lang="scss" scoped>

.app{
  width: 100%;
  height: 100%;
  position:fixed;
  display: flex;
  flex-direction: column;
}

.chatVc{
  flex: 1;
  padding: 10px 10px 0;
  overflow-y: auto;
  overflow-x: hidden;
  background-color: rgb(242, 242, 242);
  flex-basis:0%;
  flex-grow:1;
  flex-shrink:1;

}

.operate-section {
  height: auto;
  padding:8px 10px;
  background-color: #fff;
  position: relative;
  display: flex;
  // flex-direction: row;
  align-items: flex-end;
 

  .preview-section{
    background-color: white;
    margin: 0px;
    padding: 0px;
    position: absolute;
    left: 0px;
    bottom: 100%;
    width: 100%;
    background-color: hsla(0,0%,100%,.9);
    border-bottom: 1px solid #ddd;
    box-shadow: 0 -1px 1px 0 rgba(0,0,0,.1);

    li{
      padding-left: 10px;
      line-height: 25px;
    }
    a{
      text-decoration: underline;
      font-size: 13px;
    }
  }

  .input-box{
     height: auto;
     font-size: 14px;
     color: #333;
     margin-right: 10px;
     position: relative;
     flex: 1;
     background-color: cyan;
     align-items: center;
     display: flex;
     
     .input{
        width: 100%;
        height: auto;
        border: none;
        padding: 0px;
        background-color: white
         
     }

     .clear{
       width: 30px;
       height: 30px;
       background-color: cyan;
       position: absolute;
       right: 0px;
       bottom: 0px;
     }
  }

  .button{
      justify-content: center;
      align-items: center;
      display: flex;
      width: 80px;
      height: 35px;
      background-color: #009ae0;
      border-radius: 5px;
      
      span{
        width: 28px;
        height: 20px;
        color: white;
        border-radius: 5px;
   }
  }

}

/*
.inputdiv{
  
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: white;
  height: 50px;
  position: absolute;
  bottom: 0px;
  width: 100%;
  padding: 8px 10px;

  input{
    flex: 1;
    border-radius: 5px;
    padding: 3px;
    margin-right: 10px;
  }
}
*/





</style>
