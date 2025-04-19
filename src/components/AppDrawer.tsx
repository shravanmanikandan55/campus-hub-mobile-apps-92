
import React from 'react';
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { cn } from '@/lib/utils';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { useAuth } from '@/contexts/AuthContext';

type DrawerItemProps = {
  title: string;
  path: string;
  icon: React.ReactNode;
  onClick?: () => void;
};

const DrawerItem: React.FC<DrawerItemProps> = ({ title, path, icon, onClick }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const isActive = location.pathname === path;

  const handleClick = () => {
    navigate(path);
    if (onClick) onClick();
  };

  return (
    <Button
      variant="ghost"
      className={cn(
        "w-full justify-start gap-2 mb-1 text-left",
        isActive ? "bg-primary/10 text-primary" : "hover:bg-primary/5"
      )}
      onClick={handleClick}
    >
      {icon}
      <span>{title}</span>
    </Button>
  );
};

type AppDrawerProps = {
  children?: React.ReactNode;
};

export const AppDrawer: React.FC<AppDrawerProps> = ({ children }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  const closeDrawer = () => setOpen(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="p-0">
          <Menu className="h-6 w-6" />
          <span className="sr-only">Open menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[280px] p-0">
        <div className="py-6 px-4">
          <h2 className="text-xl font-bold mb-6 text-center">CampusStore</h2>
          <nav className="space-y-1">
            <DrawerItem 
              title="Dashboard" 
              path="/dashboard" 
              icon={<span className="material-icons">dashboard</span>} 
              onClick={closeDrawer}
            />
            <DrawerItem 
              title="Apps" 
              path="/apps" 
              icon={<span className="material-icons">apps</span>} 
              onClick={closeDrawer}
            />
            <DrawerItem 
              title="WebApps" 
              path="/webapps" 
              icon={<span className="material-icons">language</span>} 
              onClick={closeDrawer}
            />
            <DrawerItem 
              title="Profile Settings" 
              path="/profile" 
              icon={<span className="material-icons">person</span>} 
              onClick={closeDrawer}
            />
            <Button 
              variant="ghost" 
              className="w-full justify-start gap-2 text-left text-destructive hover:text-destructive hover:bg-destructive/10"
              onClick={handleLogout}
            >
              <span className="material-icons">logout</span>
              <span>Logout</span>
            </Button>
          </nav>
        </div>
      </SheetContent>
    </Sheet>
  );
};
