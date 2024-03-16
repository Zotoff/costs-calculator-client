import { useState, useEffect } from "react";
import { Spinner } from "../../Spinner/Spinner"
import { ICostsHeaderProps } from "../../../types";
import { countTotalPrice } from "../../../utils/arrayUtils";
import { useStore, useUnit } from "effector-react";
import { $totalPrice } from "../../../context";

export const Header = ({costs}: ICostsHeaderProps) => {
    const [spinner, setSpinner] = useState(false);

    const totalPrice = useUnit($totalPrice)

    useEffect(() => {
        countTotalPrice(costs)
    }, [costs])

    return (
        <div className="costs-header">
            <form action="" className="d-flex mb-3">
                <div className="form-item">
                    <span className='mb-3'>Куда потрачено:</span>
                    <input type="text" className='form-control' />
                </div>
                <div className="form-item">
                    <span className='mb-3'>Сколько потрачено:</span>
                    <input type="text" className='form-control' />
                </div>
                <div className="form-item">
                    <span className='mb-3'>Когда потрачено:</span>
                    <input type="datetime" className='form-control' />
                </div>
                <button>
                    { spinner ? <Spinner top={5} left={20} /> : 'Добавить' }
                </button>
            </form>
            <div>
                Итого:
                <span>{isNaN(totalPrice) ? 0 : parseInt(String(totalPrice))}</span>
                RUR
            </div>
        </div>
    )
}