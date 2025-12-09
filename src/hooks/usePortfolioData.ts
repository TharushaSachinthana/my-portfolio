import { useState, useEffect, useCallback } from 'react';
import {
    PortfolioData,
    loadPortfolioData,
    savePortfolioData,
    defaultPortfolioData,
} from '../data/portfolioData';

export function usePortfolioData() {
    const [data, setData] = useState<PortfolioData>(defaultPortfolioData);
    const [isLoaded, setIsLoaded] = useState(false);

    // Load data on mount
    useEffect(() => {
        const loaded = loadPortfolioData();
        setData(loaded);
        setIsLoaded(true);
    }, []);

    // Update and save data
    const updateData = useCallback((updates: Partial<PortfolioData>) => {
        setData((prev) => {
            const newData = { ...prev, ...updates };
            savePortfolioData(newData);
            return newData;
        });
    }, []);

    // Reset to defaults
    const resetData = useCallback(() => {
        setData(defaultPortfolioData);
        savePortfolioData(defaultPortfolioData);
    }, []);

    // Export data as JSON
    const exportData = useCallback(() => {
        const dataStr = JSON.stringify(data, null, 2);
        const blob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'portfolio-data.json';
        a.click();
        URL.revokeObjectURL(url);
    }, [data]);

    // Import data from JSON
    const importData = useCallback((jsonString: string) => {
        try {
            const imported = JSON.parse(jsonString) as PortfolioData;
            setData(imported);
            savePortfolioData(imported);
            return true;
        } catch {
            console.error('Failed to import data');
            return false;
        }
    }, []);

    return {
        data,
        isLoaded,
        updateData,
        resetData,
        exportData,
        importData,
    };
}
