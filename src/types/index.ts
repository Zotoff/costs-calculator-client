export interface IAlert {
    alertText: string;
    alertStatus: string;
}
export interface IAlertProps {
    props: IAlert;
}

export interface ISpinnerProps {
    top: number;
    left: number;
}

export interface ICostsHeaderProps {
    costs: ICost[];
}

export interface ICost {
    text: string,
    price: number;
    data: Date | string;
    _id?: number | string;
}

export interface ICreateCost {
    url: string;
    cost: ICost;
    token: string;
}

export interface IGetCosts {
    url: string;
    token: string;
}