
<template>
  <view class="page">
    <!-- <view class="touxiang_box">
      <view class="touxiang_bg"> </view>
    </view> -->
    <view class="form-card">
      <form @submit="save">
        <view class="touxiang_box">
          <view class="touxiang_bg"> </view>
          <view class="form-item">
            <input name="name" v-model="contact.name" placeholder="姓名" />
          </view>
        </view>
        <view class="form-item">
          <view class=""> 电话 </view>
          <input name="mobile" v-model="contact.tel" placeholder="电话" />
        </view>
        <view class="form-item">
          <view class=""> 生日 </view>
          <input name="job" v-model="contact.birthday" placeholder="生日" />
        </view>
        <view class="form-item">
          <view class=""> 备注 </view>
          <input name="job" v-model="contact.remark" placeholder="备注" />
        </view>

        <!-- 		<view class="form-item">
                      <input name="email" v-model="contact.email" placeholder="电子邮箱" />
                  </view> -->
        <button class="form-item btn-submit" form-type="submit" @click="add">
          保&nbsp;&nbsp;存
        </button>
        <!-- <button class="form-item btn-submit" form-type="submit">
          删&nbsp;&nbsp;除
        </button> -->
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
    };
  },
  methods: {
    async add(e) {
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
          url: `http://127.0.0.1:8001/add?name=${this.contact.name}&tel=${this.contact.tel}&birthday=${this.contact.birthday}&remark=${this.contact.remark}`, // 请求的URL
          methodt: "GET", // 请求方式
          success: (res) => {
            showToast("新增成功", "success");
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
.touxiang_box {
  width: 100%;
  height: 300rpx;
  background-color: #eff4f4;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .touxiang_bg {
    background: url("../../../static/tx.png") no-repeat;
    background-size: 100% 100%;
    width: 100rpx;
    height: 100rpx;
    margin-right: 20rpx;
  }
  .form-item {
    width: 50%;
    input {
      transform: translateX(50%);
      width: 50%;
    }
  }
}
</style>
