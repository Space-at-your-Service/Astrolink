class Notif {

	toastSuccess(that, title, msg) {
		return that.$bvToast.toast(msg, {
			title: title,
			variant: 'success',
			solid: true
		})
	}
}

export default new Notif()