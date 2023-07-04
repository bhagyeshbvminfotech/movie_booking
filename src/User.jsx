import React, { useEffect, useState } from 'react';
import { getAuth, signOut } from 'firebase/auth';
import Button from '@mui/material/Button';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';

const User = () => {
    const [authenticated, setAuthenticated] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);

    const handleImageClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClosePopup = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'custom-popover' : undefined;

    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                setAuthenticated(true);
            } else {
                setAuthenticated(false);
            }
        });
        return () => unsubscribe();
    }, []);

    function handleLogout() {
        const auth = getAuth();
        signOut(auth)
            .then(() => {
                setAnchorEl(null); // Close the popover after successful logout
                // Perform any additional logout actions or navigate to the logout page if needed
            })
            .catch((error) => {
                // Handle any errors that occur during logout
                console.error('Logout error:', error);
            });
    }

    return (
        <div>
            {authenticated && (
                <div className="user-profile">
                    <img
                        src="https://upload.wikimedia.org/wikipedia/commons/1/12/User_icon_2.svg"
                        alt="User Icon"
                        onClick={handleImageClick}
                    />
                    <p>admin</p>
                </div>
            )}
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClosePopup}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
            >
                <Typography sx={{ p: 2 }}>
                    <Button variant="contained" onClick={handleLogout}>
                        Logout
                    </Button>
                </Typography>
            </Popover>
        </div>
    );
};

export default User;
