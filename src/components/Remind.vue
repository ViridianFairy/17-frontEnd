<template>
    <div id="wrapper">
       <p style="margin-left:50px;margin-top:25px;font-size:25px" >全部通知</p>
       <a-divider style="margin-top:10px"/>
    <div id="all">
       <div id="left1">
           <a-list item-layout="horizontal" :data-source="remindData">
        <a-list-item slot="renderItem" slot-scope="item">
      <a-list-item-meta
        :description="item.name"
      >
        <a slot="title" @click="showDetails(item.type)">{{ item.t_remind }}</a>
      </a-list-item-meta>
    </a-list-item>
  </a-list>
       </div>
       <div id="right1">
           <div id="more">
                     <div id="contextleft">
                  <p>
						
                  <a-icon type="file-done" style="fontSize:22px;color:gray;margin-top:10px;vertical-align:bottom"/>
                  <em class="em11" style="margin-left:1px">状态</em><br />

                  <a-icon type="user" style="fontSize:22px;color:gray;margin-top:30px;vertical-align:bottom"/>
                  <em class="em11" style="margin-left:2px">执行者</em><br />
                  
                  <a-icon type="calendar" style="fontSize:20px;color:gray;margin-top:30px;vertical-align:bottom"/>
                  <em class="em11" style="margin-left:4.5px">执行时间</em><br />

                  <a-icon type="pushpin" style="fontSize:22px;color:gray;margin-top:30px;vertical-align:bottom"/>
                  <em class="em11" style="margin-left:2px">备注</em><br />

                  <a-icon type="fire" style="fontSize:22px;color:gray;margin-top:30px;vertical-align:bottom;margin-bottom:-2px"/>
                  <em class="em11" style="margin-left:2.3px">优先级</em><br />

                  <a-icon type="tag" style="fontSize:22px;color:gray;margin-top:28px;vertical-align:bottom;margin-bottom:-1px"/>
                  <em class="em11" style="margin-left:2.3px">标签</em><br />    
               </p>   
               </div>   
               <div id="contextright">
                  
                  <!--   数据需要部分 以下为模拟  ---->
                  <em class="em11" style="margin-right:10px;font-size:15px;padding-left:0">完成情况</em>
                  <a-switch :defaultChecked="defaultChecked" disabled/><br /><br />
                  <!---拉取头像  --->
               <a-avatar icon="user" style="margin-top:0px" :size="37" :src="this.taskPhoto"/>
               <br />
               <a-range-picker
                  :defaultValue="[moment(this.t_begin), moment(this.t_end)]"
                  style="margin-top:17px;width:397px"
                  disabled
               />
               <br /><br />
               <div>
               <p>
               <a-input v-model="taskRemarks" style="width:397px;" disabled/>
               <br /><br />

                <!--优先级-->                             
               <a-tag
                    v-if="taskPriority=='1'"
                    color="gray"
                    :visible="true"
                    style="font-size:16px;text-align:center;width:60px;height:23px"
                >较低</a-tag>
                <a-tag
                    v-if="taskPriority=='2'"
                    color="green"
                    :visible="true"
                    style="font-size:16px;text-align:center;width:60px;height:23px"
                >普通</a-tag>
                <a-tag
                    v-if="taskPriority=='3'"
                    color="orange"
                    :visible="true"
                    style="font-size:16px;text-align:center;width:60px;height:23px"
                >紧急</a-tag>
                <a-tag
                    v-if="taskPriority=='4'"
                    color="red"
                    :visible="true"
                    style="font-size:16px;text-align:center;width:60px;height:23px"
                >非常紧急</a-tag>
               <br /><br />
               <div style="margin-top:-10px">
                  <div id="tags">
                     <div style="margin-left:2px;margin-top:3px">
                        <template v-for="(tag) in taskLabel">
                           <a-tooltip v-if="tag.length > 20" :key="tag" :title="tag">
                              <a-tag
                                 :key="tag"
                                 
                                
                              >{{ `${tag.slice(0, 20)}...` }}</a-tag>
                           </a-tooltip>
                           <a-tag
                              v-else
                              :key="tag"
                              
                              color="#003366"
                              style="font-size:14px;text-align:center;height:22px"
                             
                           >{{ tag }}</a-tag>
                        </template>
                     </div>
                  </div>
               </div>
           </div>
       </div>
           </div>
       </div>
    </div>
    </div>
