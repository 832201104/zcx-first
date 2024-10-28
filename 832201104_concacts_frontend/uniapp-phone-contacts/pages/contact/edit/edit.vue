<template>
  <view class="page">
    <view class="form-card">
      <form @submit="save">
        <view class="form-item">
          <view class=""> 姓名 </view>
          <input name="name" v-model="contact.name" placeholder="姓名" />
        </view>
        <view class="form-item">
          <view class=""> 住址 </view>
          <input name="job" v-model="contact.address" placeholder="住址" />
        </view>
        <view class="form-item">
          <view class=""> 电话 </view>
          <input name="mobile" v-model="contact.tel" placeholder="电话" />
        </view>
        <!-- 		<view class="form-item">
					<input name="email" v-model="contact.email" placeholder="电子邮箱" />
				</view> -->
        <button class="form-item btn-submit" form-type="submit">
          保&nbsp;&nbsp;存
        </button>
      </form>
    </view>
  </view>
</template>

<script>
import { showToast } from "@/utils/toast";
export default {
  data() {
    return {
      contact: {},
      contactId: null,
      //   view: true,
    };
  },
  onLoad(param) {
    if (param.id) {
      this.contactId = param.id;
      this.view = param.view;
      console.log(param, this.view, "param");
      console.log("联系人id:" + this.contactId);
      this.getContacts();
    }
  },
  methods: {
    async getContacts() {
      try {
        // let res = await uniCloud.callFunction({
        // 	name: 'contact',
        // 	data: {
        // 		action: 'list',
        // 		params: null
        // 	}
        // })
        console.log(this.contactId, "contactId");
        uni.request({
          url: "http://127.0.0.1:8001/search?id=" + this.contactId, // 请求的URL
          methodt: "GET", // 请求方式
          success: (res) => {
            // 请求成功的回调函数，res 是响应对象
            console.log("请求成功", res.data);
            // 可以在这里处理响应数据，如更新页面状态等
            this.contact = res.data[0];
            console.log(this.contact);
          },
          fail: (err) => {
            // 请求失败的回调函数，err 是错误对象
            console.error("请求失败", err);
            // 可以在这里处理错误，如显示错误提示等
          },
        });
      } catch (e) {
        console.error(e);
      }
    },
    async save() {
      try {
        // let res = await uniCloud.callFunction({
        // 	name: 'contact',
        // 	data: {
        // 		action: 'list',
        // 		params: null
        // 	}
        // })
        // const saveData = new FormData( this.contact)
        uni.request({
          url: `http://127.0.0.1:8001/edit?id=${this.contactId}&name=${this.contact.name}&tel=${this.contact.tel}&address=${this.contact.address}`, // 请求的URL
          methodt: "GET", // 请求方式
          success: (res) => {
            showToast("更新成功", "success");
            setTimeout(() => {
              uni.navigateBack({
                success: (e) => {
                  // 发送全局消息
                  uni.$emit("refreshContactList");
                },
              });
            }, 1000);

            // 请求成功的回调函数，res 是响应对象
            console.log("请求成功", res.data);
            // 可以在这里处理响应数据，如更新页面状态等
            this.contacts = res.data;
          },
          fail: (err) => {
            // 请求失败的回调函数，err 是错误对象
            console.error("请求失败", err);
            // 可以在这里处理错误，如显示错误提示等
          },
        });
      } catch (e) {
        console.error(e);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
