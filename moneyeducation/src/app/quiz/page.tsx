'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { HelpCircle, ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { addPoints, awardBadge } from '../rewardSystem'

// 全20問のクイズ問題プール
const allQuizQuestions = [
  {
    question: 'お金を貯めるのに一番良い場所はどこ？',
    options: ['ポケット', '貯金箱', '銀行', 'ベッドの下'],
    correctAnswer: '銀行',
    explanation: '銀行は安全にお金を貯められるだけでなく、利子も付くことがあるよ！'
  },
  {
    question: '「予算」とは何のこと？',
    options: ['お金の種類', '使えるお金の計画', '銀行の名前', 'お店の名前'],
    correctAnswer: '使えるお金の計画',
    explanation: '予算を立てることで、計画的にお金を使うことができるんだ。'
  },
  {
    question: 'お小遣いをもらったら、すぐに全部使うのと少しずつ使うのとどっちがいい？',
    options: ['すぐに全部使う', '少しずつ使う', 'お母さんに渡す', '捨てる'],
    correctAnswer: '少しずつ使う',
    explanation: '少しずつ使うことで、長い期間お金を楽しく使えるし、貯金もできるよ。'
  },
  {
    question: '「もったいない」という言葉の意味は？',
    options: ['お金持ちになること', '無駄遣いすること', '大切に使うこと', 'お金を捨てること'],
    correctAnswer: '大切に使うこと',
    explanation: '「もったいない」は、物やお金を大切に使おうという気持ちを表す言葉だよ。'
  },
  {
    question: 'お金を稼ぐには何が必要？',
    options: ['魔法の杖', '宝くじに当たる', '働くこと', '他の人からもらう'],
    correctAnswer: '働くこと',
    explanation: 'お金は働いて稼ぐものだよ。大人になったら、自分の好きな仕事を見つけて働こうね。'
  },
  {
    question: '「利子」って何のこと？',
    options: ['お金を借りるときの手数料', 'お金を貯めると増える分', 'お金を使うときの税金', 'お金を運ぶ人'],
    correctAnswer: 'お金を貯めると増える分',
    explanation: '銀行にお金を貯めると、利子が付いてお金が少し増えるんだよ。'
  },
  {
    question: '買い物をするとき、一番大切なことは？',
    options: ['たくさん買うこと', '本当に必要か考えること', '安いものを選ぶこと', '人気のものを選ぶこと'],
    correctAnswer: '本当に必要か考えること',
    explanation: '買い物の前に、本当に必要なものかどうかよく考えることが大切だよ。'
  },
  {
    question: 'レシートはどうして大切？',
    options: ['ゴミだから', '何を買ったか確認できる', '遊べるから', '食べられるから'],
    correctAnswer: '何を買ったか確認できる',
    explanation: 'レシートがあれば、いくら使ったのか、何を買ったのかを後で確認できるよ。'
  },
  {
    question: '1000円で100円のジュースを買いました。おつりはいくら？',
    options: ['1100円', '900円', '1000円', '100円'],
    correctAnswer: '900円',
    explanation: '1000円から100円を引くと900円になるよ。'
  },
  {
    question: '「貯金」は何のためにするの？',
    options: ['お金を捨てるため', '将来使うため', 'お金持ちに見せるため', '銀行の人に渡すため'],
    correctAnswer: '将来使うため',
    explanation: '欲しいものを買ったり、急に必要になったときのために貯金をするんだよ。'
  },
  {
    question: 'お金を借りるときの約束として正しいのは？',
    options: ['返さなくていい', 'いつか返せばいい', '約束した日に返す', '忘れる'],
    correctAnswer: '約束した日に返す',
    explanation: 'お金を借りたら、約束した日にちゃんと返すことが大切だよ。'
  },
  {
    question: '「消費税」って何？',
    options: ['お金を消すこと', '物を買うときに追加でかかるお金', 'お金を増やすこと', 'お金を数えること'],
    correctAnswer: '物を買うときに追加でかかるお金',
    explanation: '買い物をするとき、値段に加えて消費税というお金が必要になるんだ。'
  },
  {
    question: '100円ショップの商品は全部いくら？',
    options: ['0円', '100円', '110円', '1000円'],
    correctAnswer: '110円',
    explanation: '100円に消費税が加わって、実際には110円になるんだよ。'
  },
  {
    question: 'お金を使うとき、一番気をつけることは？',
    options: ['たくさん使うこと', '計画を立てること', '人に見せること', '隠すこと'],
    correctAnswer: '計画を立てること',
    explanation: 'お金は計画を立てて、賢く使うことが大切だよ。'
  },
  {
    question: '500円玉を貯金箱に入れる習慣は良い習慣？',
    options: ['悪い習慣', '良い習慣', '意味がない', 'わからない'],
    correctAnswer: '良い習慣',
    explanation: '決まったお金を貯める習慣をつけると、少しずつ貯金が増えていくよ。'
  },
  {
    question: 'お金を拾ったらどうする？',
    options: ['自分のものにする', '警察に届ける', '友達にあげる', '捨てる'],
    correctAnswer: '警察に届ける',
    explanation: '拾ったお金は警察に届けるのが正しい行動だよ。'
  },
  {
    question: 'お金を数えるときは何に気をつける？',
    options: ['早く数える', '正確に数える', '人に見せる', '投げる'],
    correctAnswer: '正確に数える',
    explanation: 'お金は間違えないように、しっかりと正確に数えることが大切だよ。'
  },
  {
    question: 'お金を貯めるコツは？',
    options: ['使わない', '計画を立てる', '隠す', '捨てる'],
    correctAnswer: '計画を立てる',
    explanation: '計画を立てて、少しずつ貯めていくのが上手な貯め方だよ。'
  },
  {
    question: '「値引き」って何のこと？',
    options: ['値段を上げること', '値段を下げること', '値段を隠すこと', '値段を忘れること'],
    correctAnswer: '値段を下げること',
    explanation: '値引きは商品の値段を下げることで、お得に買い物ができるよ。'
  },
  {
    question: 'お小遣い帳をつけるのは何のため？',
    options: ['絵を描くため', 'お金の使い方を確認するため', '暇つぶしのため', '親に見せるため'],
    correctAnswer: 'お金の使い方を確認するため',
    explanation: 'お小遣い帳をつけると、自分のお金の使い方が分かるようになるよ。'
  }
]

