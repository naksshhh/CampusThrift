
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

type UserRole = 'admin' | 'moderator' | 'user';

export function usePermissions() {
  const [roles, setRoles] = useState<UserRole[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadUserRoles() {
      try {
        const { data: session } = await supabase.auth.getSession();

        if (!session.session?.user) {
          setRoles([]);
          setIsLoading(false);
          return;
        }

        const { data, error } = await supabase
          .rpc('get_user_roles')
          .select('role');

        if (error) {
          console.error('Error loading user roles:', error);
          toast.error('Failed to load user permissions');
          setRoles([]);
        } else {
          setRoles((data || []).map((r) => r.role as UserRole));
        }
      } catch (error) {
        console.error('Error in usePermissions:', error);
        setRoles([]);
      } finally {
        setIsLoading(false);
      }
    }

    loadUserRoles();

    // Listen for auth changes
    const { data: authListener } = supabase.auth.onAuthStateChange(() => {
      loadUserRoles();
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const hasRole = (role: UserRole) => roles.includes(role);
  const isAdmin = hasRole('admin');
  const isModerator = hasRole('moderator') || isAdmin;

  return {
    roles,
    hasRole,
    isAdmin,
    isModerator,
    isLoading,
  };
}
