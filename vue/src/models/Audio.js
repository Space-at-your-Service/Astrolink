export default class Audio {
	constructor( id=2, user="", rooms="", file=undefined, seenBy="") {
		this.id = id
		this.user = user
		this.rooms = rooms
		this.file = file
		this.seenBy = seenBy
	}
}