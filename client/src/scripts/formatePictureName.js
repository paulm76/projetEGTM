export default function formatePictureName(escape,room){
	var charNotAllowed = ['à', 'è', 'ì', 'ò', 'ù', 'á', 'é', 'í', 'ó', 'ú', 'ý', 'â', 'ê', 'î', 'ô', 'û', 'ã', 'ñ', 'õ', 'ä', 'ë', 'ï', 'ö', 'ü', 'ÿ', 'œ', 'ç'];
	var formatedEscape = escape.normalize('NFD').replace(/[\u0300-\u036f]/g, "").replace(/ /g, "").toLowerCase();
	var formatedRoom = room.normalize('NFD').replace(/[\u0300-\u036f]/g, "").replace(/ /g, "").toLowerCase();
	return "public/images/" + formatedEscape + "/" + formatedRoom + ".png";
}