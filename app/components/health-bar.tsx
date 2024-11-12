import { clsx } from 'clsx'

export default function HealthBar({ health }: { health: number }) {
  const progressWidth = `${(health / 8) * 100}%`
  return (
    <div className="w-20 rounded-full bg-white px-2 py-2 md:w-40">
      <div
        className={clsx(
          'h-3 rounded-full transition-all ease-in-out',
          health < 3 ? 'bg-[#FE71FE]' : 'bg-accent',
        )}
        style={{ width: progressWidth }}
      />
    </div>
  )
}
