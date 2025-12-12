/**
 * ボタンコンポーネントのプロパティ
 */
interface ButtonProps {
    variant?: 'primary' | 'secondary' | 'outline' // ボタンのバリエーション
    size?: 'small' | 'medium' | 'large' // サイズ
    disabled?: boolean // 無効化
    onClick?: () => void // クリックハンドラー
    className?: string // 追加のCSSクラス
    children: React.ReactNode // ボタンのテキストや内容
}

/**
 * ボタンコンポーネント
 * ページ切り替えや再スタートなどに使用
 */
export const Button = ({
    variant = 'primary',
    size = 'medium',
    disabled = false,
    onClick,
    className = '',
    children
}: ButtonProps) => {
    // バリエーションに応じたスタイル
    const variantStyles = {
        primary: 'bg-indigo-600 text-white hover:bg-indigo-700 border-transparent',
        secondary: 'bg-purple-600 text-white hover:bg-purple-700 border-transparent',
        outline: 'bg-transparent text-indigo-600 border-indigo-600 hover:bg-indigo-50',
    }

    // サイズに応じたスタイル
    const sizeStyles = {
        small: 'px-4 py-2 text-sm',
        medium: 'px-6 py-3 text-base',
        large: 'px-8 py-4 text-lg',
    }

    return (
        <button
            className={`
        font-semibold rounded-lg border-2
        transition-all duration-300
        ${variantStyles[variant]}
        ${sizeStyles[size]}
        ${disabled
                    ? 'opacity-50 cursor-not-allowed'
                    : 'hover:-translate-y-1 hover:shadow-lg active:translate-y-0'
                }
        ${className}
      `}
            onClick={onClick}
            disabled={disabled}
        >
            {children}
        </button>
    )
}
