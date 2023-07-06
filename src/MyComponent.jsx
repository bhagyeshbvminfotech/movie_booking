import React, { useState } from 'react';
import { Button, Dialog, DialogTitle, DialogContent, TextField } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
    addButton: {
        marginBottom: '16px',
    },
    dialogContent: {
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
    },
});

function MyComponent() {
    const [isOpen, setIsOpen] = useState(false);
    const classes = useStyles();

    const handleOpen = () => {
        setIsOpen(true);
    };

    const handleClose = () => {
        setIsOpen(false);
    };

    return (
        <div>
            <Button variant="contained" color="primary" className={classes.addButton} onClick={handleOpen}>
                Add Icon
            </Button>

            <Dialog open={isOpen} onClose={handleClose}>
                <DialogTitle>Add Icon Dialog</DialogTitle>
                <DialogContent className={classes.dialogContent}>
                    <TextField label="Enter your input" variant="outlined" />
                </DialogContent>
            </Dialog>
        </div>
    );
}

export default MyComponent;
