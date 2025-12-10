import { useAdmin } from './AdminContext';
import { Save, Plus, Trash2, ChevronDown, ChevronUp, Image, Video, FileText } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Project, generateId } from '../../data/portfolioData';

export function ProjectsEditor() {
    const { data, updateData } = useAdmin();
    const [projects, setProjects] = useState<Project[]>(data.projects);
    const [expanded, setExpanded] = useState<string | null>(null);

    useEffect(() => {
        setProjects(data.projects);
    }, [data.projects]);

    const handleSave = () => {
        updateData({ projects });
        alert('Projects saved!');
    };

    const addProject = () => {
        const newProject: Project = {
            id: generateId(),
            title: 'New Project',
            shortDescription: 'Brief description',
            fullDescription: 'Full project description...',
            technologies: [],
            images: [],
            highlights: [],
            coverImage: '',
            githubUrl: '',
            liveUrl: '',
            documentationUrl: '',
            reportUrl: '',
            videoUrl: '',
        };
        setProjects([...projects, newProject]);
        setExpanded(newProject.id);
    };

    const removeProject = (id: string) => {
        setProjects(projects.filter((p) => p.id !== id));
    };

    const updateProject = (id: string, updates: Partial<Project>) => {
        setProjects(projects.map((p) => (p.id === id ? { ...p, ...updates } : p)));
    };

    const addTech = (id: string, tech: string) => {
        if (!tech.trim()) return;
        setProjects(
            projects.map((p) => (p.id === id ? { ...p, technologies: [...p.technologies, tech.trim()] } : p))
        );
    };

    const removeTech = (id: string, index: number) => {
        setProjects(
            projects.map((p) =>
                p.id === id ? { ...p, technologies: p.technologies.filter((_, i) => i !== index) } : p
            )
        );
    };

    const addHighlight = (id: string, highlight: string) => {
        if (!highlight.trim()) return;
        setProjects(
            projects.map((p) => (p.id === id ? { ...p, highlights: [...p.highlights, highlight.trim()] } : p))
        );
    };

    const removeHighlight = (id: string, index: number) => {
        setProjects(
            projects.map((p) =>
                p.id === id ? { ...p, highlights: p.highlights.filter((_, i) => i !== index) } : p
            )
        );
    };

    const addImage = (id: string, imageUrl: string) => {
        if (!imageUrl.trim()) return;
        setProjects(
            projects.map((p) => (p.id === id ? { ...p, images: [...p.images, imageUrl.trim()] } : p))
        );
    };

    const removeImage = (id: string, index: number) => {
        setProjects(
            projects.map((p) =>
                p.id === id ? { ...p, images: p.images.filter((_, i) => i !== index) } : p
            )
        );
    };

    return (
        <div className="space-y-4">
            {projects.map((project) => (
                <div key={project.id} className="glass-card rounded-xl overflow-hidden">
                    <button
                        onClick={() => setExpanded(expanded === project.id ? null : project.id)}
                        className="w-full p-4 flex items-center justify-between text-left"
                    >
                        <div>
                            <div className="font-medium">{project.title}</div>
                            <div className="text-sm text-muted-foreground">{project.shortDescription}</div>
                        </div>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    removeProject(project.id);
                                }}
                                className="p-2 rounded-lg hover:bg-destructive/20 text-destructive transition-colors"
                            >
                                <Trash2 className="w-4 h-4" />
                            </button>
                            {expanded === project.id ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                        </div>
                    </button>

                    {expanded === project.id && (
                        <div className="p-4 pt-0 space-y-4">
                            {/* Basic Info */}
                            <div className="space-y-3">
                                <input
                                    type="text"
                                    value={project.title}
                                    onChange={(e) => updateProject(project.id, { title: e.target.value })}
                                    placeholder="Project Title"
                                    className="w-full px-3 py-2 bg-input-background border border-input rounded-lg focus:outline-none focus:border-primary text-sm"
                                />
                                <input
                                    type="text"
                                    value={project.shortDescription}
                                    onChange={(e) => updateProject(project.id, { shortDescription: e.target.value })}
                                    placeholder="Short Description"
                                    className="w-full px-3 py-2 bg-input-background border border-input rounded-lg focus:outline-none focus:border-primary text-sm"
                                />
                                <textarea
                                    value={project.fullDescription}
                                    onChange={(e) => updateProject(project.id, { fullDescription: e.target.value })}
                                    placeholder="Full Description"
                                    rows={4}
                                    className="w-full px-3 py-2 bg-input-background border border-input rounded-lg focus:outline-none focus:border-primary text-sm resize-none"
                                />
                            </div>

                            {/* Cover Image */}
                            <div>
                                <div className="text-sm text-muted-foreground mb-2 flex items-center gap-2">
                                    <Image className="w-4 h-4" />
                                    Cover Image URL
                                </div>
                                <input
                                    type="text"
                                    value={project.coverImage || ''}
                                    onChange={(e) => updateProject(project.id, { coverImage: e.target.value })}
                                    placeholder="https://example.com/cover-image.jpg"
                                    className="w-full px-3 py-2 bg-input-background border border-input rounded-lg focus:outline-none focus:border-primary text-sm"
                                />
                                {project.coverImage && (
                                    <img src={project.coverImage} alt="Cover preview" className="mt-2 h-20 rounded-lg object-cover" />
                                )}
                            </div>

                            {/* Gallery Images */}
                            <div>
                                <div className="text-sm text-muted-foreground mb-2 flex items-center gap-2">
                                    <Image className="w-4 h-4" />
                                    Gallery Images
                                </div>
                                <div className="flex flex-wrap gap-2 mb-2">
                                    {project.images.map((img, index) => (
                                        <div key={index} className="relative group">
                                            <img src={img} alt={`Gallery ${index}`} className="h-16 w-24 object-cover rounded-lg" />
                                            <button
                                                onClick={() => removeImage(project.id, index)}
                                                className="absolute -top-2 -right-2 w-5 h-5 bg-destructive rounded-full text-white text-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                                            >
                                                ×
                                            </button>
                                        </div>
                                    ))}
                                </div>
                                <input
                                    type="text"
                                    placeholder="Add image URL (press Enter)..."
                                    className="w-full px-3 py-2 bg-input-background border border-input rounded-lg focus:outline-none focus:border-primary text-sm"
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                            addImage(project.id, e.currentTarget.value);
                                            e.currentTarget.value = '';
                                        }
                                    }}
                                />
                            </div>

                            {/* Video URL */}
                            <div>
                                <div className="text-sm text-muted-foreground mb-2 flex items-center gap-2">
                                    <Video className="w-4 h-4" />
                                    Video URL (YouTube)
                                </div>
                                <input
                                    type="text"
                                    value={project.videoUrl || ''}
                                    onChange={(e) => updateProject(project.id, { videoUrl: e.target.value })}
                                    placeholder="https://youtube.com/watch?v=..."
                                    className="w-full px-3 py-2 bg-input-background border border-input rounded-lg focus:outline-none focus:border-primary text-sm"
                                />
                            </div>

                            {/* Links */}
                            <div>
                                <div className="text-sm text-muted-foreground mb-2">Project Links</div>
                                <div className="grid grid-cols-2 gap-2">
                                    <input
                                        type="text"
                                        value={project.githubUrl || ''}
                                        onChange={(e) => updateProject(project.id, { githubUrl: e.target.value })}
                                        placeholder="GitHub URL"
                                        className="px-3 py-2 bg-input-background border border-input rounded-lg focus:outline-none focus:border-primary text-sm"
                                    />
                                    <input
                                        type="text"
                                        value={project.liveUrl || ''}
                                        onChange={(e) => updateProject(project.id, { liveUrl: e.target.value })}
                                        placeholder="Live Demo URL"
                                        className="px-3 py-2 bg-input-background border border-input rounded-lg focus:outline-none focus:border-primary text-sm"
                                    />
                                </div>
                            </div>

                            {/* Documentation Links */}
                            <div>
                                <div className="text-sm text-muted-foreground mb-2 flex items-center gap-2">
                                    <FileText className="w-4 h-4" />
                                    Documentation & Reports
                                </div>
                                <div className="grid grid-cols-2 gap-2">
                                    <input
                                        type="text"
                                        value={project.documentationUrl || ''}
                                        onChange={(e) => updateProject(project.id, { documentationUrl: e.target.value })}
                                        placeholder="Documentation URL"
                                        className="px-3 py-2 bg-input-background border border-input rounded-lg focus:outline-none focus:border-primary text-sm"
                                    />
                                    <input
                                        type="text"
                                        value={project.reportUrl || ''}
                                        onChange={(e) => updateProject(project.id, { reportUrl: e.target.value })}
                                        placeholder="Report/PDF URL"
                                        className="px-3 py-2 bg-input-background border border-input rounded-lg focus:outline-none focus:border-primary text-sm"
                                    />
                                </div>
                            </div>

                            {/* Technologies */}
                            <div>
                                <div className="text-sm text-muted-foreground mb-2">Technologies</div>
                                <div className="flex flex-wrap gap-2 mb-2">
                                    {project.technologies.map((tech, index) => (
                                        <span key={index} className="px-2 py-1 bg-white/10 rounded text-xs flex items-center gap-1">
                                            {tech}
                                            <button onClick={() => removeTech(project.id, index)} className="hover:text-destructive">
                                                ×
                                            </button>
                                        </span>
                                    ))}
                                </div>
                                <input
                                    type="text"
                                    placeholder="Add technology (press Enter)..."
                                    className="w-full px-3 py-2 bg-input-background border border-input rounded-lg focus:outline-none focus:border-primary text-sm"
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                            addTech(project.id, e.currentTarget.value);
                                            e.currentTarget.value = '';
                                        }
                                    }}
                                />
                            </div>

                            {/* Highlights */}
                            <div>
                                <div className="text-sm text-muted-foreground mb-2">Key Highlights</div>
                                {project.highlights.map((highlight, index) => (
                                    <div key={index} className="flex items-start gap-2 mb-2">
                                        <span className="flex-1 text-sm text-muted-foreground">{highlight}</span>
                                        <button
                                            onClick={() => removeHighlight(project.id, index)}
                                            className="text-destructive hover:text-destructive/80"
                                        >
                                            ×
                                        </button>
                                    </div>
                                ))}
                                <input
                                    type="text"
                                    placeholder="Add highlight (press Enter)..."
                                    className="w-full px-3 py-2 bg-input-background border border-input rounded-lg focus:outline-none focus:border-primary text-sm"
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                            addHighlight(project.id, e.currentTarget.value);
                                            e.currentTarget.value = '';
                                        }
                                    }}
                                />
                            </div>
                        </div>
                    )}
                </div>
            ))}

            <button
                onClick={addProject}
                className="w-full p-3 rounded-xl glass-card flex items-center justify-center gap-2 hover:scale-[1.02] transition-transform"
            >
                <Plus className="w-4 h-4" />
                Add Project
            </button>

            <button
                onClick={handleSave}
                className="w-full p-3 rounded-xl bg-gradient-to-r from-primary to-secondary text-white flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
            >
                <Save className="w-4 h-4" />
                Save Projects
            </button>
        </div>
    );
}
