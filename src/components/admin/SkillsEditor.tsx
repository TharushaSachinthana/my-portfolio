import { useAdmin } from './AdminContext';
import { Save, Plus, Trash2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Skill, generateId } from '../../data/portfolioData';

export function SkillsEditor() {
    const { data, updateData } = useAdmin();
    const [skills, setSkills] = useState<Skill[]>(data.skills);

    useEffect(() => {
        setSkills(data.skills);
    }, [data.skills]);

    const handleSave = () => {
        updateData({ skills });
        alert('Skills saved!');
    };

    const addCategory = () => {
        setSkills([
            ...skills,
            {
                title: 'New Category',
                icon: 'Code',
                color: 'from-gray-400 to-gray-600',
                skills: [],
            },
        ]);
    };

    const removeCategory = (index: number) => {
        setSkills(skills.filter((_, i) => i !== index));
    };

    const updateCategory = (index: number, updates: Partial<Skill>) => {
        setSkills(skills.map((cat, i) => (i === index ? { ...cat, ...updates } : cat)));
    };

    const addSkill = (categoryIndex: number, skill: string) => {
        if (!skill.trim()) return;
        const newSkills = [...skills];
        newSkills[categoryIndex].skills.push(skill.trim());
        setSkills(newSkills);
    };

    const removeSkill = (categoryIndex: number, skillIndex: number) => {
        const newSkills = [...skills];
        newSkills[categoryIndex].skills = newSkills[categoryIndex].skills.filter((_, i) => i !== skillIndex);
        setSkills(newSkills);
    };

    return (
        <div className="space-y-6">
            {skills.map((category, catIndex) => (
                <div key={catIndex} className="glass-card p-4 rounded-xl">
                    <div className="flex items-center gap-2 mb-4">
                        <input
                            type="text"
                            value={category.title}
                            onChange={(e) => updateCategory(catIndex, { title: e.target.value })}
                            className="flex-1 px-3 py-2 bg-input-background border border-input rounded-lg focus:outline-none focus:border-primary text-sm"
                        />
                        <button
                            onClick={() => removeCategory(catIndex)}
                            className="p-2 rounded-lg hover:bg-destructive/20 text-destructive transition-colors"
                        >
                            <Trash2 className="w-4 h-4" />
                        </button>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-3">
                        {category.skills.map((skill, skillIndex) => (
                            <span
                                key={skillIndex}
                                className="px-3 py-1 bg-white/10 rounded-full text-xs flex items-center gap-2"
                            >
                                {skill}
                                <button
                                    onClick={() => removeSkill(catIndex, skillIndex)}
                                    className="hover:text-destructive transition-colors"
                                >
                                    ×
                                </button>
                            </span>
                        ))}
                    </div>

                    <div className="flex gap-2">
                        <input
                            type="text"
                            placeholder="Add skill..."
                            className="flex-1 px-3 py-2 bg-input-background border border-input rounded-lg focus:outline-none focus:border-primary text-sm"
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    addSkill(catIndex, e.currentTarget.value);
                                    e.currentTarget.value = '';
                                }
                            }}
                        />
                    </div>
                </div>
            ))}

            <button
                onClick={addCategory}
                className="w-full p-3 rounded-xl glass-card flex items-center justify-center gap-2 hover:scale-[1.02] transition-transform"
            >
                <Plus className="w-4 h-4" />
                Add Category
            </button>

            <button
                onClick={handleSave}
                className="w-full p-3 rounded-xl bg-gradient-to-r from-primary to-secondary text-white flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
            >
                <Save className="w-4 h-4" />
                Save Skills
            </button>
        </div>
    );
}
