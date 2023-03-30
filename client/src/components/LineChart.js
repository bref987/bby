import React, { useState, useEffect } from "react";
import { useParams, Link } from 'react-router-dom';
import {Line} from 'react-chartjs-2';
import {Chart as ChartJs} from 'chart.js/auto';

function LineChart() {
    const {id} = useParams();

    const [userData, setUserData] = useState({
                labels: [],
                datasets: [{
                    label: '',
                    data: [],
                    borderColor: ''
                }]
            });

    const getStatistics = async () => {
        
        try {
            const res = await fetch(`http://localhost:5000/statistics/${id}`, {
            method: "GET",
            headers: { jwtToken: localStorage.jwtToken },
            });
    
            const parseData = await res.json();

            const data = {
                    labels: parseData.map(el => el.date.slice(0, 10)).slice(-14),
                    datasets: [{
                        label: 'training progress',
                        data: parseData.map(el => el.training).slice(-14),
                        borderColor: 'rgb(50,205,50)' 
                    }]
                }

            setUserData(data);
    
        } catch (err) {
            console.error(err.message);
        }
    }

    useEffect(() => {
        getStatistics();
    }, []);

    return (
        <div className="line">
            <Line data={userData} />
        </div>  
    )
       
}

export default LineChart;
