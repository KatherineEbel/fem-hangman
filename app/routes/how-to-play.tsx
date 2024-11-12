import BackButton from '~/components/back-button'
import GradientHeading from '~/components/gradient-heading'
import HowToPlayCard from '~/components/how-to-play-card'

const instructions = [
  {
    id: 1,
    title: 'Choose a category',
    description:
      'First, choose a word category, like animals or movies. The computer then randomly selects a secret word from that topic and shows you blanks for each letter of the word.',
  },
  {
    id: 2,
    title: 'Guess letters',
    description:
      'Take turns guessing letters. The computer fills in the relevant blank spaces if your guess is correct. If it’s wrong, you lose some health, which empties after eight incorrect guesses.',
  },
  {
    id: 3,
    title: 'Win or lose',
    description:
      'You win by guessing all the letters in the word before you lose all your health.',
  },
]

export default function HowToPlay() {
  return (
    <>
      <div className="overlay absolute inset-0" />
      <div className="relative z-10 px-6 py-8">
        <header className="flex items-center">
          <BackButton />
          <div className="flex-1">
            <div className="text-right md:text-center">
              <GradientHeading>How to Play</GradientHeading>
            </div>
          </div>
        </header>
        <main className="mt-16 grid grid-rows-3 gap-6 lg:grid-cols-3 lg:grid-rows-1">
          {instructions.map(({ id, title, description }) => (
            <HowToPlayCard
              key={id}
              number={id}
              title={title}
              description={description}
            />
          ))}
        </main>
      </div>
    </>
  )
}
