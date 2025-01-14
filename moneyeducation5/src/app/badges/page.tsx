'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Award, ArrowLeft } from 'lucide-react'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
//import { getBadges, getEarnedBadges, getPoints, getCurrentTitle } from '../rewardSystem'
import { getBadges, getEarnedBadges, getPoints, getCurrentTitle } from '@/components/rewardSystem';

export default function BadgesPage() {
  const [earnedBadges, setEarnedBadges] = useState(getEarnedBadges())
  const [points, setPoints] = useState(getPoints())
  const [currentTitle, setCurrentTitle] = useState(getCurrentTitle(points))
  const allBadges = getBadges()

  useEffect(() => {
    const intervalId = setInterval(() => {
      setEarnedBadges(getEarnedBadges())
      const newPoints = getPoints()
      setPoints(newPoints)
      setCurrentTitle(getCurrentTitle(newPoints))
    }, 1000)

    return () => clearInterval(intervalId)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-200 to-orange-200 p-8">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold text-orange-600 mb-2">バッジコレクション</h1>
        <p className="text-xl text-yellow-600">あなたの成果を見てみよう！</p>
      </header>

      <Card className="max-w-md mx-auto mb-8">
        <CardHeader>
          <CardTitle className="flex items-center justify-center text-purple-600">
            <Award className="mr-2" />
            現在の称号とポイント
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-2xl font-bold mb-2">{currentTitle.name}</p>
          <p className="text-xl">{points} ポイント</p>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {allBadges.map((badge) => (
          <Card key={badge.id} className={earnedBadges.some(b => b.id === badge.id) ? 'border-green-500' : 'opacity-50'}>
            <CardHeader>
              <CardTitle className="flex items-center justify-center">
                <Image src={badge.image} alt={badge.name} width={64} height={64} />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <h3 className="text-lg font-semibold text-center mb-2">{badge.name}</h3>
              <p className="text-sm text-center">{badge.description}</p>
            </CardContent>
            <CardFooter className="justify-center">
              {earnedBadges.some(b => b.id === badge.id) ? (
                <span className="text-green-600 font-semibold">獲得済み</span>
              ) : (
                <span className="text-gray-500">未獲得</span>
              )}
            </CardFooter>
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

