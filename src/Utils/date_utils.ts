// todo: write docs for all functions here

interface MonthType {
    [key: string]: string;
}

const months : MonthType = {
    '01' : 'Января',
    '02' : 'Февраля',
    '03' : 'Марта',
    '04' : 'Апреля',
    '05' : 'Мая',
    '06' : 'Июня',
    '07' : 'Июля',
    '08' : 'Августа',
    '09' : 'Сентября',
    '10' : 'Октября',
    '11' : 'Ноября',
    '12' : 'Декабря'
}

export const days = {
    1: "Понедельник",
    2: "Вторник",
    3: "Среда",
    4: "Четверг",
    5: "Пятница",
    6: "Суббота",
    0: "Воскресенье"
}

const hoursMapper = {
    1: 'час',
    2: 'часа',
    3: 'часа',
    4: 'часа',
    5: 'часов',
    6: 'часов',
    7: 'часов',
    8: 'часов',
    9: 'часов',
    10: ''
}
const getHourText = hour => {
    if (hour === 1 || hour === 21)
        return 'час'
    if ((hour >= 2 && hour <=4) || hour >= 22)
        return 'часа'
    if (hour >= 5 && hour <= 20)
        return 'часов'
}

export const getNextHour = () => {
    const today = new Date();
    const currentHour = today.getHours();
    return currentHour + 1;
}

/**
 *
 * */
export const getTodayStartTime = () : number => {
    const now : Date = new Date();
    const startOfDay : Date = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    console.log("Start of dday: ", startOfDay)
    // @ts-ignore
    console.log("RETURNS: ", startOfDay / 1000)

    // @ts-ignore
    return startOfDay / 1000;
}

export const getCorrectChosenDay = (chosenDay) => {
    const day = getCurrentDay();
    return day + chosenDay
}

export const parserDateForOrdersHistory = (inputDate, isHistory=false) => {
    const regExp = /(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})/
    const arrayDate = inputDate.match(regExp);
    if ((Number(arrayDate[1]) <= 2020))
        return "Как можно скорее"
    return arrayDate[3] + " " + months[arrayDate[2]] + " на " + arrayDate[4] + `:${arrayDate[5]}`
}

export const getCurrentDay = () => {
    const time = new Date();
    return time.getDay();
}

// todo: what is this function for???
export const parseTime = (startTime, endTime) => {
    return [parseTimeUtil(startTime), parseTimeUtil(endTime)]
}
// todo: what is this function for???
const parseTimeUtil = (time) => {
    let hours : number | string = Math.floor(time / 60 / 60);
    if (hours < 10)
        hours = `0${hours}`
    let minutes : number | string = Math.round(time / 60) % 60;
    if (minutes < 10)
        minutes = `0${minutes}`
    return `${hours}:${minutes}`
}

// todo: what is this function for???
export const parseWorkdays = rawString => {
    const workDays = rawString.split('');
    if (workDays.length === 7)
        return "Без выходных"
    else
        return Object.entries(days).reduce((acc, [key, value],) => {

            if (!workDays.includes(key))
                return acc + `${value}, `
            else return ""
        }, "").slice(0, -2)
}

// todo: what is this function for???
/**
 * Function, that converts seconds into human readable format
 * Example: 86400 -> 24 часа
 * */
export const parseEstimatedCompletionTime = (time) => {
    const hours = Math.floor(time / 60 / 60);
    const minutes = Math.round(time / 60) % 60;
    if (hours === 0)
        return `${minutes} минут`
    if (minutes === 0)
        return `${hours} ${getHourText(hours)}`
    return `${hours} ${getHourText(hours)}, ${minutes} минут`
}


// todo: fix this later
export const generateHours = (isToday, start_workday, end_workday) => {
    const nextHour = getNextHour();
    const res = [];
    for (let i = 0; i < 24; i++) {
        // todo: find out what is it
        const timestamp = ((isToday ? nextHour : 0) + i) * 3600;

        if (timestamp <= end_workday && timestamp >= start_workday) {
            const date = ((isToday ? nextHour : 0) + i) % 24;
            // todo: fix all these shitty ifs
            if (!(isToday && date === 0))
                res.push(date);
        }
    }
    return res;
}
