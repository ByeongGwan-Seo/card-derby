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
                    <div className="fixed top-16 right-4 z-50 bg-white rounded-lg shadow-xl p-6 min-w-[300px] max-w-[90vw] max-h-[80vh] overflow-y-auto">
                        <h2 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">ゲームルール</h2>

                        <div className="space-y-4 text-sm text-gray-700 mb-6">
                            <section>
                                <h3 className="font-bold text-gray-900 mb-1">🏃 移動ルール</h3>
                                <ul className="list-disc pl-5 space-y-1">
                                    <li>デッキからカードを1枚引きます。</li>
                                    <li><strong>同じマーク:</strong> そのプレイヤーが1歩進みます。</li>
                                    <li><strong>違うマーク:</strong> そのマーク以外の全員が1歩進みます。</li>
                                </ul>
                            </section>

                            <section>
                                <h3 className="font-bold text-gray-900 mb-1">⚡ アクションカード</h3>
                                <ul className="list-disc pl-5 space-y-1">
                                    <li>2〜9行目に配置されています。</li>
                                    <li>全員がその行を通過するとめくられます。</li>
                                    <li><strong>同じマーク:</strong> そのプレイヤーは1歩戻ります。</li>
                                </ul>
                            </section>

                            <section>
                                <h3 className="font-bold text-gray-900 mb-1">🏁 勝利条件</h3>
                                <p>最初に1行目（ゴール）に到達した人が勝ちです！</p>
                            </section>
                        </div>

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
