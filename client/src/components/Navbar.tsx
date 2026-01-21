export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full p-6 flex justify-between items-center backdrop-blur-sm z-50">
      <h2 className="font-black text-xl tracking-tighter">AIR QUIZ</h2>
      <div className="px-4 py-1 rounded-full bg-white/10 border border-white/20 text-xs font-mono">
        STATUS: SYSTEM LIVE
      </div>
    </nav>
  );
}