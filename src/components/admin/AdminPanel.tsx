import { motion, AnimatePresence } from 'motion/react';
import { useAdmin } from './AdminContext';
import {
    X,
    Settings,
    User,
    Code,
    Briefcase,
    FolderOpen,
    Trophy,
    Award,
    FileText,
    FileDown,
    Upload,
    Download,
    RotateCcw,
    Info,
} from 'lucide-react';
import { ProfileEditor } from './ProfileEditor';
import { AboutEditor } from './AboutEditor';
import { SkillsEditor } from './SkillsEditor';
import { ExperienceEditor } from './ExperienceEditor';
import { ProjectsEditor } from './ProjectsEditor';
import { AchievementsEditor } from './AchievementsEditor';
import { CertificationsEditor } from './CertificationsEditor';
import { ArticlesEditor } from './ArticlesEditor';
import { CVManager } from './CVManager';
import { useRef } from 'react';

const sections = [
    { id: 'profile', label: 'Profile & Bio', icon: User },
    { id: 'about', label: 'About Me', icon: Info },
    { id: 'skills', label: 'Skills', icon: Code },
    { id: 'experience', label: 'Experience', icon: Briefcase },
    { id: 'projects', label: 'Projects', icon: FolderOpen },
    { id: 'achievements', label: 'Achievements', icon: Trophy },
    { id: 'certifications', label: 'Certifications', icon: Award },
    { id: 'articles', label: 'Articles', icon: FileText },
    { id: 'cv', label: 'CV Manager', icon: FileDown },
];

export function AdminPanel() {
    const { isAdminMode, setIsAdminMode, activeSection, setActiveSection, exportData, importData, resetData } =
        useAdmin();
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                const json = event.target?.result as string;
                if (importData(json)) {
                    alert('Data imported successfully!');
                } else {
                    alert('Failed to import data. Please check the file format.');
                }
            };
            reader.readAsText(file);
        }
    };

    const handleReset = () => {
        if (confirm('Are you sure you want to reset all data to defaults? This cannot be undone.')) {
            resetData();
            alert('Data reset to defaults!');
        }
    };

    const renderEditor = () => {
        switch (activeSection) {
            case 'profile':
                return <ProfileEditor />;
            case 'about':
                return <AboutEditor />;
            case 'skills':
                return <SkillsEditor />;
            case 'experience':
                return <ExperienceEditor />;
            case 'projects':
                return <ProjectsEditor />;
            case 'achievements':
                return <AchievementsEditor />;
            case 'certifications':
                return <CertificationsEditor />;
            case 'articles':
                return <ArticlesEditor />;
            case 'cv':
                return <CVManager />;
            default:
                return null;
        }
    };

    return (
        <AnimatePresence>
            {isAdminMode && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
                        onClick={() => setIsAdminMode(false)}
                    />

                    {/* Admin Panel */}
                    <motion.div
                        initial={{ x: '-100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '-100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                        className="fixed left-0 top-0 h-full w-96 bg-background/95 backdrop-blur-xl border-r border-border z-50 overflow-hidden flex flex-col"
                    >
                        {/* Header */}
                        <div className="p-4 border-b border-border flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="p-2 rounded-lg bg-gradient-to-br from-primary to-secondary">
                                    <Settings className="w-5 h-5 text-white" />
                                </div>
                                <div>
                                    <h2 className="font-semibold">Admin Panel</h2>
                                    <p className="text-xs text-muted-foreground">Manage your portfolio</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsAdminMode(false)}
                                className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Content */}
                        <div className="flex-1 overflow-y-auto">
                            {activeSection ? (
                                <div className="p-4">
                                    <button
                                        onClick={() => setActiveSection(null)}
                                        className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-4 transition-colors"
                                    >
                                        ← Back to sections
                                    </button>
                                    {renderEditor()}
                                </div>
                            ) : (
                                <div className="p-4 space-y-2">
                                    {sections.map((section) => (
                                        <button
                                            key={section.id}
                                            onClick={() => setActiveSection(section.id)}
                                            className="w-full p-4 rounded-xl glass-card flex items-center gap-3 hover:scale-[1.02] transition-transform text-left"
                                        >
                                            <div className="p-2 rounded-lg bg-gradient-to-br from-primary/20 to-secondary/20">
                                                <section.icon className="w-5 h-5 text-primary" />
                                            </div>
                                            <span>{section.label}</span>
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Footer Actions */}
                        <div className="p-4 border-t border-border space-y-2">
                            <div className="flex gap-2">
                                <button
                                    onClick={exportData}
                                    className="flex-1 p-3 rounded-xl glass-card flex items-center justify-center gap-2 hover:scale-[1.02] transition-transform text-sm"
                                >
                                    <Download className="w-4 h-4" />
                                    Export
                                </button>
                                <button
                                    onClick={() => fileInputRef.current?.click()}
                                    className="flex-1 p-3 rounded-xl glass-card flex items-center justify-center gap-2 hover:scale-[1.02] transition-transform text-sm"
                                >
                                    <Upload className="w-4 h-4" />
                                    Import
                                </button>
                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    accept=".json"
                                    onChange={handleImport}
                                    className="hidden"
                                />
                            </div>
                            <button
                                onClick={handleReset}
                                className="w-full p-3 rounded-xl glass-card flex items-center justify-center gap-2 hover:scale-[1.02] transition-transform text-sm text-destructive"
                            >
                                <RotateCcw className="w-4 h-4" />
                                Reset to Defaults
                            </button>
                        </div>
                    </motion.div>

                    {/* Editor Panel (slides out from left of main panel) */}
                    <AnimatePresence>
                        {activeSection && (
                            <motion.div
                                initial={{ x: '-100%', opacity: 0 }}
                                animate={{ x: '384px', opacity: 1 }}
                                exit={{ x: '-100%', opacity: 0 }}
                                transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                                className="fixed left-0 top-0 h-full w-[500px] bg-background/90 backdrop-blur-xl border-r border-border z-45 overflow-y-auto"
                            >
                                <div className="p-6">
                                    <h3 className="text-xl font-semibold mb-4 capitalize">{activeSection} Editor</h3>
                                    {renderEditor()}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </>
            )}
        </AnimatePresence>
    );
}

// Floating admin button for easy access
export function AdminButton() {
    const { isAdminMode, setIsAdminMode } = useAdmin();

    return (
        <AnimatePresence>
            {!isAdminMode && (
                <motion.button
                    key="admin-button"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setIsAdminMode(true)}
                    className="fixed bottom-6 right-6 p-4 rounded-full bg-gradient-to-br from-primary to-secondary shadow-lg shadow-primary/20 z-30"
                    title="Open Admin Panel (Ctrl+Shift+A)"
                >
                    <Settings className="w-6 h-6 text-white" />
                </motion.button>
            )}
        </AnimatePresence>
    );
}

