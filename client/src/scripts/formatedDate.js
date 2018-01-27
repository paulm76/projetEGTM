export default function formatedDate(date){
	var days = ["Lundi","Mardi","Mercredi","Jeudi","Vendredi","Samedi","Dimanche"];
	var months = ["Janvier","Fevrier","Mars","Avril","Mai","Juin","Juillet","Aout","Septembre","Octobre","Novembre","Décembre"];
	var year = date.substring(0,4);
	var yearInt = parseInt(year);
	var month = date.substring(5,7);
	var monthInt = parseInt(month);
	var day = date.substring(8,10);
	var dayInt = parseInt(day);
	var hour = date.substring(11,13);
	var minute = date.substring(14,16);
	var dayNumber = (dayInt+yearInt+Math.trunc(yearInt/4)-Math.trunc(yearInt/100)+Math.trunc(yearInt/400)+Math.trunc((31*monthInt)/12))%7;
	return days[dayNumber] + ' ' + day + ' ' + months[month-1] + ' ' + year + ' à ' + hour + ':' + minute;
}