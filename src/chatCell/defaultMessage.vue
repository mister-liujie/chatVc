
<template>

<div class="chatCell">
    <div class="image left">
         <img :src = this.define.headImage alt="头像">
    </div>
    <div class="chatcontent">
        <P class="title">{{menuObject.title}}</P>
        <div class="appraise">
            <h2>您是否满意此次回答？</h2>
            <div class="btn-group">
                <div class="btn-item btn-select" data-record="5dc0dce9a2851410d4a92f0c" data-id="5db658d065181fa144cbc388" data-value="1" @click="comitBtncilck(1)">满意</div>
                <div class="btn-item" data-record="5dc0dce9a2851410d4a92f0c" data-id="5db658d065181fa144cbc388" data-value="0" @click="comitBtncilck(0)">不满意</div>
            </div>
        </div>
    </div>
</div>

</template>

<script>

export default {
    
    data(){
        return{
          
        }
    },
    methods:{
      comitBtncilck(index){
         if(index==1){
            this.$emit('clickMenu',{application:this.GLOBAL.applicationID,record:this.menuObject.object.recordId,id:this.menuObject.object._id,appraise:1});
         }else if(index==0){
            this.$emit('clickMenu',{application:this.GLOBAL.applicationID,record:this.menuObject.object.recordId,id:this.menuObject.object._id,appraise:0});
         }
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

.btn-group{
    display: flex;
    flex-direction: row;
}

h2{
    margin-top: 0px;
    line-height: 21px;
    font-size: 14px;
    margin-bottom: 0px;
}

.btn-item{
    flex: 1;
    text-align: center;
    padding: 8px 0px;
    line-height: 20px;
}

.btn-select{
  color: rgb(0, 154, 224)
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