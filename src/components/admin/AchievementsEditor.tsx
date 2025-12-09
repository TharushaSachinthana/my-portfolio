import { useAdmin } from './AdminContext';
import { Save, Plus, Trash2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Achievement, generateId } from '../../data/portfolioData';

const iconOptions = ['Trophy', 'Award', 'Medal', 'Star', 'Target', 'Crown'];
const colorOptions = [
    { label: 'Gold', value: 'from-yellow-400 to-orange-500' },
    { label: 'Blue', value: 'from-blue-400 to-blue-600' },
    { label: 'Green', value: 'from-green-400 to-emerald-600' },
    { label: 'Purple', value: 'from-purple-400 to-purple-600' },
    { label: 'Red', value: 'from-red-400 to-red-600' },
];

export function AchievementsEditor() {
    const { data, updateData } = useAdmin();
    const [achievements, setAchievements] = useState<Achievement[]>(data.achievements);

    useEffect(() => {
        setAchievements(data.achievements);
    }, [data.achievements]);

    const handleSave = () => {
        updateData({ achievements });
        alert('Achievements saved!');
    };

    const addAchievement = () => {
        const newAchievement: Achievement = {
            id: generateId(),
            icon: 'Trophy',
            title: 'New Achievement',
            rank: 'Rank',
            subrank: 'Subrank',
            description: 'Description',
            color: 'from-yellow-400 to-orange-500',
        };
        setAchievements([...achievements, newAchievement]);
    };

    const removeAchievement = (id: string) => {
        setAchievements(achievements.filter((a) => a.id !== id));
    };

    const updateAchievement = (id: string, updates: Partial<Achievement>) => {
        setAchievements(achievements.map((a) => (a.id === id ? { ...a, ...updates } : a)));
    };

    return (
        <div className="space-y-4">
            {achievements.map((achievement) => (
                <div key={achievement.id} className="glass-card p-4 rounded-xl space-y-3">
                    <div className="flex items-center justify-between">
                        <input
                            type="text"
                            value={achievement.title}
                            onChange={(e) => updateAchievement(achievement.id, { title: e.target.value })}
                            className="flex-1 px-3 py-2 bg-input-background border border-input rounded-lg focus:outline-none focus:border-primary text-sm font-medium"
                        />
                        <button
                            onClick={() => removeAchievement(achievement.id)}
                            className="p-2 rounded-lg hover:bg-destructive/20 text-destructive transition-colors ml-2"
                        >
                            <Trash2 className="w-4 h-4" />
                        </button>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                        <input
                            type="text"
                            value={achievement.rank}
                            onChange={(e) => updateAchievement(achievement.id, { rank: e.target.value })}
                            placeholder="Rank"
                            className="px-3 py-2 bg-input-background border border-input rounded-lg focus:outline-none focus:border-primary text-sm"
                        />
                        <input
                            type="text"
                            value={achievement.subrank}
                            onChange={(e) => updateAchievement(achievement.id, { subrank: e.target.value })}
                            placeholder="Subrank"
                            className="px-3 py-2 bg-input-background border border-input rounded-lg focus:outline-none focus:border-primary text-sm"
                        />
                    </div>

                    <textarea
                        value={achievement.description}
                        onChange={(e) => updateAchievement(achievement.id, { description: e.target.value })}
                        placeholder="Description"
                        rows={2}
                        className="w-full px-3 py-2 bg-input-background border border-input rounded-lg focus:outline-none focus:border-primary text-sm resize-none"
                    />

                    <div className="grid grid-cols-2 gap-2">
                        <select
                            value={achievement.icon}
                            onChange={(e) => updateAchievement(achievement.id, { icon: e.target.value })}
                            className="px-3 py-2 bg-input-background border border-input rounded-lg focus:outline-none focus:border-primary text-sm"
                        >
                            {iconOptions.map((icon) => (
                                <option key={icon} value={icon}>
                                    {icon}
                                </option>
                            ))}
                        </select>
                        <select
                            value={achievement.color}
                            onChange={(e) => updateAchievement(achievement.id, { color: e.target.value })}
                            className="px-3 py-2 bg-input-background border border-input rounded-lg focus:outline-none focus:border-primary text-sm"
                        >
                            {colorOptions.map((color) => (
                                <option key={color.value} value={color.value}>
                                    {color.label}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            ))}

            <button
                onClick={addAchievement}
                className="w-full p-3 rounded-xl glass-card flex items-center justify-center gap-2 hover:scale-[1.02] transition-transform"
            >
                <Plus className="w-4 h-4" />
                Add Achievement
            </button>

            <button
                onClick={handleSave}
                className="w-full p-3 rounded-xl bg-gradient-to-r from-primary to-secondary text-white flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
            >
                <Save className="w-4 h-4" />
                Save Achievements
            </button>
        </div>
    );
}