</template>

<script>
import moment from 'moment';
export default {
    name: "Remind",
    components: {},
    data() {
        return {
            defaultChecked:false,
            remindData:[{
                name: "任务3",
                t_remind: "2020-05-30 21:00:00",
                type: "task:22"
            },
            {
                name: "日程4",
                t_remind: "2020-05-30 21:00:00",
                type: "schdule:22"
            }],
            messageType:"",
            messageId:1,
            taskData:null,
            taskLabel:[],
            taskPhoto:null,
            taskPriority:1,
            taskRemarks:"",
            t_begin:null,
            t_end:null,
        };
    },
    mounted() {
      //this.getData();
      this.getTaskData();
    },
    methods: {
        moment,
        handleClose(removedTag) {
            const tags = this.tags.filter(tag => tag !== removedTag);
            console.log(tags);
            this.tags = tags;
        },
        showDetails(type){
            var a=type.split(':');
            this.messageType=a[0];
            this.messageId=parseInt(a[1]);
            if(this.messageType=='task'){//显示任务详情
                if(document.getElementById("right1").style.display=="block")
                    document.getElementById("right1").style.display="none";
                else
                    document.getElementById("right1").style.display="block"
            }
            console.log(this.messageType);
        },
        getData:function(){
            this.$http.get(`/api/project/${this.$store.state.project.id}/remind`,{params:{project_id:this.$store.state.project.id}})
            .then(doc=>{
                    if(doc.data.data)
                        this.remindData=doc.data.data;
                    else
                        this.remindData=[];
            }).catch(err=>{
                        this.$alert("未知错误", "false");  //服务器还没搭起来
            })
        },
        getTaskData:function(){
            this.$http.get(`/api/project/${this.$store.state.project.id}/task/info?id=${this.messageId}`,
            {params:{project_id:this.$store.state.project.id,task_id:this.messageId}})
            .then(doc=>{
                    if(doc.data.data)
                        this.taskData=doc.data.data;
                    else
                        this.taskData=null;
            }).catch(err=>{
                        this.$alert("未知错误", "false");  //服务器还没搭起来
            })
            this.defaultChecked=this.taskData.finish;
            this.taskRemarks=this.taskData.remarks;
            this.taskPriority=this.taskData.priority;
            this.t_begin=this.taskData.t_begin;
            this.t_end=this.taskData.t_end;
            this.taskLabel=this.taskData.label;
            this.taskPhoto=this.taskData.originator.photo;
            
        },
    }
};
</script>



<style scoped>
#more{
    display: flex;
}
.em1 {
   font-style: normal;
   font-size: 16px;
   padding-left: 0px;
}
.em11 {
   font-style: normal;
   font-size: 15px;
   padding-left: 11px;
   color: gray;
   font-family: "Microsoft YaHei";
}
#contextleft{
    width:130px;
}
#contextright{
    width:363px;
    margin-top:9.5px;
}
#all{
    margin-top:50px;
}
#right1{
    margin-left:600px;
    width:800px;
    display: none;
    margin-top:-150px;
}
#left1{
    margin-top:10px;
    margin-left:50px;
    width:400px;
    border:1px solid LightGrey;
}
.ant-list-item-meta-title > a {
    color: rgba(0, 0, 0, 0.65);
    -webkit-transition: all 0.3s;
    transition: all 0.3s;
    font-size: 17px;
    margin-left:20px;
}
.ant-list-item-meta-description {
    color: rgba(80, 63, 63, 0.8);
    font-size: 17px;
    line-height: 20px;
    margin-left:20px;
}
</style>
 