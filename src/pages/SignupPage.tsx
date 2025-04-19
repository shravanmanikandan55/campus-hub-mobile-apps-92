
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { School } from 'lucide-react';

// Step 1: College Information
const collegeInfoSchema = z.object({
  collegeName: z.string().min(1, 'College name is required'),
  collegeCode: z.string().min(1, 'College code is required'),
});

// Step 2: User Information
const userInfoSchema = z.object({
  userId: z.string().min(1, 'User ID is required'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string().min(6, 'Confirm password is required'),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type CollegeInfoFormValues = z.infer<typeof collegeInfoSchema>;
type UserInfoFormValues = z.infer<typeof userInfoSchema>;

const SignupPage = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [collegeInfo, setCollegeInfo] = useState<CollegeInfoFormValues>({
    collegeName: '',
    collegeCode: '',
  });

  // College Info Form (Step 1)
  const collegeInfoForm = useForm<CollegeInfoFormValues>({
    resolver: zodResolver(collegeInfoSchema),
    defaultValues: collegeInfo,
  });

  // User Info Form (Step 2)
  const userInfoForm = useForm<UserInfoFormValues>({
    resolver: zodResolver(userInfoSchema),
    defaultValues: {
      userId: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmitCollegeInfo = (data: CollegeInfoFormValues) => {
    setCollegeInfo(data);
    setStep(2);
  };

  const { signup } = useAuth();

  const onSubmitUserInfo = async (data: UserInfoFormValues) => {
    try {
      await signup({
        userId: data.userId,
        collegeName: collegeInfo.collegeName,
        collegeCode: collegeInfo.collegeCode,
        password: data.password
      });
      
      // Redirect to dashboard after successful signup
      navigate('/dashboard');
    } catch (error) {
      console.error('Signup failed:', error);
    }
  };

  // Render based on current step
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1 flex flex-col items-center">
          <div className="w-16 h-16 flex items-center justify-center rounded-full bg-primary mb-2">
            <School className="h-8 w-8 text-white" />
          </div>
          <CardTitle className="text-2xl font-bold text-center">Create Account</CardTitle>
          <CardDescription className="text-center">
            Step {step} of 2: {step === 1 ? 'College Information' : 'Account Details'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {step === 1 ? (
            <Form {...collegeInfoForm}>
              <form onSubmit={collegeInfoForm.handleSubmit(onSubmitCollegeInfo)} className="space-y-4">
                <FormField
                  control={collegeInfoForm.control}
                  name="collegeName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>College Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your college name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={collegeInfoForm.control}
                  name="collegeCode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>College Code</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your college code" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <Button type="submit" className="w-full mt-6">
                  Continue
                </Button>
              </form>
            </Form>
          ) : (
            <Form {...userInfoForm}>
              <form onSubmit={userInfoForm.handleSubmit(onSubmitUserInfo)} className="space-y-4">
                <FormField
                  control={userInfoForm.control}
                  name="userId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>User ID</FormLabel>
                      <FormControl>
                        <Input placeholder="Create your user ID" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={userInfoForm.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="Create a password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={userInfoForm.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm Password</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="Confirm your password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="flex gap-2">
                  <Button type="button" variant="outline" className="flex-1" onClick={() => setStep(1)}>
                    Back
                  </Button>
                  <Button type="submit" className="flex-1">
                    Create Account
                  </Button>
                </div>
              </form>
            </Form>
          )}
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-sm text-center text-gray-500">
            Already have an account?{' '}
            <Link to="/login" className="text-primary font-medium hover:underline">
              Log In
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SignupPage;
