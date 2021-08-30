import React, {forwardRef} from "react";
import FruitCard from "../Drawers/FruitCard";
import BuyCard from "../Drawers/BuyCard";
import InfoCard from "../Drawers/InfoCard";

export const RenderContent = forwardRef(({drawerType, currentPartner, closeBottomDrawer, navigation}, ref) => {

    if (drawerType === 'buy') {
        if (currentPartner.partner_render_type === 'with_images')
            return <FruitCard
                navigation={navigation}
            />
        return (
            <BuyCard
                navigation={navigation}
                closeDrawer={closeBottomDrawer}
            />)
    } else if (drawerType === 'info')
        return <InfoCard/>
})
