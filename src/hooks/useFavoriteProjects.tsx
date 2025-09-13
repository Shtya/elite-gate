'use client';

import { useEffect, useState } from 'react';
import { Property } from '@/types/global';

const STORAGE_KEY = 'favoriteProjects';

export function useFavoriteProjects() {
    const [favorites, setFavorites] = useState<Map<string, Property>>(new Map());

    useEffect(() => {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            try {
                const parsed: Property[] = JSON.parse(stored);
                const map = new Map(parsed.map((item) => [item.id, item]));
                setFavorites(map);
            } catch (err) {
                console.error('Failed to parse favorites from localStorage', err);
            }
        }
    }, []);

    const isFavorite = (id: string) => {
        return favorites.has(id);
    };

    const addFavorite = (property: Property) => {
        const updated = new Map(favorites);
        updated.set(property.id, property);
        setFavorites(updated);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(updated.values())));
    };

    const removeFavorite = (id: string) => {
        const updated = new Map(favorites);
        updated.delete(id);
        setFavorites(updated);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(updated.values())));
    };

    const toggleFavorite = (property: Property) => {
        if (isFavorite(property.id)) {
            removeFavorite(property.id);
        } else {
            addFavorite(property);
        }
    };

    return {
        favorites,
        isFavorite,
        addFavorite,
        removeFavorite,
        toggleFavorite,
    };
}
