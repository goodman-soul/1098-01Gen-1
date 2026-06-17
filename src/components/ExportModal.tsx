import { useState, useEffect } from 'react';
import { X, Download, Copy, Check, FileText } from 'lucide-react';
import { useStore } from '../store/useStore';
import { generateChecklist, downloadTextFile, copyToClipboard } from '../utils/export';
import { Combo } from '../types';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  comboId: string | null;
}

export default function ExportModal({ isOpen, onClose, comboId }: ExportModalProps) {
  const savedCombos = useStore((s) => s.savedCombos);
  const [combo, setCombo] = useState<Combo | null>(null);
  const [checklist, setChecklist] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (isOpen && comboId) {
      const found = savedCombos.find((c) => c.id === comboId);
      if (found) {
        setCombo(found);
        setChecklist(generateChecklist(found));
      }
    }
  }, [isOpen, comboId, savedCombos]);

  if (!isOpen || !combo) return null;

  const handleCopy = async () => {
    const ok = await copyToClipboard(checklist);
    if (ok) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDownload = () => {
    const filename = `露营出行清单_${combo.name}_${new Date().toLocaleDateString('zh-CN')}.txt`;
    downloadTextFile(checklist, filename);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in">
      <div
        className="absolute inset-0 bg-forest-900/50 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative w-full max-w-2xl max-h-[85vh] bg-cream-50 rounded-3xl shadow-pop overflow-hidden animate-slide-up">
        <div className="px-6 py-5 bg-gradient-to-r from-sky-500 to-sky-400 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-display text-xl font-semibold">导出出行清单</h2>
              <p className="text-sm text-white/80">{combo.name}</p>
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
          <div className="flex items-center justify-between p-3 bg-cream-100 rounded-xl">
            <div className="flex items-center gap-4 text-sm">
              <span className="text-forest-600">
                📦 总重：<span className="font-semibold">{combo.totalWeight.toFixed(2)} kg</span>
              </span>
              <span className="text-forest-600">
                💰 总价：<span className="font-semibold text-earth-500">¥{combo.totalPrice.toLocaleString()}</span>
              </span>
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleCopy}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium flex items-center gap-1.5 transition-all ${
                  copied
                    ? 'bg-olive-500 text-white'
                    : 'bg-white text-forest-600 border border-cream-200 hover:border-forest-300'
                }`}
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                {copied ? '已复制' : '复制'}
              </button>
              <button
                onClick={handleDownload}
                className="px-3 py-1.5 bg-forest-500 text-white rounded-lg text-sm font-medium flex items-center gap-1.5 hover:bg-forest-600 transition-colors"
              >
                <Download className="w-4 h-4" />
                下载 .txt
              </button>
            </div>
          </div>

          <div className="bg-forest-900 rounded-2xl overflow-hidden">
            <div className="px-4 py-2.5 bg-forest-800 flex items-center justify-between">
              <span className="text-xs text-forest-300 font-mono">checklist.txt</span>
              <span className="text-xs text-forest-400 font-mono">
                {checklist.split('\n').length} 行
              </span>
            </div>
            <pre className="p-5 text-[13px] text-forest-100 font-mono leading-relaxed overflow-x-auto scrollbar-thin max-h-[50vh] overflow-y-auto whitespace-pre-wrap">
              {checklist}
            </pre>
          </div>

          <div className="flex justify-end">
            <button onClick={onClose} className="btn-secondary px-8">
              关闭
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
