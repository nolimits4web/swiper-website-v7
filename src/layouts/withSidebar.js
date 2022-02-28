import PageHeader from '@/components/PageHeader';
import TableOfContents from '@/components/TableOfContents';
import Carbon from '@/components/Carbon';

export function WithSidebarLayout({
  children,
  meta = {},
  classes,
  tableOfContents = [],
}) {
  const toc = [
    ...(classes
      ? [
          {
            title: 'Default class reference',
            slug: 'class-reference',
            children: [],
          },
        ]
      : []),
    ...tableOfContents,
  ];

  return (
    <div>
      <div
        id={meta.containerId}
        className="mx-auto flex w-full max-w-[90rem] px-4 sm:px-6 lg:px-8 xl:px-10"
      >
        {toc.length > 0 && (
          <div className="mr-4 hidden w-64 flex-none text-sm sm:mr-6 lg:mr-8 lg:block xl:mr-10">
            <div className="sticky top-0 max-h-screen overflow-y-auto overscroll-contain py-10">
              <TableOfContents tableOfContents={toc} />
            </div>
          </div>
        )}
        <div className="prose min-w-0 max-w-none flex-auto pt-10 pb-24 dark:prose-dark lg:pb-16">
          {meta.carbon && <Carbon />}
          {meta.title && (
            <PageHeader title={meta.title} description={meta.description} />
          )}
          {children}
        </div>
      </div>
    </div>
  );
}
