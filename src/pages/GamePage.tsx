import { useState } from 'react'
import { Link } from '@tanstack/react-router'
import { GameBoard } from '../components/organisms'
import { GameResult } from '../components/molecules'
import { useGameLogic } from '../hooks/useGameLogic'
import { Button } from '../components/atoms'

export const GamePage = () => {
    const { gameState, handleProceedingCardClick, handleActionCardClick, resetGame } = useGameLogic()
    const [menuOpen, setMenuOpen] = useState(false)

    return (
        <div className="h-screen w-screen bg-stone-100 flex flex-col relative overflow-hidden">
            {/* ハンバーガーメニューボタン */}
            <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="fixed top-4 right-4 z-50 p-2 bg-white/80 backdrop-blur-sm rounded-lg shadow-md hover:bg-white transition-colors"
                aria-label="Menu"
            >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
            </button>

            {/* メニューパネル */}
            {menuOpen && (
                <>
                    {/* バックドロップ */}
                    <div
                        className="fixed inset-0 bg-black/20 z-40"
                        onClick={() => setMenuOpen(false)}
                    />

                    {/* メニューコンテンツ */}
                    <div className="fixed top-16 right-4 z-50 bg-white rounded-lg shadow-xl p-6 min-w-[200px]">
                        <h2 className="text-lg font-bold text-gray-800 mb-4">Trump Card Derby</h2>
                        <Link to="/library" onClick={() => setMenuOpen(false)}>
                            <Button variant="outline" size="small" className="w-full">
                                Library
                            </Button>
                        </Link>
                    </div>
                </>
            )}

            {/* メインゲームエリア */}
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

            {/* ゲーム結果モーダル */}
            {gameState.winner && (
                <GameResult
                    winner={gameState.winner}
                    onRestart={resetGame}
                />
            )}
        </div>
    )
}
