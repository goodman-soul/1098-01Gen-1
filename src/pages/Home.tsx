import { useState } from 'react';
import Header from '@/components/Header';
import FilterPanel from '@/components/FilterPanel';
import CategoryTabs from '@/components/CategoryTabs';
import EquipmentGrid from '@/components/EquipmentGrid';
import ComboSidebar from '@/components/ComboSidebar';
import SavedCombosModal from '@/components/SavedCombosModal';
import SaveComboModal from '@/components/SaveComboModal';
import ExportModal from '@/components/ExportModal';
import { Compass, Mountain, Leaf } from 'lucide-react';

export default function Home() {
  const [showSaved, setShowSaved] = useState(false);
  const [showSave, setShowSave] = useState(false);
  const [showExport, setShowExport] = useState(false);
  const [exportComboId, setExportComboId] = useState<string | null>(null);

  const handleOpenExport = (comboId: string) => {
    setShowSaved(false);
    setExportComboId(comboId);
    setTimeout(() => setShowExport(true), 50);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header onOpenSaved={() => setShowSaved(true)} />

      <div className="container mx-auto px-4 sm:px-6 py-6 flex-1">
        <section className="mb-8 relative overflow-hidden rounded-3xl bg-gradient-to-br from-forest-600 via-forest-500 to-olive-500 text-white p-8 sm:p-10">
          <div className="absolute inset-0 opacity-20">
            <Mountain className="absolute -bottom-4 -left-4 w-64 h-64" />
            <Leaf className="absolute top-4 right-8 w-32 h-32 rotate-12" />
            <Compass className="absolute -top-8 right-32 w-24 h-24 rotate-45 opacity-50" />
          </div>
          <div className="relative max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/15 backdrop-blur-sm rounded-full text-sm mb-4">
              <span>🏕️</span>
              <span>为你的下一次冒险做好准备</span>
            </div>
            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold mb-3 leading-tight">
              智能装备搭配，<br />让每一次出发都恰到好处
            </h1>
            <p className="text-cream-100/90 text-base sm:text-lg leading-relaxed">
              根据天气、人数、路线和预算，为你精选最合适的帐篷、炉具、睡袋和背包。
              实时计算总重量，一键导出出行清单。
            </p>
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr_340px] gap-6">
          <div className="hidden lg:block">
            <FilterPanel />
          </div>

          <div className="min-w-0">
            <div className="lg:hidden mb-5">
              <FilterPanel />
            </div>
            <CategoryTabs />
            <EquipmentGrid />
          </div>

          <div>
            <ComboSidebar onOpenSave={() => setShowSave(true)} />
          </div>
        </div>
      </div>

      <footer className="mt-12 py-8 border-t border-cream-200 bg-cream-100/50">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Mountain className="w-5 h-5 text-forest-500" />
            <span className="font-display font-semibold text-forest-700">野趣</span>
          </div>
          <p className="text-sm text-forest-400">
            让每一次露营，都成为难忘的自然之旅 🌲
          </p>
        </div>
      </footer>

      <SavedCombosModal
        isOpen={showSaved}
        onClose={() => setShowSaved(false)}
        onOpenExport={handleOpenExport}
      />

      <SaveComboModal
        isOpen={showSave}
        onClose={() => setShowSave(false)}
      />

      <ExportModal
        isOpen={showExport}
        onClose={() => {
          setShowExport(false);
          setExportComboId(null);
        }}
        comboId={exportComboId}
      />
    </div>
  );
}
