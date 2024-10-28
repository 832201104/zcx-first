<template>
  <view class="page">
    <view class="top_box">
      <view class="titleName">通讯录</view>
      <view class="add-button" @click="onAdd"></view>
    </view>

    <view class="search-container">
      <input
        type="text"
        placeholder="请输入搜索内容"
        v-model="searchInput"
        class="search-input"
      />
      <view class="search-button" @click="onSearch"></view>
    </view>
    <view class="list-item" v-for="(item, i) in contacts" :key="i">
      <view @longpress="remove(item._id)" class="row">
        <view class="img_box"></view>
        <view class="data-item" @click="showInfo(item.id)">{{
          item.name
        }}</view>
        <!-- <view class="data-item">手机号：{{item.tel}}</view> -->
        <!-- <view class="data-item">地址：{{item.address}}</view> -->
        <!-- <view class="data-item">邮箱：{{item.email}}</view> -->
        <!-- <view class="flex-row action">
          <button size="mini" @click="edit(item.id)" type="primary">
            编辑
          </button>
          <button size="mini" @click="remove(item.id)" type="warn">删除</button>
        </view> -->
      </view>
      <!-- <view class="flex-row action">
				<button size="mini" @click="edit(item.id)" type="primary">编辑</button>
				<button size="mini" @click="remove(item.id)" type="warn">删除</button>
			</view> -->
    </view>
  </view>
</template>

<script>
import { showToast } from "@/utils/toast";
export default {
  data() {
    return {
      contacts: [],
    };
  },

  onLoad() {
    uni.$on("refreshContactList", this.getContacts);
    this.getContacts();
  },
  methods: {
    async onSearch() {
      // 处理搜索逻辑
      console.log("搜索内容:", this.searchInput);
      try {
        uni.request({
          url: "http://127.0.0.1:8001/search?name=" + this.searchInput, // 请求的URL
          method: "GET", // 请求方式
          success: (res) => {
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
    async getContacts() {
      try {
        uni.request({
          url: "http://127.0.0.1:8001/search", // 请求的URL
          method: "GET", // 请求方式
          success: (res) => {
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
    edit(id) {
      console.log("edit...");
      uni.navigateTo({
        url: `../edit/edit?id=${id}&view=${true}`,
      });
    },
    showInfo(id) {
      console.log("edit...");
      uni.navigateTo({
        url: `../edit/info?id=${id}&view=${false}`,
      });
    },
    onAdd() {
      uni.navigateTo({
        url: "/pages/contact/" + "add" + "/" + "add",
      });
    },
    remove(id) {
      uni.showModal({
        title: "删除确认",
        content: "真的要删除该联系人吗？",
        success: async (e) => {
          if (e.confirm) {
            try {
              uni.request({
                url: "http://127.0.0.1:8001/remove/" + id, // 请求的URL
                method: "GET", // 请求方式
                success: (res) => {
                  showToast("删除成功", "success");
                  setTimeout(() => {
                    this.getContacts();
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
          }
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.top_box {
  display: flex;
  margin-bottom: 15px;
}
.titleName {
  width: 80%;
  text-align: center;
  margin-bottom: 10rpx;
}
.search-container {
  display: flex;
  align-items: center;
  background-color: #ffffff; /* 确保容器不是灰色 */
  padding: 10px;
  border-radius: 5px; /* 可选，增加圆角 */
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1); /* 可选，增加阴影 */
}

.search-input {
  flex: 1; /* 输入框占据剩余空间 */
  padding: 5px;
  border: 1px solid #cccccc;
  border-radius: 5px 0 0 5px; /* 与搜索按钮圆角对接 */
}

.search-button {
  // background: ur1("../../../../static/addNode.png");
  background: url("../../../static/sousuo.png") no-repeat;
  background-size: 100% 100%;
  width: 30px; /* 设定按钮宽度 */
  height: 30px; /* 设定按钮高度 */
  border: none;
  margin-left: 10rpx;
  background-color: #ffffff; /* 确保按钮背景不是灰色 */
  color: #007aff; /* 设定按钮文字颜色 */
  font-size: 18px; /* 设定按钮文字大小 */
  border-radius: 0 5px 5px 0; /* 搜索按钮的圆角与输入框对接，新增按钮保持圆角 */
  cursor: pointer; /* 鼠标悬停时显示手型 */
  text-align: center;
  align-items: center;
}
.add-button {
  background: url("../../../static/addNode.png") no-repeat;
  background-size: 100% 100%;
  width: 30px; /* 设定按钮宽度 */
  height: 30px; /* 设定按钮高度 */
  border: none;
  background-color: #ffffff; /* 确保按钮背景不是灰色 */
  color: #007aff; /* 设定按钮文字颜色 */
  font-size: 18px; /* 设定按钮文字大小 */
  border-radius: 0 5px 5px 0; /* 搜索按钮的圆角与输入框对接，新增按钮保持圆角 */
  cursor: pointer; /* 鼠标悬停时显示手型 */
}

.add-button {
  margin-left: 10px; /* 新增按钮与搜索按钮之间的间距 */
  border-radius: 5px; /* 新增按钮保持圆角 */
}
.row {
  display: flex;
  // justify-content: space-between;
}
.list-item {
  border-bottom: 1rpx solid #f1f1f1;
  /* background-color: #e8e9ea; */
  font-size: 36rpx;
  padding: 10rpx;
}
.img_box {
  background: url("../../../static/tx.png") no-repeat;
  background-size: 100% 100%;
  width: 100rpx;
  height: 100rpx;
  margin-right: 20rpx;
}
.data-item {
  margin: 10rpx;
}

.action {
  justify-content: space-around;
  margin: 15rpx;
  button {
    margin: 0 10rpx;
  }
}
</style>
