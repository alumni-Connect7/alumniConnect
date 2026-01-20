import DashboardLayout from '../components/DashboardLayout';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Switch } from '../components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';

export default function SettingsPage() {
  return (
    <DashboardLayout role="student" userName="Nikhil Satya">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl mb-2 text-slate-900">Settings</h1>
          <p className="text-slate-600">Manage your account preferences and privacy</p>
        </div>

        <Tabs defaultValue="account" className="w-full">
          <TabsList>
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="privacy">Privacy</TabsTrigger>
          </TabsList>

          <TabsContent value="account" className="space-y-6 mt-6">
            <Card className="p-6">
              <h3 className="text-lg mb-4 text-slate-900">Account Information</h3>
              <div className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" defaultValue="Alex" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" defaultValue="Kumar" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" defaultValue="alex.kumar@college.edu" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input id="phone" defaultValue="+1 555-123-4567" />
                </div>
                <Button>Save Changes</Button>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg mb-4 text-slate-900">Change Password</h3>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="currentPassword">Current Password</Label>
                  <Input id="currentPassword" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="newPassword">New Password</Label>
                  <Input id="newPassword" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm New Password</Label>
                  <Input id="confirmPassword" type="password" />
                </div>
                <Button>Update Password</Button>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-6 mt-6">
            <Card className="p-6">
              <h3 className="text-lg mb-4 text-slate-900">Email Notifications</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-slate-900">Mentorship Requests</p>
                    <p className="text-sm text-slate-600">Receive emails when mentors respond</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-slate-900">Event Updates</p>
                    <p className="text-sm text-slate-600">Get notified about upcoming events</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-slate-900">Resume Analysis</p>
                    <p className="text-sm text-slate-600">Updates on resume score improvements</p>
                  </div>
                  <Switch />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-slate-900">Weekly Digest</p>
                    <p className="text-sm text-slate-600">Weekly summary of platform activity</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="privacy" className="space-y-6 mt-6">
            <Card className="p-6">
              <h3 className="text-lg mb-4 text-slate-900">Privacy Settings</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-slate-900">Profile Visibility</p>
                    <p className="text-sm text-slate-600">Make your profile visible to alumni</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-slate-900">Show Contact Information</p>
                    <p className="text-sm text-slate-600">Display email and phone to verified alumni</p>
                  </div>
                  <Switch />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-slate-900">Activity Status</p>
                    <p className="text-sm text-slate-600">Show when you're active on the platform</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
