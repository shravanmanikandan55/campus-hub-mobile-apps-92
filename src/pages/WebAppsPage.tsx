
import React from 'react';
import { AppLayout } from '@/components/AppLayout';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ExternalLink } from 'lucide-react';
import '../components/MaterialIcons.css';

// Mock data for web apps
const mockWebApps = [
  {
    id: 1,
    name: 'College Portal',
    description: 'Access courses, grades, and administrative services through the official college portal.',
    url: 'https://portal.college.edu',
    category: 'Academic',
  },
  {
    id: 2,
    name: 'Online Library',
    description: 'Access e-books, journals and research papers from anywhere.',
    url: 'https://library.college.edu',
    category: 'Academic',
  },
  {
    id: 3,
    name: 'Campus Events',
    description: 'Calendar of upcoming events, workshops and activities on campus.',
    url: 'https://events.college.edu',
    category: 'Social',
  },
  {
    id: 4,
    name: 'Alumni Network',
    description: 'Connect with graduates and explore career opportunities.',
    url: 'https://alumni.college.edu',
    category: 'Career',
  },
  {
    id: 5,
    name: 'Internship Portal',
    description: 'Find internship opportunities both on and off campus.',
    url: 'https://internships.college.edu',
    category: 'Career',
  },
  {
    id: 6,
    name: 'Student Projects',
    description: 'Showcase of innovative student projects from various departments.',
    url: 'https://projects.college.edu',
    category: 'Showcase',
  },
];

const WebAppsPage = () => {
  const handleOpenWebApp = (url: string) => {
    // In a real mobile app, this would use Capacitor's Browser plugin
    // or open in a WebView
    window.open(url, '_blank');
  };

  // Group web apps by category
  const groupedApps = mockWebApps.reduce((groups, app) => {
    if (!groups[app.category]) {
      groups[app.category] = [];
    }
    groups[app.category].push(app);
    return groups;
  }, {} as Record<string, typeof mockWebApps>);

  return (
    <AppLayout title="Web Apps">
      <div className="container mx-auto px-4 py-6 max-w-4xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Web Applications</h2>
        </div>

        {Object.entries(groupedApps).map(([category, apps]) => (
          <div key={category} className="mb-8">
            <h3 className="text-lg font-medium mb-4 flex items-center">
              <span className="material-icons mr-2">
                {category === 'Academic' ? 'school' :
                 category === 'Social' ? 'groups' :
                 category === 'Career' ? 'work' : 'code'}
              </span>
              {category}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {apps.map((app) => (
                <Card key={app.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">{app.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <p className="text-sm text-muted-foreground">{app.description}</p>
                  </CardContent>
                  <CardFooter className="flex justify-end">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="gap-1"
                      onClick={() => handleOpenWebApp(app.url)}
                    >
                      <ExternalLink className="h-4 w-4" />
                      Open
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>
    </AppLayout>
  );
};

export default WebAppsPage;
