import React from 'react';
import { Card, CardContent, Typography, Box, Grid, Avatar, Chip } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Delete, Edit } from '@mui/icons-material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';

const ClientReviewFeedbackCard = () => {
  return (
    <Card sx={{ width: '300px', margin: 'auto', mt: 2 }}>
      <CardContent>
        <Typography variant="h6" align="left">
          Client Review & Feedback
        </Typography>
        <Typography variant="body2" align="left" color="textSecondary">
          Crypto Wallet Redesign
        </Typography>
        <Box sx={{ mt: 2, display: 'flex', alignItems: 'center' }}>
          <Typography variant="body2" align="left">
            Today
          </Typography>
          <Typography variant="body2" align="left" sx={{ ml: 1 }}>
            10:00 PM
          </Typography>
          <Box sx={{ ml: 'auto' }}>
            <Chip
              icon={<CheckCircleIcon sx={{ color: 'white' }} />}
              label=""
              variant="contained"
              color="primary"
              size="small"
            />
                   <IconButton onClick={() => {}}>
              <EditIcon color="primary" />
            </IconButton>
            <IconButton onClick={() =>{}}>
              <DeleteIcon color="secondary" />
            </IconButton>
          </Box>
          
        </Box>
      
      </CardContent>
    </Card>
  );
};

export default ClientReviewFeedbackCard;