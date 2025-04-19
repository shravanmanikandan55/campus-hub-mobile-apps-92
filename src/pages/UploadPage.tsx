
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppLayout } from '@/components/AppLayout';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Upload } from 'lucide-react';
import '../components/MaterialIcons.css';

const uploadSchema = z.object({
  appName: z.string().min(3, 'App name must be at least 3 characters'),
  description: z.string().min(20, 'Description must be at least 20 characters'),
  version: z.string().min(1, 'Version is required'),
  // In a real app, we would validate the file field more thoroughly
  file: z.any(),
});

type UploadFormValues = z.infer<typeof uploadSchema>;

const UploadPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isUploading, setIsUploading] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);

  const form = useForm<UploadFormValues>({
    resolver: zodResolver(uploadSchema),
    defaultValues: {
      appName: '',
      description: '',
      version: '1.0.0',
    },
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFileName(file.name);
      form.setValue('file', file);
    }
  };

  const onSubmit = async (data: UploadFormValues) => {
    setIsUploading(true);
    try {
      // Simulate upload delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      console.log('Upload data:', data);
      
      toast({
        title: 'Upload successful',
        description: 'Your APK has been successfully uploaded.',
      });
      
      navigate('/apps');
    } catch (error) {
      console.error('Upload failed:', error);
      toast({
        title: 'Upload failed',
        description: 'There was a problem uploading your APK.',
        variant: 'destructive',
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <AppLayout title="Upload APK">
      <div className="container mx-auto px-4 py-6 max-w-lg">
        <Card>
          <CardHeader>
            <CardTitle>Upload Android Application</CardTitle>
            <CardDescription>Share your app with other students</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="appName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>App Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your app name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Describe what your app does" 
                          className="resize-none min-h-[100px]"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="version"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Version</FormLabel>
                      <FormControl>
                        <Input placeholder="1.0.0" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="file"
                  render={() => (
                    <FormItem>
                      <FormLabel>APK File</FormLabel>
                      <FormControl>
                        <div className="border-2 border-dashed rounded-lg p-6 border-gray-300 flex flex-col items-center justify-center">
                          <Upload className="h-8 w-8 text-gray-400 mb-2" />
                          <p className="text-sm font-medium mb-1">
                            {fileName ? fileName : 'Drag and drop your APK file here'}
                          </p>
                          <p className="text-xs text-muted-foreground mb-3">
                            or click to browse files (max 100MB)
                          </p>
                          <input
                            type="file"
                            id="apk-file"
                            accept=".apk"
                            className="hidden"
                            onChange={handleFileChange}
                          />
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => document.getElementById('apk-file')?.click()}
                          >
                            Select APK File
                          </Button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex justify-end gap-2 pt-2">
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => navigate('/dashboard')}
                  >
                    Cancel
                  </Button>
                  <Button 
                    type="submit" 
                    disabled={isUploading}
                  >
                    {isUploading ? (
                      <>
                        <span className="material-icons animate-spin mr-2">refresh</span>
                        Uploading...
                      </>
                    ) : "Upload APK"}
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
};

export default UploadPage;
