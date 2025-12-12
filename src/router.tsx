import { createRootRoute, createRoute, createRouter, Outlet, useRouter } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import { GamePage, LibraryPage } from './pages'
import { motion } from 'motion/react'

// Root layout: Always renders GamePage as background
const rootRoute = createRootRoute({
    component: () => (
        <>
            <GamePage />
            {/* Outlet for modal routes */}
            <Outlet />
            <TanStackRouterDevtools />
        </>
    ),
})

// Index route: / (Empty because GamePage is in root)
const indexRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/',
    component: () => null,
})

// Library route: /library (Rendered as a slide-over modal)
const libraryRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: 'library',
    component: () => <LibraryModal />,
})

// Modal Wrapper Component
function LibraryModal() {
    const router = useRouter()

    const handleClose = () => {
        router.navigate({ to: '/' })
    }

    return (
        <div className="fixed inset-0 z-50 flex justify-end">
            {/* Backdrop */}
            <motion.div
                className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={handleClose}
            />

            {/* Slide-over Content */}
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

// Create route tree
const routeTree = rootRoute.addChildren([indexRoute, libraryRoute])

// Create router
export const router = createRouter({
    routeTree,
    defaultPreload: 'intent',
})

// Type safety registration
declare module '@tanstack/react-router' {
    interface Register {
        router: typeof router
    }
}
