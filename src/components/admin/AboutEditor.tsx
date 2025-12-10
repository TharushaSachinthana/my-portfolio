import { useAdmin } from './AdminContext';

export function AboutEditor() {
    const { data, updateData } = useAdmin();
    const { about } = data;

    const handleChange = (field: keyof typeof about, value: string) => {
        updateData({
            about: {
                ...about,
                [field]: value,
            },
        });
    };

    const handleSave = () => {
        alert('About section saved successfully!');
    };

    return (
        <div className="space-y-6">
            <div>
                <label className="block text-sm text-muted-foreground mb-2">Education Section Title</label>
                <input
                    type="text"
                    value={about.educationTitle}
                    onChange={(e) => handleChange('educationTitle', e.target.value)}
                    className="w-full px-4 py-3 bg-input-background border border-input rounded-xl focus:outline-none focus:border-primary text-foreground"
                />
            </div>

            <div>
                <label className="block text-sm text-muted-foreground mb-2">Education Description</label>
                <textarea
                    value={about.educationDescription}
                    onChange={(e) => handleChange('educationDescription', e.target.value)}
                    rows={4}
                    className="w-full px-4 py-3 bg-input-background border border-input rounded-xl focus:outline-none focus:border-primary text-foreground resize-none"
                />
            </div>

            <div>
                <label className="block text-sm text-muted-foreground mb-2">Professional Section Title</label>
                <input
                    type="text"
                    value={about.professionalTitle}
                    onChange={(e) => handleChange('professionalTitle', e.target.value)}
                    className="w-full px-4 py-3 bg-input-background border border-input rounded-xl focus:outline-none focus:border-primary text-foreground"
                />
            </div>

            <div>
                <label className="block text-sm text-muted-foreground mb-2">Professional Description</label>
                <textarea
                    value={about.professionalDescription}
                    onChange={(e) => handleChange('professionalDescription', e.target.value)}
                    rows={4}
                    className="w-full px-4 py-3 bg-input-background border border-input rounded-xl focus:outline-none focus:border-primary text-foreground resize-none"
                />
            </div>

            <div>
                <label className="block text-sm text-muted-foreground mb-2">Closing Statement</label>
                <textarea
                    value={about.closingStatement}
                    onChange={(e) => handleChange('closingStatement', e.target.value)}
                    rows={3}
                    className="w-full px-4 py-3 bg-input-background border border-input rounded-xl focus:outline-none focus:border-primary text-foreground resize-none"
                />
            </div>

            <button
                onClick={handleSave}
                className="w-full px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-xl hover:opacity-90 transition-all"
            >
                Save About Section
            </button>
        </div>
    );
}
