export default class Audio {
	constructor( id=2, user="", rooms="", audiofile=undefined, seenBy="") {
		this.id = id
		this.user = user
		this.rooms = rooms
		this.audiofile = audiofile
		this.seenBy = seenBy
	}
}