export interface Badge {
  id: string;
  name: string;
  description: string;
  image: string;
}

export interface Title {
  id: string;
  name: string;
  requiredPoints: number;
  level: number;
}

const badges: Badge[] = [
  {
    id: 'first_quiz',
    name: 'クイズマスター',
    description: '初めてクイズに挑戦しました',
    image: '/badges/quiz-master.png',
  },
  {
    id: 'savings_goal',
    name: '貯金の達人',
    description: '初めて貯金目標を達成しました',
    image: '/badges/savings-master.png',
  },
  {
    id: 'shopping_pro',
    name: 'お買い物の達人',
    description: '買い物シミュレーションで予算内で全てのアイテムを購入しました',
    image: '/badges/shopping-pro.png',
  },
];

const titles: Title[] = [
  { id: 'beginner', name: 'お金の見習い', requiredPoints: 0, level: 1 },
  { id: 'intermediate', name: 'お金の達人', requiredPoints: 1000, level: 2 },
  { id: 'advanced', name: 'お金のエキスパート', requiredPoints: 5000, level: 3 },
  { id: 'master', name: 'お金の王様', requiredPoints: 10000, level: 4 },
];

export function getBadges(): Badge[] {
  return badges;
}

export function getTitles(): Title[] {
  return titles;
}

export function getCurrentTitle(points: number): Title {
  return titles.reduce((current, title) => 
    points >= title.requiredPoints ? title : current
  );
}

export function awardBadge(badgeId: string): void {
  const earnedBadges = JSON.parse(localStorage.getItem('earnedBadges') || '[]');
  if (!earnedBadges.includes(badgeId)) {
    earnedBadges.push(badgeId);
    localStorage.setItem('earnedBadges', JSON.stringify(earnedBadges));
  }
}

export function getEarnedBadges(): Badge[] {
  const earnedBadgeIds = JSON.parse(localStorage.getItem('earnedBadges') || '[]');
  return badges.filter(badge => earnedBadgeIds.includes(badge.id));
}

export function addPoints(points: number): void {
  const currentPoints = getPoints();
  const newPoints = currentPoints + points;
  localStorage.setItem('points', newPoints.toString());
}

export function getPoints(): number {
  return parseInt(localStorage.getItem('points') || '0');
}

