import { useAdmin } from './AdminContext';
import { Save, Plus, Trash2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Article, generateId } from '../../data/portfolioData';

export function ArticlesEditor() {
    const { data, updateData } = useAdmin();
    const [articles, setArticles] = useState<Article[]>(data.articles);

    useEffect(() => {
        setArticles(data.articles);
    }, [data.articles]);

    const handleSave = () => {
        updateData({ articles });
        alert('Articles saved!');
    };

    const addArticle = () => {
        const newArticle: Article = {
            id: generateId(),
            title: 'New Article',
            description: 'Article description',
            date: 'Coming Soon',
            readTime: '5 min read',
            tags: [],
            status: 'coming-soon',
        };
        setArticles([...articles, newArticle]);
    };

    const removeArticle = (id: string) => {
        setArticles(articles.filter((a) => a.id !== id));
    };

    const updateArticle = (id: string, updates: Partial<Article>) => {
        setArticles(articles.map((a) => (a.id === id ? { ...a, ...updates } : a)));
    };

    const addTag = (id: string, tag: string) => {
        if (!tag.trim()) return;
        setArticles(articles.map((a) => (a.id === id ? { ...a, tags: [...a.tags, tag.trim()] } : a)));
    };

    const removeTag = (id: string, index: number) => {
        setArticles(
            articles.map((a) => (a.id === id ? { ...a, tags: a.tags.filter((_, i) => i !== index) } : a))
        );
    };

    return (
        <div className="space-y-4">
            {articles.map((article) => (
                <div key={article.id} className="glass-card p-4 rounded-xl space-y-3">
                    <div className="flex items-center justify-between">
                        <input
                            type="text"
                            value={article.title}
                            onChange={(e) => updateArticle(article.id, { title: e.target.value })}
                            className="flex-1 px-3 py-2 bg-input-background border border-input rounded-lg focus:outline-none focus:border-primary text-sm font-medium"
                        />
                        <button
                            onClick={() => removeArticle(article.id)}
                            className="p-2 rounded-lg hover:bg-destructive/20 text-destructive transition-colors ml-2"
                        >
                            <Trash2 className="w-4 h-4" />
                        </button>
                    </div>

                    <textarea
                        value={article.description}
                        onChange={(e) => updateArticle(article.id, { description: e.target.value })}
                        placeholder="Description"
                        rows={2}
                        className="w-full px-3 py-2 bg-input-background border border-input rounded-lg focus:outline-none focus:border-primary text-sm resize-none"
                    />

                    <div className="grid grid-cols-3 gap-2">
                        <select
                            value={article.status}
                            onChange={(e) =>
                                updateArticle(article.id, { status: e.target.value as 'published' | 'coming-soon' })
                            }
                            className="px-3 py-2 bg-input-background border border-input rounded-lg focus:outline-none focus:border-primary text-sm"
                        >
                            <option value="coming-soon">Coming Soon</option>
                            <option value="published">Published</option>
                        </select>
                        <input
                            type="text"
                            value={article.date}
                            onChange={(e) => updateArticle(article.id, { date: e.target.value })}
                            placeholder="Date"
                            className="px-3 py-2 bg-input-background border border-input rounded-lg focus:outline-none focus:border-primary text-sm"
                        />
                        <input
                            type="text"
                            value={article.readTime}
                            onChange={(e) => updateArticle(article.id, { readTime: e.target.value })}
                            placeholder="Read Time"
                            className="px-3 py-2 bg-input-background border border-input rounded-lg focus:outline-none focus:border-primary text-sm"
                        />
                    </div>

                    {article.status === 'published' && (
                        <input
                            type="text"
                            value={article.url || ''}
                            onChange={(e) => updateArticle(article.id, { url: e.target.value })}
                            placeholder="Article URL"
                            className="w-full px-3 py-2 bg-input-background border border-input rounded-lg focus:outline-none focus:border-primary text-sm"
                        />
                    )}

                    <div>
                        <div className="text-sm text-muted-foreground mb-2">Tags</div>
                        <div className="flex flex-wrap gap-2 mb-2">
                            {article.tags.map((tag, index) => (
                                <span key={index} className="px-2 py-1 bg-white/10 rounded text-xs flex items-center gap-1">
                                    {tag}
                                    <button onClick={() => removeTag(article.id, index)} className="hover:text-destructive">
                                        ×
                                    </button>
                                </span>
                            ))}
                        </div>
                        <input
                            type="text"
                            placeholder="Add tag..."
                            className="w-full px-3 py-2 bg-input-background border border-input rounded-lg focus:outline-none focus:border-primary text-sm"
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    addTag(article.id, e.currentTarget.value);
                                    e.currentTarget.value = '';
                                }
                            }}
                        />
                    </div>
                </div>
            ))}

            <button
                onClick={addArticle}
                className="w-full p-3 rounded-xl glass-card flex items-center justify-center gap-2 hover:scale-[1.02] transition-transform"
            >
                <Plus className="w-4 h-4" />
                Add Article
            </button>

            <button
                onClick={handleSave}
                className="w-full p-3 rounded-xl bg-gradient-to-r from-primary to-secondary text-white flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
            >
                <Save className="w-4 h-4" />
                Save Articles
            </button>
        </div>
    );
}
