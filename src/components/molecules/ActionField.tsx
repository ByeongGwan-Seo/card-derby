import type { ActionCard } from '../../types' // 型定義
import { Card, Tile } from '../atoms' // Atomsコンポーネント
import { ACTION_CARD_ROWS } from '../../utils' // 定数

/**
 * ActionFieldコンポーネントのプロパティ
 */
interface ActionFieldProps {
    actionCards: ActionCard[] // アクションカード配列
    onCardClick?: (cardId: string) => void // カードクリックハンドラー
    className?: string // 追加のCSSクラス
}

/**
 * ActionFieldコンポーネント
 * 1x6のアクションカードフィールドを表示（2-5行目にカード配置）
 */
export const ActionField = ({
    actionCards,
    onCardClick,
    className = ''
}: ActionFieldProps) => {
    // 指定行のカードを取得
    const getCardAtRow = (row: number) => {
        return actionCards.find(card => card.row === row)
    }

    return (
        <div className={`inline-block ${className}`}>
            {/* フィールドグリッド（縦1列） */}
            <div className="flex flex-col rounded-lg overflow-hidden border-4 border-field-purple-600">
                {[1, 2, 3, 4, 5, 6].map(row => {
                    const card = getCardAtRow(row)
                    const hasCard = ACTION_CARD_ROWS.includes(row)

                    return (
                        <Tile
                            key={row}
                            type="action"
                            row={row}
                            className="rounded-none border-0"
                        >
                            {hasCard && card && (
                                <Card
                                    suit={card.suit}
                                    state={card.state}
                                    size="normal"
                                    cardType="action"
                                    animationType="flip" // アクションカードはFlipアニメーション（必須）
                                    onClick={() => onCardClick?.(card.id)}
                                />
                            )}
                        </Tile>
                    )
                })}
            </div>
        </div>
    )
}
