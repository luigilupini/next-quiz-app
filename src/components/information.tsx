"use client"

import useQuizStore from "@/state/zustand/quiz-store"
import MorphText from "./morph-text"

export default function Information() {
  const { totalScore, gamesPlayed } = useQuizStore((state) => ({
    totalScore: state.totalScore,
    gamesPlayed: state.gamesPlayed,
  }))
  return (
    <div className="center gap-4">
      <InfoCard
        uniqueKey="score"
        title="Total Score"
        value={totalScore.toString()}
      />
      <InfoCard
        uniqueKey="played"
        title="Games Played"
        value={gamesPlayed.toString()}
      />
    </div>
  )
}

type Props = {
  uniqueKey: string
  title: string
  value: string
}

const InfoCard = ({ uniqueKey, title, value }: Props) => {
  return (
    <div className="center gap-1">
      <span className="text-[15px]">{title}</span>
      <div className="center gap-[2px] rounded-md border px-3">
        <MorphText uniqueKey={uniqueKey} text={value} />
      </div>
    </div>
  )
}
