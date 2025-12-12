import { useState, useCallback, useEffect } from 'react'
import type { Suit, PlayerCard, ActionCard, ProceedingCard, GameState, ActionHistory } from '../types'
import { SUITS, START_ROW, GOAL_ROW, ACTION_CARD_ROWS } from '../utils'

/**
 * ゲーム初期状態を生成
 */
const createInitialGameState = (): GameState => {
    // プレイヤーカード
    const playerCards: PlayerCard[] = SUITS.map((suit, index) => ({
        id: `player-${suit}`,
        suit,
        position: { x: index + 1, y: START_ROW },
        state: 'face-up' as const,
    }))

    // アクションカード（シャッフル）
    const shuffledSuits = [...SUITS].sort(() => Math.random() - 0.5)
    // 初期状態では clickable: false (まだ誰も到達していない)
    const actionCards: ActionCard[] = ACTION_CARD_ROWS.map((row, index) => ({
        id: `action-${row}`,
        suit: shuffledSuits[index],
        row,
        state: 'face-down' as const,
        triggered: false,
        clickable: false,
    }))

    // 進行カード
    const proceedingCard: ProceedingCard = {
        id: 'proceeding',
        suit: null,
        state: 'face-down',
    }

    // アクション履歴
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
 * ゲームロジックフック
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
     */
    const handleProceedingCardClick = useCallback(() => {
        if (gameState.isGameOver) return

        setGameState(prev => {
            const suit = drawProceedingCard()

            // 1. プレイヤー移動（新しい位置計算）
            const newPlayerCards = prev.playerCards.map(card =>
                card.suit === suit
                    ? { ...card, position: { ...card.position, y: card.position.y - 1 } }
                    : card
            )

            // 2. ActionCardのClickable状態を即時更新
            const updatedActionCards = prev.actionCards.map(card => {
                // 既にめくられているカードはクリック不可
                if (card.state === 'face-up') return { ...card, clickable: false }

                // 全プレイヤーがこの行より上(y値が小さいor同じ)にいるか
                const allReached = newPlayerCards.every(p => p.position.y <= card.row)
                return { ...card, clickable: allReached }
            })

            return {
                ...prev,
                proceedingCard: {
                    ...prev.proceedingCard,
                    suit,
                    state: 'face-up',
                    // Force animation re-render by updating ID even if suit is same
                    id: `proceeding-${Date.now()}`
                },
                playerCards: newPlayerCards,
                actionCards: updatedActionCards
            }
        })
    }, [gameState.isGameOver, drawProceedingCard])

    /**
     * アクションカードクリック時の処理 (手動発動)
     */
    const handleActionCardClick = useCallback((rowNum: number) => {
        if (gameState.isGameOver) return

        // 既に発動済みなら無視
        const key = `row${rowNum}` as keyof ActionHistory
        if (gameState.actionHistory[key]) return

        // 条件再チェック (念のため)
        const allReached = gameState.playerCards.every(card => card.position.y <= rowNum)
        if (!allReached) return

        // 発動処理
        setGameState(prev => {
            const actionCard = prev.actionCards.find(c => c.row === rowNum)
            if (!actionCard) return prev

            const penaltySuit = actionCard.suit

            // 1. ActionCard更新 (Open, Triggered, Not Clickable)
            const newActionCards = prev.actionCards.map(c =>
                c.row === rowNum ? { ...c, state: 'face-up' as const, triggered: true, clickable: false } : c
            )

            // 2. ペナルティ適用 (プレイヤー移動)
            const newPlayerCards = prev.playerCards.map(c =>
                c.suit === penaltySuit
                    ? { ...c, position: { ...c.position, y: Math.min(c.position.y + 1, START_ROW) } }
                    : c
            )

            // 3. ペナルティで後退した結果、他の未発動アクションの条件が崩れる可能性があるため、
            //    全ActionCardのClickableを再評価する
            const reevaluatedActionCards = newActionCards.map(c => {
                if (c.state === 'face-up') return { ...c, clickable: false } // 既に開いたものは不可

                const reached = newPlayerCards.every(p => p.position.y <= c.row)
                return { ...c, clickable: reached }
            })

            return {
                ...prev,
                actionHistory: { ...prev.actionHistory, [key]: true },
                actionCards: reevaluatedActionCards,
                playerCards: newPlayerCards,
            }
        })

    }, [gameState.isGameOver, gameState.actionHistory, gameState.playerCards])

    /**
     * ゲーム監視 (useEffect)
     * - 勝利判定のみ行う
     */
    useEffect(() => {
        if (gameState.isGameOver) return

        const winner = gameState.playerCards.find(card => card.position.y <= GOAL_ROW)

        if (winner) {
            setGameState(prev => ({
                ...prev,
                winner: winner.suit,
                isGameOver: true,
                // ゲーム終了時は全アクションクリック不可にするなどの処理を入れても良い
                actionCards: prev.actionCards.map(c => ({ ...c, clickable: false }))
            }))
        }

    }, [gameState.playerCards, gameState.isGameOver])

    const resetGame = useCallback(() => {
        setGameState(createInitialGameState())
    }, [])

    return {
        gameState,
        handleProceedingCardClick,
        handleActionCardClick,
        resetGame,
    }
}
