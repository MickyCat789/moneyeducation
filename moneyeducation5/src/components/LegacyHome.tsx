'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Gamepad2, HelpCircle, PiggyBank, Award, Crown } from 'lucide-react'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { getTitles, getPoints } from './rewardSystem'

export function LegacyHome() {
  const [currentTitle, setCurrentTitle] = useState({ name: '', level: 0 })
  const [points, setPoints] = useState(0)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const updateTitleAndProgress = () => {
      const currentPoints = getPoints()
      setPoints(currentPoints)

      const titles = getTitles()
      const currentTitleInfo = titles.reduce((prev, current) => 
        currentPoints >= current.requiredPoints ? current : prev
      )

      setCurrentTitle({
        name: currentTitleInfo.name,
        level: currentTitleInfo.level || titles.indexOf(currentTitleInfo) + 1
      })

      const nextTitle = titles[titles.indexOf(currentTitleInfo) + 1]
      if (nextTitle) {
        const progressToNextLevel = (currentPoints - currentTitleInfo.requiredPoints) / 
          (nextTitle.requiredPoints - currentTitleInfo.requiredPoints) * 100
        setProgress(Math.min(progressToNextLevel, 100))
      } else {
        setProgress(100)
      }
    }

    updateTitleAndProgress()
    const intervalId = setInterval(updateTitleAndProgress, 1000)
    return () => clearInterval(intervalId)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-200 to-green-200 p-8">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold text-blue-600 mb-2">おかねの森</h1>
        <p className="text-xl text-green-600">楽しく学ぼう！お金のひみつ</p>
      </header>

      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl mb-8">
        <div className="p-8">
          <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">現在の称号</div>
          <p className="mt-2 text-3xl font-bold text-purple-500">{currentTitle.name}</p>
          <div className="mt-4 flex items-center">
            <div className="text-yellow-500 font-bold mr-2">レベル {currentTitle.level}</div>
            <div className="flex-1">
              <Progress value={progress} className="w-full" />
            </div>
          </div>
          <p className="mt-2 text-sm text-gray-600">総ポイント: {points}</p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-blue-600">
              <Gamepad2 className="mr-2" />
              ゲームモード
            </CardTitle>
            <CardDescription>お金の使い方を楽しく学ぼう！</CardDescription>
          </CardHeader>
          <CardContent>
            <p>ミニゲームで遊びながらお金の管理を学習します。</p>
          </CardContent>
          <CardFooter>
            <Link href="/game" passHref>
              <Button className="w-full">プレイする</Button>
            </Link>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-green-600">
              <HelpCircle className="mr-2" />
              クイズ
            </CardTitle>
            <CardDescription>お金の知識をテストしよう！</CardDescription>
          </CardHeader>
          <CardContent>
            <p>楽しいクイズに挑戦して、ポイントを獲得しましょう。</p>
          </CardContent>
          <CardFooter>
            <Link href="/quiz" passHref>
              <Button className="w-full">挑戦する</Button>
            </Link>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-purple-600">
              <PiggyBank className="mr-2" />
              バーチャル貯金箱
            </CardTitle>
            <CardDescription>目標を立てて貯金しよう！</CardDescription>
          </CardHeader>
          <CardContent>
            <p>自分の貯金目標を設定し、達成状況を確認できます。</p>
          </CardContent>
          <CardFooter>
            <Link href="/savings" passHref>
              <Button className="w-full">貯金する</Button>
            </Link>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-yellow-600">
              <Award className="mr-2" />
              バッジコレクション
            </CardTitle>
            <CardDescription>あなたの成果を確認しよう！</CardDescription>
          </CardHeader>
          <CardContent>
            <p>獲得したバッジと称号を見てみましょう。</p>
          </CardContent>
          <CardFooter>
            <Link href="/badges" passHref>
              <Button className="w-full">確認する</Button>
            </Link>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-red-600">
              <Crown className="mr-2" />
              称号
            </CardTitle>
            <CardDescription>レベルアップして称号を獲得しよう！</CardDescription>
          </CardHeader>
          <CardContent>
            <p>現在の称号とレベルを確認できます。</p>
          </CardContent>
          <CardFooter>
            <Link href="/titles" passHref>
              <Button className="w-full">確認する</Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

