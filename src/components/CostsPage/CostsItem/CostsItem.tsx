import { ICostsItemProps } from "../../../types"

export const CostsItem:React.FC<ICostsItemProps> = (
    {cost, index}: ICostsItemProps
) => {
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
                <button className="btn btn-danger">&times;</button>
            </div>
        </li>
    )
}