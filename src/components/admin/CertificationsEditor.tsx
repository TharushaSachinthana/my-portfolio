import { useAdmin } from './AdminContext';
import { Save, Plus, Trash2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Certification, generateId } from '../../data/portfolioData';

export function CertificationsEditor() {
    const { data, updateData } = useAdmin();
    const [certifications, setCertifications] = useState<Certification[]>(data.certifications);

    useEffect(() => {
        setCertifications(data.certifications);
    }, [data.certifications]);

    const handleSave = () => {
        updateData({ certifications });
        alert('Certifications saved!');
    };

    const addCertification = () => {
        const newCert: Certification = {
            id: generateId(),
            title: 'New Certification',
            issuer: 'Issuer',
            date: new Date().getFullYear().toString(),
            link: '#',
            skills: [],
        };
        setCertifications([...certifications, newCert]);
    };

    const removeCertification = (id: string) => {
        setCertifications(certifications.filter((c) => c.id !== id));
    };

    const updateCertification = (id: string, updates: Partial<Certification>) => {
        setCertifications(certifications.map((c) => (c.id === id ? { ...c, ...updates } : c)));
    };

    const addSkill = (id: string, skill: string) => {
        if (!skill.trim()) return;
        setCertifications(
            certifications.map((c) => (c.id === id ? { ...c, skills: [...c.skills, skill.trim()] } : c))
        );
    };

    const removeSkill = (id: string, index: number) => {
        setCertifications(
            certifications.map((c) => (c.id === id ? { ...c, skills: c.skills.filter((_, i) => i !== index) } : c))
        );
    };

    return (
        <div className="space-y-4">
            {certifications.map((cert) => (
                <div key={cert.id} className="glass-card p-4 rounded-xl space-y-3">
                    <div className="flex items-center justify-between">
                        <input
                            type="text"
                            value={cert.title}
                            onChange={(e) => updateCertification(cert.id, { title: e.target.value })}
                            className="flex-1 px-3 py-2 bg-input-background border border-input rounded-lg focus:outline-none focus:border-primary text-sm font-medium"
                        />
                        <button
                            onClick={() => removeCertification(cert.id)}
                            className="p-2 rounded-lg hover:bg-destructive/20 text-destructive transition-colors ml-2"
                        >
                            <Trash2 className="w-4 h-4" />
                        </button>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                        <input
                            type="text"
                            value={cert.issuer}
                            onChange={(e) => updateCertification(cert.id, { issuer: e.target.value })}
                            placeholder="Issuer"
                            className="px-3 py-2 bg-input-background border border-input rounded-lg focus:outline-none focus:border-primary text-sm"
                        />
                        <input
                            type="text"
                            value={cert.date}
                            onChange={(e) => updateCertification(cert.id, { date: e.target.value })}
                            placeholder="Date"
                            className="px-3 py-2 bg-input-background border border-input rounded-lg focus:outline-none focus:border-primary text-sm"
                        />
                    </div>

                    <input
                        type="text"
                        value={cert.link}
                        onChange={(e) => updateCertification(cert.id, { link: e.target.value })}
                        placeholder="Certificate URL"
                        className="w-full px-3 py-2 bg-input-background border border-input rounded-lg focus:outline-none focus:border-primary text-sm"
                    />

                    <div>
                        <div className="text-sm text-muted-foreground mb-2">Skills</div>
                        <div className="flex flex-wrap gap-2 mb-2">
                            {cert.skills.map((skill, index) => (
                                <span key={index} className="px-2 py-1 bg-white/10 rounded text-xs flex items-center gap-1">
                                    {skill}
                                    <button onClick={() => removeSkill(cert.id, index)} className="hover:text-destructive">
                                        ×
                                    </button>
                                </span>
                            ))}
                        </div>
                        <input
                            type="text"
                            placeholder="Add skill..."
                            className="w-full px-3 py-2 bg-input-background border border-input rounded-lg focus:outline-none focus:border-primary text-sm"
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    addSkill(cert.id, e.currentTarget.value);
                                    e.currentTarget.value = '';
                                }
                            }}
                        />
                    </div>
                </div>
            ))}

            <button
                onClick={addCertification}
                className="w-full p-3 rounded-xl glass-card flex items-center justify-center gap-2 hover:scale-[1.02] transition-transform"
            >
                <Plus className="w-4 h-4" />
                Add Certification
            </button>

            <button
                onClick={handleSave}
                className="w-full p-3 rounded-xl bg-gradient-to-r from-primary to-secondary text-white flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
            >
                <Save className="w-4 h-4" />
                Save Certifications
            </button>
        </div>
    );
}
