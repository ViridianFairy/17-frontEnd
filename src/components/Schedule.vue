<template>
    <div id="wrapper">
        <div id="more">
            
    <a-button block @click="showModal" size="large">
      添加日程
    </a-button>

    <a-modal
      title="添加日程"
      :visible="visible"
      :confirm-loading="confirmLoading"
      @ok="handleOk"
      @cancel="handleCancel"
      okText="保存"
      cancelText="取消"
    >
    <div id="fl">
        <div id="iconleft">
            <a-icon type="edit" style="fontSize:22px;color:gray;;margin:15px;"/>
            <a-icon type="calendar" style="fontSize:22px;color:gray;margin:15px;"/>
            <a-icon type="clock-circle" style="fontSize:22px;color:gray;margin:15px;"/>
            <a-icon type="pushpin" style="fontSize:22px;color:gray;margin:15px;"/>
            <a-icon type="tag" style="fontSize:22px;color:gray;margin:15px;"/>
        </div>

        <div id="contentright">
        <a-input placeholder="填写日程内容" autoSize allowClear style="width:400px;" v-model="content"/>
        <a-date-picker @change="onChange" style="margin-top:20px;width:400px" placeholder="请选择日期"/>
        <a-date-picker @change="onChange2" style="margin-top:20px;width:400px" placeholder="请选择提醒时间"/>
        <p></p>
        <!-- <a-date-picker
            :mode="mode1"
            showTime
            @openChange="handleOpenChange1"
            @panelChange="handlePanelChange1"
            placeholder="请选择提醒时间"
            style="margin-top:30px;width:400px"
            /> -->
            <p></p>
        <a-input placeholder="填写备注" v-model="remarks" autoSize allowClear style="margin-top:30px;width:400px"/>
        <p></p>
        <div id="tags">
                <div>
                <template v-for="(tag, index) in tags">
                <a-tooltip v-if="tag.length > 20" :key="tag" :title="tag">
                <a-tag :key="tag" :closable="index !== 0" @close="() => handleClose(tag)">
                {{ `${tag.slice(0, 20)}...` }}
                </a-tag>
            </a-tooltip>
            <a-tag v-else :key="tag" :closable="index !== 0" color="#003366" style="font-size:15px;text-align:center;height:25px;margin-top:10px" @close="() => handleClose(tag)">
                {{ tag }}
            </a-tag>
            </template>
            <a-input
            v-if="inputVisible"
            ref="input"
            type="text"
            size="large"
            :style="{ width: '78px' }"
            :value="inputValue"
            @change="handleInputChange"
            @blur="handleInputConfirm"
            @keyup.enter="handleInputConfirm"
            />    
            <a-tag v-else @click="showInput" style="background:#fff; height:25px;borderStyle: dashed">
            <a-icon type="plus" /> <em style="font-size:14px;font-style:normal;color:gray;padding-left:0">添加标签</em>
            </a-tag>   
        </div>      
        </div>    
    </div>   

</div>
    </a-modal>
        

            <!--a-button block size="large" @click="$router.push('/scheduleAdd')">添加日程</a-button-->
            <p><br /><br /></p>
            <a-divider>过去的日程</a-divider>
            <p><br /><br /></p>
            <a-collapse v-model="activeKey">
            <!--   数据需要部分 以下为模拟  ---->
            <!--   任务面板key=123         ---->
				<a-collapse-panel header="2020年5月" key="5">
                <div class="content">
						 	<div v-for="(i,index) in doc" style="margin:10px 0;">
								 <a-divider v-if="index!=0"/>
                    		<p>{{i.time}}<em>
									  {{i.content}}
								</em></p>
                    		
						 	</div>
                </div>
            </a-collapse-panel>
            <!-- <a-collapse-panel header="2020年4月" key="4">
                <div class="content">
                    <p>4月26日<em>团队alpha冲刺</em></p>
                    <a-divider/>
                    <p>4月18日<em>数据库设计</em></p>
                    <a-divider />
                    <p>4月2日<em>类图分析</em></p>
                </div>
            </a-collapse-panel> -->
            </a-collapse>
        </div>
    </div>
