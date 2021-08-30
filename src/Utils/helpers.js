export const calcTotalPriceHelper = (items, mapper) => {
    let result = 0;

    if (!mapper)
        return "0"

    Object.entries(mapper).forEach(([key, value]) => {
        const item = items && items.find(item => String(item.id) === key);
        result += item ? item.price * value : 0;
    })
    return result.toFixed()
}

export const getFruitsOrderItemsHelper = structure => {
    let base = [];

    Object.entries(structure).forEach(([key, value]) => {
        const array = new Array(value).fill(Number(key))
        base = base.concat(array)
    });
    return base;
}

export const getOrdersHelperData = (partnerID, partners) => {
    const partner = partners.find(item => item.id === partnerID)
    return [partner.name_ru, partner.partner_render_type]
}

/**
 * Function gets services for partners with render_type == 'images' and
 * returns all services mapped to categories
 * */
export const formImagesCardDataHelper = (services) => {
    let service_id;
    if (!services) {
        return []
    }
    if (services.length === 0) {
        return []
    }

    const data = {};
    services.forEach(item => {
        if (!item)
            return
        if (item.is_main) {
            service_id = item.id;
            return;
        }
        item && item.price_info && item.price_info.marks && item.price_info.marks.forEach(marks =>
            data[marks] ? data[marks].push(item) : data[marks] = [item]
        )
    })

    const name_of_svc_ru = Object.keys(data).map(item => ({
        name_of_svc_ru: item,
    }))
    return {data, name_of_svc_ru, service_id};
}
