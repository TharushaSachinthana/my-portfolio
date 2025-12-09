import { useAdmin } from './AdminContext';
import { Save } from 'lucide-react';
import { useState, useEffect } from 'react';

export function ProfileEditor() {
    const { data, updateData } = useAdmin();
    const [profile, setProfile] = useState(data.profile);

    useEffect(() => {
        setProfile(data.profile);
    }, [data.profile]);

    const handleSave = () => {
        updateData({ profile });
        alert('Profile saved!');
    };

    return (
        <div className="space-y-4">
            <div>
                <label className="block text-sm text-muted-foreground mb-2">Name</label>
                <input
                    type="text"
                    value={profile.name}
                    onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                    className="w-full px-4 py-3 bg-input-background border border-input rounded-xl focus:outline-none focus:border-primary"
                />
            </div>

            <div>
                <label className="block text-sm text-muted-foreground mb-2">Title</label>
                <input
                    type="text"
                    value={profile.title}
                    onChange={(e) => setProfile({ ...profile, title: e.target.value })}
                    className="w-full px-4 py-3 bg-input-background border border-input rounded-xl focus:outline-none focus:border-primary"
                />
            </div>

            <div>
                <label className="block text-sm text-muted-foreground mb-2">Bio</label>
                <textarea
                    value={profile.bio}
                    onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                    rows={4}
                    className="w-full px-4 py-3 bg-input-background border border-input rounded-xl focus:outline-none focus:border-primary resize-none"
                />
            </div>

            <div>
                <label className="block text-sm text-muted-foreground mb-2">Profile Image URL</label>
                <input
                    type="text"
                    value={profile.profileImage}
                    onChange={(e) => setProfile({ ...profile, profileImage: e.target.value })}
                    className="w-full px-4 py-3 bg-input-background border border-input rounded-xl focus:outline-none focus:border-primary"
                />
                <p className="text-xs text-muted-foreground mt-1">Use /profile.png for your uploaded photo</p>
            </div>

            <div>
                <label className="block text-sm text-muted-foreground mb-2">Location</label>
                <input
                    type="text"
                    value={profile.location}
                    onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                    className="w-full px-4 py-3 bg-input-background border border-input rounded-xl focus:outline-none focus:border-primary"
                />
            </div>

            <div>
                <label className="block text-sm text-muted-foreground mb-2">Email</label>
                <input
                    type="email"
                    value={profile.email}
                    onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                    className="w-full px-4 py-3 bg-input-background border border-input rounded-xl focus:outline-none focus:border-primary"
                />
            </div>

            <div>
                <label className="block text-sm text-muted-foreground mb-2">LinkedIn URL</label>
                <input
                    type="text"
                    value={profile.linkedinUrl}
                    onChange={(e) => setProfile({ ...profile, linkedinUrl: e.target.value })}
                    className="w-full px-4 py-3 bg-input-background border border-input rounded-xl focus:outline-none focus:border-primary"
                />
            </div>

            <div>
                <label className="block text-sm text-muted-foreground mb-2">GitHub URL</label>
                <input
                    type="text"
                    value={profile.githubUrl}
                    onChange={(e) => setProfile({ ...profile, githubUrl: e.target.value })}
                    className="w-full px-4 py-3 bg-input-background border border-input rounded-xl focus:outline-none focus:border-primary"
                />
            </div>

            <button
                onClick={handleSave}
                className="w-full p-3 rounded-xl bg-gradient-to-r from-primary to-secondary text-white flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
            >
                <Save className="w-4 h-4" />
                Save Profile
            </button>
        </div>
    );
}
