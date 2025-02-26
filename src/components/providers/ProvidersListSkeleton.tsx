import { Card, CardContent, Grid, Skeleton, Box } from '@mui/material';

export default function ProvidersListSkeleton() {
  return (
    <Grid container spacing={3}>
      {[...Array(6)].map((_, index) => (
        <Grid item xs={12} sm={6} md={4} key={index}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                <Skeleton variant="circular" width={64} height={64} />
                <Box sx={{ flex: 1 }}>
                  <Skeleton variant="text" width="80%" height={32} />
                  <Skeleton variant="rectangular" width={60} height={24} />
                </Box>
              </Box>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Skeleton variant="text" width="60%" />
                  <Skeleton variant="text" width="40%" height={32} />
                </Grid>
                <Grid item xs={6}>
                  <Skeleton variant="text" width="60%" />
                  <Skeleton variant="text" width="40%" height={32} />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}