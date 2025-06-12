export const metadata = {
  title: "Next Pizza",
  description: "Pizza selling website",
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      DASHBOARD HEADER
      <body>{children}</body>
    </html>
  );
}
