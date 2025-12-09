import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { usePortfolioData } from '../../hooks/usePortfolioData';
import { PortfolioData } from '../../data/portfolioData';

interface AdminContextType {
    isAdminMode: boolean;
    setIsAdminMode: (value: boolean) => void;
    isEditing: boolean;
    setIsEditing: (value: boolean) => void;
    activeSection: string | null;
    setActiveSection: (section: string | null) => void;
    data: PortfolioData;
    updateData: (updates: Partial<PortfolioData>) => void;
    resetData: () => void;
    exportData: () => void;
    importData: (json: string) => boolean;
    isLoaded: boolean;
}

const AdminContext = createContext<AdminContextType | null>(null);

export function AdminProvider({ children }: { children: ReactNode }) {
    const [isAdminMode, setIsAdminMode] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [activeSection, setActiveSection] = useState<string | null>(null);
    const { data, isLoaded, updateData, resetData, exportData, importData } = usePortfolioData();

    // Keyboard shortcut: Ctrl+Shift+A to toggle admin mode
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.ctrlKey && e.shiftKey && e.key === 'A') {
                e.preventDefault();
                setIsAdminMode((prev) => !prev);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    return (
        <AdminContext.Provider
            value={{
                isAdminMode,
                setIsAdminMode,
                isEditing,
                setIsEditing,
                activeSection,
                setActiveSection,
                data,
                updateData,
                resetData,
                exportData,
                importData,
                isLoaded,
            }}
        >
            {children}
        </AdminContext.Provider>
    );
}

export function useAdmin() {
    const context = useContext(AdminContext);
    if (!context) {
        throw new Error('useAdmin must be used within an AdminProvider');
    }
    return context;
}
