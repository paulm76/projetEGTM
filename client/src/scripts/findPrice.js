export default function findPrice(date, tarifsCreux, tarifsPlein, timeChange, datesSpeciales){
	var day = date.split('T')[0];
	var daySplit = day.split('-');
	var time = date.split('T')[1];
	var timeSplit = time.split(':');
	if (tarifsPlein && tarifsPlein!='null'){
		if (timeChange && timeChange!='null'){
			if (isFullTime(timeSplit,timeChange)){
				return tarifsPlein;
			}
		}
		if (datesSpeciales && datesSpeciales != null){
			datesSpeciales = splitDates(datesSpeciales);
			if (isSpecialDate(daySplit, datesSpeciales)){
				return tarifsPlein;
			}
		}
	}
	return tarifsCreux;
}

function isFullTime(time, timeChange){
	var timeChangeSplit = timeChange.split(':');
	if (time[0]>=timeChangeSplit[0]){
		if (time[1]>=timeChangeSplit[1]){
			return true;
		}
	}
	return false;
}

function splitDates(datesSpeciales){
	var datesSpecialesLen = datesSpeciales.length;
	var formatedDates = [];
	for (var i=0; i<datesSpecialesLen; i++){
		if (typeof datesSpeciales[i] == "string"){
			formatedDates.push(datesSpeciales[i].split('-'));
		} else {
			var dateLen = datesSpeciales[i].length;
			var temp = [];
			for (var j=0; j<dateLen; j++){
				temp.push(datesSpeciales[i][j].split('-'));
			}
			formatedDates.push(temp);
		}
	}
	return formatedDates;
}

function isSpecialDate(day, datesSpeciales){
	var datesSpecialesLen = datesSpeciales.length;
	for (var i=0; i<datesSpecialesLen; i++){
		if (typeof datesSpeciales[i][0] == "string"){
			if (datesSpeciales[i][0] == day[0] && datesSpeciales[i][1] == day[1] && datesSpeciales[i][2] == day[2]){
				return true;
			}
		} else {
			var dateLen = datesSpeciales[i].length;
			if (datesSpeciales[i][0][0] < day[0] && datesSpeciales[i][1][0] > day[0] && datesSpeciales[i][0][1] < day[0] && datesSpeciales[i][1][1] > day[0] && datesSpeciales[i][0][2] < day[0] && datesSpeciales[i][1][2] > day[0]){
				return true;
			}
		}
	}
	return false;
}