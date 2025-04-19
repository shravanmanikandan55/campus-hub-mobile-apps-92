
import React from 'react';
import { User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { AppDrawer } from './AppDrawer';
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

type AppHeaderProps = {
  title?: string;
};

export const AppHeader: React.FC<AppHeaderProps> = ({ title = "CampusStore" }) => {
  const navigate = useNavigate();

  const handleProfileClick = () => {
    navigate('/profile');
  };

  return (
    <div className="flex justify-between items-center p-4 border-b bg-white dark:bg-gray-800">
      <div className="flex items-center gap-3">
        <AppDrawer />
        <h1 className="text-xl font-bold">{title}</h1>
      </div>
      <Button 
        variant="ghost" 
        size="icon" 
        className="rounded-full" 
        onClick={handleProfileClick}
      >
        <Avatar>
          <AvatarFallback className="bg-primary text-primary-foreground">
            <User className="h-5 w-5" />
          </AvatarFallback>
        </Avatar>
      </Button>
    </div>
  );
};
