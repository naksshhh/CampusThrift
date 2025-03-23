
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import { usePermissions } from '@/hooks/use-permissions';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface User {
  id: string;
  email?: string;
  created_at?: string;
}

interface UserWithRoles extends User {
  roles: string[];
}

const AdminDashboard = () => {
  const { isAdmin, isLoading } = usePermissions();
  const navigate = useNavigate();
  const [users, setUsers] = useState<UserWithRoles[]>([]);
  const [isLoadingUsers, setIsLoadingUsers] = useState(true);
  const [email, setEmail] = useState('');
  const [selectedRole, setSelectedRole] = useState<'admin' | 'moderator' | 'user'>('admin');
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

  useEffect(() => {
    if (!isLoading && !isAdmin) {
      toast.error('You do not have permission to access this page');
      navigate('/');
    }
  }, [isAdmin, isLoading, navigate]);

  useEffect(() => {
    async function fetchUsers() {
      try {
        // For demonstration purposes - in a real app, we'd need an admin-specific API
        // that has the appropriate permissions to list all users
        const { data: users, error } = await supabase.from('profiles').select('id, email');
        
        if (error) {
          console.error('Error fetching users:', error);
          toast.error('Failed to load users');
          return;
        }

        const usersWithRoles = await Promise.all(
          users.map(async (user) => {
            const { data: roleData } = await supabase
              .rpc('get_user_roles', { user_uuid: user.id })
              .select('role');
            
            return {
              ...user,
              roles: (roleData || []).map(r => r.role),
            };
          })
        );

        setUsers(usersWithRoles);
      } catch (error) {
        console.error('Error in fetchUsers:', error);
        toast.error('Failed to load users');
      } finally {
        setIsLoadingUsers(false);
      }
    }

    if (isAdmin) {
      fetchUsers();
    }
  }, [isAdmin]);

  const handleAssignRole = async () => {
    if (!selectedUserId) {
      toast.error('Please select a user');
      return;
    }

    try {
      // Insert the role for the user
      const { error } = await supabase
        .from('user_roles')
        .insert({
          user_id: selectedUserId,
          role: selectedRole
        });

      if (error) {
        if (error.code === '23505') { // Unique violation
          toast.error(`User already has the ${selectedRole} role`);
        } else {
          console.error('Error assigning role:', error);
          toast.error('Failed to assign role');
        }
        return;
      }

      toast.success(`User assigned ${selectedRole} role successfully`);
      
      // Refresh the user list
      setUsers(prev => {
        return prev.map(user => {
          if (user.id === selectedUserId) {
            return {
              ...user,
              roles: [...user.roles.filter(r => r !== selectedRole), selectedRole]
            };
          }
          return user;
        });
      });
    } catch (error) {
      console.error('Error in handleAssignRole:', error);
      toast.error('Failed to assign role');
    }
  };

  const handleFindUser = async () => {
    if (!email.trim()) {
      toast.error('Please enter an email address');
      return;
    }

    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('id, email')
        .eq('email', email.toLowerCase().trim())
        .single();

      if (error || !data) {
        toast.error('User not found');
        return;
      }

      setSelectedUserId(data.id);
      toast.success(`User found: ${data.email}`);
    } catch (error) {
      console.error('Error finding user:', error);
      toast.error('Failed to find user');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 pt-24 pb-16">
          <div className="container max-w-6xl">
            <h1 className="text-2xl font-bold mb-4">Loading...</h1>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-24 pb-16">
        <div className="container max-w-6xl">
          <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
          <p className="text-muted-foreground mb-8">Manage your application</p>

          <Tabs defaultValue="users">
            <TabsList className="mb-4">
              <TabsTrigger value="users">Users & Permissions</TabsTrigger>
              <TabsTrigger value="categories">Categories</TabsTrigger>
              <TabsTrigger value="listings">Listings</TabsTrigger>
            </TabsList>
            
            <TabsContent value="users" className="space-y-8">
              <div className="bg-white p-6 rounded-lg border">
                <h2 className="text-xl font-semibold mb-4">Assign User Role</h2>
                
                <div className="grid gap-4 mb-6">
                  <div className="grid gap-2">
                    <Label htmlFor="email">User Email</Label>
                    <div className="flex gap-2">
                      <Input 
                        id="email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        placeholder="user@example.com"
                        className="flex-1"
                      />
                      <Button onClick={handleFindUser}>Find User</Button>
                    </div>
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="role">Role to Assign</Label>
                    <div className="flex gap-2">
                      <select
                        id="role"
                        value={selectedRole}
                        onChange={(e) => setSelectedRole(e.target.value as 'admin' | 'moderator' | 'user')}
                        className="flex-1 px-3 py-2 border rounded-md"
                      >
                        <option value="admin">Admin</option>
                        <option value="moderator">Moderator</option>
                        <option value="user">User</option>
                      </select>
                      <Button 
                        onClick={handleAssignRole} 
                        disabled={!selectedUserId}
                      >
                        Assign Role
                      </Button>
                    </div>
                  </div>
                </div>

                {selectedUserId && (
                  <div className="bg-secondary p-3 rounded-md">
                    <p className="font-medium">Selected User: {users.find(u => u.id === selectedUserId)?.email}</p>
                  </div>
                )}
              </div>

              <div className="bg-white p-6 rounded-lg border">
                <h2 className="text-xl font-semibold mb-4">Current Users</h2>
                
                {isLoadingUsers ? (
                  <p>Loading users...</p>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="bg-secondary">
                          <th className="p-2 text-left">Email</th>
                          <th className="p-2 text-left">Roles</th>
                          <th className="p-2 text-left">Created</th>
                        </tr>
                      </thead>
                      <tbody>
                        {users.map((user) => (
                          <tr key={user.id} className="border-b">
                            <td className="p-2">{user.email}</td>
                            <td className="p-2">
                              {user.roles.length > 0 ? (
                                <div className="flex flex-wrap gap-1">
                                  {user.roles.map(role => (
                                    <span key={role} className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full">
                                      {role}
                                    </span>
                                  ))}
                                </div>
                              ) : (
                                <span className="text-muted-foreground text-sm">No roles</span>
                              )}
                            </td>
                            <td className="p-2">{new Date(user.created_at || '').toLocaleDateString()}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="categories">
              <div className="bg-white p-6 rounded-lg border">
                <h2 className="text-xl font-semibold mb-4">Manage Categories</h2>
                <p className="text-muted-foreground">
                  Category management feature will be implemented soon.
                </p>
              </div>
            </TabsContent>
            
            <TabsContent value="listings">
              <div className="bg-white p-6 rounded-lg border">
                <h2 className="text-xl font-semibold mb-4">Manage Listings</h2>
                <p className="text-muted-foreground">
                  Listing management feature will be implemented soon.
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
