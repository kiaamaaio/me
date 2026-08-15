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
