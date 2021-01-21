class Notif {

	toastSuccess(that, title, msg) {
		return that.$bvToast.toast(msg, {
			title: title,
			variant: 'success',
			solid: true
		})
	}

	toastInfo(that, title, msg) {
		return that.$bvToast.toast(msg, {
			title: title,
			variant: 'info',
			solid: true
		})
	}

	toastWarning(that, title, msg) {
		return that.$bvToast.toast(msg, {
			title: title,
			variant: 'warning',
			solid: true
		})
	}

	toastError(that, title, msg) {
		return that.$bvToast.toast(msg, {
			title: title,
			variant: 'danger',
			solid: true
		})
	}
}

export default new Notif()