import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { PlusIcon } from 'lucide-react';
import { cn } from '../../lib/utils';

export interface AccordionEntry {
  id: string;
  question: string;
  answer: string;
}

interface AccordionProps {
  items: AccordionEntry[];
  className?: string;
  defaultOpenId?: string;
}

export function Accordion({ items, className, defaultOpenId }: AccordionProps) {
  const [openId, setOpenId] = useState<string | null>(defaultOpenId ?? null);

  return (
    <div className={cn('divide-y divide-ink/10 border-y border-ink/10', className)}>
      {items.map((item) => {
        const open = openId === item.id;
        return (
          <div key={item.id}>
            <h3>
              <button
                type="button"
                onClick={() => setOpenId(open ? null : item.id)}
                aria-expanded={open}
                aria-controls={`panel-${item.id}`}
                id={`trigger-${item.id}`}
                className="group flex w-full items-start justify-between gap-6 py-6 text-left transition-colors duration-300 hover:text-forest-500">

                <span className="font-display text-lg leading-snug sm:text-xl">{item.question}</span>
                <span
                  aria-hidden="true"
                  className={cn(
                    'mt-1 grid h-8 w-8 shrink-0 place-items-center rounded-full border transition-all duration-500 ease-editorial',
                    open ?
                      'rotate-45 border-forest-500 bg-forest-500 text-white' :
                      'border-ink/15 text-ink-soft group-hover:border-forest-500 group-hover:text-forest-500'
                  )}>

                  <PlusIcon className="h-4 w-4" />
                </span>
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {open &&
                <motion.div
                  key="content"
                  id={`panel-${item.id}`}
                  role="region"
                  aria-labelledby={`trigger-${item.id}`}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden">

                  <p className="max-w-2xl pb-7 pr-10 text-[15px] leading-relaxed text-ink-soft">
                    {item.answer}
                  </p>
                </motion.div>
              }
            </AnimatePresence>
          </div>);

      })}
    </div>);

}