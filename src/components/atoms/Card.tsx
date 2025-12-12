import type { Suit, CardState, CardSize } from '../../types' // 型定義
import { CARD_SIZES, SUIT_SYMBOLS, SUIT_COLORS } from '../../utils' // 定数

/**
 * カードコンポーネントのプロパティ
 */
interface CardProps {
    suit: Suit | null // 紋様（nullの場合は裏面）
    state: CardState // 表裏状態
    size?: CardSize // サイズバリエーション
    cardType?: 'player' | 'proceeding' // カードタイプ（プレイヤーカード or 進行カード）
    onClick?: () => void // クリックハンドラー
    className?: string // 追加のCSSクラス
}

/**
 * カードコンポーネント
 * トランプカードを表示する基本コンポーネント
 */
export const Card = ({
    suit,
    state,
    size = 'normal',
    cardType = 'player', // デフォルトはプレイヤーカード
    onClick,
    className = ''
}: CardProps) => {
    const { width, height } = CARD_SIZES[size]
    const isFaceUp = state === 'face-up'

    // カードタイプに応じたホバーアニメーション
    const hoverAnimation = cardType === 'proceeding'
        ? 'hover:scale-105' // 進行カードのみ拡大アニメーション
        : '' // プレイヤーカードはアニメーションなし

    return (
        <div
            className={`
        relative rounded-lg shadow-lg cursor-pointer
        transition-all duration-300 hover:shadow-xl
        ${hoverAnimation}
        ${className}
      `}
            style={{ width: `${width}px`, height: `${height}px` }}
            onClick={onClick}
        >
            {isFaceUp && suit ? (
                // 表面（紋様を表示）
                <div className="w-full h-full bg-white rounded-lg border-2 border-gray-300 flex items-center justify-center">
                    <span className={`text-6xl ${SUIT_COLORS[suit]}`}>
                        {SUIT_SYMBOLS[suit]}
                    </span>
                </div>
            ) : (
                // 裏面（プレースホルダー）
                <div className="w-full h-full bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg border-2 border-indigo-700 flex items-center justify-center">
                    <div className="text-6xl">🐻</div>
                </div>
            )}
        </div>
    )
}
