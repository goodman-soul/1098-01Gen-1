import { useState } from 'react';
import { X, Heart, Sparkles } from 'lucide-react';
import { useStore } from '../store/useStore';

interface SaveComboModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const NAME_SUGGESTIONS = [
  '周末休闲露营套装',
  '三日徒步探险装备',
  '家庭亲子露营方案',
  '轻量化徒步组合',
  '四季通用基础款',
  '冬季雪山探险套装',
];

export default function SaveComboModal({ isOpen, onClose }: SaveComboModalProps) {
  const saveCombo = useStore((s) => s.saveCombo);
  const getTotalWeight = useStore((s) => s.getTotalWeight);
  const getTotalPrice = useStore((s) => s.getTotalPrice);
  const [name, setName] = useState('');
  const [saved, setSaved] = useState(false);

  if (!isOpen) return null;

  const handleSave = () => {
    const finalName = name.trim() || '我的露营方案';
    saveCombo(finalName);
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      setName('');
      onClose();
    }, 1500);
  };

  const handleSuggestion = (s: string) => {
    setName(s);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in">
      <div
        className="absolute inset-0 bg-forest-900/50 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative w-full max-w-md bg-cream-50 rounded-3xl shadow-pop overflow-hidden animate-slide-up">
        <div className="px-6 py-5 bg-gradient-to-r from-earth-500 to-earth-400 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
              <Heart className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-display text-xl font-semibold">保存装备方案</h2>
              <p className="text-sm text-white/80">为你的装备组合起个名字</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/20 rounded-xl transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-5">
          {saved ? (
            <div className="text-center py-8 animate-fade-in">
              <div className="w-16 h-16 mx-auto mb-4 bg-olive-100 rounded-full flex items-center justify-center">
                <Sparkles className="w-8 h-8 text-olive-600" />
              </div>
              <h3 className="font-display text-xl font-semibold text-forest-700 mb-1">
                保存成功！
              </h3>
              <p className="text-sm text-forest-500">方案已加入收藏夹</p>
            </div>
          ) : (
            <>
              <div className="space-y-2">
                <label className="text-sm font-medium text-forest-600">方案名称</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSave()}
                  placeholder="输入方案名称..."
                  className="input-base"
                  autoFocus
                />
              </div>

              <div className="space-y-2">
                <p className="text-xs font-medium text-forest-500">💡 快速命名建议</p>
                <div className="flex flex-wrap gap-2">
                  {NAME_SUGGESTIONS.map((s) => (
                    <button
                      key={s}
                      onClick={() => handleSuggestion(s)}
                      className={`px-3 py-1.5 text-xs rounded-lg transition-all border ${
                        name === s
                          ? 'bg-forest-500 text-white border-forest-500'
                          : 'bg-white text-forest-600 border-cream-200 hover:border-forest-300 hover:bg-cream-50'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-4 bg-gradient-to-br from-cream-100 to-olive-50 rounded-xl">
                <div className="text-xs text-forest-500 mb-2">方案概览</div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-forest-600">
                    总重量：<span className="font-semibold text-forest-700">{getTotalWeight().toFixed(2)} kg</span>
                  </span>
                  <span className="text-forest-600">
                    总价格：<span className="font-semibold text-earth-500">¥{getTotalPrice().toLocaleString()}</span>
                  </span>
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button onClick={onClose} className="flex-1 btn-secondary">
                  取消
                </button>
                <button onClick={handleSave} className="flex-1 btn-primary">
                  保存方案
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
