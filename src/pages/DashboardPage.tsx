
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AppLayout } from '@/components/AppLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { Upload } from 'lucide-react';
import '../components/MaterialIcons.css';

const DashboardPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <AppLayout title="Dashboard">
      <div className="container mx-auto px-4 py-6 max-w-4xl">
        <Card className="bg-gradient-to-r from-primary/20 to-primary/10 mb-8">
          <CardContent className="p-6">
            <h2 className="text-2xl font-bold mb-2">Welcome{user?.fullName ? `, ${user.fullName}` : ''}!</h2>
            <p className="text-muted-foreground">
              Manage and explore your campus apps in one place.
            </p>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6 flex flex-col items-center text-center">
              <div className="w-16 h-16 flex items-center justify-center rounded-full bg-primary/20 mb-4">
                <span className="material-icons text-primary">file_upload</span>
              </div>
              <h3 className="text-xl font-medium mb-2">Upload APK</h3>
              <p className="text-muted-foreground mb-4">
                Share your Android application with other students in your college.
              </p>
              <Button 
                className="w-full mt-auto" 
                onClick={() => navigate('/upload')}
              >
                Upload App
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6 flex flex-col items-center text-center">
              <div className="w-16 h-16 flex items-center justify-center rounded-full bg-primary/20 mb-4">
                <span className="material-icons text-primary">apps</span>
              </div>
              <h3 className="text-xl font-medium mb-2">View Apps</h3>
              <p className="text-muted-foreground mb-4">
                Browse all available applications uploaded by students.
              </p>
              <Button 
                className="w-full mt-auto" 
                onClick={() => navigate('/apps')}
              >
                Browse Apps
              </Button>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-xl font-medium mb-4">Quick Links</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              <Button 
                variant="outline" 
                className="flex items-center justify-center gap-2 h-auto py-3"
                onClick={() => navigate('/webapps')}
              >
                <span className="material-icons">language</span>
                Web Apps
              </Button>
              <Button 
                variant="outline" 
                className="flex items-center justify-center gap-2 h-auto py-3"
                onClick={() => navigate('/profile')}
              >
                <span className="material-icons">person</span>
                Profile
              </Button>
              <Button 
                variant="outline" 
                className="flex items-center justify-center gap-2 h-auto py-3"
                onClick={() => {}}
              >
                <span className="material-icons">help</span>
                Help
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
};

export default DashboardPage;
