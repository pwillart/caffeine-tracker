import React, {useContext, useEffect, useState} from 'react';
import Layout from "../layout/Layout";
import {AuthContext} from "../../context/AuthContext";
import {Link} from "react-router-dom";
import AuthService from "../../services/AuthService";
import CaffeineTrackerService from "../../services/CaffeineTrackerService";
import {useHistory} from "react-router";
import {ButtonGroup, Table} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Message from "../partials/Message";

const Dashboard = () => {

    // Authentication logic
    const authContext = useContext(AuthContext);

    const {user} = useContext(AuthContext);

    const history = useHistory();

    const logoutHandler = () => {
        AuthService.logout().then(data => {
            if (data.status === 'success') {
                authContext.setUser({name: "", email: ""});
                authContext.setIsAuthenticated(false);
                history.push(`/`);
            }
        });
    }

    // Application logic
    const maxConsumption = 500;

    const [drinks, setDrinks] = useState([]);
    const [consumedDrinks, setConsumedDrinks] = useState([]);
    const [caffeineConsumption, setCaffeineConsumption] = useState(0);
    const [message, setMessage] = useState(null);

    // Fetch initial data
    useEffect(() => {
        // Call api to get drinks
        CaffeineTrackerService.fetchDrinks()
            .then(data => {
                setDrinks(data.drinks);
            });
        // Call api to get user_drinks
        CaffeineTrackerService.fetchConsumedDrinks()
            .then(data => {
                setConsumedDrinks(data.consumedDrinks);
            });
    }, []);

    // Recalculate caffeine consumption when consumedDrinks changes (i.e. reset or beverage consumed)
    useEffect(() => {
        let consumption = 0;
        if (typeof consumedDrinks !== 'undefined')
            consumedDrinks.forEach(consumedDrink => {
                consumption += consumedDrink.servings * consumedDrink.drink.caffeine_per_serving;
            });
        setCaffeineConsumption(consumption);
    }, [consumedDrinks]);

    // Construct consumption details for drink
    const consumptionDetails = (drink) => {
        let consumptionDetails = [];
        const consumed = consumedDrinks.filter(consumedDrink => consumedDrink.drink_id === drink.id);
        if (consumed.length > 0) {
            let servingsConsumed = 0;
            consumed.map(consumedDrink => servingsConsumed += consumedDrink.servings);
            const totalCaffeineConsumed = drink.caffeine_per_serving * servingsConsumed;
            const servingsLabel = (servingsConsumed > 1) ? 'servings' : 'serving';
            consumptionDetails.push(
                <div key={drink.id} className="small text-success">You consumed {servingsConsumed} {servingsLabel} for a total of {totalCaffeineConsumed} mg of caffeine.</div>
            );
        }
        return consumptionDetails;
    }

    // Construct list of buttons for drink
    const buttonList = (drink) => {
        let buttonList = [];
        for (let i = 1; i <= drink.servings; i++) {
            // Note: writing active/disabled button within the push method produced a Babel compilation error
            const safe = ((drink.caffeine_per_serving * i) + caffeineConsumption <= maxConsumption);
            if (safe)
                buttonList.push(
                    <Button key={i} size="sm" className="mr-3" active onClick={() => consumeHandler(drink.id, i)}>
                        {i}
                    </Button>);
            else
                buttonList.push(
                    <Button key={i} className="mr-3" size="sm" variant="danger" disabled>
                        {i}
                    </Button>);

        }
        return buttonList;
    }

    const consumeHandler = async (drink_id, servings) => {
        setMessage(null); // Clear error message if any
        // Call service to update consumption
        await CaffeineTrackerService.consumeDrink(drink_id, servings)
            .then(data => {
                if (data.status === 'error') {
                    setMessage({msgBody: data.message, msgError: true});
                } else {
                    setConsumedDrinks(data.consumedDrinks);
                }
            });
    }

    const resetHandler = () => {
        setMessage(null); // Clear error message if any
        // Call service to reset consumption
        CaffeineTrackerService.resetConsumedDrinks()
            .then(data => {
                if (data.status === 'error') {
                    setMessage({msgBody: data.message, msgError: true});
                }
                else {
                    setConsumedDrinks(data.consumedDrinks);
                }
            });
    }

    return (
        <Layout title="Dashboard" className="container">
            <h3 className="mb-3">Ready for a boost {user.name}?</h3>
            <div className="mb-3">
                {caffeineConsumption !== 500 &&
                    <>You have consumed {caffeineConsumption} mg of caffeine.</>
                }
                {caffeineConsumption === 500 &&
                    <>Perfect score! You've reached the safe limit of {maxConsumption}. Reset the counter when your buzz has worn off.</>
                }
            </div>
            <div className="mb-3"><Button onClick={resetHandler}>Reset counter</Button></div>

            <Table hover variant="dark">
                <thead>
                    <tr>
                        <th/>
                        <th>Caffeine per serving</th>
                        <th>Servings per container</th>
                        <th>Consume serving(s)</th>
                    </tr>
                </thead>
                <tbody>
                {drinks.map( drink => (
                    <tr key={drink.id}>
                        <td>
                            <strong className="text-warning">{drink.name}</strong>
                            <div>{drink.description}</div>
                            {consumptionDetails(drink)}
                        </td>
                        <td>
                            {drink.caffeine_per_serving} mg
                        </td>
                        <td>
                            {drink.servings}
                        </td>
                        <td>
                            <ButtonGroup>
                                {buttonList(drink)}
                            </ButtonGroup>
                        </td>
                    </tr>
                ))}
                </tbody>
            </Table>
            {message ? <Message message={message}/> : null}

            <Link to="#" onClick={logoutHandler}>Logout</Link>
        </Layout>
    )
}
export default Dashboard;
