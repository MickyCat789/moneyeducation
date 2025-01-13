'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Crown, ArrowLeft, Star } from 'lucide-react'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

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

export default function TitlesPage() {
  const [savings, setSavings] = useState(0)
  const [currentTitle, setCurrentTitle] = useState<Title>(titles[0])
  const [nextTitle, setNextTitle] = useState<Title | null>(null)

  useEffect(() => {
    const savedSavings = localStorage.getItem('savings')
    if (savedSavings) {
      const parsedSavings = parseInt(savedSavings)
      setSavings(parsedSavings)
      updateTitle(parsedSavings)
    }
  }, [])

  const updateTitle = (currentSavings: number) => {
    const newTitle = titles.reduce((prev, current) => 
      currentSavings >= current.requiredCoins ? current : prev
    )
    setCurrentTitle(newTitle)

    const nextTitleIndex = titles.findIndex(title => title.level === newTitle.level + 1)
    setNextTitle(nextTitleIndex !== -1 ? titles[nextTitleIndex] : null)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-200 to-orange-200 p-8">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold text-orange-600 mb-2">称号</h1>
        <p className="text-xl text-yellow-600">お金の達人への道！</p>
      </header>

      <Card className="max-w-md mx-auto mb-8">
        <CardHeader>
          <CardTitle className="flex items-center justify-center text-2xl text-purple-600">
            <Crown className="mr-2" />
            現在の称号
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-3xl font-bold mb-2">{currentTitle.name}</p>
          <p className="text-xl">レベル {currentTitle.level}</p>
          <p className="mt-4">現在の貯金額: {savings} コイン</p>
        </CardContent>
      </Card>

      {nextTitle && (
        <Card className="max-w-md mx-auto mb-8">
          <CardHeader>
            <CardTitle className="flex items-center justify-center text-xl text-blue-600">
              <Star className="mr-2" />
              次の称号
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-2xl font-bold mb-2">{nextTitle.name}</p>
            <p className="text-lg">レベル {nextTitle.level}</p>
            <Progress 
              value={(savings - currentTitle.requiredCoins) / (nextTitle.requiredCoins - currentTitle.requiredCoins) * 100} 
              className="mt-4"
            />
            <p className="mt-2">
              あと {nextTitle.requiredCoins - savings} コインでレベルアップ！
            </p>
          </CardContent>
        </Card>
      )}

      <div className="max-w-md mx-auto">
        <h2 className="text-2xl font-bold text-center mb-4">称号一覧</h2>
        {titles.map((title, index) => (
          <Card key={index} className={`mb-4 ${currentTitle.level >= title.level ? 'bg-green-100' : 'bg-gray-100'}`}>
            <CardContent className="flex items-center justify-between p-4">
              <div>
                <p className="font-bold">{title.name}</p>
                <p className="text-sm">レベル {title.level}</p>
              </div>
              <p>{title.requiredCoins} コイン</p>
            </CardContent>
          </Card>
        ))}
      </div>

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

