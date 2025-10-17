import { useState } from "react";
import { motion } from "motion/react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import { ArrowLeft, Camera, Save, Upload, User } from "lucide-react";

export function EditProfilePage({ onBack, onSave, onLogout, user }) {
  // user prop is optional; fallback values used when missing
  const [name, setName] = useState(user?.name || "John Doe");
  const [email, setEmail] = useState(user?.email || "john.doe@example.com");
  const [avatarUrl, setAvatarUrl] = useState(user?.avatar || "");

  const handleSave = (e) => {
    e.preventDefault();
    // in a real app you'd call an API here; we call onSave if provided
    if (onSave) onSave({ name, email, avatar: avatarUrl });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/10">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between px-4">
          <Button variant="ghost" onClick={onBack} className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>

          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={onLogout} className="gap-2">
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="container px-4 py-12 max-w-3xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Edit Profile</CardTitle>
              <CardDescription>Update your display name and avatar</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSave} className="space-y-6">
                <div className="flex items-center gap-4">
                  <div>
                    <Avatar className="h-20 w-20">
                      {avatarUrl ? (
                        <AvatarImage src={avatarUrl} alt={name} />
                      ) : (
                        <AvatarFallback className="bg-gradient-to-br from-chart-1 to-chart-2 text-white">
                          {name.split(" ").map(n => n[0]).join("")}
                        </AvatarFallback>
                      )}
                    </Avatar>
                  </div>
                  <div className="flex-1">
                    <Label htmlFor="avatar">Avatar URL</Label>
                    <div className="flex gap-2 mt-2">
                      <Input id="avatar" value={avatarUrl} onChange={(e) => setAvatarUrl(e.target.value)} placeholder="https://..." />
                      <Button variant="outline" onClick={() => document.getElementById('avatar')?.focus()}>
                        <Upload className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>

                <div>
                  <Label htmlFor="name">Full name</Label>
                  <Input id="name" value={name} onChange={(e) => setName(e.target.value)} />
                </div>

                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>

                <div className="flex gap-2 justify-end">
                  <Button variant="outline" onClick={onBack}>Cancel</Button>
                  <Button type="submit" className="gap-2">
                    <Save className="h-4 w-4" />
                    Save
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}

export default EditProfilePage;
