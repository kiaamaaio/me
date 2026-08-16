// リンクカードのアイコン（先頭1文字＋背景色）を定義する
// パレットはサイトの背景グラデーション（#dcc196〜#6f5539、プロフィール写真の色に合わせた配色）に馴染む配色として固定しており、
// サイトの配色を大きく変える際は手動で見直す想定（favicon.svg / og-image.jpg と同様の扱い）。
export const linkIconPalette: string[] = [
    '#a9855c', // sand
    '#8b5e3c', // walnut
    '#c2604a', // terracotta
    '#b8862f', // amber
    '#6f7d4a', // olive
    '#9c5b3f', // rust
    '#c48a3f', // mustard
    '#7a6a4f', // taupe
];

export function getLinkInitial(title: string): string {
    const [firstChar] = Array.from(title.trim());
    return (firstChar ?? '').toUpperCase();
}

// frontmatterで color を指定しなかったリンクの既定色を、タイトルから決定する（FNV-1a）。
// 並び順（配列のindex）に依存させると、リンクを1つ追加・並び替えしただけで
// 既存リンクの色まで変わってしまうため、タイトル由来の固定値にしている。
// パレットには近い色味も含まれるため、隣同士が似た色になったら
// frontmatterの color で明示的に上書きする。
export function getLinkIconColor(title: string): string {
    let hash = 0x811c9dc5;
    for (const char of title) {
        hash ^= char.codePointAt(0) ?? 0;
        hash = Math.imul(hash, 0x01000193) >>> 0;
    }
    return linkIconPalette[hash % linkIconPalette.length];
}
