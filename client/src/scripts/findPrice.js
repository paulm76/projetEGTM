import formatedDate from './formatedDate.js';
import datesSpecialesA from '../constants/Dates_Speciales_A.txt';
import datesSpecialesB from '../constants/Dates_Speciales_B.txt';
import datesSpecialesC from '../constants/Dates_Speciales_C.txt';

export default function findPrice(date, tarifsCreux, tarifsPlein, timeChange, datesSpecialesBool, zoneScolaire){
	var day = date.split('T')[0];
	var time = date.split('T')[1];
	var timeSplit = time.split(':');
	if (tarifsPlein && tarifsPlein!='null'){
		if (isWeekEnd(date)){
			return tarifsPlein;
		}
		if (timeChange && timeChange!='null'){
			if (isFullTime(timeSplit,timeChange)){
				return tarifsPlein;
			}
		}
		var datesSpeciales;
		if (datesSpecialesBool && datesSpecialesBool != 0){
			switch (zoneScolaire) {
				case "A":
					datesSpeciales = datesSpecialesA;
				break;
				case "B":
					datesSpeciales = datesSpecialesB;
				break;
				case "C":
					datesSpeciales = datesSpecialesC;
				break;
			}
			if (isSpecialDate(day, datesSpeciales)){
				return tarifsPlein;
			}
		}
	}
	return tarifsCreux;
}

function isWeekEnd(date){
	var day = formatedDate(date);
	var spaceRegex = / /g;
	var index = spaceRegex.exec(day).index;
	day = day.substring(0,index);
	if (day === "Samedi" || day === "Dimanche"){
		return true;
	}
	return false;
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

function isSpecialDate(day,datesSpeciales){
	datesSpeciales=datesSpeciales.split(',');
	var datesSpecialesLen = datesSpeciales.length;
	for (var i=0; i<datesSpecialesLen; i++){
		datesSpeciales[i]=datesSpeciales[i].split('/');
		if (datesSpeciales[i].length==1){
			if(datesSpeciales[i]=day){
				return true;
			}
		}
		else{
			if(datesSpeciales[i][0]<=day && day<=datesSpeciales[i][1]){
				return true;
			}
		}
	}
	return false;	
}