export default function QuizPage() {
  const router = useRouter()
  const [quizQuestions, setQuizQuestions] = useState<typeof allQuizQuestions>([])
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState('')
  const [showResult, setShowResult] = useState(false)
  const [score, setScore] = useState(0)
  const [quizCompleted, setQuizCompleted] = useState(false)

  // クイズ開始時に問題をランダムに選択
  useEffect(() => {
    const shuffledQuestions = [...allQuizQuestions]
      .sort(() => Math.random() - 0.5)
      .slice(0, 5)
    setQuizQuestions(shuffledQuestions)
  }, [])

  useEffect(() => {
    if (currentQuestion === 0 && score === 0) {
      awardBadge('first_quiz')
    }
  }, [currentQuestion, score])

  const handleAnswerSelection = (answer: string) => {
    setSelectedAnswer(answer)
  }

  const handleSubmit = () => {
    if (selectedAnswer === quizQuestions[currentQuestion].correctAnswer) {
      setScore(score + 1)
    }
    setShowResult(true)
  }

  const handleNextQuestion = () => {
    setSelectedAnswer('')
    setShowResult(false)
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      const earnedPoints = score * 100
      addPoints(earnedPoints)
      
      // Update savings history
      const savedHistory = localStorage.getItem('savingsHistory')
      const history = savedHistory ? JSON.parse(savedHistory) : []
      const newHistoryEntry = {
        id: crypto.randomUUID(),
        date: new Date().toLocaleString(),
        amount: earnedPoints,
        type: 'deposit'
      }
      const updatedHistory = [...history, newHistoryEntry]
      localStorage.setItem('savingsHistory', JSON.stringify(updatedHistory))
      
      // Update total savings
      const currentSavings = parseInt(localStorage.getItem('savings') || '0')
      const newSavings = currentSavings + earnedPoints
      localStorage.setItem('savings', newSavings.toString())
      
      setQuizCompleted(true)
    }
  }

  const resetQuiz = () => {
    // 新しい問題セットを選択
    const shuffledQuestions = [...allQuizQuestions]
      .sort(() => Math.random() - 0.5)
      .slice(0, 5)
    setQuizQuestions(shuffledQuestions)
    setCurrentQuestion(0)
    setSelectedAnswer('')
    setShowResult(false)
    setScore(0)
    setQuizCompleted(false)
  }

  if (quizQuestions.length === 0) {
    return <div>読み込み中...</div>
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-200 to-purple-200 p-8">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold text-blue-600 mb-2">お金のクイズ</h1>
        <p className="text-xl text-purple-600">楽しく学ぼう！お金のひみつ</p>
      </header>

      {!quizCompleted ? (
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="flex items-center text-blue-600">
              <HelpCircle className="mr-2" />
              問題 {currentQuestion + 1} / {quizQuestions.length}
            </CardTitle>
            <CardDescription>{quizQuestions[currentQuestion].question}</CardDescription>
          </CardHeader>
          <CardContent>
            <RadioGroup value={selectedAnswer} onValueChange={handleAnswerSelection}>
              {quizQuestions[currentQuestion].options.map((option, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <RadioGroupItem value={option} id={`option-${index}`} />
                  <Label htmlFor={`option-${index}`}>{option}</Label>
                </div>
              ))}
            </RadioGroup>
          </CardContent>
          <CardFooter className="flex justify-between">
            {!showResult ? (
              <Button onClick={handleSubmit} disabled={!selectedAnswer}>
                回答する
              </Button>
            ) : (
              <Button onClick={handleNextQuestion}>
                {currentQuestion < quizQuestions.length - 1 ? '次の問題' : '結果を見る'}
              </Button>
            )}
          </CardFooter>
        </Card>
      ) : (
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="text-blue-600">クイズ完了！</CardTitle>
            <CardDescription>おめでとう！全ての問題に答えました。</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-center mb-4">
              あなたのスコア: {score} / {quizQuestions.length}
            </p>
            <p className="text-xl text-center mb-4">
              獲得コイン: {score * 100} コイン
            </p>
            <p className="text-center">
              {score === quizQuestions.length
                ? 'すごい！満点だよ！お金博士だね！'
                : score >= quizQuestions.length / 2
                ? 'よくできました！もっと勉強して、次は満点を目指そう！'
                : 'がんばったね！もう一度挑戦して、もっと良い点数を目指そう！'}
            </p>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button onClick={resetQuiz} className="mr-4">
              もう一度挑戦する
            </Button>
            <Button onClick={() => router.push('/savings')} variant="outline">
              貯金箱を確認する
            </Button>
          </CardFooter>
        </Card>
      )}

      {showResult && !quizCompleted && (
        <Card className="max-w-2xl mx-auto mt-4">
          <CardHeader>
            <CardTitle className={selectedAnswer === quizQuestions[currentQuestion].correctAnswer ? "text-green-600" : "text-red-600"}>
              {selectedAnswer === quizQuestions[currentQuestion].correctAnswer ? "正解！" : "残念、不正解..."}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-2">正解: {quizQuestions[currentQuestion].correctAnswer}</p>
            <p>{quizQuestions[currentQuestion].explanation}</p>
          </CardContent>
        </Card>
      )}

      {!quizCompleted && (
        <div className="mt-8 text-center">
          <Link href="/" passHref>
            <Button variant="outline">
              <ArrowLeft className="mr-2" />
              ホームに戻る
            </Button>
          </Link>
        </div>
      )}
    </div>
  )
}

