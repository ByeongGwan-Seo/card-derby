import { motion } from 'motion/react'
import type { Suit, CardState, CardSize } from '../../types' // 型定義
import { CARD_SIZES, SUIT_SYMBOLS, SUIT_COLORS } from '../../utils' // 定数

/**
 * アニメーションタイプ
 */
export type AnimationType = 'none' | 'flip' | 'slide'

/**
 * カードコンポーネントのプロパティ
 */
interface CardProps {
    suit: Suit | null // 紋様（nullの場合は裏面）
    state: CardState // 表裏状態
    size?: CardSize // サイズバリエーション
    cardType?: 'player' | 'proceeding' | 'action' // カードタイプ
    animationType?: AnimationType // アニメーションタイプ
    onClick?: () => void // クリックハンドラー
    className?: string // 追加のCSSクラス
    layoutId?: string // レイアウトアニメーション用ID
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
    animationType = 'none', // デフォルトはアニメーションなし
    onClick,
    className = '',
    layoutId
}: CardProps) => {
    const { width, height } = CARD_SIZES[size]
    const isFaceUp = state === 'face-up'

    // カードタイプに応じたホバーアニメーション
    const hoverAnimation = cardType === 'proceeding'
        ? { scale: 1.05 } // 進行カードのみ拡大アニメーション
        : {}

    // 表面コンテンツ
    const FrontContent = () => (
        <div className={`
      w-full h-full bg-white rounded-lg border-2 border-gray-300
      flex flex-col items-center justify-center
      ${suit ? SUIT_COLORS[suit] : ''}
    `}>
            {suit && (
                <>
                    <div className="text-3xl font-bold">{SUIT_SYMBOLS[suit]}</div>
                </>
            )}
        </div>
    )

    // 裏面コンテンツ
    const BackContent = () => (
        <div className="w-full h-full bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg border-2 border-indigo-700 flex items-center justify-center">
            <span className="text-3xl">🐻</span>
        </div>
    )

    return (
        <div
            className={`
        relative perspective-1000 z-10
        ${className}
      `}
            style={{ width: `${width}px`, height: `${height}px`, perspective: '1000px' }}
            onClick={onClick}
        >
            <motion.div
                layout={!!layoutId}
                layoutId={layoutId}
                className={`
          relative w-full h-full
          rounded-lg shadow-lg cursor-pointer
          ${cardType !== 'action' ? 'hover:shadow-xl' : ''}
        `}
                style={{
                    transformStyle: "preserve-3d", // 3D変形を維持
                }}
                whileHover={hoverAnimation}
                initial={false}
                animate={animationType === 'slide' ? 'slide' : (animationType === 'flip' ? (isFaceUp ? 'faceUp' : 'faceDown') : 'none')}
                variants={{
                    faceUp: { rotateY: 0, transition: { duration: 0.6 } },
                    faceDown: { rotateY: 180, transition: { duration: 0.6 } },
                    slide: {
                        x: isFaceUp ? 0 : 200,
                        opacity: isFaceUp ? 1 : 0,
                        rotateY: 0
                    },
                    none: { rotateY: isFaceUp ? 0 : 180, x: 0, opacity: 1, transition: { duration: 0 } }
                }}
            >
                {/* 表面（rotateY: 0） - 常に表面として配置 */}
                <div
                    className="absolute inset-0 w-full h-full"
                    style={{ backfaceVisibility: 'hidden' }}
                >
                    <FrontContent />
                </div>

                {/* 裏面（rotateY: 180） - 裏返して配置 */}
                <div
                    className="absolute inset-0 w-full h-full"
                    style={{
                        backfaceVisibility: 'hidden',
                        transform: 'rotateY(180deg)'
                    }}
                >
                    <BackContent />
                </div>
            </motion.div>
        </div>
    )
}
