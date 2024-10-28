<template>
	<view class="page">
		<button type="default" @click="goto('add')" class="btn">添加联系人</button>
		<button type="default" @click="goto('list')" class="btn">查询联系人</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		onLoad() {

		},
		methods: {
			goto(e) {
				console.log(e)
				uni.navigateTo({
					url: "/pages/contact/" + e + "/" + e
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.btn {
		margin: 20rpx 0;
	}
</style>
