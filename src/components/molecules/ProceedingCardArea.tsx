import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion' // Corrected import for framer-motion
import { Card, Tile } from '../atoms'
import type { ProceedingCard, Suit } from '../../types'

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
export const ProceedingCardArea = ({ card, onClick, onAnimationComplete }: ProceedingCardAreaProps) => {
    // アニメーションの状態管理
    // 'initial': 初期状態（裏面）
    // 'flipped': めくれた状態（表面）
    // 'sliding': スライド中
    const [animState, setAnimState] = useState<'initial' | 'flipped' | 'sliding'>('initial')
    const [displaySuit, setDisplaySuit] = useState<Suit | null>(null)

    // 外部からのcard.state変更を監視してアニメーション状態を制御（必要に応じて）
    // ここでは主に内部クリックで制御し、親には通知する形をとる

    const handleClick = () => {
        if (animState === 'initial') {
            // 裏面 -> 表面 (Flip)
            // ここで紋様を決定（デモ用または親から受け取る）
            // 親コンポーネントがstateを更新するのを待つか、ここで先行してアニメーションさせる
            // 今回は親のonClickを呼んで、親が変わったpropsを渡してくるのを想定
            onClick()
            setAnimState('flipped')
        } else if (animState === 'flipped') {
            // 表面 -> スライドアウト (Slide)
            setAnimState('sliding')
            // スライド完了後にリセットする処理は onAnimationComplete で行う
            setTimeout(() => {
                setAnimState('initial')
                if (onAnimationComplete) onAnimationComplete()
            }, 500) // アニメーション時間と合わせる
        }
    }

    // card propの更新を反映
    useEffect(() => {
        if (card.state === 'face-up' && animState === 'initial') {
            setAnimState('flipped')
            setDisplaySuit(card.suit)
        }
    }, [card.state, card.suit, animState])


    return (
        <div className="relative w-full h-full flex justify-center items-center">
            <Tile type="proceeding">
                <div className="relative" style={{ width: '100%', height: '100%' }}>
                    {/* ベースとなるカード（常に裏面で待機）- デッキの下のカード */}
                    <div className="absolute inset-0 flex justify-center items-center">
                        {/* ベースカード：常に裏面（State='face-down'、Suit=null） */}
                        <Card
                            suit={null}
                            state="face-down"
                            size="large"
                            cardType="proceeding"
                            animationType="none" // アニメーションなし
                        />
                    </div>

                    {/* アクティブなカード（アニメーションするカード） */}
                    <AnimatePresence>
                        {animState !== 'initial' && ( // initialの時はベースカードと重なるので、実はactiveカードは裏面として存在しなくてもいい、あるいは透明？
                            // 簡易実装：initialのときはレンダリングせず、ベースが見えている。
                            // flippedになったら表面のカードが「上」に現れる（FlipアニメーションはCard内部でやるか、ここでやるか）
                            // CardコンポーネントのFlipは「isFaceUp」プロパティに依存している。
                            <motion.div
                                key="active-card"
                                className="absolute inset-0 flex justify-center items-center"
                                // Flipアニメーション削除：初期表示は表面で即時表示（あるいはフェードイン）
                                initial={{ x: 0, opacity: 0 }}
                                animate={
                                    animState === 'sliding'
                                        ? { x: 200, opacity: 0 } // スライドアウト
                                        : { x: 0, opacity: 1 }   // 即時表示（フェードイン）
                                }
                                transition={{ duration: 0.3 }}
                            >
                                <Card
                                    suit={card.suit || displaySuit}
                                    state="face-up"
                                    size="large"
                                    cardType="proceeding"
                                    animationType="none" // Card内部のアニメーションは使用しない
                                    onClick={handleClick}
                                />
                            </motion.div>
                        )}

                        {/* initial状態の透明なクリッカブルレイヤー（ベースカードの上） */}
                        {animState === 'initial' && (
                            <div
                                className="absolute inset-0 cursor-pointer z-10"
                                onClick={handleClick}
                            >
                                {/* 透明だがクリックを受け付ける */}
                            </div>
                        )}
                    </AnimatePresence>
                </div>
            </Tile>
        </div>
    )
}

