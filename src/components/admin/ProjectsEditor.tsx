import { useAdmin } from './AdminContext';
import { Save, Plus, Trash2, ChevronDown, ChevronUp } from 'lucide-react';
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
                        <div className="p-4 pt-0 space-y-3">
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
                                    placeholder="Live URL"
                                    className="px-3 py-2 bg-input-background border border-input rounded-lg focus:outline-none focus:border-primary text-sm"
                                />
                            </div>

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
                                    placeholder="Add technology..."
                                    className="w-full px-3 py-2 bg-input-background border border-input rounded-lg focus:outline-none focus:border-primary text-sm"
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                            addTech(project.id, e.currentTarget.value);
                                            e.currentTarget.value = '';
                                        }
                                    }}
                                />
                            </div>

                            <div>
                                <div className="text-sm text-muted-foreground mb-2">Highlights</div>
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
                                    placeholder="Add highlight..."
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
