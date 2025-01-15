'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Award, ArrowLeft } from 'lucide-react'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { getBadges, getEarnedBadges, getPoints, getCurrentTitle } from '@/components/rewardSystem';

// バッジの型を定義
interface Badge {
  id: string;
  name: string;
  description: string;
  image: string;
}

export default function BadgesPage() {
  const [earnedBadges, setEarnedBadges] = useState<Badge[]>([]); // 型を指定
  const [points, setPoints] = useState<number>(0); // ポイントの型を指定
  const [currentTitle, setCurrentTitle] = useState<{ name: string }>({ name: '初心者' }); // 称号の型を指定
  const allBadges: Badge[] = getBadges() || []; // バッジリストの型を指定

  useEffect(() => {
    // 初期状態を安全に設定
    const storedEarnedBadges: Badge[] = getEarnedBadges() || []; // 型を指定
    const storedPoints: number = getPoints() || 0; // 型を指定
    const storedTitle = getCurrentTitle(storedPoints) || { name: '初心者' }; // 型を指定

    setEarnedBadges(storedEarnedBadges);
    setPoints(storedPoints);
    setCurrentTitle(storedTitle);

    // 定期的にデータを更新
    const intervalId = setInterval(() => {
      const updatedEarnedBadges: Badge[] = getEarnedBadges() || []; // 型を指定
      const updatedPoints: number = getPoints() || 0;
      const updatedTitle = getCurrentTitle(updatedPoints) || { name: '初心者' };

      setEarnedBadges(updatedEarnedBadges);
      setPoints(updatedPoints);
      setCurrentTitle(updatedTitle);
    }, 1000);

    // コンポーネントのアンマウント時にクリーンアップ
    return () => clearInterval(intervalId);
  }, []);

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
          <Card key={badge.id || badge.name} className={earnedBadges.some((b) => b?.id === badge.id) ? 'border-green-500' : 'opacity-50'}>
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
              {earnedBadges.some((b) => b?.id === badge.id) ? (
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
  );
}