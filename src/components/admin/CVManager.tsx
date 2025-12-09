import { useAdmin } from './AdminContext';
import { Save, Plus, Trash2, Check, FileDown } from 'lucide-react';
import { useState, useEffect } from 'react';
import { CVFile, generateId } from '../../data/portfolioData';

export function CVManager() {
    const { data, updateData } = useAdmin();
    const [cvFiles, setCvFiles] = useState<CVFile[]>(data.cvFiles);

    useEffect(() => {
        setCvFiles(data.cvFiles);
    }, [data.cvFiles]);

    const handleSave = () => {
        updateData({ cvFiles });
        alert('CV files saved!');
    };

    const addCV = () => {
        const newCV: CVFile = {
            id: generateId(),
            name: 'new-cv.pdf',
            label: 'New CV',
            url: '/new-cv.pdf',
            isActive: cvFiles.length === 0,
        };
        setCvFiles([...cvFiles, newCV]);
    };

    const removeCV = (id: string) => {
        const updated = cvFiles.filter((cv) => cv.id !== id);
        // If we removed the active CV, make another one active
        if (updated.length > 0 && !updated.some((cv) => cv.isActive)) {
            updated[0].isActive = true;
        }
        setCvFiles(updated);
    };

    const updateCV = (id: string, updates: Partial<CVFile>) => {
        setCvFiles(cvFiles.map((cv) => (cv.id === id ? { ...cv, ...updates } : cv)));
    };

    const setActive = (id: string) => {
        setCvFiles(cvFiles.map((cv) => ({ ...cv, isActive: cv.id === id })));
    };

    return (
        <div className="space-y-4">
            <div className="text-sm text-muted-foreground mb-4">
                Manage your CV files. The active CV will be used for the download button on your portfolio.
                <br />
                <br />
                <strong>Note:</strong> To add a new CV file:
                <ol className="list-decimal list-inside mt-2 space-y-1">
                    <li>Place your PDF in the <code className="text-primary">/public</code> folder</li>
                    <li>Add it here with the URL <code className="text-primary">/filename.pdf</code></li>
                </ol>
            </div>

            {cvFiles.map((cv) => (
                <div
                    key={cv.id}
                    className={`glass-card p-4 rounded-xl space-y-3 ${cv.isActive ? 'ring-2 ring-primary' : ''}`}
                >
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <FileDown className="w-5 h-5 text-primary" />
                            <input
                                type="text"
                                value={cv.label}
                                onChange={(e) => updateCV(cv.id, { label: e.target.value })}
                                className="px-3 py-2 bg-input-background border border-input rounded-lg focus:outline-none focus:border-primary text-sm font-medium"
                                placeholder="CV Label"
                            />
                        </div>
                        <div className="flex items-center gap-2">
                            {cv.isActive && (
                                <span className="px-2 py-1 bg-primary/20 text-primary rounded text-xs">Active</span>
                            )}
                            <button
                                onClick={() => removeCV(cv.id)}
                                className="p-2 rounded-lg hover:bg-destructive/20 text-destructive transition-colors"
                            >
                                <Trash2 className="w-4 h-4" />
                            </button>
                        </div>
                    </div>

                    <input
                        type="text"
                        value={cv.name}
                        onChange={(e) => updateCV(cv.id, { name: e.target.value })}
                        placeholder="File name (e.g., my-cv.pdf)"
                        className="w-full px-3 py-2 bg-input-background border border-input rounded-lg focus:outline-none focus:border-primary text-sm"
                    />

                    <input
                        type="text"
                        value={cv.url}
                        onChange={(e) => updateCV(cv.id, { url: e.target.value })}
                        placeholder="URL (e.g., /my-cv.pdf)"
                        className="w-full px-3 py-2 bg-input-background border border-input rounded-lg focus:outline-none focus:border-primary text-sm"
                    />

                    {!cv.isActive && (
                        <button
                            onClick={() => setActive(cv.id)}
                            className="w-full p-2 rounded-lg glass-card flex items-center justify-center gap-2 hover:scale-[1.02] transition-transform text-sm"
                        >
                            <Check className="w-4 h-4" />
                            Set as Active CV
                        </button>
                    )}
                </div>
            ))}

            <button
                onClick={addCV}
                className="w-full p-3 rounded-xl glass-card flex items-center justify-center gap-2 hover:scale-[1.02] transition-transform"
            >
                <Plus className="w-4 h-4" />
                Add CV
            </button>

            <button
                onClick={handleSave}
                className="w-full p-3 rounded-xl bg-gradient-to-r from-primary to-secondary text-white flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
            >
                <Save className="w-4 h-4" />
                Save CV Files
            </button>
        </div>
    );
}
