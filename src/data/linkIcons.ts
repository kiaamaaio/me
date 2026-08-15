// リンクカードのアイコン（先頭1文字＋背景色）を定義する
// パレットはサイトの背景グラデーション（#667eea〜#764ba2）に馴染む配色として固定しており、
// サイトの配色を大きく変える際は手動で見直す想定（favicon.svg / og-image.jpg と同様の扱い）。
export const linkIconPalette: string[] = [
    '#5b6fd8', // indigo
    '#8a4fc4', // violet
    '#c1487d', // magenta
    '#c2604a', // terracotta
    '#b8862f', // amber
    '#4f8f5c', // green
    '#2f8f95', // teal
    '#3d6ea5', // blue
];

export function getLinkInitial(title: string): string {
    const [firstChar] = Array.from(title.trim());
    return (firstChar ?? '').toUpperCase();
}
