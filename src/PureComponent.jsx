import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import axios from 'axios';

const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <div className="custom-tooltip">
                <p className="label">{`Date: ${label}`}</p>
                <p className="amount">{`Amount: ${payload[0].value}`}</p>
                <p className="desc">{`Description: ${payload[0].payload.description}`}</p>
            </div>
        );
    }

    return null;
};

const PureComponent = () => {
    const [data1, setData1] = useState([]);

    const groupDataByDate = (data) => {
        const groupedData = {};

        for (let i = 0; i < data.length; i++) {
            const option = data[i];
            if (!groupedData[option.date]) {
                groupedData[option.date] = [];
            }
            groupedData[option.date].push(option);
        }

        return groupedData;
    };

    const groupedData = groupDataByDate(data1);

    console.log(groupedData)

    const fetchData3 = () => {
        axios
            .get('https://dailydata-d2e16-default-rtdb.firebaseio.com/saved-data.json')
            .then((response) => {
                const data = response.data;
                const options = Object.values(data);
                setData1(options);
            })
            .catch((error) => {
                console.error('Error retrieving data:', error);
            });
    };

    useEffect(() => {
        fetchData3();
    }, []);



    return (
            <div className="BarChart">
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart
                        data={Object.entries(groupedData).map(([date, options]) => ({
                            date,
                            amount: options[0].amount,
                            description: options[0].description,
                        }))}
                        margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip content={<CustomTooltip />} />
                        <Legend />
                        <Bar dataKey="amount" fill="#8884d8" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        );
    };

export default PureComponent;
