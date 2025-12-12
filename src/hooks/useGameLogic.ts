import { useState, useCallback, useEffect } from 'react' // React hooks
import type { Suit, PlayerCard, ActionCard, ProceedingCard, GameState, ActionHistory } from '../types' // 型定義
import { SUITS, START_ROW, GOAL_ROW, ACTION_CARD_ROWS } from '../utils' // 定数

/**
 * ゲーム初期状態を生成
 */
const createInitialGameState = (): GameState => {
    // プレイヤーカードの初期化（4枚、全てスタート地点）
    const playerCards: PlayerCard[] = SUITS.map((suit, index) => ({
        id: `player-${suit}`,
        suit,
        position: { x: index + 1, y: START_ROW },
        state: 'face-up' as const,
    }))

    // アクションカードの初期化（2-5行目に各1枚、紋様はランダム）
    // 紋様リストをシャッフル
    const shuffledSuits = [...SUITS].sort(() => Math.random() - 0.5)

    const actionCards: ActionCard[] = ACTION_CARD_ROWS.map((row, index) => ({
        id: `action-${row}`,
        suit: shuffledSuits[index],
        row,
        state: 'face-down' as const,
        triggered: false,
    }))

    // 進行カードの初期化
    const proceedingCard: ProceedingCard = {
        id: 'proceeding',
        suit: null,
        state: 'face-down',
    }

    // アクション履歴の初期化
    const actionHistory: ActionHistory = {
        row2: false,
        row3: false,
        row4: false,
        row5: false,
    }

    return {
        playerCards,
        actionCards,
        proceedingCard,
        actionHistory,
        winner: null,
        isGameOver: false,
    }
}

/**
 * ゲームロジックを管理するカスタムフック
 */
export const useGameLogic = () => {
    const [gameState, setGameState] = useState<GameState>(createInitialGameState)

    /**
     * ランダムな紋様を返す
     */
    const drawProceedingCard = useCallback((): Suit => {
        const randomIndex = Math.floor(Math.random() * SUITS.length)
        return SUITS[randomIndex]
    }, [])

    /**
     * 進行カードをクリックした時の処理
     * - カードをめくる
     * - プレイヤーを移動させる
     */
    const handleProceedingCardClick = useCallback(() => {
        if (gameState.isGameOver) return

        setGameState(prev => {
            // 1. 進行カードをランダムに決定
            const suit = drawProceedingCard()

            // 2. 該当カードを前進させる新しいPlayerCardsを作成
            const newPlayerCards = prev.playerCards.map(card =>
                card.suit === suit
                    ? { ...card, position: { ...card.position, y: card.position.y - 1 } }
                    : card
            )

            // 3. 状態更新（進行カードもFace-upのまま維持）
            return {
                ...prev,
                proceedingCard: { ...prev.proceedingCard, suit, state: 'face-up' },
                playerCards: newPlayerCards,
            }
        })
    }, [gameState.isGameOver, drawProceedingCard])

    /**
     * アクションカードクリック時の処理 (手動発動)
     */
    const handleActionCardClick = useCallback((rowNum: number) => {
        if (gameState.isGameOver) return

        // 既に発動済みなら何もしない
        const key = `row${rowNum}` as keyof ActionHistory
        if (gameState.actionHistory[key]) return

        // 全員がその行以上に到達しているかチェック
        const allReached = gameState.playerCards.every(card => card.position.y <= rowNum)
        if (!allReached) {
            console.log("Not all players reached yet.")
            return // 条件未達ならめくれない
        }

        // --- アクション発動処理 ---
        const actionCard = gameState.actionCards.find(c => c.row === rowNum)
        if (!actionCard) return

        const penaltySuit = actionCard.suit

        setGameState(prev => {
            // 状態更新: 履歴ON, カードOpen, ペナルティ適用
            const newActionCards = prev.actionCards.map(c =>
                c.row === rowNum ? { ...c, state: 'face-up' as const, triggered: true } : c
            )

            const newPlayerCards = prev.playerCards.map(c =>
                c.suit === penaltySuit
                    ? { ...c, position: { ...c.position, y: Math.min(c.position.y + 1, START_ROW) } }
                    : c
            )

            return {
                ...prev,
                actionHistory: { ...prev.actionHistory, [key]: true },
                actionCards: newActionCards,
                playerCards: newPlayerCards,
            }
        })

    }, [gameState.isGameOver, gameState.actionHistory, gameState.playerCards, gameState.actionCards])

    /**
     * ゲームルールの監視 (useEffect)
     * - ここでは勝利判定のみ行う (アクションは手動)
     */
    useEffect(() => {
        if (gameState.isGameOver) return

        // 勝利判定
        // ゴール(GOAL_ROW = 1)に到達したプレイヤーがいるか
        // Action: 誰かがゴールしたら即終了？それともターン終了時？
        // 通常は即終了
        const winner = gameState.playerCards.find(card => card.position.y <= GOAL_ROW)
        if (winner) {
            setGameState(prev => ({
                ...prev,
                winner: winner.suit,
                isGameOver: true
            }))
        }
    }, [gameState.playerCards, gameState.isGameOver])

    /**
     * ゲームのリसेट
     */
    const resetGame = useCallback(() => {
        setGameState(createInitialGameState())
    }, [])

    return {
        gameState,
        handleProceedingCardClick,
        handleActionCardClick, // 外部に公開
        resetGame,
    }
}
