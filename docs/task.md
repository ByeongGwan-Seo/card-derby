# タスク状況

- [x] **Phase 1: 基盤構築**
  - [x] トランプ紋様・ゲーム状態型定義作成 (`types/index.ts`)
  - [x] ゲーム定数・サイズ定義作成 (`utils/constants.ts`)

- [x] **Phase 2: Atomic Design - Atoms**
  - [x] Cardコンポーネント作成 (`components/atoms/Card.tsx`)
  - [x] Tileコンポーネント作成 (`components/atoms/Tile.tsx`)
  - [x] Buttonコンポーネント作成 (`components/atoms/Button.tsx`)

- [x] **Phase 3: Atomic Design - Molecules**
  - [x] PlayerFieldコンポーネント作成 (`components/molecules/PlayerField.tsx`)
  - [x] ActionFieldコンポーネント作成 (`components/molecules/ActionField.tsx`)
  - [x] GameResultコンポーネント作成 (`components/molecules/GameResult.tsx`)

- [x] **Phase 4: Custom Hooks**
  - [x] ゲームロジック実装 (`hooks/useGameLogic.ts`)

- [x] **Phase 5: Atomic Design - Organisms**
  - [x] GameBoardコンポーネント作成 (`components/organisms/GameBoard.tsx`)

- [x] **Phase 6: カードアニメーション**
  - [x] ProceedingCardAreaコンポーネント作成 (`components/molecules/ProceedingCardArea.tsx`)
  - [x] Cardアニメーション実装
  - [x] PlayerCard移動アニメーション補完 (`layoutId`) & Z-index修正

- [ ] **Phase 7: Pages & Library**
  - [x] LibraryPage作成 (`pages/LibraryPage.tsx`)
  - [ ] **[NEW]** TanStack Router導入 (`@tanstack/react-router`)
  - [ ] **[NEW]** ルート定義 (URL-Driven Modal / Slide-over)
  - [ ] GamePage作成 (`pages/GamePage.tsx`)
  - [ ] App.tsx更新 (RouterProvider)

- [ ] **Phase 8: 検証**
  - [ ] 自動テスト/動作確認
  - [ ] 手動検証
