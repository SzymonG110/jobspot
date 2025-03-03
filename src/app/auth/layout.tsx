const RootLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="flex h-full items-center justify-center pt-5">
      {children}
    </div>
  );
};

export default RootLayout;
