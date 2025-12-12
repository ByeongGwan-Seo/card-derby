import { motion, AnimatePresence } from 'framer-motion' // Corrected import for framer-motion
import { Card, Tile } from '../atoms'
import type { ProceedingCard } from '../../types'

interface ProceedingCardAreaProps {
    card: ProceedingCard
    onClick: () => void
    onAnimationComplete?: () => void
}

/**
 * 進行カードエリアコンポーネント
 * デッキのように振る舞う：
 * 1. 下に「次のカード（裏面）」が常にある
 * 2. 上のカードをクリックするとめくれる（Flip）
 * 3. めくれたカードをクリックするとスライドして消える（Slide）
 * 4. 消えると下のカードが現れる
 */
export const ProceedingCardArea = ({ card, onClick }: ProceedingCardAreaProps) => {
    return (
        <div className="relative w-full h-full flex justify-center items-center">
            <Tile type="proceeding">
                <div className="relative w-full h-full">
                    {/* 1. ベースとなるデッキ（常に裏面） */}
                    <div className="absolute inset-0 flex justify-center items-center">
                        <Card
                            suit={null}
                            state="face-down"
                            size="large"
                            cardType="proceeding"
                            animationType="none"
                        />
                    </div>

                    {/* 2. アクティブなカード（アニメーション） */}
                    <AnimatePresence mode="popLayout">
                        {card.suit && (
                            <motion.div
                                key={card.id} // IDが変われば再生成 (同じ紋様でもアニメーションする)
                                className="absolute inset-0 flex justify-center items-center z-10 pointer-events-none" // クリックは一番上の透明レイヤーが受ける
                                initial={{ x: 0, scale: 0.9, opacity: 0 }}
                                animate={{ x: 0, scale: 1, opacity: 1 }}
                                exit={{ x: 100, opacity: 0, transition: { duration: 0.2 } }}
                                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                            >
                                <Card
                                    suit={card.suit}
                                    state="face-up"
                                    size="large"
                                    cardType="proceeding"
                                    animationType="none"
                                />
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* 3. クリック判定用透明レイヤー（最前面） */}
                    <div
                        className="absolute inset-0 cursor-pointer z-20"
                        onClick={onClick}
                        role="button"
                        aria-label="Draw Card"
                    />
                </div>
            </Tile>
        </div>
    )
}

