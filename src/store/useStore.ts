import { Combo, Equipment, Filters, Category } from '../types';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface StoreState {
  filters: Filters;
  activeCategory: Category;
  selectedItems: Record<Category, Equipment | null>;
  savedCombos: Combo[];

  setFilters: (filters: Partial<Filters>) => void;
  setActiveCategory: (category: Category) => void;
  addToCombo: (equipment: Equipment) => void;
  removeFromCombo: (category: Category) => void;
  clearCombo: () => void;
  saveCombo: (name: string) => void;
  deleteCombo: (id: string) => void;
  loadCombo: (combo: Combo) => void;
  renameCombo: (id: string, name: string) => void;

  getTotalWeight: () => number;
  getTotalPrice: () => number;
  getMissingCategories: () => Category[];
}

export const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      filters: {
        weather: 'all',
        people: 2,
        distance: 'all',
        minBudget: 0,
        maxBudget: 10000,
      },
      activeCategory: 'tent',
      selectedItems: {
        tent: null,
        stove: null,
        'sleeping-bag': null,
        backpack: null,
      },
      savedCombos: [],

      setFilters: (newFilters) =>
        set((state) => ({
          filters: { ...state.filters, ...newFilters },
        })),

      setActiveCategory: (category) => set({ activeCategory: category }),

      addToCombo: (equipment) =>
        set((state) => ({
          selectedItems: {
            ...state.selectedItems,
            [equipment.category]: equipment,
          },
        })),

      removeFromCombo: (category) =>
        set((state) => ({
          selectedItems: {
            ...state.selectedItems,
            [category]: null,
          },
        })),

      clearCombo: () =>
        set({
          selectedItems: {
            tent: null,
            stove: null,
            'sleeping-bag': null,
            backpack: null,
          },
        }),

      saveCombo: (name) => {
        const { selectedItems } = get();
        const newCombo: Combo = {
          id: `combo-${Date.now()}`,
          name,
          createdAt: new Date().toISOString(),
          items: { ...selectedItems },
          totalWeight: get().getTotalWeight(),
          totalPrice: get().getTotalPrice(),
        };
        set((state) => ({
          savedCombos: [newCombo, ...state.savedCombos],
        }));
      },

      deleteCombo: (id) =>
        set((state) => ({
          savedCombos: state.savedCombos.filter((c) => c.id !== id),
        })),

      loadCombo: (combo) =>
        set({
          selectedItems: { ...combo.items },
        }),

      renameCombo: (id, name) =>
        set((state) => ({
          savedCombos: state.savedCombos.map((c) =>
            c.id === id ? { ...c, name } : c
          ),
        })),

      getTotalWeight: () => {
        const { selectedItems } = get();
        return Object.values(selectedItems).reduce(
          (sum, item) => sum + (item?.weight || 0),
          0
        );
      },

      getTotalPrice: () => {
        const { selectedItems } = get();
        return Object.values(selectedItems).reduce(
          (sum, item) => sum + (item?.price || 0),
          0
        );
      },

      getMissingCategories: () => {
        const { selectedItems } = get();
        return (Object.keys(selectedItems) as Category[]).filter(
          (cat) => !selectedItems[cat]
        );
      },
    }),
    {
      name: 'camping-gear-store',
      partialize: (state) => ({ savedCombos: state.savedCombos }),
    }
  )
);
