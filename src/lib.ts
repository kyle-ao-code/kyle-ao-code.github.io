// 日期按北京时间：今年写「10月6日」，往年加年份
export function fmtDate(iso: string): string {
  const d = new Date(iso);
  const parts = new Intl.DateTimeFormat('zh-CN', { timeZone: 'Asia/Shanghai', year: 'numeric', month: 'numeric', day: 'numeric' })
    .formatToParts(d).reduce((a: Record<string, string>, p) => ((a[p.type] = p.value), a), {});
  const nowYear = new Intl.DateTimeFormat('zh-CN', { timeZone: 'Asia/Shanghai', year: 'numeric' }).format(new Date()).replace(/\D/g, '');
  const md = `${parts.month}月${parts.day}日`;
  return parts.year === nowYear ? md : `${parts.year}年${md}`;
}
const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
// 正文：转义后把链接和 @账号变成可点链接，保留换行
export function richText(text: string): string {
  return esc(text)
    .replace(/https?:\/\/[^\s<]+/g, (u) => {
      const shown = u.replace(/^https?:\/\/(www\.)?/, '');
      return `<a href="${u}" target="_blank" rel="noopener">${shown.length > 32 ? shown.slice(0, 31) + '…' : shown}</a>`;
    })
    .replace(/(^|[^\w/])@(\w{1,15})/g, '$1<a href="https://x.com/$2" target="_blank" rel="noopener">@$2</a>')
    .replace(/\n/g, '<br>');
}
