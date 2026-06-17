import { useStore } from '../store/useStore';
import { Category, CATEGORY_LABELS, CATEGORY_ICONS } from '../types';

const CATEGORIES: Category[] = ['tent', 'stove', 'sleeping-bag', 'backpack'];

export default function CategoryTabs() {
  const activeCategory = useStore((s) => s.activeCategory);
  const setActiveCategory = useStore((s) => s.setActiveCategory);
  const selectedItems = useStore((s) => s.selectedItems);

  return (
    <div className="card p-2 mb-5">
      <div className="grid grid-cols-4 gap-1.5">
        {CATEGORIES.map((cat) => {
          const isActive = activeCategory === cat;
          const isSelected = !!selectedItems[cat];
          return (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`relative flex flex-col items-center justify-center gap-1 py-3 px-2 rounded-xl transition-all duration-200 ${
                isActive
                  ? 'bg-gradient-to-br from-forest-500 to-olive-500 text-white shadow-lg scale-[1.02]'
                  : 'text-forest-600 hover:bg-cream-100'
              }`}
            >
              <span className="text-2xl">{CATEGORY_ICONS[cat]}</span>
              <span className="text-sm font-medium">{CATEGORY_LABELS[cat]}</span>
              {isSelected && (
                <span className={`absolute top-1.5 right-1.5 w-2.5 h-2.5 rounded-full ${
                  isActive ? 'bg-white' : 'bg-olive-500'
                } ring-2 ring-white shadow-md animate-pulse-soft`} />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
