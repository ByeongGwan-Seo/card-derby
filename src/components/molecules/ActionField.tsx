import type { ActionCard } from '../../types' // 型定義
import { Card, Tile } from '../atoms' // Atomsコンポーネント
import { FIELD_ROWS } from '../../utils' // 定数

/**
 * ActionFieldコンポーネントのプロパティ
 */
interface ActionFieldProps {
    actionCards: ActionCard[] // アクションカード配列
    onCardClick?: (cardId: string) => void // カードクリックハンドラー
    className?: string // 追加のCSSクラス
    children?: React.ReactNode // 追加コンテンツ (ProceedingCardAreaなど)
    layoutIdPrefix?: string
}

/**
 * ActionFieldコンポーネント
 * 1xNのアクションカードフィールドを表示（2-(N-1)行目にカード配置）
 */
export const ActionField = ({
    actionCards,
    onCardClick,
    className = '',
    children,
    layoutIdPrefix = ''
}: ActionFieldProps) => {
    // 指定行のカードを取得
    const getCardAtRow = (row: number) => {
        return actionCards.find(card => card.row === row)
    }

    // 行リスト生成 [1, 2, ..., FIELD_ROWS]
    const rows = Array.from({ length: FIELD_ROWS }, (_, i) => i + 1)

    return (
        <div className={`inline-block ${className}`}>
            {/* フィールドグリッド（縦1列） */}
            <div className="flex flex-col rounded-lg overflow-hidden border-4 border-field-purple-600">
                {rows.map(row => {
                    const card = getCardAtRow(row)


                    // Last row is where the deck (ProceedingCardArea) goes
                    if (row === FIELD_ROWS && children) {
                        return (
                            <div key={row} className="relative">
                                {/* ProceedingCardArea is expected to maintain its own Tile-like appearance */}
                                {/* Wrapper to ensure it fits into the grid flow if needed */}
                                {children}
                            </div>
                        )
                    }

                    return (
                        <Tile
                            key={row}
                            type="action"
                            row={row}
                            className={`rounded-none border-0 ${card?.clickable ? 'ring-4 ring-yellow-400 ring-opacity-70 animate-pulse z-10' : ''}`}
                        >
                            {/* カードがある場合は表示 */}
                            {card && (
                                <Card
                                    suit={card.suit}
                                    state={card.state}
                                    size="normal"
                                    cardType="action"
                                    animationType="flip" // ActionCardはフリップアニメーション
                                    onClick={() => card.clickable && onCardClick?.(card.id)}
                                    className={card.clickable ? 'cursor-pointer hover:brightness-110' : ''}
                                    layoutId={`${layoutIdPrefix}${card.id}`}
                                />
                            )}
                        </Tile>
                    )
                })}
            </div>
        </div>
    )
}
