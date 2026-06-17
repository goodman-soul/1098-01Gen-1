import { useState } from 'react';
import { X, Heart, Trash2, Edit2, Check, Download, Calendar, Package } from 'lucide-react';
import { useStore } from '../store/useStore';

interface SavedCombosModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenExport: (comboId: string) => void;
}

export default function SavedCombosModal({ isOpen, onClose, onOpenExport }: SavedCombosModalProps) {
  const savedCombos = useStore((s) => s.savedCombos);
  const deleteCombo = useStore((s) => s.deleteCombo);
  const loadCombo = useStore((s) => s.loadCombo);
  const renameCombo = useStore((s) => s.renameCombo);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState('');

  if (!isOpen) return null;

  const startEdit = (id: string, currentName: string) => {
    setEditingId(id);
    setEditName(currentName);
  };

  const confirmRename = (id: string) => {
    if (editName.trim()) {
      renameCombo(id, editName.trim());
    }
    setEditingId(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in">
      <div
        className="absolute inset-0 bg-forest-900/50 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative w-full max-w-2xl max-h-[85vh] bg-cream-50 rounded-3xl shadow-pop overflow-hidden animate-slide-up">
        <div className="px-6 py-5 bg-gradient-to-r from-forest-500 to-olive-500 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
              <Heart className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-display text-xl font-semibold">我的装备方案</h2>
              <p className="text-sm text-cream-100/80">共 {savedCombos.length} 个收藏方案</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/20 rounded-xl transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(85vh-120px)] scrollbar-thin">
          {savedCombos.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-20 h-20 mx-auto mb-4 bg-cream-200 rounded-full flex items-center justify-center">
                <Package className="w-10 h-10 text-forest-300" />
              </div>
              <h3 className="font-display text-lg font-semibold text-forest-600 mb-2">
                还没有收藏的方案
              </h3>
              <p className="text-sm text-forest-400">
                在左侧选择装备组合，点击「保存为方案」即可收藏
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {savedCombos.map((combo) => (
                <div
                  key={combo.id}
                  className="card p-5 hover:shadow-card-hover transition-all"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      {editingId === combo.id ? (
                        <div className="flex items-center gap-2">
                          <input
                            type="text"
                            value={editName}
                            onChange={(e) => setEditName(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && confirmRename(combo.id)}
                            className="input-base text-base py-1.5"
                            autoFocus
                          />
                          <button
                            onClick={() => confirmRename(combo.id)}
                            className="p-2 bg-forest-500 text-white rounded-lg hover:bg-forest-600 transition-colors"
                          >
                            <Check className="w-4 h-4" />
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <h3 className="font-display text-lg font-semibold text-forest-700">
                            {combo.name}
                          </h3>
                          <button
                            onClick={() => startEdit(combo.id, combo.name)}
                            className="p-1 text-forest-400 hover:text-forest-600 hover:bg-forest-50 rounded-lg transition-colors"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                        </div>
                      )}
                      <div className="flex items-center gap-1.5 text-xs text-forest-400 mt-1">
                        <Calendar className="w-3 h-3" />
                        {new Date(combo.createdAt).toLocaleDateString('zh-CN')}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {Object.entries(combo.items).map(([cat, item]) => (
                      <div
                        key={cat}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 ${
                          item
                            ? 'bg-olive-100 text-olive-700'
                            : 'bg-cream-100 text-forest-400'
                        }`}
                      >
                        {item ? '✓' : '○'} {item ? `${item.equipment.name}${item.quantity > 1 ? ` ×${item.quantity}` : ''}` : '未选择'}
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-cream-200">
                    <div className="flex items-center gap-5 text-sm">
                      <span className="text-forest-500">
                        总重: <span className="font-semibold text-forest-700">{combo.totalWeight.toFixed(2)}kg</span>
                      </span>
                      <span className="text-forest-500">
                        总价: <span className="font-semibold text-earth-500">¥{combo.totalPrice.toLocaleString()}</span>
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          loadCombo(combo);
                          onClose();
                        }}
                        className="btn-secondary text-sm py-2 px-3.5"
                      >
                        加载方案
                      </button>
                      <button
                        onClick={() => onOpenExport(combo.id)}
                        className="btn-primary text-sm py-2 px-3.5 flex items-center gap-1.5"
                      >
                        <Download className="w-4 h-4" />
                        导出
                      </button>
                      <button
                        onClick={() => deleteCombo(combo.id)}
                        className="p-2 text-forest-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
