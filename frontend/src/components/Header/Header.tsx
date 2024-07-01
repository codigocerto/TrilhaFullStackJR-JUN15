import { useState } from "react";

export function Header() {
  const [anchorElNav, setAnchorElNav] = useState(false);
  const [anchorElUser, setAnchorElUser] = useState(false);

  const handleOpenNavMenu = () => {
    setAnchorElNav(!anchorElNav);
  };

  const handleOpenUser = () => {
    setAnchorElUser(!anchorElUser);
  };

  return (
    <header className="p-2 shadow-none flex justify-between items-center relative">
      <div className="hidden md:flex">
        <img
          src="/logo-codigo-certo.jpg"
          alt="Logo empresa"
          className="w-20 mr-28 rounded-full"
        />
      </div>
      <nav className="flex-grow hidden md:flex space-x-8">
        <a href="/" className="text-black font-bold no-underline ">Meus projetos</a>
        <a href="/descobrir" className="text-black font-bold no-underline">Descobrir</a>
      </nav>
      <div className="md:hidden">
        <button onClick={handleOpenNavMenu} className="ml-10" aria-label="Menu">
          ☰
        </button>
        {anchorElNav && (
          <div className="absolute top-28 bg-white shadow-lg rounded-md">
            <div className="flex flex-col">
              <a href="/" className="p-2 hover:bg-gray-200">Meus projetos</a>
              <a href="/descobrir" className="p-2 hover:bg-gray-200">Descobrir</a>
            </div>
          </div>
        )}
      </div>
      <div className="hidden">
        <img src="/logo-codigo-certo.jpg" alt="Logo empresa" className="w-20 rounded-full" />
      </div>
      <div className="relative flex items-center space-x-4">
        <button onClick={handleOpenUser} className="p-2" aria-label="User menu">
          <img alt="Avatar" src="/Perfil.png" className="w-20 rounded-full" />
        </button>
        {anchorElUser && (
          <div className="absolute top-28 bg-white shadow-lg rounded-md">
            <div className="flex flex-col">
              <a href="/profile" className="p-2 flex items-center hover:bg-gray-200">Profile</a>
              <a href="/" className="p-2 flex items-center hover:bg-gray-200">Logout</a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

