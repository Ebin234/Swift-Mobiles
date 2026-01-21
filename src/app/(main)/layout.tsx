import NavBar from "@/components/navbar";


export default function MainLayout({ children }:{
  children: React.ReactNode;
}) {
  return (
    <>
      <NavBar />
      {children}
    </>
  );
}
