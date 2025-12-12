import { Link } from '@tanstack/react-router'
import { GameBoard } from '../components/organisms'
import { useGameLogic } from '../hooks/useGameLogic'
import { Button } from '../components/atoms'

export const GamePage = () => {
    const { gameState, handleProceedingCardClick, handleActionCardClick } = useGameLogic()

    return (
        <div className="min-h-screen bg-stone-100 flex flex-col relative overflow-hidden">
            {/* Header / Navigation */}
            <header className="p-4 flex justify-between items-center z-10 sticky top-0 bg-white/80 backdrop-blur-sm shadow-sm">
                <h1 className="text-2xl font-bold text-gray-800">Trump Card Derby</h1>
                <Link to="/library">
                    <Button variant="outline" size="small">
                        Library
                    </Button>
                </Link>
            </header>

            {/* Main Game Area */}
            <main className="flex-1 flex items-center justify-center p-8 overflow-auto">
                <GameBoard
                    gameState={gameState}
                    onProceedingCardClick={handleProceedingCardClick}
                    onActionCardClick={(cardId) => {
                        // cardId format: "action-{row}"
                        const row = parseInt(cardId.split('-')[1])
                        handleActionCardClick(row)
                    }}
                />
            </main>
        </div>
    )
}
