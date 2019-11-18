
<template>
<div :class="['chatCell','fadeInLeft']">
    <div :class="['image','left']">
         <img :src = this.define.headImage alt="头像">
    </div>
    <div :class="['chatcontent']">
        <P class="title">{{menuObject.title}}</P>
    </div>
</div>

</template>

<script>

export default {
    
    data(){
        return{
        }
    },
    props:['menuObject']
}

</script>

<style lang="less" scoped>

.chatCell{
    position: relative;
    margin-bottom: 10px;
    height: auto;
    display: flex;
    // align-items: center;
}

.fadeInLeft{
    flex-direction: row;
}

.chatcontent{
    width: fit-content;
    padding: 8px;
    // padding:0px 40px;
    margin:0px 40px;
    background-color: white;
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
    top: 2px;
    left: 24px;
    border-right:  10px solid white;;
    border-top: 10px solid transparent;
    border-left: 10px solid transparent;
    border-bottom: 10px solid transparent;
}


.image{
    width: 30px;
    height: 30px;
    position: absolute;
    top: 0px;

    img{
       width: 30px;
       height: 30px;
       border-radius: 4px;
    }
}

.title{
    line-height: 21px;
    margin-bottom: 0px;
}

.left{
    left: 0px;
    // text-align: left;
}



</style>