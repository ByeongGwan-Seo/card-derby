import type { Suit, CardSize } from '../types' // 型定義

/**
 * ゲーム定数
 */

// フィールド設定
export const FIELD_ROWS = 10 // フィールドの行数
export const FIELD_COLS = 4 // フィールドの列数（プレイヤー数）
export const START_ROW = 10 // スタート地点の行（下から上へ）
export const GOAL_ROW = 1 // ゴール地点の行（上）

// アクションカード設定
export const ACTION_CARD_ROWS = [2, 3, 4, 5, 6, 7, 8, 9] // アクションカードが配置される行

// カード設定
export const CARD_ASPECT_RATIO = 9 / 16 // カードのアスペクト比（9:16）
export const CARD_SIZE_MULTIPLIER = 1.2 // 進行カードのサイズ倍率

/**
 * カードサイズのバリエーション（ライブラリページ用）
 */
export const CARD_SIZES: Record<CardSize, { width: number; height: number }> = {
    normal: {
        width: 45, // px
        height: 75, // px
    },
    large: {
        width: 54, // px (45 * 1.2)
        height: 90, // px (75 * 1.2)
    },
}

/**
 * タイルサイズ（カードより少し大きめ）
 * 10行が100vh内に収まるように調整 (Height = 90px)
 */
export const TILE_SIZE = {
    width: 85, // px
    height: 90, // px
}

/**
 * トランプの紋様リスト
 */
export const SUITS: Suit[] = ['hearts', 'diamonds', 'clubs', 'spades']

/**
 * 紋様の日本語名
 */
export const SUIT_NAMES: Record<Suit, string> = {
    hearts: 'ハート',
    diamonds: 'ダイヤ',
    clubs: 'クラブ',
    spades: 'スペード',
}

/**
 * 紋様の記号
 */
export const SUIT_SYMBOLS: Record<Suit, string> = {
    hearts: '♥',
    diamonds: '♦',
    clubs: '♣',
    spades: '♠',
}

/**
 * 紋様のカラー（Tailwind CSS用）
 */
export const SUIT_COLORS: Record<Suit, string> = {
    hearts: 'text-red-500',
    diamonds: 'text-red-500',
    clubs: 'text-gray-800',
    spades: 'text-gray-800',
}
