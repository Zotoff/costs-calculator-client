import { useState, useEffect, useRef, useMemo } from "react";
import { Header } from "./Header/Header";
import { Spinner } from "../Spinner/Spinner";
import { getAuthDataFromLs } from "../../utils/auth";
import { getCostsFx } from "../../api/costsClient";
import { $costs, setCosts } from "../../context";
import { useStore, useUnit } from "effector-react";
import { CostsList } from "./CostsList";

export const CostsPage: React.FC = () => {

    const [spinner, setSpinner] = useState(false);
    const store = useUnit($costs);

    const shouldLoadCosts = useRef(true);

    useEffect(()=>{
        if (shouldLoadCosts.current) {
            shouldLoadCosts.current = false;
            handleCosts();
            console.log(store);
        }
    }, [])

    const handleCosts = async () => {
        setSpinner(true);
        const authData = getAuthDataFromLs();
        const costs = await getCostsFx({
            url: '/cost',
            token: authData.access_token,
        });
        setSpinner(false);
        setCosts(costs);
    }

    return (
        <div className="container">
            <h2>Учет расходов</h2>
            {useMemo(()=><Header costs={store}/>, [store])}
            <div style={{position: 'relative'}}>
                {spinner && <Spinner top={0} left={0} />}
                {useMemo(()=> <CostsList costs={store} />, [store])}
                {(!spinner && !store.length) && <h2>Список расходов пуст</h2>}
            </div>
        </div>
    )
}