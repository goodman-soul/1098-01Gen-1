import { Tent, Heart, Download, Mountain } from 'lucide-react';

interface HeaderProps {
  onOpenSaved: () => void;
}

export default function Header({ onOpenSaved }: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 bg-gradient-to-r from-forest-600 via-forest-500 to-olive-500 text-white shadow-lg">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>
      <div className="relative container mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
            <Mountain className="w-6 h-6" />
          </div>
          <div>
            <h1 className="font-display text-xl sm:text-2xl font-bold tracking-wide">
              野趣
            </h1>
            <p className="text-xs sm:text-sm text-cream-100/80">露营装备智能选购</p>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={onOpenSaved}
            className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-white/15 hover:bg-white/25 backdrop-blur-sm rounded-xl transition-all duration-200 active:scale-[0.98]"
          >
            <Heart className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="hidden sm:inline text-sm font-medium">我的方案</span>
          </button>
        </div>
      </div>
    </header>
  );
}
