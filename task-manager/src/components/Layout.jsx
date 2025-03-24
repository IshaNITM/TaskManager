import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ActionCreators } from 'redux-undo';
import { exportTasks, importTasks } from '../services/localStorage';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  IconButton,
  Box,
  useMediaQuery,
  useTheme,
  Menu,
  MenuItem,
  Divider,
  Tooltip,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Undo as UndoIcon,
  Redo as RedoIcon,
  Add as AddIcon,
  BarChart as BarChartIcon,
  Home as HomeIcon,
  ImportExport as ImportExportIcon,
  MoreVert as MoreIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import TaskForm from './TaskForm';

const Layout = ({ children }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formOpen, setFormOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const tasks = useSelector(state => {
    if (state.tasks?.present) {
      return state.tasks.present.tasks || [];
    }
    return state.tasks?.tasks || [];
  });

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleImport = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    try {
      const importedTasks = await importTasks(file);
      console.log('Imported tasks:', importedTasks);
      handleMenuClose();
    } catch (error) {
      console.error('Import failed:', error);
    }
  };

  const handleExport = () => {
    exportTasks(tasks);
    handleMenuClose();
  };

  return (
    <>
      <AppBar position="static" sx={{ bgcolor: '#2c3e50' }}>
        <Container maxWidth="xl" disableGutters>
          <Toolbar sx={{ 
            px: { xs: 2, sm: 3 },
            justifyContent: 'space-between'
          }}>
            {/* Left side - Logo and main actions */}
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center',
              gap: { xs: 1, sm: 2 }
            }}>
              <Typography 
                variant="h6" 
                noWrap
                component="div" 
                sx={{ 
                  fontSize: { xs: '1.1rem', sm: '1.25rem' },
                  fontWeight: 600,
                  mr: { xs: 0, sm: 2 }
                }}
              >
                Task Tracker
              </Typography>

              {!isMobile && (
                <>
                  <Tooltip title="Undo">
                    <IconButton
                      color="inherit"
                      onClick={() => dispatch(ActionCreators.undo())}
                      aria-label="undo"
                      size="medium"
                    >
                      <UndoIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Redo">
                    <IconButton
                      color="inherit"
                      onClick={() => dispatch(ActionCreators.redo())}
                      aria-label="redo"
                      size="medium"
                    >
                      <RedoIcon />
                    </IconButton>
                  </Tooltip>
                </>
              )}
            </Box>

            {/* Right side - Navigation and actions */}
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center',
              gap: { xs: 0.5, sm: 1 }
            }}>
              {/* Always visible Add Task button */}
              <Tooltip title="Add Task">
                <IconButton
                  color="inherit"
                  onClick={() => setFormOpen(true)}
                  aria-label="add task"
                  size="large"
                >
                  <AddIcon />
                </IconButton>
              </Tooltip>

              {/* Mobile menu button */}
              {isMobile ? (
                <>
                  <IconButton
                    color="inherit"
                    onClick={handleMenuClick}
                    aria-label="show more"
                    aria-controls="mobile-menu"
                    aria-haspopup="true"
                  >
                    <MoreIcon />
                  </IconButton>
                  
                  <Menu
                    id="mobile-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleMenuClose}
                    MenuListProps={{
                      'aria-labelledby': 'mobile-menu',
                    }}
                    PaperProps={{
                      style: {
                        width: '200px',
                      },
                    }}
                  >
                    <MenuItem onClick={() => { navigate('/'); handleMenuClose(); }}>
                      <HomeIcon sx={{ mr: 2 }} />
                      Tasks
                    </MenuItem>
                    <MenuItem onClick={() => { navigate('/stats'); handleMenuClose(); }}>
                      <BarChartIcon sx={{ mr: 2 }} />
                      Stats
                    </MenuItem>
                    <Divider />
                    <MenuItem onClick={() => { dispatch(ActionCreators.undo()); handleMenuClose(); }}>
                      <UndoIcon sx={{ mr: 2 }} />
                      Undo
                    </MenuItem>
                    <MenuItem onClick={() => { dispatch(ActionCreators.redo()); handleMenuClose(); }}>
                      <RedoIcon sx={{ mr: 2 }} />
                      Redo
                    </MenuItem>
                    <Divider />
                    <MenuItem onClick={handleExport}>
                      <ImportExportIcon sx={{ mr: 2 }} />
                      Export
                    </MenuItem>
                    <MenuItem component="label">
                      <ImportExportIcon sx={{ mr: 2 }} />
                      Import
                      <input
                        type="file"
                        accept=".json"
                        onChange={handleImport}
                        style={{ display: 'none' }}
                      />
                    </MenuItem>
                  </Menu>
                </>
              ) : (
                <>
                  <Tooltip title="Tasks">
                    <IconButton
                      color="inherit"
                      onClick={() => navigate('/')}
                      aria-label="tasks"
                      size="medium"
                    >
                      <HomeIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Statistics">
                    <IconButton
                      color="inherit"
                      onClick={() => navigate('/stats')}
                      aria-label="statistics"
                      size="medium"
                    >
                      <BarChartIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Export Tasks">
                    <IconButton
                      color="inherit"
                      onClick={handleExport}
                      aria-label="export tasks"
                      size="medium"
                    >
                      <ImportExportIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Import Tasks">
                    <label>
                      <IconButton
                        component="span"
                        color="inherit"
                        aria-label="import tasks"
                        size="medium"
                      >
                        <ImportExportIcon />
                      </IconButton>
                      <input
                        type="file"
                        accept=".json"
                        onChange={handleImport}
                        style={{ display: 'none' }}
                      />
                    </label>
                  </Tooltip>
                </>
              )}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      
      <Container maxWidth="xl" sx={{ 
        mt: 3,
        px: { xs: 2, sm: 3 }
      }}>
        {children}
      </Container>
      
      <TaskForm open={formOpen} onClose={() => setFormOpen(false)} />
    </>
  );
};

export default Layout;