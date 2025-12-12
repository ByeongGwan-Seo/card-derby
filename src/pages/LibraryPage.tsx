import { useState } from 'react' // React hooks
import { Card, Tile, Button } from '../components/atoms' // Atomsコンポーネント
import { PlayerField, ActionField, GameResult, ProceedingCardArea } from '../components/molecules' // Moleculesコンポーネント
import type { ActionCard } from '../types'
import { GameBoard } from '../components/organisms'
import { useGameLogic } from '../hooks/useGameLogic'

/**
 * コンポーネントライブラリページ
 * 各Atomic Designレベルのコンポーネントを確認するためのページ
 */

/**
 * ActionFieldデモ用ラッパーコンポーネント
 */
const ActionFieldDemo = () => {
    // 初回レンダリング時にランダムな紋様を割り当てる
    const [cards, setCards] = useState<ActionCard[]>(() => {
        const suits = ['hearts', 'diamonds', 'clubs', 'spades'] as const
        const shuffledSuits = [...suits].sort(() => Math.random() - 0.5)

        return [
            { id: 'a1', suit: shuffledSuits[0], row: 2, state: 'face-down', triggered: false },
            { id: 'a2', suit: shuffledSuits[1], row: 3, state: 'face-down', triggered: false },
            { id: 'a3', suit: shuffledSuits[2], row: 4, state: 'face-down', triggered: false },
            { id: 'a4', suit: shuffledSuits[3], row: 5, state: 'face-down', triggered: false },
        ]
    })

    const handleCardClick = (cardId: string) => {
        setCards(prev => prev.map(card =>
            card.id === cardId
                ? { ...card, state: card.state === 'face-up' ? 'face-down' : 'face-up' }
                : card
        ))
    }

    return (
        <ActionField
            actionCards={cards}
            onCardClick={handleCardClick}
        />
    )
}

/**
 * GameBoardデモコンポーネント
 */
const GameBoardDemo = () => {
    const { gameState, handleProceedingCardClick, handleActionCardClick } = useGameLogic()

    return (
        <GameBoard
            gameState={gameState}
            onProceedingCardClick={handleProceedingCardClick}
            onActionCardClick={(cardId) => {
                // cardId format: "action-{row}"
                const row = parseInt(cardId.split('-')[1])
                handleActionCardClick(row)
            }}
        />
    )
}

