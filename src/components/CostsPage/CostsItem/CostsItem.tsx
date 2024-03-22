import React from "react";
import { ICostsItemProps } from "../../../types"
import { getAuthDataFromLs, handleAlertMessage } from "../../../utils/auth";
import { deleteCostFx } from "../../../api/costsClient";
import { removeCost } from "../../../context";
import { Spinner } from "../../Spinner/Spinner";

export const CostsItem:React.FC<ICostsItemProps> = (
    {cost, index}: ICostsItemProps
) => {

    const [deleteSpinner, setDeleteSpinner] = React.useState(false);

    const deleteCost = async () => {
        setDeleteSpinner(true);

        const authData = getAuthDataFromLs();

        await deleteCostFx({
            url: '/cost',
            token: authData.access_token,
            costId: cost._id as string
        });

        setDeleteSpinner(false);
        removeCost(cost._id as string);
        handleAlertMessage({alertText: "Удалено", alertStatus: "success"})
    }
    return (
        <li id={cost._id as string} className="d-flex justify-content-between align-items-center">
            <div className="cost-item__left">
                <span>{index}</span>
                <span>{cost.text}</span>
                <span> {cost.data as string}</span>
            </div>
            <div className="cost-item__right">
                <span>{cost.price}</span>
                <button className="btn btn-primary">Изменить</button>
                <button className="btn btn-danger" onClick={deleteCost}>
                    {deleteSpinner ? <Spinner top={5} left={5} /> : <span>&times;</span>}
                </button>
            </div>
        </li>
    )
}