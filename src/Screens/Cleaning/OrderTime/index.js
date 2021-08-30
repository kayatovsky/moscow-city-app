import React, {useEffect} from "react";
import {ScrollView} from "react-native";
import Template from '../Components/Template'
import {useDispatch, useSelector} from "react-redux";
import {chooseNextDay, setCurrentServiceASAP, setTime, setTimePickError} from "src/Slices/payment";
import RadioButtonInverted from "src/Components/Common/RadioButtonInverted";
import useScaleFactor from "src/Hooks/useScaleFactor";


// todo: move this func to helpers
// todo: find out what this function for???
export const getNextHour = (delay_before_order) => {
    const today = new Date();
    let currentHour = today.getHours();
    if (delay_before_order)
        currentHour += delay_before_order / 60 / 60
    return currentHour + 1;
}

/**
* Function that generates available hours set
 * @param length: {Number} - length of generated array
 * @param startNumber {Number} - number, which will be the first for generated set
 * @param step {Number} - step between generated samples
* */
const generateArray = (length, startNumber, step = 1) => {
    const array = [];
    for (let i = startNumber; i < startNumber + length; i += step)
        array.push(i);
    return array;
}

/** // todo: write docstring
 * Function that generates available hours set
 * @param length: {Number} - length of generated array
 * @param startNumber {Number} - number, which will be the first for generated set
 * @param step {Number} - step between generated samples
 * */
export const getAvailableDays = (workdays, step = 1) => {
    const today = new Date();
    const day = today.getDay();
    // increment days, cause ???
    return generateArray(7, day, step)
        .map(item => item % 7)
        .filter(item => workdays.includes(item))
}

const todaySeconds = () => {
    const time = new Date();
    return time.getSeconds() + (60 * time.getMinutes()) + (60 * 60 * time.getHours());
}


export default function ({navigation}) {
    const dispatch = useDispatch();
    let {
        // index of chosen day
        chosenDay,
        // index of today day
        currentDay,
        chosenTime,
        currentPartner,
        currentService,
        isASAP
    } = useSelector(state => state.payment);
    const {verticalScale} = useScaleFactor()
    const {workdays, start_workday, end_workday, work_unit_interval} = currentPartner;

    // get available time slots for current service, works only for services with cell_render_type === 'interval'
    const {time_cells} = currentService;


    const availableDaysArray = workdays.split("").map(item => Number(item));
    getAvailableDays(availableDaysArray);

    const days = {
        1: "Понедельник",
        2: "Вторник",
        3: "Среда",
        4: "Четверг",
        5: "Пятница",
        6: "Суббота",
        0: "Воскресенье"
    }
    const jsDaysToPythonDays = {
        1: 0,
        2: 1,
        3: 2,
        4: 3,
        5: 4,
        6: 5,
        0: 6
    }

    // todo: make this code cleanlier or write comments
    // delay_before_order
    const generateHours = (isToday) => {
        const nextHour = getNextHour(currentService.delay_before_order);
        const res = []
        for (let i = 0; i < 24; i += work_unit_interval / 3600) {
            const timestamp = ((isToday ? nextHour : 0) + i) * 3600;
            if (timestamp <= end_workday && timestamp >= start_workday) {
                const date = ((isToday ? nextHour : 0) + i) % 24;
                if (!(isToday && date === 0))
                    res.push(date)
            }
        }
        return res;
    }

    let hours
    if (time_cells.start_end_interval) {
        console.log("ABOBA: ", jsDaysToPythonDays[(currentDay + chosenDay) % 7])
        const day = time_cells?.start_end_interval?.weeks[0][jsDaysToPythonDays[(currentDay + chosenDay) % 7]];
        hours = day.map(item => item.start / 3600);
    }
    else {
        hours = generateHours(chosenDay === 0);
    }
    console.log("GENERATED HOURS: ", hours)
    useEffect(() => {
        if (generateHours(chosenDay === 0).length === 0) {
            dispatch(chooseNextDay())
        }
    }, [chosenDay])


    const getTimeText = item => {
        let minutes = Math.floor((item - Math.floor(item)) * 60);
        // cast 8 to '08' string
        if (minutes < 10)
            minutes = '0' + String(minutes)
        item = Math.floor(item);
        if (currentPartner.cell_render_type === 'interval')
            return `${item}:${minutes}- ${item + 1 === 24 ? minutes : item + 1}:${minutes}`
        return `${item}:${minutes}`
    }


    return (
        <Template
            navigation={navigation}
            primaryText={chosenDay === 0 ? "Сегодня" : days[(chosenDay + currentDay) % 7]}
            withInformationIcon={false}
            withTimeChoose
            withScrollView={false}
        >
            <ScrollView
                showsVerticalScrollIndicator={false}
                style={{marginBottom: 20 * verticalScale, height: '73%'}}
            >
                {/*render asap option only for today*/}
                {todaySeconds() > start_workday && chosenDay === 0 && currentService.is_asap && (
                    <RadioButtonInverted
                        disabled={!isASAP}
                        primaryText='Как можно скорее'
                        onChange={() => {
                            dispatch(setTimePickError(false));
                            dispatch(setCurrentServiceASAP(!isASAP));
                            navigation.goBack();
                        }}
                        value={isASAP}
                        withBorder
                    />
                )
                }
                {hours.map(item =>
                    <RadioButtonInverted
                        key={item}
                        disabled={item !== chosenTime}
                        primaryText={getTimeText(item)}
                        onChange={value => {
                            dispatch(setTime(value));
                            // reset error state, cause we have chosen time
                            dispatch(setTimePickError(false));
                            // reset ASAP state, cause we have chosen certain time
                            dispatch(setCurrentServiceASAP(false));
                            navigation.goBack();
                        }}
                        value={item}
                        withBorder
                    />
                )}
            </ScrollView>
        </Template>
    )
}
