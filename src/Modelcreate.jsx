import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import './Modal.css';
import AddIcon from '@mui/icons-material/Add';
import { Dialog, DialogContent, DialogTitle, TextField } from '@mui/material';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
    modal: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        zIndex: 1,
    },
    modalContent: {
        backgroundColor: '#fff',
        padding: theme.spacing(3),
        borderRadius: theme.spacing(1),
    },
    input: {
        marginBottom: theme.spacing(2),
        width: '97%',
        padding: theme.spacing(1),
        borderRadius: theme.spacing(1),
        border: '1px solid #ccc',
        outline: 'none',
    },
    closeButton: {
        marginTop: theme.spacing(2),
        backgroundColor: theme.palette.secondary.main,
        color: '#fff',
        padding: theme.spacing(1, 2),
        borderRadius: theme.spacing(1),
        cursor: 'pointer',
    },
    SaveButton: {
        marginTop: theme.spacing(2),
        backgroundColor: theme.palette.secondary.main,
        color: '#fff',
        padding: theme.spacing(1, 2),
        borderRadius: theme.spacing(1),
        cursor: 'pointer',
    },
    select: {
        width: '100%',
        padding: theme.spacing(1),
        borderRadius: theme.spacing(1),
        border: '1px solid #ccc',
        outline: 'none',
    },
    addButton: {
        marginBottom: '16px',
    },
    dialogContent: {
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
    },
}));

