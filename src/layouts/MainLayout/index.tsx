import CustomersList from 'components/Lists/CustomersList';
import type { ReactNode } from 'react';

const MainLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="xl:h-full grid xl:grid-cols-[512px_1fr] gap-[1px] bg-[#E2E8F0]">
      <aside className="bg-white">{children}</aside>

      <main className="max-w-full overflow-x-auto bg-white">
        <CustomersList />
      </main>
    </div>
  );
};

export default MainLayout;
