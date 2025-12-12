import { Link } from '@tanstack/react-router'
import { GameBoard } from '../components/organisms'
import { useGameLogic } from '../hooks/useGameLogic'
import { Button } from '../components/atoms'

export const GamePage = () => {
    const { gameState, handleProceedingCardClick, handleActionCardClick } = useGameLogic()

    return (
        <div className="h-screen w-screen bg-stone-100 flex flex-col relative overflow-hidden">
            {/* ヘッダー / ナビゲーション */}
            <header className="p-4 flex justify-between items-center z-10 sticky top-0 bg-white/80 backdrop-blur-sm shadow-sm shrink-0">
                <h1 className="text-2xl font-bold text-gray-800">Trump Card Derby</h1>
                <Link to="/library">
                    <Button variant="outline" size="small">
                        Library
                    </Button>
                </Link>
            </header>

            {/* メインゲームエリア - padding削除, overflow-hiddenでスクロール防止 */}
            <main className="flex-1 flex items-center justify-center overflow-hidden bg-stone-100">
                <div className="transform scale-[0.8] md:scale-[0.9] lg:scale-100 origin-center transition-transform">
                    <GameBoard
                        gameState={gameState}
                        onProceedingCardClick={handleProceedingCardClick}
                        onActionCardClick={(cardId) => {
                            // cardIdのフォーマット: "action-{row}"
                            const row = parseInt(cardId.split('-')[1])
                            handleActionCardClick(row)
                        }}
                    />
                </div>
            </main>
        </div>
    )
}
