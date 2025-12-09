import { useAdmin } from './AdminContext';
import { Save, Plus, Trash2, ChevronDown, ChevronUp } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Experience, generateId } from '../../data/portfolioData';

export function ExperienceEditor() {
    const { data, updateData } = useAdmin();
    const [experiences, setExperiences] = useState<Experience[]>(data.experiences);
    const [expanded, setExpanded] = useState<string | null>(null);

    useEffect(() => {
        setExperiences(data.experiences);
    }, [data.experiences]);

    const handleSave = () => {
        updateData({ experiences });
        alert('Experience saved!');
    };

    const addExperience = () => {
        const newExp: Experience = {
            id: generateId(),
            title: 'New Position',
            company: 'Company Name',
            location: 'Location',
            period: 'Start – End',
            description: 'Brief description',
            highlights: [],
        };
        setExperiences([...experiences, newExp]);
        setExpanded(newExp.id);
    };

    const removeExperience = (id: string) => {
        setExperiences(experiences.filter((exp) => exp.id !== id));
    };

    const updateExperience = (id: string, updates: Partial<Experience>) => {
        setExperiences(experiences.map((exp) => (exp.id === id ? { ...exp, ...updates } : exp)));
    };

    const addHighlight = (id: string, highlight: string) => {
        if (!highlight.trim()) return;
        setExperiences(
            experiences.map((exp) =>
                exp.id === id ? { ...exp, highlights: [...exp.highlights, highlight.trim()] } : exp
            )
        );
    };

    const removeHighlight = (id: string, index: number) => {
        setExperiences(
            experiences.map((exp) =>
                exp.id === id ? { ...exp, highlights: exp.highlights.filter((_, i) => i !== index) } : exp
            )
        );
    };

    return (
        <div className="space-y-4">
            {experiences.map((exp) => (
                <div key={exp.id} className="glass-card rounded-xl overflow-hidden">
                    <button
                        onClick={() => setExpanded(expanded === exp.id ? null : exp.id)}
                        className="w-full p-4 flex items-center justify-between text-left"
                    >
                        <div>
                            <div className="font-medium">{exp.title}</div>
                            <div className="text-sm text-muted-foreground">{exp.company}</div>
                        </div>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    removeExperience(exp.id);
                                }}
                                className="p-2 rounded-lg hover:bg-destructive/20 text-destructive transition-colors"
                            >
                                <Trash2 className="w-4 h-4" />
                            </button>
                            {expanded === exp.id ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                        </div>
                    </button>

                    {expanded === exp.id && (
                        <div className="p-4 pt-0 space-y-3">
                            <input
                                type="text"
                                value={exp.title}
                                onChange={(e) => updateExperience(exp.id, { title: e.target.value })}
                                placeholder="Job Title"
                                className="w-full px-3 py-2 bg-input-background border border-input rounded-lg focus:outline-none focus:border-primary text-sm"
                            />
                            <input
                                type="text"
                                value={exp.company}
                                onChange={(e) => updateExperience(exp.id, { company: e.target.value })}
                                placeholder="Company"
                                className="w-full px-3 py-2 bg-input-background border border-input rounded-lg focus:outline-none focus:border-primary text-sm"
                            />
                            <div className="grid grid-cols-2 gap-2">
                                <input
                                    type="text"
                                    value={exp.location}
                                    onChange={(e) => updateExperience(exp.id, { location: e.target.value })}
                                    placeholder="Location"
                                    className="px-3 py-2 bg-input-background border border-input rounded-lg focus:outline-none focus:border-primary text-sm"
                                />
                                <input
                                    type="text"
                                    value={exp.period}
                                    onChange={(e) => updateExperience(exp.id, { period: e.target.value })}
                                    placeholder="Period"
                                    className="px-3 py-2 bg-input-background border border-input rounded-lg focus:outline-none focus:border-primary text-sm"
                                />
                            </div>
                            <textarea
                                value={exp.description}
                                onChange={(e) => updateExperience(exp.id, { description: e.target.value })}
                                placeholder="Description"
                                rows={2}
                                className="w-full px-3 py-2 bg-input-background border border-input rounded-lg focus:outline-none focus:border-primary text-sm resize-none"
                            />

                            <div>
                                <div className="text-sm text-muted-foreground mb-2">Highlights</div>
                                {exp.highlights.map((highlight, index) => (
                                    <div key={index} className="flex items-start gap-2 mb-2">
                                        <span className="flex-1 text-sm text-muted-foreground">{highlight}</span>
                                        <button
                                            onClick={() => removeHighlight(exp.id, index)}
                                            className="text-destructive hover:text-destructive/80"
                                        >
                                            ×
                                        </button>
                                    </div>
                                ))}
                                <input
                                    type="text"
                                    placeholder="Add highlight and press Enter..."
                                    className="w-full px-3 py-2 bg-input-background border border-input rounded-lg focus:outline-none focus:border-primary text-sm"
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                            addHighlight(exp.id, e.currentTarget.value);
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
                onClick={addExperience}
                className="w-full p-3 rounded-xl glass-card flex items-center justify-center gap-2 hover:scale-[1.02] transition-transform"
            >
                <Plus className="w-4 h-4" />
                Add Experience
            </button>

            <button
                onClick={handleSave}
                className="w-full p-3 rounded-xl bg-gradient-to-r from-primary to-secondary text-white flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
            >
                <Save className="w-4 h-4" />
                Save Experience
            </button>
        </div>
    );
}
