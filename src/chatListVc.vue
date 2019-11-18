<template>
    <div class="wrap" >
     <!-- <transition-group> -->
        <template v-for="(item, index) in chatListArr">
            <system-mes-default class="animated" :key="index" @clickMenu ="addmessage" :menuObject='item' v-if="item.type=='1'"></system-mes-default>
            <response-question-cell  class="animated " :key="index" @clickMenu ="addappraise" :menuObject='item' v-if="item.type=='2'"></response-question-cell>
            <commit-cell class="animated " :key="index" :menuObject='item' v-if="item.type=='3'"></commit-cell>
            <chat-cell class="animated" :key="index" :menuObject='item' v-if="item.type=='4'"></chat-cell>

        </template>
      <!-- </transition-group> -->
    </div>  
</template>

<script>

import chatCell from './chatCell/chatCell.vue'
import commitCell from './chatCell/commitCell.vue'
import systemMesDefault from './chatCell/systemMessage.vue'
import responseQuestionCell from './chatCell/defaultMessage.vue'

export default {
    
    data(){
        return{
        }
    },
    methods:{
        //发送问题
        addmessage(message){
           this.$emit('addquestion',message)
        },
        //添加评价
        addappraise(message){
           this.$emit('addappraise',message)
        },
    },
    components:{
        systemMesDefault,
        responseQuestionCell,
        chatCell,
        commitCell
    },

    props:['chatListArr']

}
</script>

<style lang="less" scoped>




</style>