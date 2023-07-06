import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import './Modal.css';
import AddIcon from '@mui/icons-material/Add';
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
        zIndex: 9999,
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
    select: {

        width: '100%',
        padding: theme.spacing(1),
        borderRadius: theme.spacing(1),
        border: '1px solid #ccc',
        outline: 'none',
    }
}));



const Modelcreate = () => {
    const classes = useStyles();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [ISINPUT, setISINPUT] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handeldecripsanopc = () => {
        console.log("Button decripsan clicked!");
    }

    const handeldebitopc = () => {
        console.log("handeldebitopc");
    }

    return (
        <div>
            <button className="create-button" onClick={openModal}>Create</button>
            {isModalOpen && (
                <div className={classes.modal}>
                    <div className={classes.modalContent}>
                        <input className={classes.input} type="date" placeholder="Date" />
                        <input className={classes.input} type="number" placeholder="Amount" />
                        <select className={classes.select} defaultValue="">
                            <option value="description1">Description 1</option>
                            <option value="other">Add Other Option</option>
                        </select>
                        <AddIcon onClick={handeldecripsanopc}/>
                        <select className={classes.select} defaultValue="">
                            <option value="" disabled>
                                Select Debit From
                            </option>
                            <option value="debitFrom1">Debit From 1</option>
                            <option value="debitFrom2">Debit From 2</option>
                            <option value="debitFrom3">Debit From 3</option>
                        </select>
                        <AddIcon onClick={handeldebitopc}/><br></br>
                        <button className={classes.closeButton} onClick={closeModal}>Close</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Modelcreate;
