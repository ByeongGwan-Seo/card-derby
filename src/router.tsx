import { createRootRoute, createRoute, createRouter } from '@tanstack/react-router'
import { RootLayout, LibraryModal } from './components/templates/RouterLayouts'

// ルートレイアウト
const rootRoute = createRootRoute({
    component: RootLayout,
})

// インデックスルート: / (GamePageがルートで表示されるためnull)
const indexRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/',
    component: () => null,
})

// ライブラリルート: /library (スライドオーバーモーダルとして表示)
const libraryRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: 'library',
    component: LibraryModal,
})

// ルートツリーの作成
const routeTree = rootRoute.addChildren([indexRoute, libraryRoute])

// ルーターの作成
export const router = createRouter({
    routeTree,
    defaultPreload: 'intent',
    basepath: '/card-derby', // GitHub Pagesのベースパス
})

// Type safety registration
declare module '@tanstack/react-router' {
    interface Register {
        router: typeof router
    }
}


