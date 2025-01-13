import Link from 'next/link'
import { ShoppingCart, Store } from 'lucide-react'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function GameModePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-200 to-pink-200 p-8">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold text-purple-600 mb-2">ゲームモード</h1>
        <p className="text-xl text-pink-600">楽しく学ぼう！お金の使い方</p>
      </header>

      <div className="max-w-4xl mx-auto grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-blue-600">
              <ShoppingCart className="mr-2" />
              買い物シミュレーション
            </CardTitle>
            <CardDescription>予算内でお買い物しよう！</CardDescription>
          </CardHeader>
          <CardContent>
            <p>1000円の予算で必要なものを買い物しましょう。賢い選択ができるかな？</p>
          </CardContent>
          <CardFooter>
            <Link href="/game/shopping" passHref>
              <Button className="w-full">プレイする</Button>
            </Link>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-green-600">
              <Store className="mr-2" />
              お店屋さんごっこ
            </CardTitle>
            <CardDescription>お店を経営してみよう！</CardDescription>
          </CardHeader>
          <CardContent>
            <p>自分のお店を開いて、品物を仕入れたり、お客さんに売ったりしてみましょう。</p>
          </CardContent>
          <CardFooter>
            <Button className="w-full" disabled>近日公開</Button>
          </CardFooter>
        </Card>
      </div>

      <div className="mt-8 text-center">
        <Link href="/" passHref>
          <Button variant="outline">ホームに戻る</Button>
        </Link>
      </div>
    </div>
  )
}

