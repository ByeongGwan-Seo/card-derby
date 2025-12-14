import type { GameState } from '../../types'
import { TILE_SIZE } from '../../utils'
import { PlayerField, ActionField, ProceedingCardArea } from '../molecules'

interface GameBoardProps {
    gameState: GameState
    onProceedingCardClick: () => void
    onActionCardClick?: (cardId: string) => void // 追加
    onRestart?: () => void
    layoutIdPrefix?: string
}

/**
 * GameBoard Organism
 * ゲームのメイン盤面を構成するコンポーネント
 * PlayerFieldとActionFieldを横並びに配置し、高さを完全に一致させる
 */
export const GameBoard = ({
    gameState,
    onProceedingCardClick,
    onActionCardClick, // 受け取る
    onRestart: _, // 未使用のため無効化
    layoutIdPrefix = ''
}: GameBoardProps) => {
    return (
        <div className="w-full h-screen max-h-screen overflow-hidden flex flex-col items-center justify-center bg-gray-100 p-4">
            {/* ゲームボードコンテナ - items-startで上端(R1)を揃える */}
            <div className="flex flex-row gap-4 items-start">

                {/* メインエリア：プレイヤーフィールド */}
                <div className="flex-none">
                    <PlayerField
                        playerCards={gameState.playerCards}
                        className="shadow-xl"
                        layoutIdPrefix={layoutIdPrefix}
                    />
                </div>

                {/* サイドエリア：アクションフィールド */}
                <div className="flex-none">
                    <ActionField
                        actionCards={gameState.actionCards}
                        onCardClick={onActionCardClick} // ActionFieldに渡す
                        className="shadow-xl"
                        layoutIdPrefix={layoutIdPrefix}
                    >
                        {/* R6の位置に進行カードエリア(デッキ)を配置 */}
                        {/* Tileサイズと完全に一致させる */}
                        <div style={{ width: `${TILE_SIZE.width}px`, height: `${TILE_SIZE.height}px` }}>
                            <ProceedingCardArea
                                card={gameState.proceedingCard}
                                onClick={onProceedingCardClick}
                                onAnimationComplete={() => { }}
                            />
                        </div>
                    </ActionField>
                </div>
            </div>
        </div>
    )
}