export const LibraryPage = () => {
    const [activeTab, setActiveTab] = useState<'atoms' | 'molecules' | 'organisms'>('atoms')
    const [procState, setProcState] = useState<'face-up' | 'face-down'>('face-down') // 進行カードデモ用状態
    const [procCardSuit, setProcCardSuit] = useState<'hearts' | 'diamonds' | 'clubs' | 'spades' | null>(null) // 進行カードデモ用紋様

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-8">
            {/* ヘッダー */}
            <header className="text-center text-white mb-8">
                <h1 className="text-5xl font-bold mb-2">Trump Card Derby</h1>
                <p className="text-xl opacity-90">Component Library</p>
                <p className="text-sm mt-1 opacity-75">各コンポーネントの確認とサイズバリエーションのテスト</p>
            </header>

            {/* タブナビゲーション */}
            <nav className="flex justify-center gap-4 mb-8">
                <button
                    className={`px-8 py-3 text-lg font-semibold border-2 border-white rounded-lg transition-all duration-300 ${activeTab === 'atoms'
                        ? 'bg-white text-indigo-600'
                        : 'bg-transparent text-white hover:bg-white/10 hover:-translate-y-1'
                        }`}
                    onClick={() => setActiveTab('atoms')}
                >
                    Atoms
                </button>
                <button
                    className={`px-8 py-3 text-lg font-semibold border-2 border-white rounded-lg transition-all duration-300 ${activeTab === 'molecules'
                        ? 'bg-white text-indigo-600'
                        : 'bg-transparent text-white hover:bg-white/10 hover:-translate-y-1'
                        }`}
                    onClick={() => setActiveTab('molecules')}
                >
                    Molecules
                </button>
                <button
                    className={`px-8 py-3 text-lg font-semibold border-2 border-white rounded-lg transition-all duration-300 ${activeTab === 'organisms'
                        ? 'bg-white text-indigo-600'
                        : 'bg-transparent text-white hover:bg-white/10 hover:-translate-y-1'
                        }`}
                    onClick={() => setActiveTab('organisms')}
                >
                    Organisms
                </button>
            </nav>

            {/* コンテンツエリア */}
            <main className="bg-white rounded-2xl p-8 min-h-[500px] shadow-2xl">
                {activeTab === 'atoms' && (
                    <section>
                        <h2 className="text-3xl font-bold text-gray-800 mb-2">Atoms</h2>
                        <p className="text-gray-600 mb-8">基本コンポーネント（Card, Tile, Button等）</p>

                        {/* Card コンポーネント */}
                        <div className="mb-12">
                            <h3 className="text-2xl font-semibold text-indigo-600 mb-4">Card</h3>
                            <div className="flex flex-wrap gap-8 items-end">
                                <div className="text-center">
                                    <p className="text-sm text-gray-600 mb-2">通常サイズ - 表面</p>
                                    <Card suit="hearts" state="face-up" size="normal" />
                                </div>
                                <div className="text-center">
                                    <p className="text-sm text-gray-600 mb-2">通常サイズ - 裏面</p>
                                    <Card suit="hearts" state="face-down" size="normal" />
                                </div>
                                <div className="text-center">
                                    <p className="text-sm text-gray-600 mb-2">1.2倍サイズ - 表面</p>
                                    <Card suit="diamonds" state="face-up" size="large" />
                                </div>
                                <div className="text-center">
                                    <p className="text-sm text-gray-600 mb-2">全紋様</p>
                                    <div className="flex gap-2">
                                        <Card suit="hearts" state="face-up" size="normal" />
                                        <Card suit="diamonds" state="face-up" size="normal" />
                                        <Card suit="clubs" state="face-up" size="normal" />
                                        <Card suit="spades" state="face-up" size="normal" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Tile コンポーネント */}
                        <div className="mb-12">
                            <h3 className="text-2xl font-semibold text-indigo-600 mb-4">Tile</h3>
                            <div className="flex flex-wrap gap-8">
                                <div className="text-center">
                                    <p className="text-sm text-gray-600 mb-2">プレイヤーフィールド</p>
                                    <Tile type="player" row={1} col={1} />
                                </div>
                                <div className="text-center">
                                    <p className="text-sm text-gray-600 mb-2">アクションフィールド</p>
                                    <Tile type="action" row={2} />
                                </div>
                                <div className="text-center">
                                    <p className="text-sm text-gray-600 mb-2">進行カードタイル</p>
                                    <Tile type="proceeding">
                                        <Card suit="hearts" state="face-down" size="large" cardType="proceeding" />
                                    </Tile>
                                </div>
                                <div className="text-center">
                                    <p className="text-sm text-gray-600 mb-2">カード配置例</p>
                                    <Tile type="player">
                                        <Card suit="hearts" state="face-up" size="normal" />
                                    </Tile>
                                </div>
                            </div>
                        </div>

                        {/* Button コンポーネント */}
                        <div className="mb-12">
                            <h3 className="text-2xl font-semibold text-indigo-600 mb-4">Button</h3>
                            <div className="space-y-6">
                                <div>
                                    <p className="text-sm text-gray-600 mb-2">バリエーション</p>
                                    <div className="flex flex-wrap gap-4">
                                        <Button variant="primary">Primary</Button>
                                        <Button variant="secondary">Secondary</Button>
                                        <Button variant="outline">Outline</Button>
                                        <Button variant="primary" disabled>Disabled</Button>
                                    </div>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600 mb-2">サイズ</p>
                                    <div className="flex flex-wrap gap-4 items-end">
                                        <Button size="small">Small</Button>
                                        <Button size="medium">Medium</Button>
                                        <Button size="large">Large</Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                )}

                {activeTab === 'molecules' && (
                    <section>
                        <h2 className="text-3xl font-bold text-gray-800 mb-2">Molecules</h2>
                        <p className="text-gray-600 mb-8">複合コンポーネント（PlayerField, ActionField等）</p>

                        {/* PlayerField コンポーネント */}
                        <div className="mb-12">
                            <h3 className="text-2xl font-semibold text-indigo-600 mb-4">PlayerField</h3>
                            <p className="text-sm text-gray-600 mb-4">4x6グリッド - サンプルカード配置</p>
                            <div className="flex justify-center">
                                <PlayerField
                                    playerCards={[
                                        { id: '1', suit: 'hearts', position: { x: 1, y: 6 }, state: 'face-up' },
                                        { id: '2', suit: 'diamonds', position: { x: 2, y: 6 }, state: 'face-up' },
                                        { id: '3', suit: 'clubs', position: { x: 3, y: 6 }, state: 'face-up' },
                                        { id: '4', suit: 'spades', position: { x: 4, y: 6 }, state: 'face-up' },
                                    ]}
                                />
                            </div>
                        </div>

                        {/* ActionField コンポーネント */}
                        <div className="mb-12">
                            <h3 className="text-2xl font-semibold text-indigo-600 mb-4">ActionField</h3>
                            <p className="text-sm text-gray-600 mb-4">1x6グリッド - 2-5行目にカード配置（クリックでFlip確認）</p>
                            <div className="flex justify-center">
                                <ActionFieldDemo />
                            </div>
                        </div>

                        {/* ProceedingCardArea コンポーネント */}
                        <div className="mb-12">
                            <h3 className="text-2xl font-semibold text-indigo-600 mb-4">ProceedingCardArea</h3>
                            <p className="text-sm text-gray-600 mb-4">進行カードエリア（クリックでアニメーション確認：Flip → Slide → 裏面に戻る）</p>
                            <p className="text-xs text-gray-500 mb-4">※クリックごとにランダムな紋様が表示されます</p>
                            <div className="flex justify-center">
                                <ProceedingCardArea
                                    card={{
                                        id: 'demo-proc',
                                        suit: procState === 'face-up' ? procCardSuit : null, // procStateがface-upの時のみ紋様を表示
                                        state: procState
                                    }}
                                    onClick={() => {
                                        if (procState === 'face-down') {
                                            // 本来はここでランダム紋様を決定してstateにセットする
                                            const suits: ('hearts' | 'diamonds' | 'clubs' | 'spades')[] = ['hearts', 'diamonds', 'clubs', 'spades']
                                            const randomSuit = suits[Math.floor(Math.random() * suits.length)]
                                            console.log('Next Random Suit:', randomSuit)
                                            setProcCardSuit(randomSuit) // ランダムな紋様をstateにセット
                                            setProcState('face-up')
                                        } else {
                                            // state='face-up'の状態でクリックされたら、スライドして消える処理が走る
                                            // 親側はアニメーション完了を待ってstateをリセットする
                                        }
                                    }}
                                    onAnimationComplete={() => {
                                        console.log('Animation Complete')
                                        setProcState('face-down')
                                        setProcCardSuit(null) // 裏面に戻ったら紋様をリセット
                                    }}
                                />
                            </div>
                        </div>

                        {/* GameResult コンポーネント */}
                        <div className="mb-12">
                            <h3 className="text-2xl font-semibold text-indigo-600 mb-4">GameResult</h3>
                            <p className="text-sm text-gray-600 mb-4">勝利画面モーダル</p>
                            <Button
                                variant="primary"
                                onClick={() => {
                                    const showResult = confirm('GameResultモーダルを表示しますか？\n（閉じるには再スタートボタンをクリック）')
                                    if (showResult) {
                                        // 一時的にモーダルを表示
                                        const modal = document.createElement('div')
                                        modal.id = 'temp-modal'
                                        document.body.appendChild(modal)

                                        import('react-dom/client').then(({ createRoot }) => {
                                            const root = createRoot(modal)
                                            root.render(
                                                <GameResult
                                                    winner="hearts"
                                                    onRestart={() => {
                                                        root.unmount()
                                                        modal.remove()
                                                    }}
                                                />
                                            )
                                        })
                                    }
                                }}
                            >
                                GameResultを表示
                            </Button>
                        </div>
                    </section>
                )}

                {activeTab === 'organisms' && (
                    <section>
                        <h2 className="text-3xl font-bold text-gray-800 mb-2">Organisms</h2>
                        <p className="text-gray-600 mb-8">大規模コンポーネント（GameBoard等）</p>

                        <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 bg-gray-50/50">
                            <h3 className="text-xl font-semibold text-indigo-600 mb-6 text-center">GameBoard Preview</h3>
                            {/* GameBoardデモ */}
                            <GameBoardDemo />
                        </div>
                    </section>
                )}
            </main>

            {/* フッター */}
            <footer className="mt-8 text-center">
                <button
                    className="px-8 py-4 text-lg font-semibold bg-white text-indigo-600 rounded-lg opacity-50 cursor-not-allowed"
                    disabled
                >
                    ゲームページへ（後で実装）
                </button>
            </footer>
        </div>
    )
}
