type HowToPlayCardProps = {
  number: number
  title: string
  description: string
}
export default function HowToPlayCard({
  number,
  title,
  description,
}: HowToPlayCardProps) {
  return (
    <article className="grid grid-cols-[min-content_1fr] grid-rows-[min-content_1fr] gap-4 rounded-[20px] bg-white p-8 md:gap-x-10 lg:flex lg:flex-col lg:items-center lg:gap-y-10 lg:px-12 lg:py-14">
      <h2 className="heading-lg col-span-1 self-center text-2xl text-primary md:row-span-2 md:text-heading-lg">
        {String(number).padStart(1, '0')}
      </h2>
      <h3 className="heading-lg uppercase text-accent md:text-nowrap md:text-5xl tracking-wide">
        {title}
      </h3>
      <p className="body-text col-span-2 text-muted md:col-start-2">
        {description}
      </p>
    </article>
  )
}
