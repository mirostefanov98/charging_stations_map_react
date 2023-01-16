import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AccountCircle from '@mui/icons-material/AccountCircle';
import EvStationRoundedIcon from '@mui/icons-material/EvStationRounded';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../services/useAuth';
import { useLogout } from '../services/useLogout';


const menuItems = [
    {
        label: 'Карта',
        path: '/'
    },
    {
        label: 'Добави нова станция на картата',
        path: '/create-station'
    },
];

const adminUrl = `${window.location.origin}/admin`;

export default function Header({ children }) {
    const navigate = useNavigate();
    const auth = useAuth();
    const { mutate: mutateLogout } = useLogout();

    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return (
        <>
            <AppBar position="static">
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        <EvStationRoundedIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} fontSize='large' />
                        <Typography
                            variant="h6"
                            noWrap
                            component="a"
                            onClick={() => navigate('/')}
                            sx={{
                                mr: 2,
                                display: { xs: 'none', md: 'flex' },
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                color: 'inherit',
                                textDecoration: 'none',
                                flexGrow: 1,
                                cursor: 'pointer'
                            }}
                        >
                            ChargingStationsMap
                        </Typography>

                        <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleOpenNavMenu}
                                color="inherit"
                            >
                                <MenuIcon />
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorElNav}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left',
                                }}
                                open={Boolean(anchorElNav)}
                                onClose={handleCloseNavMenu}
                                sx={{
                                    display: { xs: 'block', md: 'none' },
                                }}
                            >
                                {menuItems.map((page) => (
                                    <MenuItem key={page.label} onClick={() => navigate(page.path)}>
                                        <Typography textAlign="center">{page.label}</Typography>
                                    </MenuItem>
                                ))}
                            </Menu>
                        </Box>
                        <EvStationRoundedIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} fontSize='medium' />

                        <Typography
                            variant="h7"
                            noWrap
                            component="a"
                            onClick={() => navigate('/')}
                            sx={{
                                mr: 2,
                                display: { xs: 'flex', md: 'none' },
                                flexGrow: 1,
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                color: 'inherit',
                                textDecoration: 'none',
                                cursor: 'pointer'
                            }}
                        >
                            ChargingStationsMap
                        </Typography>
                        <Box sx={{ flexGrow: 0, display: { xs: 'none', md: 'flex' } }}>
                            {menuItems.map((page) => (
                                <Button
                                    key={page.label}
                                    onClick={() => navigate(page.path)}
                                    sx={{ my: 2, color: 'white', display: 'block' }}
                                >
                                    {page.label}
                                </Button>
                            ))}
                        </Box>

                        {auth ? (
                            <Box sx={{ flexGrow: 0 }}>
                                <Tooltip title="Open settings">
                                    <IconButton
                                        size="large"
                                        aria-label="account of current user"
                                        aria-controls="menu-appbar"
                                        aria-haspopup="true"
                                        onClick={handleOpenUserMenu}
                                        color="inherit"
                                    >
                                        <AccountCircle />
                                    </IconButton>
                                </Tooltip>
                                <Menu
                                    sx={{ mt: '45px' }}
                                    id="menu-appbar"
                                    anchorEl={anchorElUser}
                                    anchorOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    open={Boolean(anchorElUser)}
                                    onClose={handleCloseUserMenu}
                                >
                                    {auth.isAdmin &&
                                        <MenuItem key="admin" onClick={() => { window.location.href = adminUrl; handleCloseUserMenu(); }}>
                                            <Typography textAlign="center">Администрация</Typography>
                                        </MenuItem>
                                    }
                                    <MenuItem key="user-stations" onClick={() => { navigate('/user-stations'); handleCloseUserMenu(); }}>
                                        <Typography textAlign="center">Моите станции</Typography>
                                    </MenuItem>
                                    <MenuItem key="profile" onClick={() => { navigate('/profile'); handleCloseUserMenu(); }}>
                                        <Typography textAlign="center">Профил</Typography>
                                    </MenuItem>
                                    <MenuItem key="logout" onClick={() => { mutateLogout(); handleCloseUserMenu(); }}>
                                        <Typography textAlign="center">Изход</Typography>
                                    </MenuItem>
                                </Menu>
                            </Box>
                        ) :
                            <Button
                                color='inherit'
                                onClick={() => navigate('/login')}
                                variant="outlined"
                                sx={{ fontWeight: 600 }}
                            >
                                Вход
                            </Button>
                        }
                    </Toolbar>
                </Container>
            </AppBar>
            {children}
        </>
    );
}