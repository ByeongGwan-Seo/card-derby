import { useState } from 'react' // React hooks
import { Card, Tile, Button } from '../components/atoms' // Atomsコンポーネント

/**
 * コンポーネントライブラリページ
 * 各Atomic Designレベルのコンポーネントを確認するためのページ
 */
export const LibraryPage = () => {
    const [activeTab, setActiveTab] = useState<'atoms' | 'molecules' | 'organisms'>('atoms')

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

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            <div className="p-6 border-2 border-gray-200 rounded-xl bg-gray-50 hover:border-indigo-500 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                                <h3 className="text-xl font-semibold text-indigo-600 mb-2">PlayerField</h3>
                                <p className="text-gray-600 text-sm">プレイヤーフィールドコンポーネント - 実装予定</p>
                            </div>

                            <div className="p-6 border-2 border-gray-200 rounded-xl bg-gray-50 hover:border-indigo-500 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                                <h3 className="text-xl font-semibold text-indigo-600 mb-2">ActionField</h3>
                                <p className="text-gray-600 text-sm">アクションフィールドコンポーネント - 実装予定</p>
                            </div>

                            <div className="p-6 border-2 border-gray-200 rounded-xl bg-gray-50 hover:border-indigo-500 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                                <h3 className="text-xl font-semibold text-indigo-600 mb-2">GameResult</h3>
                                <p className="text-gray-600 text-sm">ゲーム結果コンポーネント - 実装予定</p>
                            </div>
                        </div>
                    </section>
                )}

                {activeTab === 'organisms' && (
                    <section>
                        <h2 className="text-3xl font-bold text-gray-800 mb-2">Organisms</h2>
                        <p className="text-gray-600 mb-8">大規模コンポーネント（GameBoard等）</p>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            <div className="p-6 border-2 border-gray-200 rounded-xl bg-gray-50 hover:border-indigo-500 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                                <h3 className="text-xl font-semibold text-indigo-600 mb-2">GameBoard</h3>
                                <p className="text-gray-600 text-sm">ゲームボードコンポーネント - 実装予定</p>
                            </div>
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
