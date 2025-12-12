import type { PlayerCard } from '../../types' // 型定義
import { Card, Tile } from '../atoms' // Atomsコンポーネント
import { FIELD_ROWS, FIELD_COLS, GOAL_ROW } from '../../utils' // 定数

/**
 * PlayerFieldコンポーネントのプロパティ
 */
interface PlayerFieldProps {
    playerCards: PlayerCard[] // プレイヤーカード配列
    onCardClick?: (cardId: string) => void // カードクリックハンドラー
    className?: string // 追加のCSSクラス
    layoutIdPrefix?: string // プレフィックス追加
}

/**
 * PlayerFieldコンポーネント
 * 4x6のプレイヤーフィールドを表示
 */
export const PlayerField = ({
    playerCards,
    onCardClick,
    className = '',
    layoutIdPrefix = ''
}: PlayerFieldProps) => {
    // 各タイルにカードがあるかチェック
    const getCardAtPosition = (row: number, col: number) => {
        return playerCards.find(
            card => card.position.y === row && card.position.x === col
        )
    }

    return (
        <div className={`inline-block ${className}`}>
            {/* フィールドグリッド */}
            <div
                className="grid rounded-lg overflow-hidden border-4 border-field-green-600"
                style={{ gridTemplateColumns: `repeat(${FIELD_COLS}, 1fr)` }}
            >
                {Array.from({ length: FIELD_ROWS }, (_, rowIndex) => {
                    const row = rowIndex + 1 // 1-indexed
                    const isGoalRow = row === GOAL_ROW

                    return Array.from({ length: FIELD_COLS }, (_, colIndex) => {
                        const col = colIndex + 1 // 1-indexed
                        const card = getCardAtPosition(row, col)

                        return (
                            <Tile
                                key={`${row}-${col}`}
                                type={isGoalRow ? 'goal' : 'player'}
                                row={row}
                                col={col}
                                className="rounded-none border-0"
                            >
                                {card && (
                                    <Card
                                        suit={card.suit}
                                        state={card.state}
                                        size="normal"
                                        onClick={() => onCardClick?.(card.id)}
                                        layoutId={`${layoutIdPrefix}${card.id}`} // プレフィックス適用
                                    />
                                )}
                            </Tile>
                        )
                    })
                })}
            </div>
        </div>
    )
}
