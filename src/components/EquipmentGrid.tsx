import { useMemo } from 'react';
import { useStore } from '../store/useStore';
import { EQUIPMENT_DATA } from '../data/equipment';
import EquipmentCard from './EquipmentCard';
import { PackageSearch } from 'lucide-react';

export default function EquipmentGrid() {
  const activeCategory = useStore((s) => s.activeCategory);
  const filters = useStore((s) => s.filters);

  const filteredEquipment = useMemo(() => {
    return EQUIPMENT_DATA.filter((item) => {
      if (item.category !== activeCategory) return false;

      if (filters.weather !== 'all' && !item.weatherRating.includes(filters.weather)) {
        return false;
      }

      if (item.category === 'tent') {
        if (item.maxPeople && item.maxPeople < filters.people) return false;
      }

      if (filters.distance === 'short' && item.weight > 3) return false;
      if (filters.distance === 'medium' && item.weight > 5) return false;

      if (item.price < filters.minBudget || item.price > filters.maxBudget) {
        return false;
      }

      return true;
    });
  }, [activeCategory, filters]);

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div className="text-sm text-forest-500">
          共找到 <span className="font-semibold text-forest-700">{filteredEquipment.length}</span> 件装备
        </div>
      </div>

      {filteredEquipment.length === 0 ? (
        <div className="card p-12 text-center">
          <PackageSearch className="w-16 h-16 text-forest-300 mx-auto mb-4" />
          <h3 className="font-display text-xl font-semibold text-forest-600 mb-2">
            暂无符合条件的装备
          </h3>
          <p className="text-sm text-forest-400">
            尝试调整筛选条件，放宽预算或人数限制
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {filteredEquipment.map((item) => (
            <EquipmentCard key={item.id} equipment={item} />
          ))}
        </div>
      )}
    </div>
  );
}
