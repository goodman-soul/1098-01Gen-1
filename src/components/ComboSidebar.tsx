import { useState } from 'react';
import { Scale, DollarSign, Package, Trash2, Heart, AlertTriangle, ChevronDown, ChevronUp, Backpack, Flame, Tent, Moon, Minus, Plus, AlertCircle, Wallet } from 'lucide-react';
import { useStore } from '../store/useStore';
import { Category, CATEGORY_LABELS, CATEGORY_ICONS } from '../types';

const categoryIcons: Record<Category, typeof Tent> = {
  tent: Tent,
  stove: Flame,
  'sleeping-bag': Moon,
  backpack: Backpack,
};

interface ComboSidebarProps {
  onOpenSave: () => void;
}

export default function ComboSidebar({ onOpenSave }: ComboSidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const selectedItems = useStore((s) => s.selectedItems);
  const removeFromCombo = useStore((s) => s.removeFromCombo);
  const clearCombo = useStore((s) => s.clearCombo);
  const getTotalWeight = useStore((s) => s.getTotalWeight);
  const getTotalPrice = useStore((s) => s.getTotalPrice);
  const getMissingCategories = useStore((s) => s.getMissingCategories);
  const setActiveCategory = useStore((s) => s.setActiveCategory);
  const setItemQuantity = useStore((s) => s.setItemQuantity);
  const getQuantityWarning = useStore((s) => s.getQuantityWarning);
  const isOverBudget = useStore((s) => s.isOverBudget);
  const getBudgetRemaining = useStore((s) => s.getBudgetRemaining);
  const filters = useStore((s) => s.filters);

  const totalWeight = getTotalWeight();
  const totalPrice = getTotalPrice();
  const missing = getMissingCategories();
  const quantityWarnings = getQuantityWarning();
  const overBudget = isOverBudget();
  const budgetRemaining = getBudgetRemaining();
  const selectedCount = Object.values(selectedItems).filter(Boolean).length;

  const getWeightColor = () => {
    if (totalWeight === 0) return 'text-forest-400';
    if (totalWeight < 5) return 'text-olive-600';
    if (totalWeight < 10) return 'text-earth-500';
    return 'text-red-500';
  };

  const getWeightTip = () => {
    if (totalWeight === 0) return '开始选择装备吧';
    if (totalWeight < 5) return '超轻套装 · 适合徒步';
    if (totalWeight < 10) return '标准重量 · 舒适露营';
    if (totalWeight < 15) return '偏重 · 建议自驾';
    return '较重 · 仅适合基地露营';
  };

  return (
    <aside className="card p-0 overflow-hidden sticky top-24">
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="w-full px-5 py-4 bg-gradient-to-r from-forest-50 to-olive-50 border-b border-cream-200 flex items-center justify-between hover:from-forest-100 hover:to-olive-100 transition-colors"
      >
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 bg-forest-500 rounded-lg flex items-center justify-center">
            <Package className="w-4 h-4 text-white" />
          </div>
          <div className="text-left">
            <h2 className="font-display font-semibold text-forest-700 text-base">装备套装</h2>
            <p className="text-xs text-forest-500">
              已选 {selectedCount}/4 类装备 · {filters.people} 人出行
            </p>
          </div>
        </div>
        {isCollapsed ? (
          <ChevronDown className="w-5 h-5 text-forest-500" />
        ) : (
          <ChevronUp className="w-5 h-5 text-forest-500" />
        )}
      </button>

      {!isCollapsed && (
        <div className="p-5 space-y-5 animate-fade-in">
          <div className="space-y-3">
            {(Object.keys(selectedItems) as Category[]).map((cat) => {
              const item = selectedItems[cat];
              const CatIcon = categoryIcons[cat];
              const qtyWarning = quantityWarnings.find((w) => w.category === cat);
              return (
                <div
                  key={cat}
                  className={`rounded-xl border-2 transition-all duration-300 ${
                    item
                      ? qtyWarning
                        ? 'border-earth-400 bg-earth-50/60'
                        : 'border-olive-200 bg-olive-50/50'
                      : 'border-dashed border-cream-200 bg-cream-50/50'
                  }`}
                >
                  {item ? (
                    <div className="p-3 space-y-2.5">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-lg overflow-hidden bg-cream-100 flex-shrink-0">
                          <img
                            src={item.equipment.image}
                            alt={item.equipment.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-1.5 mb-0.5">
                            <span className="text-sm">{CATEGORY_ICONS[cat]}</span>
                            <span className="text-xs text-olive-600 font-medium">
                              {CATEGORY_LABELS[cat]}
                            </span>
                          </div>
                          <h4 className="text-sm font-medium text-forest-700 truncate">
                            {item.equipment.name}
                          </h4>
                          <div className="flex items-center gap-3 text-xs text-forest-500 mt-0.5">
                            <span className="flex items-center gap-0.5">
                              <Scale className="w-3 h-3" />
                              {(item.equipment.weight * item.quantity).toFixed(2)}kg
                              {item.quantity > 1 && (
                                <span className="text-forest-400 ml-1">
                                  ({item.equipment.weight}kg × {item.quantity})
                                </span>
                              )}
                            </span>
                            <span className="text-earth-500 font-medium">
                              ¥{(item.equipment.price * item.quantity).toLocaleString()}
                            </span>
                          </div>
                        </div>
                        <button
                          onClick={() => removeFromCombo(cat)}
                          className="p-1.5 text-forest-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                          title="移除"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t border-cream-200/80">
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-forest-500">数量</span>
                          <div className="flex items-center gap-1 bg-white rounded-lg border border-cream-200">
                            <button
                              onClick={() => setItemQuantity(cat, item.quantity - 1)}
                              className="w-7 h-7 flex items-center justify-center text-forest-500 hover:bg-cream-100 rounded-l-lg transition-colors"
                            >
                              <Minus className="w-3.5 h-3.5" />
                            </button>
                            <span className="w-8 text-center text-sm font-medium text-forest-700">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => setItemQuantity(cat, item.quantity + 1)}
                              className="w-7 h-7 flex items-center justify-center text-forest-500 hover:bg-cream-100 rounded-r-lg transition-colors"
                            >
                              <Plus className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                        {qtyWarning && (
                          <div className="flex items-center gap-1 text-xs text-earth-600 animate-pulse-soft">
                            <AlertCircle className="w-3.5 h-3.5" />
                            <span>建议 {qtyWarning.need} 件</span>
                          </div>
                        )}
                      </div>
                    </div>
                  ) : (
                    <button
                      onClick={() => setActiveCategory(cat)}
                      className="w-full p-3 flex items-center gap-3 text-left group"
                    >
                      <div className="w-12 h-12 rounded-lg bg-cream-200/60 flex items-center justify-center flex-shrink-0 group-hover:bg-forest-100 transition-colors">
                        <CatIcon className="w-5 h-5 text-forest-400 group-hover:text-forest-600" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-1.5 mb-0.5">
                          <span className="text-sm opacity-50">{CATEGORY_ICONS[cat]}</span>
                          <span className="text-xs text-forest-400 font-medium">
                            {CATEGORY_LABELS[cat]}
                          </span>
                        </div>
                        <span className="text-sm text-forest-400 group-hover:text-forest-600 transition-colors">
                          点击选择 {CATEGORY_LABELS[cat]} →
                        </span>
                      </div>
                    </button>
                  )}
                </div>
              );
            })}
          </div>

          {missing.length > 0 && (
            <div className="p-3.5 bg-earth-50 border border-earth-200 rounded-xl flex items-start gap-2.5 animate-slide-up">
              <AlertTriangle className="w-5 h-5 text-earth-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-earth-700">缺少装备提醒</p>
                <p className="text-xs text-earth-600 mt-0.5">
                  还未选择：{missing.map((m) => CATEGORY_LABELS[m]).join('、')}
                </p>
              </div>
            </div>
          )}

          {quantityWarnings.length > 0 && (
            <div className="p-3.5 bg-amber-50 border border-amber-200 rounded-xl flex items-start gap-2.5 animate-slide-up">
              <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-amber-800">数量不足提醒</p>
                <div className="text-xs text-amber-700 mt-1 space-y-0.5">
                  {quantityWarnings.map((w) => (
                    <p key={w.category}>
                      {CATEGORY_ICONS[w.category]} {CATEGORY_LABELS[w.category]}：
                      当前 {w.have} 件，建议 {w.need} 件（{filters.people} 人出行）
                    </p>
                  ))}
                </div>
              </div>
            </div>
          )}

          {overBudget && (
            <div className="p-3.5 bg-red-50 border border-red-200 rounded-xl flex items-start gap-2.5 animate-slide-up">
              <Wallet className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-red-700">超出预算提醒</p>
                <p className="text-xs text-red-600 mt-0.5">
                  套装总价 ¥{totalPrice.toLocaleString()}，已超出预算 ¥
                  {Math.abs(budgetRemaining).toLocaleString()}
                  （预算上限 ¥{filters.maxBudget.toLocaleString()}）
                </p>
              </div>
            </div>
          )}

          <div className="p-4 bg-gradient-to-br from-cream-100 to-olive-50 rounded-xl space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm text-forest-600">
                <Scale className="w-4 h-4" />
                总重量
              </div>
              <div className="text-right">
                <span className={`text-xl font-bold ${getWeightColor()}`}>
                  {totalWeight.toFixed(2)}
                </span>
                <span className="text-sm text-forest-400 ml-1">kg</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm text-forest-600">
                <DollarSign className="w-4 h-4" />
                总价格
              </div>
              <div className="text-right">
                <span className={`text-xl font-bold ${overBudget ? 'text-red-500' : 'text-earth-500'}`}>
                  ¥{totalPrice.toLocaleString()}
                </span>
              </div>
            </div>
            {selectedCount > 0 && !overBudget && (
              <div className="pt-1 border-t border-cream-200 text-center">
                <p className="text-xs text-olive-600 font-medium">
                  预算剩余 ¥{budgetRemaining.toLocaleString()}
                </p>
              </div>
            )}
            {selectedCount > 0 && (
              <p className="text-xs text-center text-forest-500 pt-1 border-t border-cream-200">
                {getWeightTip()}
              </p>
            )}
          </div>

          <div className="space-y-2.5">
            <button
              onClick={onOpenSave}
              disabled={selectedCount === 0}
              className="w-full btn-primary flex items-center justify-center gap-2"
            >
              <Heart className="w-4 h-4" />
              保存为方案
            </button>
            {selectedCount > 0 && (
              <button
                onClick={clearCombo}
                className="w-full btn-secondary text-sm py-2 flex items-center justify-center gap-1.5 text-forest-500"
              >
                <Trash2 className="w-4 h-4" />
                清空套装
              </button>
            )}
          </div>
        </div>
      )}
    </aside>
  );
}
