'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ShoppingCart, ArrowLeft } from 'lucide-react'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

const items = [
  { id: 1, name: 'えんぴつ', price: 100, image: '/pencil.png' },
  { id: 2, name: 'ノート', price: 200, image: '/notebook.png' },
  { id: 3, name: 'えほん', price: 500, image: '/picture-book.png' },
  { id: 4, name: 'おもちゃ', price: 800, image: '/toy.png' },
  { id: 5, name: 'おかし', price: 150, image: '/snack.png' },
  { id: 6, name: 'ジュース', price: 120, image: '/juice.png' },
]

export default function ShoppingGamePage() {
  const [budget, setBudget] = useState(1000)
  const [cart, setCart] = useState<Array<{ id: number, quantity: number }>>([])
  const [gameOver, setGameOver] = useState(false)

  const addToCart = (itemId: number) => {
    const item = items.find(i => i.id === itemId)
    if (item && budget >= item.price) {
      setBudget(budget - item.price)
      const existingItem = cart.find(i => i.id === itemId)
      if (existingItem) {
        setCart(cart.map(i => i.id === itemId ? { ...i, quantity: i.quantity + 1 } : i))
      } else {
        setCart([...cart, { id: itemId, quantity: 1 }])
      }
    }
  }

  const getTotalItems = () => cart.reduce((total, item) => total + item.quantity, 0)

  const finishShopping = () => {
    setGameOver(true)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-200 to-orange-200 p-8">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold text-orange-600 mb-2">買い物シミュレーション</h1>
        <p className="text-xl text-yellow-600">予算: {budget}円</p>
        <p className="text-lg text-orange-500">カートの中: {getTotalItems()}個</p>
      </header>

      {!gameOver ? (
        <div className="max-w-4xl mx-auto grid gap-6 md:grid-cols-3">
          {items.map(item => (
            <Card key={item.id}>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>{item.name}</span>
                  <span className="text-green-600">{item.price}円</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="flex justify-center">
                <Image src={item.image} alt={item.name} width={100} height={100} />
              </CardContent>
              <CardFooter>
                <Button 
                  className="w-full" 
                  onClick={() => addToCart(item.id)}
                  disabled={budget < item.price}
                >
                  カートに入れる
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="max-w-md mx-auto">
          <CardHeader>
            <CardTitle>買い物終了！</CardTitle>
            <CardDescription>お買い物お疲れさまでした！</CardDescription>
          </CardHeader>
          <CardContent>
            <p>残金: {budget}円</p>
            <p>購入したアイテム:</p>
            <ul>
              {cart.map(item => {
                const itemDetails = items.find(i => i.id === item.id)
                return (
                  <li key={item.id}>
                    {itemDetails?.name} x {item.quantity} = {(itemDetails?.price || 0) * item.quantity}円
                  </li>
                )
              })}
            </ul>
          </CardContent>
          <CardFooter>
            <Link href="/game" passHref>
              <Button className="w-full">ゲームモードに戻る</Button>
            </Link>
          </CardFooter>
        </Card>
      )}

      {!gameOver && (
        <div className="mt-8 text-center">
          <Button onClick={finishShopping} className="mr-4">
            <ShoppingCart className="mr-2" />
            買い物を終える
          </Button>
          <Link href="/game" passHref>
            <Button variant="outline">
              <ArrowLeft className="mr-2" />
              ゲームモードに戻る
            </Button>
          </Link>
        </div>
      )}
    </div>
  )
}

