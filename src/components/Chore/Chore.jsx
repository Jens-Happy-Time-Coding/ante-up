import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import { useDispatch, useSelector } from 'react-redux';
import Card from '../Common/Card/Card';
import './Chore.scss';

function Chore(props) {
    const dispatch = useDispatch();
    const initialChores = useSelector((store) => store.chore);
    const [userChores, setUserChores] = useState([]);
    const [choresExist, setChoresExist] = useState(false);
    const [frequencySelected, setFrequencySelected] = useState('All');
    const [choreDetails, setChoreDetails] = useState({});
    //const [allChores, setAllChores] = useState(chores.chore);

    const options = [
        { value: 'All', label: 'All'},
        { value: 'Daily', label: 'Daily' },
        { value: 'Weekly', label: 'Weekly' },
        { value: 'Monthly', label: 'Monthly' },
        { value: 'Occasionally', label: 'Occasionally'}
      ]

    useEffect(() => {
        console.log('in useEffect of CHORE!!!');
            dispatch( {type: "GET_CHORE_REQUESTED", payload: props.user.id})
    },[])
    useEffect(() => {
        console.log('chores is:', initialChores);
        if (initialChores.chore.length > 0) {
            setChoresExist(true);
            setUserChores(initialChores.chore)
        }
    },[initialChores.chore]);

    const handleFrequencyChange = (selected) => {
        console.log('in handleFrequencyChange with:', selected);
        console.log('userChores is:', userChores);
        if (selected.value==='All') {
            console.log('initialChores is:', initialChores)
            setUserChores(initialChores.chore);
        }else {
            const filteredChores = initialChores.chore.filter(a =>
                a.frequency === selected.value);
            setUserChores(filteredChores);
        }        

        setFrequencySelected(selected);
        
        // setUserChores(
        //     userChores.filter(a =>
        //       a.frequency === selected.value
        //     )
        //   );
    }

    const showChoreDetails = (chore) => {
        console.log('clicked on the row and the chore id is:', chore);
        setChoreDetails({...choreDetails,
            name: chore.name,
            description: chore.description,
            frequency: chore.frequency,
            payment: chore.payment,
            })
    }

    const ChoreListComponent = () => {
        return (
            <div className="chore-main">
                <div className="chore-selector">
                    <div className="selector-title">Frequency:</div>
                    <div className="selector-dropdown">
                        <Select options={options}
                                //defaultValue={{label: 'All', value: 'All'}}
                                onChange={handleFrequencyChange}                                
                                value={frequencySelected}
                        />
                    </div>
                </div>
                <div className="chore-list">
                    {
                        choresExist ? 
                        (<div >
                            <table className='chore-table mobile-optimised'>
                                <thead className='chore-head'>
                                    <tr>
                                        <th>Chore</th>
                                        <th>Frequency</th>
                                        <th>Payment</th>
                                    </tr>  
                                </thead>
                                <tbody>
                                {userChores.map(chore=> 
                                    <tr onClick={()=>showChoreDetails(chore)}>
                                    <td data-th="Name">{chore.name}</td>
                                    <td data-th="Frequency">{chore.frequency}</td>
                                    <td data-th="Payment" className='td-center'>{chore.payment}</td>
                                </tr>
                                 )}
                                </tbody>
                            </table>
                        </div>) 
                        
                        
                        : ''
                    }
                </div>
            </div>
            

        )
    }
    
    const ChoreDetailsComponent = () => {
        return (
            <div className='chore-details'>
                <div className='chore-details-frequency'>{choreDetails.frequency}</div>    
                <div className='chore-details-name'>{choreDetails.name}
                    <div id="line"><hr /></div>
                </div>
                <div className='chore-details-payment'>${choreDetails.payment}</div>
                <div className='chore-details-description'>
                    {choreDetails.description}
                </div>
                {
                    <div className='chore-details-schedule'>
                        { renderFrequencySchedule(choreDetails.frequency) }
                    </div>
                }
            </div>
        )
    }

    const renderFrequencySchedule = (frequency) => {
        switch(frequency){
            case 'Daily':
                return (
                    <div className="daily-chore">
                        <div className="daily">
                            <label>M</label>
                            <input type="checkbox"></input></div>                                             
                        <div className="daily">
                            <label>T</label>
                            <input type="checkbox"></input>
                        </div>
                        <div className="daily">
                            <label>W</label>
                            <input type="checkbox"></input>
                        </div>
                        <div className="daily">
                            <label>Th</label>
                            <input type="checkbox"></input>
                        </div>
                        <div className="daily">
                            <label>F</label>
                            <input type="checkbox"></input>
                        </div>
                        <div className="daily">
                            <label>Sat</label>
                            <input type="checkbox"></input>
                        </div>
                        <div className="daily">
                            <label>Sun</label>
                            <input type="checkbox"></input>
                        </div>
                    </div>
                    )
            case 'Weekly':
                return (<div>I am a weekly chore</div>)
            case 'Monthly':
                return (<div>I am a monthly chore</div>)
            case 'Ad hoc':
                return (<div>I am an ad hoc chore</div>)
            default:
                return null;
        }

    }

    return (
        <div className='chore'>
            <div className='chore-container'>
                <h1 className="chore-title">Chores</h1>
                <Card component={<ChoreListComponent />} />                
                {
                     Object.entries(choreDetails).length != 0 ?
                        <Card component={<ChoreDetailsComponent />} />
                    : null
                }
            </div>
        </div>
    )
}

export default Chore;