class Dialog {

	confirmDelete(that, msg) {
		return that.$bvModal.msgBoxConfirm(msg, {
			title: 'Confirm Delete',
			size: 'sm',
			buttonSize: 'md',
			okVariant: 'danger',
			okTitle: 'YES',
			cancelTitle: 'NO',
			footerClass: 'p-2',
			centered: true
		})
		.then(value => {
			return value
		})
		.catch(error => console.log(error))
	}

	okMessage(that, msg) {
		return that.$bvModal.msgBoxOk(msg, {
			title: 'Confirm Delete',
			size: 'sm',
			buttonSize: 'md',
			okVariant: 'primary',
			cancelTitle: "",
			footerClass: 'p-2',
			hideHeader: true,
			centered: true
		})
		.catch(error => console.log(error))
	}
}

export default new Dialog()