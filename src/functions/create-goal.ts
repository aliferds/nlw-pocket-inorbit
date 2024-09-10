import { db } from '../db'
import { goals } from '../db/schema'

interface CreateGoalRequest {
  title: string
  desiredWeeklyfrequency: number
}

export async function createGoal({
  title,
  desiredWeeklyfrequency,
}: CreateGoalRequest) {
  const result = await db
    .insert(goals)
    .values({
      title,
      desiredWeeklyfrequency,
    })
    .returning()

  const goal = result[0]

  return {
    goal,
  }
}
