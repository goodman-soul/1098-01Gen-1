import { CloudSun, CloudRain, Snowflake, Users, MapPin, DollarSign } from 'lucide-react';
import { useStore } from '../store/useStore';
import { WEATHER_LABELS, DISTANCE_LABELS, Weather, Distance } from '../types';

export default function FilterPanel() {
  const filters = useStore((s) => s.filters);
  const setFilters = useStore((s) => s.setFilters);

  const weatherOptions: (Weather | 'all')[] = ['all', 'sunny', 'rainy', 'snowy'];
  const distanceOptions: (Distance | 'all')[] = ['all', 'short', 'medium', 'long'];

  return (
    <aside className="card p-5 space-y-6 h-fit">
      <div>
        <h2 className="font-display text-lg font-semibold text-forest-700 mb-4 flex items-center gap-2">
          <span className="w-1 h-5 bg-olive-500 rounded-full" />
          筛选条件
        </h2>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-forest-600 flex items-center gap-1.5">
          <CloudSun className="w-4 h-4 text-earth-500" />
          天气条件
        </label>
        <div className="grid grid-cols-2 gap-2">
          {weatherOptions.map((w) => (
            <button
              key={w}
              onClick={() => setFilters({ weather: w })}
              className={`px-3 py-2 text-sm rounded-lg transition-all duration-200 border ${
                filters.weather === w
                  ? 'bg-forest-500 text-white border-forest-500 shadow-md'
                  : 'bg-white text-forest-600 border-cream-200 hover:border-forest-300 hover:bg-cream-50'
              }`}
            >
              {WEATHER_LABELS[w]}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-forest-600 flex items-center gap-1.5">
          <Users className="w-4 h-4 text-earth-500" />
          出行人数：<span className="text-forest-700 font-semibold">{filters.people} 人</span>
        </label>
        <input
          type="range"
          min={1}
          max={10}
          value={filters.people}
          onChange={(e) => setFilters({ people: Number(e.target.value) })}
          className="w-full h-2 bg-cream-200 rounded-full appearance-none cursor-pointer accent-forest-500"
        />
        <div className="flex justify-between text-xs text-forest-400">
          <span>1人</span>
          <span>5人</span>
          <span>10人</span>
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-forest-600 flex items-center gap-1.5">
          <MapPin className="w-4 h-4 text-earth-500" />
          路线距离
        </label>
        <div className="flex flex-col gap-2">
          {distanceOptions.map((d) => (
            <button
              key={d}
              onClick={() => setFilters({ distance: d })}
              className={`px-3 py-2 text-sm rounded-lg transition-all duration-200 border text-left ${
                filters.distance === d
                  ? 'bg-forest-500 text-white border-forest-500 shadow-md'
                  : 'bg-white text-forest-600 border-cream-200 hover:border-forest-300 hover:bg-cream-50'
              }`}
            >
              {DISTANCE_LABELS[d]}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <label className="text-sm font-medium text-forest-600 flex items-center gap-1.5">
          <DollarSign className="w-4 h-4 text-earth-500" />
          预算范围
        </label>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <div className="text-xs text-forest-400 mb-1">最低</div>
            <input
              type="number"
              value={filters.minBudget}
              onChange={(e) => setFilters({ minBudget: Number(e.target.value) })}
              className="input-base text-sm"
              placeholder="¥0"
            />
          </div>
          <div>
            <div className="text-xs text-forest-400 mb-1">最高</div>
            <input
              type="number"
              value={filters.maxBudget}
              onChange={(e) => setFilters({ maxBudget: Number(e.target.value) })}
              className="input-base text-sm"
              placeholder="¥10000"
            />
          </div>
        </div>
        <div className="text-center text-sm font-medium text-forest-600 bg-cream-100 py-2 rounded-lg">
          ¥{filters.minBudget.toLocaleString()} — ¥{filters.maxBudget.toLocaleString()}
        </div>
      </div>
    </aside>
  );
}
