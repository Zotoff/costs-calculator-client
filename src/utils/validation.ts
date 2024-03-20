import { MutableRefObject } from "react";
import { handleAlertMessage } from "./auth";

export const validationInputs = (
    textInput: MutableRefObject<HTMLInputElement>,
    priceInput: MutableRefObject<HTMLInputElement>,
    dataInput: MutableRefObject<HTMLInputElement>,
) => {
    const textInputValue = textInput.current.value;
    const priceInputValue = priceInput.current.value;
    const dataInputValue = dataInput.current.value;

    const inputs = [
        textInput.current,
        priceInput.current,
        dataInput.current
    ]

    const addDangerBorderByCondition = () => {
        inputs.forEach(input => input.value.length
            ? input.classList.remove('border-danger')
            : input.classList.add('border-danger')
        )
    }

    if (!textInputValue || !priceInputValue || dataInputValue) {
        handleAlertMessage({
            alertText: 'Заполните поля',
            alertStatus: 'warning',
        });
        addDangerBorderByCondition();
        return false;
    }

    if (isNaN(+priceInputValue)) {
        handleAlertMessage({
            alertText: 'Введите число',
            alertStatus: 'warning',
        });
        priceInput.current.classList.add('border-danger');
        return false;
    }

    textInput.current.value = '';
    priceInput.current.value = '';
    dataInput.current.value = '';

    inputs.forEach(input => input.classList.remove('border-danger'))

    return true;
}