const Modelcreate = () => {
    const classes = useStyles();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [options, setOptions] = useState([]);
    const [newOption, setNewOption] = useState('');
    const [debitOptions, setDebitOptions] = useState([]);
    const [newDebitOption, setNewDebitOption] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [isOpen1, setIsOpen1] = useState(false);
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedAmount, setSelectedAmount] = useState('');
    const [selectedDescription, setSelectedDescription] = useState('');
    const [selectedDebit, setSelectedDebit] = useState('');
    const [alldata, setalldata] = useState([]);





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

    const groupedData = groupDataByDate(alldata);




    useEffect(() => {
        fetchData();
        fetchData2();
        fetchData3();
    }, []);



    const fetchData3 = () => {
        axios
            .get('https://dailydata-d2e16-default-rtdb.firebaseio.com/saved-data.json')
            .then((response) => {
                const data = response.data;
                const options = Object.values(data)
                setalldata(options)
            })
            .catch((error) => {
                console.error('Error retrieving data:', error);
            });
    };

    const fetchData = () => {
        axios
            .get('https://dailydata-d2e16-default-rtdb.firebaseio.com/your-collection.json')
            .then((response) => {
                const data = response.data;
                const options = Object.values(data).map((option) => ({
                    value: option.input,
                }));
                setOptions(options);
            })
            .catch((error) => {
                console.error('Error retrieving data:', error);
            });
    };

    const fetchData2 = () => {
        axios
            .get('https://dailydata-d2e16-default-rtdb.firebaseio.com/debit-collection.json')
            .then((response) => {
                const data = response.data;
                const options = Object.values(data).map((option) => ({
                    value: option.input,
                }));
                setDebitOptions(options);
            })
            .catch((error) => {
                console.error('Error retrieving data:', error);
            });
    };



    const handleOpen = () => {
        setIsOpen(true);
    };

    const handleOpen1 = () => {
        setIsOpen1(true);
    };

    const handleClose = () => {
        setIsOpen(false);
    };

    const handleClose1 = () => {
        setIsOpen(false);
    };

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleOptionAdd = () => {
        const input = newOption;

        axios
            .post('https://dailydata-d2e16-default-rtdb.firebaseio.com/your-collection.json', {
                input: input,
            })
            .then((response) => {
                console.log('Data added successfully');
                const newOptions = [...options, { value: input }];
                setOptions(newOptions);
                setNewOption('');

            })
            .catch((error) => {
                console.error('Error adding data:', error);
            });

        setIsOpen(false);

    };



    const handleDebitOptionAdd = () => {
        const input = newDebitOption;

        axios
            .post('https://dailydata-d2e16-default-rtdb.firebaseio.com/debit-collection.json', {
                input: input,
            })
            .then((response) => {
                console.log('Data added successfully');
                const newOptions = [...debitOptions, { value: input }];
                setDebitOptions(newOptions);
                setNewDebitOption('');
            })
            .catch((error) => {
                console.error('Error adding data:', error);
            });

        setIsOpen1(false);
    };

    const handleDebitChange = (event) => {
        setSelectedDebit(event.target.value);
    };

    const handleDebitInputChange = (event) => {
        setNewDebitOption(event.target.value);
    };




    const handleInputChange = (event) => {
        setNewOption(event.target.value);
    };

    const handleDateChange = (event) => {
        setSelectedDate(event.target.value);
    };

    const handleAmountChange = (event) => {
        setSelectedAmount(event.target.value);
    };

    const handleDescriptionChange = (event) => {
        setSelectedDescription(event.target.value);
        console.log(event.target.value)
    };


    const handelalldata = () => {
        if (
            !selectedDate ||
            !selectedAmount ||
            !selectedDescription ||
            !selectedDebit
        ) {
            console.log('Please fill in all fields');
            return;
        }

        const date = new Date(selectedDate);
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();

        const formattedDate = `${day}/${month}/${year}`;

        const data = {
            date: formattedDate,
            amount: selectedAmount,
            description: selectedDescription,
            debit: selectedDebit,
            day: day,
            month: month,
            year: year,
        };

        axios
            .post(
                'https://dailydata-d2e16-default-rtdb.firebaseio.com/saved-data.json',
                data
            )
            .then((response) => {
                console.log('Data saved successfully');
                    setSelectedDate('')
                    setSelectedAmount('')
                    setSelectedDescription('')
                    setSelectedDebit('')
            })
            .catch((error) => {
                console.error('Error saving data:', error);
            });
        setIsModalOpen(false);

    };


    return (
        <div>
            <button className="create-button" onClick={openModal}>
                Create
            </button>
            {isModalOpen && (
                <div className={classes.modal}>
                    <div className={classes.modalContent}>
                        <input
                               className={classes.input}
                               type="date" placeholder="Date"
                               value={selectedDate}
                               onChange={handleDateChange}
                        />
                        <input
                            className={classes.input}
                            type="number"
                            placeholder="Amount"
                            value={selectedAmount}
                            onChange={handleAmountChange}
                        />


                        <select className={classes.select}
                                defaultValue=""
                                value={selectedDescription}
                                onChange={handleDescriptionChange}
                        >
                            <option value="" disabled>
                               Add Description
                            </option>
                            {options.map((option) => (

                                <option key={option.value} value={option.value}>
                                    {option.value}
                                </option>
                            ))}
                        </select>
                        <AddIcon onClick={handleOpen} />
                        <Dialog open={isOpen} onClose={handleClose}>
                            <DialogTitle>Add Icon Dialog</DialogTitle>
                            <DialogContent className={classes.dialogContent}>
                                <TextField
                                    label="Enter your input"
                                    variant="outlined"
                                    value={newOption}
                                    onChange={handleInputChange}
                                />
                            </DialogContent>
                            <button className="create-button" onClick={handleOptionAdd}>
                                Add
                            </button>
                        </Dialog>


                        <select
                            className={classes.select}
                            defaultValue=""
                            value={selectedDebit}
                            onChange={handleDebitChange}
                        >
                            <option value="" disabled>
                                Add Debit
                            </option>
                            {debitOptions.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.value}
                                </option>
                            ))}
                        </select>
                        <AddIcon onClick={handleOpen1} />
                        <Dialog open={isOpen1} onClose={handleClose1}>
                            <DialogTitle>Add Icon Dialog</DialogTitle>
                            <DialogContent className={classes.dialogContent}>
                                <TextField
                                    label="Enter your input"
                                    variant="outlined"
                                    value={newDebitOption}
                                    onChange={handleDebitInputChange}
                                />
                            </DialogContent>
                            <button className="create-button" onClick={handleDebitOptionAdd}>
                                Add
                            </button>
                        </Dialog>




                        <br />
                        <button className={classes.closeButton} onClick={closeModal}>
                            Close
                        </button>
                        <button className={classes.SaveButton} onClick={handelalldata}>
                            Save
                        </button>
                    </div>
                </div>
            )}
            <table>
                <thead>
                <tr>
                    <th>Date</th>
                    <th>Amount</th>
                    <th>Description</th>
                    <th>Debit from</th>
                </tr>
                </thead>
                <tbody>
                {Object.entries(groupedData).map(([date, options]) => (
                    <React.Fragment key={date}>
                        {options.map((option, index) => (
                            <tr key={index}>
                                {index === 0 && <td rowSpan={options.length}>{option.date}</td>}
                                <td>{option.amount}</td>
                                <td>{option.description}</td>
                                <td>{option.debit}</td>
                            </tr>
                        ))}
                    </React.Fragment>
                ))}
                </tbody>
            </table>

        </div>
    );
};

export default Modelcreate;
