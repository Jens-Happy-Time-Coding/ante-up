import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MoneyPie from '../MoneyPie/MoneyPie';
import MoneyBucketManager from '../MoneyBucketManager/MoneyBucketManager';
import Allowance from '../Allowance/Allowance';
import Card from '../Common/Card/Card';

import './Money.scss';

function Money(props) {
    const dispatch = useDispatch();
    const allowance = useSelector((store) => store.allowance);
    // const bank = useSelector((store) => store.bank.bank );
    const bank = useSelector((store) => store.bank );
    const user = useSelector((store) => store.user);
    //const[showModal, setShowModal] = useState(false);

    useEffect(()=> {
        console.log('in Money useEffect');
        dispatch( { type: 'FETCH_ALLOWANCE', payload: user.id} );
        dispatch( { type: 'FETCH_LATEST_ALLOWANCE', payload: user.id });
        //dispatch( { type: 'FETCH_BANK', payload: user.id })
         dispatch( {type: "GET_BANK_REQUESTED", payload: user.id})
    },[])

    // useEffect(() => {
    //     console.log('allowance changed! it is now:', allowance)
    // },[allowance])

    useEffect(() => {
        console.log('latest allowance changed! it is now:', allowance.latestAllowance)
    },[allowance.latestAllowance])

    return (
        <div className="money">
            <div className="money-allowance">
                <Card component={<Allowance allowance={allowance} bank={bank} />}
                />
            </div>

            <div className="money-bank-chart">
                <Card component={<MoneyPie bank={bank.bank}/>} />
            </div>

            <div className="money-bank">
                <Card component={<MoneyBucketManager bank={bank.bank} />} />
            </div> 
        </div >
    )
}

export default Money;