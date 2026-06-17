import { Combo, Equipment, Filters, Category, SelectedEquipment } from '../types';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface StoreState {
  filters: Filters;
  activeCategory: Category;
  selectedItems: Record<Category, SelectedEquipment | null>;
  savedCombos: Combo[];

  setFilters: (filters: Partial<Filters>) => void;
  setActiveCategory: (category: Category) => void;
  addToCombo: (equipment: Equipment) => void;
  removeFromCombo: (category: Category) => void;
  setItemQuantity: (category: Category, quantity: number) => void;
  clearCombo: () => void;
  saveCombo: (name: string) => void;
  deleteCombo: (id: string) => void;
  loadCombo: (combo: Combo) => void;
  renameCombo: (id: string, name: string) => void;

  getTotalWeight: () => number;
  getTotalPrice: () => number;
  getMissingCategories: () => Category[];
  getQuantityWarning: () => { category: Category; need: number; have: number }[];
  isOverBudget: () => boolean;
  getBudgetRemaining: () => number;
}

const emptyItems: Record<Category, SelectedEquipment | null> = {
  tent: null,
  stove: null,
  'sleeping-bag': null,
  backpack: null,
};

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
      selectedItems: { ...emptyItems },
      savedCombos: [],

      setFilters: (newFilters) =>
        set((state) => ({
          filters: { ...state.filters, ...newFilters },
        })),

      setActiveCategory: (category) => set({ activeCategory: category }),

      addToCombo: (equipment) =>
        set((state) => {
          const existing = state.selectedItems[equipment.category];
          return {
            selectedItems: {
              ...state.selectedItems,
              [equipment.category]: existing
                ? { ...existing, equipment }
                : { equipment, quantity: 1 },
            },
          };
        }),

      removeFromCombo: (category) =>
        set((state) => ({
          selectedItems: {
            ...state.selectedItems,
            [category]: null,
          },
        })),

      setItemQuantity: (category, quantity) =>
        set((state) => {
          const item = state.selectedItems[category];
          if (!item) return state;
          const safeQuantity = Math.max(1, Math.min(99, Math.floor(quantity)));
          return {
            selectedItems: {
              ...state.selectedItems,
              [category]: { ...item, quantity: safeQuantity },
            },
          };
        }),

      clearCombo: () =>
        set({
          selectedItems: { ...emptyItems },
        }),

      saveCombo: (name) => {
        const { selectedItems } = get();
        const newCombo: Combo = {
          id: `combo-${Date.now()}`,
          name,
          createdAt: new Date().toISOString(),
          items: JSON.parse(JSON.stringify(selectedItems)),
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
          selectedItems: JSON.parse(JSON.stringify(combo.items)),
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
          (sum, item) => sum + (item ? item.equipment.weight * item.quantity : 0),
          0
        );
      },

      getTotalPrice: () => {
        const { selectedItems } = get();
        return Object.values(selectedItems).reduce(
          (sum, item) => sum + (item ? item.equipment.price * item.quantity : 0),
          0
        );
      },

      getMissingCategories: () => {
        const { selectedItems } = get();
        return (Object.keys(selectedItems) as Category[]).filter(
          (cat) => !selectedItems[cat]
        );
      },

      getQuantityWarning: () => {
        const { selectedItems, filters } = get();
        const warnings: { category: Category; need: number; have: number }[] = [];
        const people = filters.people;

        const sleepingBag = selectedItems['sleeping-bag'];
        if (sleepingBag && sleepingBag.quantity < people) {
          warnings.push({
            category: 'sleeping-bag',
            need: people,
            have: sleepingBag.quantity,
          });
        }

        const stove = selectedItems['stove'];
        const stovesNeeded = Math.ceil(people / 3);
        if (stove && stove.quantity < stovesNeeded) {
          warnings.push({
            category: 'stove',
            need: stovesNeeded,
            have: stove.quantity,
          });
        }

        const tent = selectedItems['tent'];
        if (tent) {
          const maxPeople = tent.equipment.maxPeople || 1;
          const tentsNeeded = Math.ceil(people / maxPeople);
          if (tent.quantity < tentsNeeded) {
            warnings.push({
              category: 'tent',
              need: tentsNeeded,
              have: tent.quantity,
            });
          }
        }

        const backpack = selectedItems['backpack'];
        if (backpack && backpack.quantity < people) {
          warnings.push({
            category: 'backpack',
            need: people,
            have: backpack.quantity,
          });
        }

        return warnings;
      },

      isOverBudget: () => {
        const { filters, getTotalPrice } = get();
        return getTotalPrice() > filters.maxBudget;
      },

      getBudgetRemaining: () => {
        const { filters, getTotalPrice } = get();
        return filters.maxBudget - getTotalPrice();
      },
    }),
    {
      name: 'camping-gear-store',
      partialize: (state) => ({
        savedCombos: state.savedCombos,
        selectedItems: state.selectedItems,
        filters: state.filters,
      }),
    }
  )
);
