import { useRouter, usePathname, useSearchParams } from 'next/navigation'

export const useAdminNavigation = () => {
  const {replace} = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const navigateToUrl = (portion: string, query?: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('portion', portion);

    if (query) {
      params.set('query', query);
    } else {
      params.delete('query');
    }

    replace(`${pathname}?${params}`);
  };

  return { navigateToUrl };
};
