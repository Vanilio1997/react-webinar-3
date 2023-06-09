
const setMonth = (date)=> {
   let  monthNum =  date.getMonth();
   const monthsArr =  ['января', 'февраля', 'марта', 'апр', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря']

   return monthsArr[monthNum];
}

const setWeekDay = (date)=> {
   let weekNum= date.getDay() ;
   const weekArr = ['вс','пн','вт','ср','чт','пт','сб'];
  
   return weekArr[weekNum];
} 

export const setTimes = (date) => {
   const parsingDate = new Date(date);
   const dateObj = {year: 0, day: 0, hour: 0, minutes: 0, weekDay: '', month: ''};
   
   dateObj.year = parsingDate.getFullYear();
   dateObj.month = setMonth(parsingDate);
   dateObj.weekDay = setWeekDay(parsingDate);
   dateObj.day = parsingDate.getDate();
   dateObj.hour = parsingDate.getHours();
   dateObj.minutes = parsingDate.getMinutes();

   if(dateObj.minutes.toString().length === 1){
       dateObj.minutes = '0' + dateObj.minutes;
   }
   const finalDate = `${dateObj.day} ${dateObj.month} ${dateObj.year} в ${dateObj.hour}:${dateObj.minutes}`;
   return finalDate
}