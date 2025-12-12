import type { Suit } from '../../types' // 型定義
import { Button } from '../atoms' // Atomsコンポーネント
import { SUIT_SYMBOLS, SUIT_COLORS, SUIT_NAMES } from '../../utils' // 定数

/**
 * GameResultコンポーネントのプロパティ
 */
interface GameResultProps {
    winner: Suit // 勝利した紋様
    onRestart: () => void // 再スタートハンドラー
    className?: string // 追加のCSSクラス
}

/**
 * GameResultコンポーネント
 * ゲーム終了時に勝利した紋様を表示し、再スタートボタンを提供
 */
export const GameResult = ({
    winner,
    onRestart,
    className = ''
}: GameResultProps) => {
    return (
        <div className={`
      fixed inset-0 bg-black/50 backdrop-blur-sm
      flex items-center justify-center z-50
      ${className}
    `}>
            <div className="bg-white rounded-2xl p-12 shadow-2xl text-center max-w-md">
                {/* 勝利メッセージ */}
                <h2 className="text-4xl font-bold text-gray-800 mb-6">
                    🎉 勝利！ 🎉
                </h2>

                {/* 勝利した紋様 */}
                <div className="mb-8">
                    <p className="text-lg text-gray-600 mb-4">勝者</p>
                    <div className={`text-9xl ${SUIT_COLORS[winner]}`}>
                        {SUIT_SYMBOLS[winner]}
                    </div>
                    <p className="text-2xl font-semibold text-gray-700 mt-4">
                        {SUIT_NAMES[winner]}
                    </p>
                </div>

                {/* 再スタートボタン */}
                <Button
                    variant="primary"
                    size="large"
                    onClick={onRestart}
                >
                    もう一度プレイ
                </Button>
            </div>
        </div>
    )
}
