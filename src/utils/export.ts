import { Combo, CATEGORY_LABELS, CATEGORY_ICONS } from '../types';

export function generateChecklist(combo: Combo): string {
  const date = new Date().toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  let content = '';
  content += `================================\n`;
  content += `   🏕️ 野趣 · 露营出行清单\n`;
  content += `================================\n\n`;
  content += `方案名称：${combo.name}\n`;
  content += `生成日期：${date}\n\n`;
  content += `────────────────────────────────\n`;
  content += `装备明细\n`;
  content += `────────────────────────────────\n\n`;

  (Object.keys(combo.items) as Array<keyof typeof combo.items>).forEach((cat) => {
    const item = combo.items[cat];
    const icon = CATEGORY_ICONS[cat];
    const label = CATEGORY_LABELS[cat];

    if (item) {
      content += `${icon} 【${label}】\n`;
      content += `   品牌/型号：${item.brand} ${item.name}\n`;
      content += `   重量：${item.weight} kg\n`;
      content += `   价格：¥${item.price}\n`;
      content += `   评分：${'⭐'.repeat(Math.round(item.rating))} (${item.rating})\n`;
      content += `   特点：${item.tags.join('、')}\n\n`;
    } else {
      content += `${icon} 【${label}】 ⚠️ 未选择\n\n`;
    }
  });

  content += `────────────────────────────────\n`;
  content += `汇总统计\n`;
  content += `────────────────────────────────\n\n`;
  content += `📦 装备总重量：${combo.totalWeight.toFixed(2)} kg\n`;
  content += `💰 装备总价格：¥${combo.totalPrice.toLocaleString()}\n\n`;

  content += `────────────────────────────────\n`;
  content += `出行建议\n`;
  content += `────────────────────────────────\n\n`;

  const tips: string[] = [];
  if (combo.totalWeight > 15) {
    tips.push('⚠️  装备总重量较重，建议自驾露营或使用手推车');
  } else if (combo.totalWeight > 10) {
    tips.push('💡 装备重量适中，适合2-3日徒步露营');
  } else {
    tips.push('✅ 装备轻量化，适合多日徒步穿越');
  }

  const missing = Object.values(combo.items).filter((v) => !v).length;
  if (missing > 0) {
    tips.push(`⚠️  还有 ${missing} 类装备未选择，请及时补充`);
  }

  const hasStove = combo.items.stove;
  if (hasStove) {
    tips.push('🔥 记得携带炉具燃料及打火机/打火石');
  }

  const hasTent = combo.items.tent;
  if (hasTent) {
    tips.push('⛺ 建议提前在家练习帐篷搭建');
  }

  tips.push('🎒 建议准备：头灯、急救包、充电宝、水壶、防晒用品');
  tips.push('🌤️ 出行前请查看天气预报，祝露营愉快！');

  tips.forEach((tip, i) => {
    content += `${i + 1}. ${tip}\n`;
  });

  content += `\n================================\n`;
  content += `    由「野趣」装备选购平台生成\n`;
  content += `================================\n`;

  return content;
}

export function downloadTextFile(content: string, filename: string): void {
  const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.left = '-9999px';
    document.body.appendChild(textarea);
    textarea.select();
    try {
      document.execCommand('copy');
      document.body.removeChild(textarea);
      return true;
    } catch {
      document.body.removeChild(textarea);
      return false;
    }
  }
}
