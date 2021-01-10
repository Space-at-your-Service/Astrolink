class StringFormat {

	toNick(string) {
		return string.toLowerCase().replace(/ /g, "-");
	}
}

export default new StringFormat()