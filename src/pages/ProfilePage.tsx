
import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { AppLayout } from '@/components/AppLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';

const profileSchema = z.object({
  fullName: z.string().min(2, 'Full name must be at least 2 characters'),
  dob: z.date().optional(),
  place: z.string().optional(),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

const ProfilePage = () => {
  const { user, updateProfile } = useAuth();
  const { toast } = useToast();

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      fullName: user?.fullName || '',
      dob: user?.dob ? new Date(user.dob) : undefined,
      place: user?.place || '',
    },
  });

  const onSubmit = async (data: ProfileFormValues) => {
    try {
      await updateProfile({
        fullName: data.fullName,
        dob: data.dob ? data.dob.toISOString() : undefined,
        place: data.place,
      });
      
      toast({
        title: 'Profile updated',
        description: 'Your profile information has been successfully updated.',
      });
    } catch (error) {
      console.error('Profile update failed:', error);
      toast({
        title: 'Update failed',
        description: 'There was a problem updating your profile.',
        variant: 'destructive',
      });
    }
  };

  return (
    <AppLayout title="Profile Settings">
      <div className="container mx-auto px-4 py-6 max-w-lg">
        <Card>
          <CardHeader>
            <CardTitle>Profile Settings</CardTitle>
            <CardDescription>Update your personal information</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your full name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="dob"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Date of Birth</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-full pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) =>
                              date > new Date() || date < new Date("1900-01-01")
                            }
                            initialFocus
                            className={cn("p-3 pointer-events-auto")}
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="place"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Place</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your city/town" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="space-y-2">
                  <FormItem>
                    <FormLabel>College Name</FormLabel>
                    <FormControl>
                      <Input 
                        value={user?.collegeName || ''} 
                        disabled 
                        className="bg-muted/50" 
                      />
                    </FormControl>
                    <FormDescription>College name cannot be changed</FormDescription>
                  </FormItem>

                  <FormItem>
                    <FormLabel>User ID</FormLabel>
                    <FormControl>
                      <Input 
                        value={user?.userId || ''} 
                        disabled 
                        className="bg-muted/50" 
                      />
                    </FormControl>
                    <FormDescription>User ID cannot be changed</FormDescription>
                  </FormItem>
                </div>

                <Button type="submit" className="w-full">
                  Save Changes
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
};

export default ProfilePage;
