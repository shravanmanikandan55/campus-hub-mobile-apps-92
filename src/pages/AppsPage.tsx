
import React from 'react';
import { AppLayout } from '@/components/AppLayout';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import '../components/MaterialIcons.css';

// Mock data for apps
const mockApps = [
  {
    id: 1,
    name: 'Student Timetable',
    description: 'Keep track of your classes with this interactive timetable app.',
    developer: 'CS Department',
    uploadDate: '2024-04-15',
    downloads: 142,
    size: '3.5 MB',
  },
  {
    id: 2,
    name: 'Campus Navigator',
    description: 'Find your way around campus with indoor and outdoor navigation.',
    developer: 'John Smith',
    uploadDate: '2024-04-10',
    downloads: 89,
    size: '7.2 MB',
  },
  {
    id: 3,
    name: 'Study Group Finder',
    description: 'Connect with other students to form study groups and collaborate.',
    developer: 'Emma Johnson',
    uploadDate: '2024-04-05',
    downloads: 215,
    size: '5.1 MB',
  },
  {
    id: 4,
    name: 'Library Catalog',
    description: 'Search and reserve books from the college library directly from your phone.',
    developer: 'Library IT Team',
    uploadDate: '2024-03-28',
    downloads: 178,
    size: '4.8 MB',
  },
  {
    id: 5,
    name: 'Event Tracker',
    description: 'Never miss a campus event with notifications and calendar integration.',
    developer: 'Student Union',
    uploadDate: '2024-03-22',
    downloads: 201,
    size: '6.3 MB',
  },
];

const AppsPage = () => {
  return (
    <AppLayout title="Apps">
      <div className="container mx-auto px-4 py-6 max-w-4xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Android Applications</h2>
          <Button>
            <span className="material-icons mr-2">filter_list</span>
            Filter
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {mockApps.map((app) => (
            <Card key={app.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <CardHeader className="bg-gradient-to-r from-primary/20 to-secondary/20 p-4">
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-lg bg-primary text-white flex items-center justify-center mr-3">
                    <span className="material-icons">android</span>
                  </div>
                  <div>
                    <CardTitle className="text-lg">{app.name}</CardTitle>
                    <div className="text-xs text-muted-foreground">
                      By {app.developer} • {app.size}
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-4">
                <p className="text-sm mb-3">{app.description}</p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className="text-xs">
                    <span className="material-icons text-xs mr-1">calendar_today</span>
                    {app.uploadDate}
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    <span className="material-icons text-xs mr-1">download</span>
                    {app.downloads} downloads
                  </Badge>
                </div>
              </CardContent>
              <CardFooter className="p-4 pt-0 flex justify-end gap-2">
                <Button variant="outline" size="sm">Details</Button>
                <Button size="sm">
                  <span className="material-icons mr-1">download</span>
                  Download
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </AppLayout>
  );
};

export default AppsPage;
