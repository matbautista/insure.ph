export function FaqAccordion({ items }: { items: { question: string; answer: string }[] }) {
  return (
    <div className="flex flex-col gap-3">
      {items.map((item) => (
        <details
          key={item.question}
          className="group rounded-lg border border-zinc-200 p-4 transition-colors open:border-teal-300 hover:border-teal-300 dark:border-zinc-800 dark:open:border-teal-700 dark:hover:border-teal-700"
        >
          <summary className="cursor-pointer list-none font-medium text-zinc-900 marker:content-none dark:text-zinc-50">
            {item.question}
          </summary>
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">{item.answer}</p>
        </details>
      ))}
    </div>
  );
}
