export function showToast(title, icon, duration = 1500, position = 'center') {
	uni.showToast({
		title: title,
		icon: icon,
		duration: duration,
		position: position
	})
}
