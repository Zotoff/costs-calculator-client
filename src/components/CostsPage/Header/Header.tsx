import { useState, useEffect, MutableRefObject, useRef } from "react";
import { Spinner } from "../../Spinner/Spinner"
import { ICostsHeaderProps } from "../../../types";
import { countTotalPrice } from "../../../utils/arrayUtils";
import { useStore, useUnit } from "effector-react";
import { $totalPrice, createCost } from "../../../context";
import { validationInputs } from "../../../utils/validation";
import { getAuthDataFromLs, handleAlertMessage } from "../../../utils/auth";
import { createCostFx } from "../../../api/costsClient";

export const Header = ({costs}: ICostsHeaderProps) => {
    const [spinner, setSpinner] = useState(false);

    const totalPrice = useUnit($totalPrice);

    const textRef = useRef() as MutableRefObject<HTMLInputElement>;
    const priceRef = useRef() as MutableRefObject<HTMLInputElement>;
    const dateRef = useRef() as MutableRefObject<HTMLInputElement>;

    useEffect(() => {
        countTotalPrice(costs)
    }, [costs])

    const formSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        setSpinner(true);

        const textInputValue = textRef.current.value;
        const priceInputValue = priceRef.current.value;
        const dateInputValue = dateRef.current.value;

        if (!validationInputs(textRef, priceRef, dateRef)) {
            setSpinner(false);
            return;
        }

        const authData = getAuthDataFromLs();

        const cost = await createCostFx({
            url: '/cost',
            cost: {
                text: textInputValue,
                price: parseInt(priceInputValue),
                data: dateInputValue,
            },
            token: authData.access_token,
        });

        if (!cost) {
            setSpinner(false);
            return;
        }

        setSpinner(false);
        createCost(cost);
        handleAlertMessage({
            alertText: 'Успешно',
            alertStatus: 'success'
        });
    }

    return (
        <div className="costs-header">
            <form action="" className="d-flex mb-3" onSubmit={formSubmit}>
                <div className="form-item">
                    <span className='mb-3'>Куда потрачено:</span>
                    <input ref={textRef} type="text" className='form-control' />
                </div>
                <div className="form-item">
                    <span className='mb-3'>Сколько потрачено:</span>
                    <input ref={priceRef} type="text" className='form-control' />
                </div>
                <div className="form-item">
                    <span className='mb-3'>Когда потрачено:</span>
                    <input ref={dateRef} type="datetime" className='form-control' />
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