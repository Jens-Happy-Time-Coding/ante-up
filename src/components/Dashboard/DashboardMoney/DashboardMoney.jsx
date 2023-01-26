import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './DashboardMoney.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleRight } from '@fortawesome/free-solid-svg-icons';

function DashboardMoney(props) {
    const dispatch = useDispatch();
    const allowance = useSelector((store) => store.allowance); //TODO: rename as store (i.e. allowanceStore)
    const dailyTotalChorePayment = useSelector((store) => store.chorePayment.dailyTotalChorePayment);
    const weeklyTotalChorePayment = useSelector((store) => store.chorePayment.weeklyTotalChorePayment);
    const bank = useSelector((store) => store.bank );
    const user = useSelector((store) => store.user);    
    const[nextAllowance, setNextAllowance] = useState('');
    const[allowanceAmounts, setAllowanceAmounts] = useState({});
    const[allowanceGoal, setAllowanceGoal] = useState({});
    const[totalDailyChorePayment, setTotalDailyChorePayment] = useState(null);
    const[totalWeeklyChorePayment, setTotalWeeklyChorePayment] = useState(null);
    const[extraAmount, setExtraAmount] = useState(totalDailyChorePayment + totalWeeklyChorePayment);

    useEffect(() => {
        dispatch( {type: 'GET_BANK_REQUESTED', payload: user.id}); // TODO: STICK WITH SAME NAMING CONVENTION (FETCH vs GET)
        dispatch( { type: 'FETCH_LATEST_ALLOWANCE', payload: user.id });
        dispatch( { type: 'GET_TOTAL_DAILY_CHORE_PAYMENT', payload: {userID: props.user.id, weekID: 1}})
        dispatch( { type: 'GET_TOTAL_WEEKLY_CHORE_PAYMENT', payload: {userID: props.user.id, weekID: 1}})
    },[])

    useEffect(()=>{
        console.log('props.weekinfo is:', props.weekInfo);
        if (Object.entries(props.weekInfo).length !==0 ) {
            setNextAllowance(props.weekInfo.allowanceDate.substring(0,10));
        }        
    },[props.weekInfo])

    useEffect(() => {        
        setAllowanceGoal({...allowanceGoal, 
                          goalAmount: bank.bank.goal_amount,
                          goalDescription: bank.bank.goal_desc,                         
                        })
    },[bank.bank])

    useEffect(() => {
        if (allowance && allowance.latest ) {
            console.log('allowance.latest is:', allowance.latestAllowance);
            setAllowanceAmounts({...allowanceAmounts,
                spend: allowance.latestAllowance.spend,
                save: allowance.latestAllowance.save,
                share: allowance.latestAllowance.share,
                extra: allowance.latestAllowance.chore_money,
            })
        }

    },[allowance]);

    useEffect(() => {
        console.log('YO YO YO weekly total chorePayment from store is:', weeklyTotalChorePayment);
        setTotalWeeklyChorePayment(weeklyTotalChorePayment);
    }, [weeklyTotalChorePayment]);


    useEffect(() => {
        console.log('YO YO YO DAILY chorePayment from store is:', dailyTotalChorePayment);
        setTotalDailyChorePayment(dailyTotalChorePayment);
    }, [dailyTotalChorePayment])

    return (
        <div className="dashboard-money">            
            <div className="next-allowance-date">Next allowance is:          
                <div>{nextAllowance ? nextAllowance : null}</div>
            </div>
            <div className="allowance-circles">
                <div className="res-circle">
                    <div className="circle-text">
                        <div className="title">Spend:</div>
                        <div className="amount">${allowance.latestAllowance ? allowance.latestAllowance.spend : null}</div>
                    </div>                                        
                </div>
                <div className="res-circle">
                    <div className="circle-text">
                        <div className="title">Save:</div>
                        <div className="amount">${allowance.latestAllowance ? allowance.latestAllowance.save : null}</div>
                    </div>
                </div>
                <div className="res-circle">
                    <div className="circle-text">
                        <div className="title">Share:</div>
                        <div className="amount">${allowance.latestAllowance ? allowance.latestAllowance.share : null}</div>
                    </div>
                </div>
                <div className="res-circle">
                    <div className="circle-text">
                        <div className="title">Chores:</div>
                        <div className="amount">${totalDailyChorePayment !== null ? totalWeeklyChorePayment !== null ? totalDailyChorePayment + totalWeeklyChorePayment : '0' : '5' }</div>
                    </div>
                </div>                
            </div>
            <div className="saving-for">
                <FontAwesomeIcon className="saving-for-icon" icon={faCircleRight} />                
                <div className="saving-for-text">
                    {allowanceGoal ? (<div>You're saving ${allowanceGoal.goalAmount} for {allowanceGoal.goalDescription}</div>)
                    :
                    <div>Hi</div>
    }
                </div>
            </div>
        </div>
    )
}
export default DashboardMoney;