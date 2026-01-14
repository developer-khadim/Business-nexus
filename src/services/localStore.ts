export const STORAGE_KEYS = {
    USERS: 'mock_db_users',
    STARTUPS: 'mock_db_startups',
    INVESTORS: 'mock_db_investors', // Extra profile details for investors
    REQUESTS: 'mock_db_requests',
    MESSAGES: 'mock_db_messages',
};

class LocalStorageService {
    getItem<T>(key: string): T | null {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : null;
    }

    setItem<T>(key: string, value: T): void {
        localStorage.setItem(key, JSON.stringify(value));
    }

    removeItem(key: string): void {
        localStorage.removeItem(key);
    }

    // Helper to append to a list
    addItemToList<T>(key: string, item: T): void {
        const list = this.getItem<T[]>(key) || [];
        list.push(item);
        this.setItem(key, list);
    }

    // Helper to find in a list
    findInList<T>(key: string, predicate: (item: T) => boolean): T | undefined {
        const list = this.getItem<T[]>(key) || [];
        return list.find(predicate);
    }

    // Helper to filter a list
    filterList<T>(key: string, predicate: (item: T) => boolean): T[] {
        const list = this.getItem<T[]>(key) || [];
        return list.filter(predicate);
    }

    // Helper to update item in list
    updateInList<T>(key: string, predicate: (item: T) => boolean, updater: (item: T) => T): T | null {
        const list = this.getItem<T[]>(key) || [];
        const index = list.findIndex(predicate);
        if (index !== -1) {
            const updatedItem = updater(list[index]);
            list[index] = updatedItem;
            this.setItem(key, list);
            return updatedItem;
        }
        return null;
    }
}

export const localStore = new LocalStorageService();
