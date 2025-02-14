import { CREDIT_SCORE_LEVELS } from '@/constants/profile'

export const getCreditScoreLevel = (score: number) => {
  return CREDIT_SCORE_LEVELS.find(
    level => score >= level.range[0] && score <= level.range[1]
  )
}

export const getWithdrawalLimit = (score: number) => {
  const level = getCreditScoreLevel(score)
  return level?.withdrawals || 1
} 