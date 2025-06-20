import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';
import { forwardRef, type ReactNode, type ElementType } from 'react';

const gridVariants = cva(
  'grid',
  {
    variants: {
      columns: {
        1: 'grid-cols-1',
        2: 'grid-cols-1 md:grid-cols-2',
        3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
        4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
        5: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5',
        6: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6',
        auto: 'grid-cols-[repeat(auto-fit,minmax(280px,1fr))]',
        'auto-sm': 'grid-cols-[repeat(auto-fit,minmax(240px,1fr))]',
        'auto-lg': 'grid-cols-[repeat(auto-fit,minmax(320px,1fr))]',
      },
      gap: {
        0: 'gap-0',
        1: 'gap-1',
        2: 'gap-2',
        3: 'gap-3',
        4: 'gap-4',
        5: 'gap-5',
        6: 'gap-6',
        8: 'gap-8',
        10: 'gap-10',
        12: 'gap-12',
      },
      rows: {
        auto: 'grid-rows-[auto]',
        equal: 'grid-rows-[repeat(auto-fit,1fr)]',
        masonry: 'grid-rows-[masonry]', // Future CSS feature
      },
    },
    defaultVariants: {
      columns: 'auto',
      gap: 6,
      rows: 'auto',
    },
  }
);

const gridItemVariants = cva(
  '',
  {
    variants: {
      span: {
        1: 'col-span-1',
        2: 'col-span-1 md:col-span-2',
        3: 'col-span-1 md:col-span-2 lg:col-span-3',
        4: 'col-span-1 md:col-span-2 lg:col-span-4',
        full: 'col-span-full',
        auto: 'col-span-auto',
      },
      rowSpan: {
        1: 'row-span-1',
        2: 'row-span-2',
        3: 'row-span-3',
        4: 'row-span-4',
        auto: 'row-span-auto',
      },
      order: {
        first: 'order-first',
        last: 'order-last',
        1: 'order-1',
        2: 'order-2',
        3: 'order-3',
        4: 'order-4',
        5: 'order-5',
        none: 'order-none',
      },
    },
    defaultVariants: {
      span: 'auto',
      rowSpan: 'auto',
      order: 'none',
    },
  }
);

interface GridProps extends VariantProps<typeof gridVariants> {
  children: ReactNode;
  className?: string;
  as?: ElementType;
}

interface GridItemProps extends VariantProps<typeof gridItemVariants> {
  children: ReactNode;
  className?: string;
  as?: ElementType;
}

const Grid = forwardRef<HTMLDivElement, GridProps>(
  ({ children, columns, gap, rows, className, as: Component = 'div', ...props }, ref) => {
    return (
      <Component
        ref={ref}
        className={cn(gridVariants({ columns, gap, rows }), className)}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

const GridItem = forwardRef<HTMLDivElement, GridItemProps>(
  ({ children, span, rowSpan, order, className, as: Component = 'div', ...props }, ref) => {
    return (
      <Component
        ref={ref}
        className={cn(gridItemVariants({ span, rowSpan, order }), className)}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

Grid.displayName = 'Grid';
GridItem.displayName = 'GridItem';

export { Grid, GridItem, gridVariants, gridItemVariants };
export type { GridProps, GridItemProps };