
<template>

<div class="chatCell">
    <div class="image left">
       <!-- <img src= "http://ossmk2.jfpays.com/www_make_v1/app/static/images/281568187332_hd.jpg" alt="头像">
        -->
        <img :src = this.define.headImage alt="头像">
    </div>
    <div class="chatcontent">
         <P class="title">{{menuObject.title}}</P>
         <!-- <div class="menu" v-for="(item,index) in menuObject.menuArr" :key="index" @click.prevent="cilck(index)">{{index+1+'.'}}{{item.question}}
         </div> -->
         <a class="menu" v-for="(item,index) in menuObject.menuArr" :key="index" @click.prevent="cilck(index)">{{index+1+'.'}}{{item.question}}</a>
    </div>
</div>

</template>

<script>

export default {
    
    data(){
        return{
           placehoderImg:"http://ossmk2.jfpays.com/www_make_v1/app/static/images/281568187332_hd.jpg",

        }
    },
    
    created(){
       
      
    },

    methods:{
      cilck(index){
          this.$emit('clickMenu', this.menuObject.menuArr[index]);
      }
    },

    props:['menuObject']
}

</script>

<style lang="less" scoped>

.chatCell{
    position: relative;
    height: auto;
    display: flex;
    flex-direction: row;
    margin-bottom: 10px;
    padding:10px 40px;
}

.chatcontent{
  background-color: white;
  padding: 8px;
  border-radius: 5px;
  box-shadow:rgba(0, 0, 0, 0.05) 0px 0px 4.99988px 0px;
  white-space: normal;
  word-break: break-all;
}

.chatcontent:after{
    position: absolute;
    width: 0px;
    height: 0px;
    content: "";
    top: 15px;
    left: 24px;
    border-right:  10px solid white;
    border-top: 10px solid transparent;
    border-left: 10px solid transparent;
    border-bottom: 10px solid transparent;
}

.title{
    margin-bottom: 10px;
}

.menu{
    display: block;
    margin-bottom: 5px;
    text-decoration: underline;
}

.image{
    width: 30px;
    height: 30px;
    // background-color: red;
    position: absolute;

    img{
       width: 30px;
       height: 30px;
       border-radius: 4px;
    }
}

.left{
left: 0px;

}


</style>