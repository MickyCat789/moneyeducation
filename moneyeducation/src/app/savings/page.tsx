'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { PiggyBank, Coins, Target, ArrowLeft, Clock, RefreshCw, Crown } from 'lucide-react'
import confetti from 'canvas-confetti'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { ScrollArea } from "@/components/ui/scroll-area"
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

interface SavingsHistory {
  id: string;
  date: string;
  amount: number;
  type: 'deposit' | 'withdrawal' | 'reset';
}

interface Title {
  level: number;
  name: string;
  requiredCoins: number;
}

const titles: Title[] = [
  { level: 1, name: 'お金の見習い', requiredCoins: 0 },
  { level: 2, name: 'コイン収集家', requiredCoins: 1000 },
  { level: 3, name: '貯金の達人', requiredCoins: 2000 },
  { level: 4, name: '節約王', requiredCoins: 3000 },
  { level: 5, name: '投資の賢者', requiredCoins: 4000 },
  { level: 6, name: '金融マスター', requiredCoins: 5000 },
  { level: 7, name: 'お金の魔術師', requiredCoins: 6000 },
  { level: 8, name: '億万長者見習い', requiredCoins: 7000 },
  { level: 9, name: '経済の支配者', requiredCoins: 8000 },
  { level: 10, name: 'レジェンダリー投資家', requiredCoins: 9000 },
]

