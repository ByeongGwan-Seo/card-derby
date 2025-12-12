import { useState, useCallback } from 'react' // React hooks
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
     * 指定された紋様のプレイヤーカードをY軸+1（前進）
     */
    const moveCard = useCallback((suit: Suit) => {
        setGameState(prev => ({
            ...prev,
            playerCards: prev.playerCards.map(card =>
                card.suit === suit
                    ? { ...card, position: { ...card.position, y: card.position.y - 1 } } // Y軸は上が小さい値
                    : card
            ),
        }))
    }, [])

    /**
     * 全カードが指定行以上に到達したかを確認
     */
    const checkAllReached = useCallback((rowNum: number): boolean => {
        return gameState.playerCards.every(card => card.position.y <= rowNum)
    }, [gameState.playerCards])

    /**
     * 指定行のアクションが既に発動したかを確認
     */
    const isActionTriggered = useCallback((rowNum: number): boolean => {
        const key = `row${rowNum}` as keyof ActionHistory
        return gameState.actionHistory[key]
    }, [gameState.actionHistory])

    /**
     * アクション発動処理（履歴更新とペナルティ対象決定）
     */
    const triggerAction = useCallback((rowNum: number): Suit => {
        const actionCard = gameState.actionCards.find(card => card.row === rowNum)
        const penaltySuit = actionCard?.suit ?? drawProceedingCard()

        setGameState(prev => {
            const key = `row${rowNum}` as keyof ActionHistory
            return {
                ...prev,
                actionHistory: { ...prev.actionHistory, [key]: true },
                actionCards: prev.actionCards.map(card =>
                    card.row === rowNum
                        ? { ...card, state: 'face-up' as const, triggered: true }
                        : card
                ),
            }
        })

        return penaltySuit
    }, [gameState.actionCards, drawProceedingCard])

    /**
     * ペナルティ適用（Y軸+1、後退）
     */
    const applyPenalty = useCallback((suit: Suit) => {
        setGameState(prev => ({
            ...prev,
            playerCards: prev.playerCards.map(card =>
                card.suit === suit
                    ? { ...card, position: { ...card.position, y: Math.min(card.position.y + 1, START_ROW) } }
                    : card
            ),
        }))
    }, [])

    /**
     * 勝利判定（ゴール到達確認）
     */
    const checkForWinner = useCallback((): Suit | null => {
        const winner = gameState.playerCards.find(card => card.position.y <= GOAL_ROW)
        return winner?.suit ?? null
    }, [gameState.playerCards])

    /**
     * 進行カードをクリックした時の処理
     */
    const handleProceedingCardClick = useCallback(() => {
        if (gameState.isGameOver) return

        // 1. 進行カードをランダムに決定
        const suit = drawProceedingCard()

        // 2. 進行カードの状態更新
        setGameState(prev => ({
            ...prev,
            proceedingCard: { ...prev.proceedingCard, suit, state: 'face-up' },
        }))

        // 3. 該当カードを前進
        moveCard(suit)

        // 少し遅延後に進行カードを裏返ししてアクション処理
        setTimeout(() => {
            // 進行カードを裏に戻す
            setGameState(prev => ({
                ...prev,
                proceedingCard: { ...prev.proceedingCard, suit: null, state: 'face-down' },
            }))

            // 4. アクションカード発動チェック
            for (const rowNum of ACTION_CARD_ROWS) {
                if (!isActionTriggered(rowNum) && checkAllReached(rowNum)) {
                    const penaltySuit = triggerAction(rowNum)
                    applyPenalty(penaltySuit)
                    break // 1回の進行で1つのアクションのみ発動
                }
            }

            // 5. 勝利判定
            const winner = checkForWinner()
            if (winner) {
                setGameState(prev => ({
                    ...prev,
                    winner,
                    isGameOver: true,
                }))
            }
        }, 1000) // 1秒後に処理
    }, [
        gameState.isGameOver,
        drawProceedingCard,
        moveCard,
        isActionTriggered,
        checkAllReached,
        triggerAction,
        applyPenalty,
        checkForWinner,
    ])

    /**
     * ゲームのリセット
     */
    const resetGame = useCallback(() => {
        setGameState(createInitialGameState())
    }, [])

    return {
        gameState,
        handleProceedingCardClick,
        resetGame,
    }
}
