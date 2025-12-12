import { TILE_SIZE } from '../../utils' // 定数

/**
 * タイルコンポーネントのプロパティ
 */
interface TileProps {
    type: 'player' | 'action' // タイルの種類
    row?: number // 行番号（表示用、オプション）
    col?: number // 列番号（表示用、オプション）
    className?: string // 追加のCSSクラス
    children?: React.ReactNode // 子要素（カードなど）
}

/**
 * タイルコンポーネント
 * フィールドの1マスを表現するコンポーネント
 */
export const Tile = ({
    type,
    row,
    col,
    className = '',
    children
}: TileProps) => {
    // タイプに応じた背景色
    const bgColor = type === 'player'
        ? 'bg-field-green-400' // プレイヤーフィールド：緑系
        : 'bg-field-purple-400' // アクションフィールド：紫系

    return (
        <div
            className={`
        relative rounded-lg border-2 border-opacity-30
        ${bgColor}
        ${type === 'player' ? 'border-field-green-600' : 'border-field-purple-600'}
        flex items-center justify-center
        transition-all duration-200
        ${className}
      `}
            style={{ width: `${TILE_SIZE.width}px`, height: `${TILE_SIZE.height}px` }}
        >
            {/* デバッグ用の行列番号（オプション） */}
            {(row !== undefined || col !== undefined) && (
                <div className="absolute top-1 left-1 text-xs text-white/50 font-mono">
                    {row !== undefined && `R${row}`}
                    {col !== undefined && ` C${col}`}
                </div>
            )}

            {/* 子要素（カードなど） */}
            {children}
        </div>
    )
}
