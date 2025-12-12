import { Outlet, useMatches, useRouter } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import { GamePage, LibraryPage } from '../../pages'
import { motion, AnimatePresence } from 'motion/react'

// ルートレイアウト: 常にGamePageを背景としてレンダリング
export function RootLayout() {
    const matches = useMatches()
    // 最後のマッチがアクティブなリーフルート
    const match = matches[matches.length - 1]

    return (
        <>
            <GamePage />
            {/* モーダルルート用アウトレット */}
            <AnimatePresence mode="wait">
                <Outlet key={match.id} />
            </AnimatePresence>
            <TanStackRouterDevtools />
        </>
    )
}

// モーダルラッパーコンポーネント
export function LibraryModal() {
    const router = useRouter()

    const handleClose = () => {
        router.navigate({ to: '/' })
    }

    return (
        <div className="fixed inset-0 z-50 flex justify-end">
            {/* バックドロップ */}
            <motion.div
                className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={handleClose}
            />

            {/* スライドオーバーコンテンツ */}
            <motion.div
                className="relative w-full max-w-2xl h-full bg-white shadow-2xl overflow-y-auto"
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            >
                <div className="relative min-h-full">
                    <button
                        onClick={handleClose}
                        className="absolute top-4 right-4 z-50 p-2 bg-white/50 hover:bg-white rounded-full transition-colors"
                        title="Close Library"
                    >
                        ✕
                    </button>
                    <LibraryPage />
                </div>
            </motion.div>
        </div>
    )
}