</template>
 
<script>
import {toDateTime,getFirstMsg} from '../js/code.js'
export default {
   name: "Schedule",
   components: {},
   data() {
      return {
        visible: false,
        confirmLoading: false,
        customStyle:
        'background: gray;border-radius: 8px;margin-bottom: 50px;border:10;',
        mode1: 'time',
        tags: ['标签'],
        inputVisible: false,
		  inputValue: '',
		  doc:[],
		  activeKey:"",
		  dateString1:"",
		  dateString2:"",
		  content:"",
		  remarks:"",
      };
	}, 
	mounted(){
		this.update()
	},
   methods: {
		update(){
			this.$http
         .get(`/api/project/${this.$store.state.project.id}/schedule`, {
				project_id:this.$store.state.project.id,
			})
         .then(doc => {
            var code = doc.data.status;
            var msg = doc.data.msg;
				if (code == 0)
					this.doc = doc.data.data	
				this.doc.forEach(i=>{
					var d = new Date(i.t_set)
					i.time = (d.getMonth()+1)+'月'+d.getDate()+'日'
				})	
         })
		},
    onChange(date, dateString) {
		this.dateString1 = dateString
      console.log(date, dateString);
    },
    onChange2(date, dateString) {
		this.dateString2 = dateString
      console.log(date, dateString);
    },
    handleOpenChange1(open) {
      if (open) {
        this.mode1 = 'time';
      }
    },
    handlePanelChange1(value, mode) {
      this.mode1 = mode;
    },
    handleClose(removedTag) {
      const tags = this.tags.filter(tag => tag !== removedTag);
      console.log(tags);
      this.tags = tags;
    },

    showInput() {
      this.inputVisible = true;
      this.$nextTick(function() {
        this.$refs.input.focus();
      });
    },

    handleInputChange(e) {
      this.inputValue = e.target.value;
    },

    handleInputConfirm() {
      const inputValue = this.inputValue;
      let tags = this.tags;
      if (inputValue && tags.indexOf(inputValue) === -1) {
        tags = [...tags, inputValue];
      }
      console.log(tags);
      Object.assign(this, {
        tags,
        inputVisible: false,
        inputValue: '',
      });
    },

    showModal() {
      this.visible = true;
    },

    handleOk(e) {
      this.ModalText = 'The modal will be closed after two seconds';
		this.confirmLoading = true;
		this.$http
         .post(`/api/project/${this.$store.state.project.id}/schedule`, {
				project_id:this.$store.state.project.id,
				t_set:toDateTime(this.dateString1),
				t_remind:toDateTime(this.dateString2),
				content:this.content,
				remarks:this.remarks,
				//label:this.$store.state.project.id,
			})
         .then(doc => {
            var code = doc.data.status;
            var msg = doc.data.msg;
				if (code == 0)
					this.update()	
				console.log(this.doc)		
         })
      setTimeout(() => {
        this.visible = false;
        this.confirmLoading = false;
      }, 0);
    },

    handleCancel(e) {
      console.log('Clicked cancel button');
      this.visible = false;
    },
  },  
};
</script>

<style scoped>
#more{   
    margin: 20px 40px;
    background-color:	white;
    /* height: 500px; */
} 
#fl{
    display: flex;
    margin-bottom: -50px;
}
em{
    padding-left:40px;
    font-style: normal;
}
.content{
    margin:0 auto;
    margin-left: 24px;
}
p{
    font-size: 15px;
    margin:-8px 0;
}
#iconleft{
   margin-left: 0px;
   width: 70px;
}
#contentright{
   width: 500px;
   height: 300px;
   margin-top:10px;
}

#tags{
  margin-top:18px ;
}
</style>