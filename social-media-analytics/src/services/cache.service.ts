interface CacheItem {
    data: any;
    expiry: number;
}

export class CacheService {
    private cache: Map<string, CacheItem> = new Map();

    set(key: string, data: any, ttl: number): void {
        const expiry = Date.now() + ttl;
        this.cache.set(key, { data, expiry });
    }

    get(key: string): any | null {
        const item = this.cache.get(key);
        if (!item) return null;

        if (Date.now() > item.expiry) {
            this.cache.delete(key);
            return null;
        }

        return item.data;
    }

    clear(): void {
        this.cache.clear();
    }
}