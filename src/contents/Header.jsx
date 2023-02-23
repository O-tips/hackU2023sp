import logo from '../logo.svg';
import '../App.css';
import '../Header.css';
import React from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import { Link as RouterLink } from "react-router-dom";
import { BrowserRouter, Routes, Route, useNavigate, useLocation, Link} from "react-router-dom";
import { UserContextProvider, useUserContext } from "../UserContext.tsx";

function Header() {
    const { user, setUser } = useUserContext();
    const navigate = useNavigate()

    const Search = styled('div')(({ theme }) => ({
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: alpha(theme.palette.common.white, 0.15),
        '&:hover': {
          backgroundColor: alpha(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
          marginLeft: theme.spacing(1),
          width: 'auto',
        },
      }));

    const SearchIconWrapper = styled('div')(({ theme }) => ({
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        }));

    const StyledInputBase = styled(InputBase)(({ theme }) => ({
        color: 'inherit',
        '& .MuiInputBase-input': {
            padding: theme.spacing(1, 1, 1, 0),
            // vertical padding + font size from searchIcon
            paddingLeft: `calc(1em + ${theme.spacing(4)})`,
            transition: theme.transitions.create('width'),
            width: '100%',
            [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
            },
        },
        }));

    const [state, setState] = React.useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
        });
    
        const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
    
        setState({ ...state, ['left']: open });
        };
    
        const list = (anchor) => (
        <Box
            sx={{ width: 'left' === 'top' || 'left' === 'bottom' ? 'auto' : 250 }}
            role="presentation"
            onClick={toggleDrawer('left', false)}
            onKeyDown={toggleDrawer('left', false)}
        >
            <List>
            {['ユーザー情報の変更'].map((text, index) => (
                <ListItem key={text} disablePadding>
                <ListItemButton  component={Link} to="/Level">
                    <ListItemIcon>
                    {index % 2 === 0 ? <AccountBoxIcon /> : <LogoutIcon />}
                    </ListItemIcon>
                    <ListItemText primary={text} />
                </ListItemButton>
                </ListItem>
            ))}
            </List>
            <Divider />
            <List>
            {['ログアウト'].map((text, index) => (
                <ListItem key={text} disablePadding>
                <ListItemButton>
                    <ListItemIcon>
                    {index % 3 === 0 ? <LogoutIcon /> : <InboxIcon />}
                    </ListItemIcon>
                    <ListItemText primary={text} />
                </ListItemButton>
                </ListItem>
            ))}
            </List>
        </Box>
        );
    
    return (      
        <AppBar position="static" style={{ color: "#000000", backgroundColor: "#C5EB9F" }}>
            <Toolbar>
                <React.Fragment key={'left'}>
                <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    sx={{ mr: 2 }}
                    onClick={toggleDrawer('left', true)}
                >
                    <MenuIcon />
                </IconButton>
                <Drawer
                    anchor={'left'}
                    open={state['left']}
                    onClose={toggleDrawer('left', false)}
                >
                    {list('left')}
                </Drawer>
                    
                </React.Fragment>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} justify-content="c">
                    <Button
                    onClick = {() =>{
                        navigate('/')
                    }}
                    >
                        WordMate
                    </Button>
                </Typography>

                <Typography variant="h6" component="div">
                    {user.name}さん (Level:{user.level}) 
                </Typography>
                <Button color="inherit" variant="contained" component={Link} to="/SignIn">Login</Button>

            </Toolbar>
        </AppBar>
    );
}
export default Header;