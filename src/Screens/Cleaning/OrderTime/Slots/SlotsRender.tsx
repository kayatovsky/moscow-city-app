import React, {Fragment} from 'react'

/**
 * @property interval - time in seconds, that is required for certain service
 * @property start - time in seconds, that indicates when service is available
 * */
interface TimeSlot {
    interval: number,
    start: number,
}

type DayType = Array<TimeSlot>;
type WeekType = Array<DayType>;

interface TimeCell {
    id: number,
    partner_service_id: number,
    weeks: Array<WeekType>
}


const getAvailableDays = (time_cell : TimeCell): Array<number> => {
    // assume, that for now we have available services for first week only
    const week: WeekType = time_cell.weeks[0];

}

function SlotsRender({time_cell} : {time_cell: TimeCell}) : JSX.Element {

    return (
        <Fragment>

        </Fragment>
    )
}

export default SlotsRender
