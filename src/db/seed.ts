import { db, client } from '.'
import { goalCompletions, goals } from './schema'
import dayjs from 'dayjs'

async function seed() {
  await db.delete(goalCompletions)
  await db.delete(goals)
  // try {
  const result = await db
    .insert(goals)
    .values([
      { title: 'Acordar cedo', desiredWeeklyfrequency: 5 },
      { title: 'Exercicios fisicos', desiredWeeklyfrequency: 4 },
      { title: 'Estudar', desiredWeeklyfrequency: 6 },
    ])
    .returning()
  // } catch (error) {
  //   console.log('Erro do tabela goal: ', error)
  // }
  const startWeek = dayjs().startOf('week')
  // try {
  await db.insert(goalCompletions).values([
    { goalId: result[0].id, createdAt: startWeek.toDate() },
    { goalId: result[1].id, createdAt: startWeek.add(1, 'day').toDate() },
  ])
  // }catch(error){
  //   console.log('Erro do tabela goal: ', error)
  // }
}

seed().finally(() => {
  client.end()
})
