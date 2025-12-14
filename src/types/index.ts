/**
 * トランプの紋様（スート）
 */
export type Suit = 'hearts' | 'diamonds' | 'clubs' | 'spades'

/**
 * カードの表裏状態
 */
export type CardState = 'face-up' | 'face-down'

/**
 * カードのサイズバリエーション
 */
export type CardSize = 'normal' | 'large' // normal: 通常サイズ, large: 1.2倍サイズ

/**
 * 位置情報
 */
export interface Position {
    x: number // X座標（列）
    y: number // Y座標（行）
}

/**
 * プレイヤーカード
 */
export interface PlayerCard {
    id: string // カードの一意識別子
    suit: Suit // 紋様
    position: Position // フィールド上の位置
    state: CardState // 表裏状態
}

/**
 * アクションカード
 */
export interface ActionCard {
    id: string // カードの一意識別子
    suit: Suit // 紋様
    row: number // 配置されている行（2-5）
    state: CardState // 表裏状態
    triggered: boolean // 発動済みか
    clickable?: boolean // クリック可能か（発動条件を満たしているか）- UI表示用
}

/**
 * 進行カード
 */
export interface ProceedingCard {
    id: string // カードの一意識別子
    suit: Suit | null // 現在の紋様（裏返す前はnull）
    state: CardState // 表裏状態
}

/**
 * アクション履歴
 * 各行のアクションカードが発動したかどうかを記録
 */
export interface ActionHistory {
    row2: boolean // 2行目のアクションカード発動済み
    row3: boolean // 3行目のアクションカード発動済み
    row4: boolean // 4行目のアクションカード発動済み
    row5: boolean // 5行目のアクションカード発動済み
    row6: boolean // 6行目のアクションカード発動済み
    row7: boolean // 7行目のアクションカード発動済み
    row8: boolean // 8行目のアクションカード発動済み
}

/**
 * ゲーム状態
 */
export interface GameState {
    playerCards: PlayerCard[] // プレイヤーカード4枚
    actionCards: ActionCard[] // アクションカード4枚（2-5行目）
    proceedingCard: ProceedingCard // 進行カード
    actionHistory: ActionHistory // アクション履歴
    winner: Suit | null // 勝利した紋様（ゲーム終了時）
    isGameOver: boolean // ゲーム終了フラグ
}
