'use client'
import React, { useState } from 'react'
import { usePathname } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'

import Divider from '@mui/material/Divider'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import CssBaseline from '@mui/material/CssBaseline'
import Drawer from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import MenuIcon from '@mui/icons-material/Menu'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Avatar from '@mui/material/Avatar'

//Icons
import DashboardIcon from '@mui/icons-material/Dashboard'
import NotesIcon from '@mui/icons-material/Notes'
import CreateIcon from '@mui/icons-material/Create'
import StarIcon from '@mui/icons-material/Star'
import LogoutIcon from '@mui/icons-material/Logout'

import { signOut } from 'next-auth/react'
import { useCurrentUser } from '@/hooks/use-current-user'

const drawerWidth = 220

const pages = [
    {label: 'Dashboard', link: '/dashboard', icon: <DashboardIcon />}, 
    {label: 'My Scribes', link: '/scribes', icon: <NotesIcon />},
    {label: 'New Scribe', link: '/scribes/new', icon: <CreateIcon />},
    {label: 'Favorites', link: '/scribes/starred', icon: <StarIcon />},
]

function getLabelByLink(link) {
    let currentLabel = ''
    for (const page of pages) {
        if (link.includes(page.link)) {
            currentLabel = page.label
        }
    }
    return currentLabel
}

export default function DashboardDrawer({ children }) {
    const pathname = usePathname()
    const user = useCurrentUser()

    const [mobileOpen, setMobileOpen] = useState(false)
    const [isClosing, setIsClosing] = useState(false)

    const handleDrawerClose = () => {
        setIsClosing(true)
        setMobileOpen(false)
    }

    const handleDrawerTransitionEnd = () => {
        setIsClosing(false)
    }

    const handleDrawerToggle = () => {
        if (!isClosing) {
            setMobileOpen(!mobileOpen)
        }
    }

    const handleSignout = async () => {
        await signOut({ callbackUrl: '/login' })

    }

    const drawer = (
        <div>
            <Link href={'/dashboard'}>
                <Image 
                    src={'/SumscribeLogo.png'} 
                    alt={'Sumscribe Logo'} 
                    width={64} 
                    height={64}
                    style={{ 
                        margin: 'auto',
                        marginTop: 32,
                        marginBottom: 16
                    }}
                />
            </Link>
            <List sx={{ p: 1 }}>
                {
                    pages.map((item) => (
                        <Link key={item.label} href={item.link}>
                            <ListItem  disablePadding>
                                <ListItemButton 
                                    selected={item.link == pathname}
                                    sx={{ borderRadius: 2 }}
                                >
                                    <ListItemIcon>
                                        {item.icon}
                                    </ListItemIcon>
                                    <ListItemText primary={item.label} />
                                </ListItemButton>
                            </ListItem>
                        </Link>
                    ))
                }

                <Divider sx={{ my: 2 }} />

                {/* LOGOUT BUTTON */}
                <ListItem  disablePadding>
                    <ListItemButton onClick={handleSignout} sx={{ borderRadius: 2 }}>
                        <ListItemIcon>
                            <LogoutIcon />
                        </ListItemIcon>
                        <ListItemText primary={'Sign out'} />
                    </ListItemButton>
                </ListItem>
            </List>
            
        </div>
    )

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />


            {/* TOP NAVBAR */}
            <AppBar
                position="fixed"
                sx={{
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                    ml: { sm: `${drawerWidth}px` },
                }}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" fontWeight='bold' noWrap >
                        { getLabelByLink(pathname) }
                    </Typography>

                    <Box sx={{ flexGrow: 0, ml: 'auto', display: 'flex', alignItems: 'center' }}>
                        <Typography variant='body2' fontWeight='bold' mr={2}>{user.name}</Typography>
                        {user.image &&
                        <Avatar alt={user.name} src={user.image} />
                        }
                        {!user.image &&
                        <Avatar>{user.name[0]}</Avatar>
                        }
                    </Box>
                </Toolbar>

                
            </AppBar>




            <Box
                component="nav"
                sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
                aria-label="mailbox folders"
            >
                {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                <Drawer
                    //container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onTransitionEnd={handleDrawerTransitionEnd}
                    onClose={handleDrawerClose}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    {drawer}
                </Drawer>
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: 'none', sm: 'block' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                    open
                >
                    {drawer}
                </Drawer>
            </Box>
            <Box
                component="main"
                sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
            >
                <Toolbar />
                
                {children}
            </Box>
        </Box>
    )
}