export default function SavingsPage() {
  const [savings, setSavings] = useState(0)
  const [goal, setGoal] = useState(1000)
  const [addAmount, setAddAmount] = useState(0)
  const [history, setHistory] = useState<SavingsHistory[]>([])
  const [currentTitle, setCurrentTitle] = useState<Title>(titles[0])

  // Calculate total savings from history
  const calculateTotalSavings = (historyEntries: SavingsHistory[]) => {
    return historyEntries.reduce((total, entry) => {
      if (entry.type === 'deposit') return total + entry.amount;
      if (entry.type === 'withdrawal') return total - entry.amount;
      if (entry.type === 'reset') return 0;
      return total;
    }, 0);
  }

  // Load initial data
  useEffect(() => {
    const savedHistory = localStorage.getItem('savingsHistory')
    if (savedHistory) {
      try {
        const parsedHistory = JSON.parse(savedHistory)
        setHistory(parsedHistory)
        const total = calculateTotalSavings(parsedHistory)
        setSavings(total)
        updateTitle(total)
      } catch (error) {
        console.error('Failed to parse savings history:', error)
        localStorage.setItem('savingsHistory', JSON.stringify([]))
      }
    } else {
      localStorage.setItem('savingsHistory', JSON.stringify([]))
    }

    const savedGoal = localStorage.getItem('goal')
    if (savedGoal) setGoal(parseInt(savedGoal))
  }, [])

  // Handle new coins from quiz
  useEffect(() => {
    const newCoins = parseInt(localStorage.getItem('newCoins') || '0')
    if (newCoins > 0) {
      const newHistoryEntry: SavingsHistory = {
        id: crypto.randomUUID(),
        date: new Date().toLocaleString(),
        amount: newCoins,
        type: 'deposit'
      }
      
      const updatedHistory = [...history, newHistoryEntry]
      const newTotal = calculateTotalSavings(updatedHistory)
      
      setHistory(updatedHistory)
      setSavings(newTotal)
      updateTitle(newTotal)
      
      localStorage.setItem('savingsHistory', JSON.stringify(updatedHistory))
      localStorage.removeItem('newCoins')
      triggerConfetti()
    }
  }, [history])

  const handleAddSavings = () => {
    if (addAmount > 0) {
      const newHistoryEntry: SavingsHistory = {
        id: crypto.randomUUID(),
        date: new Date().toLocaleString(),
        amount: addAmount,
        type: 'deposit'
      }
      
      const updatedHistory = [...history, newHistoryEntry]
      const newTotal = calculateTotalSavings(updatedHistory)
      
      setHistory(updatedHistory)
      setSavings(newTotal)
      updateTitle(newTotal)
      
      localStorage.setItem('savingsHistory', JSON.stringify(updatedHistory))
      setAddAmount(0)
    }
  }

  const handleUpdateGoal = (newGoal: number) => {
    setGoal(newGoal)
    localStorage.setItem('goal', newGoal.toString())
  }

  const handleReset = () => {
    const resetEntry: SavingsHistory = {
      id: crypto.randomUUID(),
      date: new Date().toLocaleString(),
      amount: 0,
      type: 'reset'
    }
    
    const updatedHistory = [...history, resetEntry]
    setHistory(updatedHistory)
    setSavings(0)
    updateTitle(0)
    
    localStorage.setItem('savingsHistory', JSON.stringify(updatedHistory))
  }

  const updateTitle = (currentSavings: number) => {
    const newTitle = titles.reduce((prev, current) => 
      currentSavings >= current.requiredCoins ? current : prev
    )
    setCurrentTitle(newTitle)
  }

  const triggerConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-200 to-blue-200 p-8">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold text-green-600 mb-2">バーチャル貯金箱</h1>
        <p className="text-xl text-blue-600">コツコツ貯めよう！</p>
      </header>

      <Card className="max-w-md mx-auto mb-8">
        <CardHeader>
          <CardTitle className="flex items-center justify-between text-green-600">
            <div className="flex items-center">
              <PiggyBank className="mr-2" />
              現在の貯金額
            </div>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="outline" size="icon">
                  <RefreshCw className="h-4 w-4" />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>貯金をリセットしますか？</AlertDialogTitle>
                  <AlertDialogDescription>
                    この操作は取り消せません。貯金額が0になります。
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>キャンセル</AlertDialogCancel>
                  <AlertDialogAction onClick={handleReset}>リセット</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-4xl font-bold text-center">{savings} コイン</p>
          <Progress value={(savings / goal) * 100} className="mt-4" />
          <p className="text-center mt-2">目標: {goal} コイン</p>
          <div className="flex items-center justify-center mt-4">
            <Crown className="mr-2 text-yellow-500" />
            <p className="text-lg font-semibold">{currentTitle.name} (レベル {currentTitle.level})</p>
          </div>
        </CardContent>
      </Card>

      <Card className="max-w-md mx-auto mb-8">
        <CardHeader>
          <CardTitle className="flex items-center text-blue-600">
            <Coins className="mr-2" />
            コインを追加
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2">
            <Input
              type="number"
              value={addAmount}
              onChange={(e) => setAddAmount(Math.max(0, parseInt(e.target.value) || 0))}
              placeholder="追加するコイン"
            />
            <Button onClick={handleAddSavings} disabled={addAmount <= 0}>追加</Button>
          </div>
        </CardContent>
      </Card>

      <Card className="max-w-md mx-auto mb-8">
        <CardHeader>
          <CardTitle className="flex items-center text-purple-600">
            <Target className="mr-2" />
            目標を設定
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Label htmlFor="goal">新しい目標（コイン）</Label>
          <Input
            id="goal"
            type="number"
            value={goal}
            onChange={(e) => handleUpdateGoal(parseInt(e.target.value) || 0)}
          />
        </CardContent>
      </Card>

      <Card className="max-w-md mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center text-orange-600">
            <Clock className="mr-2" />
            貯金履歴
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[200px]">
            {history.length > 0 ? (
              history.slice().reverse().map((entry) => (
                <div key={entry.id} className="mb-2 p-2 bg-white rounded-md shadow">
                  <p className="text-sm text-gray-500">{entry.date}</p>
                  <p className={`font-semibold ${
                    entry.type === 'deposit' ? 'text-green-600' : 
                    entry.type === 'withdrawal' ? 'text-red-600' : 'text-orange-600'
                  }`}>
                    {entry.type === 'deposit' ? '+' : 
                     entry.type === 'withdrawal' ? '-' : 'リセット: '}
                    {entry.amount} コイン
                  </p>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500">まだ履歴がありません</p>
            )}
          </ScrollArea>
        </CardContent>
      </Card>

      <div className="mt-8 text-center">
        <Link href="/" passHref>
          <Button variant="outline">
            <ArrowLeft className="mr-2" />
            ホームに戻る
          </Button>
        </Link>
      </div>
    </div>
  )
}

