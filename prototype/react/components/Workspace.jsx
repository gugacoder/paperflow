import React from 'react';
import { AppBar, Toolbar, Typography, Avatar, Drawer, List, ListItem, ListItemIcon, ListItemText, Box, Card, CardContent, CardActions, Button, Grid } from '@mui/material';
import { Home, AttachMoney, Receipt } from '@mui/icons-material';
import jwt_decode from 'jwt-decode';

const menuItems = [
  { text: 'Início', icon: <Home /> },
  { text: 'Vendas', icon: <AttachMoney /> },
  { text: 'Faturamento', icon: <Receipt /> },
];

const Workspace = () => {
  const token = localStorage.getItem('token');
  const decodedToken = jwt_decode(token);
  const username = decodedToken.username || 'Usuário';

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <AppBar position="static">
        <Toolbar>
          <img src="/assets/logomarca.svg" alt="PaperFlow Logo" style={{ height: 40, marginRight: 16 }} />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            PaperFlow
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant="subtitle1" sx={{ mr: 1 }}>{username}</Typography>
            <Avatar>{username[0].toUpperCase()}</Avatar>
          </Box>
        </Toolbar>
      </AppBar>

      <Box sx={{ display: 'flex', flexGrow: 1 }}>
        <Drawer
          variant="permanent"
          sx={{
            width: 240,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: 240,
              boxSizing: 'border-box',
            },
          }}
        >
          <Toolbar />
          <List>
            {menuItems.map((item) => (
              <ListItem button key={item.text} component="a" href="#">
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItem>
            ))}
          </List>
        </Drawer>

        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Toolbar />
          <Grid container spacing={3}>
            {menuItems.map((item) => (
              <Grid item xs={12} sm={6} md={4} key={item.text}>
                <Card>
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      {item.icon}
                      <Typography variant="h5" component="div" sx={{ ml: 1 }}>
                        {item.text}
                      </Typography>
                    </Box>
                    <Typography variant="body2" color="text.secondary">
                      Breve descrição do módulo {item.text.toLowerCase()}.
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small" href="#">Acessar</Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>

      <Box component="footer" sx={{ mt: 'auto', backgroundColor: 'background.paper', p: 2 }}>
        <Typography variant="body2" color="text.secondary" align="left">
          PaperFlow 1.0.0 - Copyleft - All rights reversed
        </Typography>
      </Box>
    </Box>
  );
};

export default Workspace;