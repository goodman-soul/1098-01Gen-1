import { Star, Scale, Plus, Check, Droplets, Flame, ThermometerSun, Package } from 'lucide-react';
import { Equipment } from '../types';
import { useStore } from '../store/useStore';

interface EquipmentCardProps {
  equipment: Equipment;
}

export default function EquipmentCard({ equipment }: EquipmentCardProps) {
  const addToCombo = useStore((s) => s.addToCombo);
  const removeFromCombo = useStore((s) => s.removeFromCombo);
  const selectedItems = useStore((s) => s.selectedItems);

  const isSelected = selectedItems[equipment.category]?.equipment.id === equipment.id;

  const renderCategorySpec = () => {
    switch (equipment.category) {
      case 'tent':
        return (
          <div className="flex items-center gap-1.5 text-sm text-forest-500">
            <Package className="w-4 h-4" />
            <span>容纳 {equipment.minPeople}-{equipment.maxPeople} 人</span>
          </div>
        );
      case 'stove':
        return (
          <div className="flex items-center gap-1.5 text-sm text-forest-500">
            <Flame className="w-4 h-4 text-earth-500" />
            <span>{equipment.fuelType} · {equipment.boilTime}</span>
          </div>
        );
      case 'sleeping-bag':
        return (
          <div className="flex items-center gap-1.5 text-sm text-forest-500">
            <ThermometerSun className="w-4 h-4 text-earth-500" />
            <span>舒适 {equipment.temperatureRating?.comfort}°C</span>
          </div>
        );
      case 'backpack':
        return (
          <div className="flex items-center gap-1.5 text-sm text-forest-500">
            <Package className="w-4 h-4" />
            <span>容量 {equipment.capacity}L</span>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className={`card card-hover overflow-hidden group animate-fade-in ${
      isSelected ? 'ring-2 ring-forest-500 ring-offset-2' : ''
    }`}>
      <div className="relative aspect-[4/3] overflow-hidden bg-cream-100">
        <img
          src={equipment.image}
          alt={equipment.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute top-3 left-3 flex gap-1.5">
          {equipment.weatherRating.includes('rainy') && (
            <span className="px-2 py-0.5 bg-sky-500/90 text-white text-xs font-medium rounded-full backdrop-blur-sm flex items-center gap-1">
              <Droplets className="w-3 h-3" />
              防水
            </span>
          )}
          {equipment.weatherRating.includes('snowy') && (
            <span className="px-2 py-0.5 bg-white/90 text-forest-700 text-xs font-medium rounded-full backdrop-blur-sm">
              ❄️ 四季
            </span>
          )}
        </div>
        <div className="absolute top-3 right-3 px-2 py-0.5 bg-black/50 backdrop-blur-sm rounded-full flex items-center gap-1">
          <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
          <span className="text-white text-xs font-medium">{equipment.rating}</span>
        </div>
        {isSelected && (
          <div className="absolute inset-0 bg-forest-500/15 flex items-center justify-center">
            <div className="w-14 h-14 rounded-full bg-forest-500 flex items-center justify-center shadow-pop animate-fade-in">
              <Check className="w-7 h-7 text-white" strokeWidth={3} />
            </div>
          </div>
        )}
      </div>

      <div className="p-4 space-y-3">
        <div>
          <div className="text-xs text-olive-600 font-medium mb-0.5">{equipment.brand}</div>
          <h3 className="font-display font-semibold text-forest-800 text-lg leading-tight">
            {equipment.name}
          </h3>
        </div>

        <p className="text-sm text-forest-500 line-clamp-2 min-h-[40px]">
          {equipment.description}
        </p>

        <div className="flex flex-wrap gap-1.5">
          {equipment.tags.slice(0, 4).map((tag) => (
            <span key={tag} className="tag text-[11px]">
              {tag}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-cream-200">
          <div className="flex items-center gap-4">
            <div className="text-lg font-bold text-earth-500">
              ¥{equipment.price.toLocaleString()}
            </div>
            <div className="flex items-center gap-1 text-sm text-forest-500">
              <Scale className="w-4 h-4" />
              {equipment.weight}kg
            </div>
          </div>
        </div>

        <div className="pt-1">
          {renderCategorySpec()}
        </div>

        <button
          onClick={() => isSelected ? removeFromCombo(equipment.category) : addToCombo(equipment)}
          className={`w-full py-2.5 rounded-xl font-medium text-sm transition-all duration-200 flex items-center justify-center gap-1.5 ${
            isSelected
              ? 'bg-earth-500 text-white hover:bg-earth-600'
              : 'bg-forest-500 text-white hover:bg-forest-600 shadow-card hover:shadow-card-hover active:scale-[0.98]'
          }`}
        >
          {isSelected ? (
            <>
              <Check className="w-4 h-4" />
              已加入 · 点击移除
            </>
          ) : (
            <>
              <Plus className="w-4 h-4" />
              加入套装
            </>
          )}
        </button>
      </div>
    </div>
  );
}
