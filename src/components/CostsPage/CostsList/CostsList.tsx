import { ICost } from "../../../types"
import { CostsItem } from "../CostsItem/CostsItem"

interface ICostsInterface {
    costs: ICost[]
}

export const CostsList:React.FC<ICostsInterface> = ({costs}: {costs: ICost[]}) => {
    return (
        <ul className='list-group'>
            {costs.map((cost, index) => (<CostsItem key={cost._id} cost={cost} index={index + 1}/>))}
        </ul>
    )
}