import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import { useUser } from '../../context/UserContext';
import { useCart } from '../../context/CartContext';
import {
  Menu,
  Search,
  ShoppingCart,
  User,
  Sun,
  Moon,
  Dumbbell,
} from 'lucide-react';

const Header = () => {
  const { theme, toggleTheme } = useTheme();
  const { user, logout } = useUser();
  const { totalItems } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    // 검색 기능 구현
    console.log('Searching for:', searchQuery);
  };

  const handleLogout = () => {
    logout();
    // 로그아웃 후 추가 작업 (예: 리디렉션)
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background">
      <div className="container flex h-16 items-center justify-between">
        {/* 모바일 메뉴 토글 버튼 */}
        <button
          className="block md:hidden p-2"
          onClick={toggleMobileMenu}
          aria-label="메뉴 토글">
          <Menu size={24} />
        </button>

        {/* 로고 */}
        <Link to="/" className="flex items-center gap-2 text-lg font-semibold">
          <Dumbbell className="h-6 w-6 text-primary" />
          <span className="hidden sm:inline-block">EnergyFactory</span>
        </Link>

        {/* 데스크톱 네비게이션 */}
        <nav className="hidden md:flex items-center gap-6">
          <Link
            to="/products"
            className="text-sm font-medium hover:text-primary">
            제품
          </Link>
          <Link
            to="/diet-coach"
            className="text-sm font-medium hover:text-primary">
            다이어트 코치
          </Link>
          <Link
            to="/nutrition-calculator"
            className="text-sm font-medium hover:text-primary">
            영양 계산기
          </Link>
          <Link to="/about" className="text-sm font-medium hover:text-primary">
            소개
          </Link>
        </nav>

        {/* 검색, 장바구니, 사용자 메뉴 */}
        <div className="flex items-center gap-4">
          {/* 검색 폼 (데스크톱) */}
          <form onSubmit={handleSearch} className="hidden md:flex relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="search"
              placeholder="제품 검색..."
              className="w-[200px] h-10 pl-9 pr-4 rounded-md border border-input bg-background text-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </form>

          {/* 장바구니 링크 */}
          <Link to="/cart" className="relative p-2">
            <ShoppingCart className="h-5 w-5" />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center rounded-full bg-primary text-white text-xs">
                {totalItems}
              </span>
            )}
            <span className="sr-only">장바구니</span>
          </Link>

          {/* 테마 토글 버튼 */}
          <button
            onClick={toggleTheme}
            className="p-2"
            aria-label={
              theme === 'dark' ? '라이트 모드로 전환' : '다크 모드로 전환'
            }>
            {theme === 'dark' ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </button>

          {/* 사용자 메뉴 */}
          <div className="relative">
            <button className="p-2" aria-label="사용자 메뉴">
              <User className="h-5 w-5" />
            </button>
            {/* 사용자 드롭다운 메뉴는 필요시 구현 */}
          </div>
        </div>
      </div>

      {/* 모바일 메뉴 */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t">
          <div className="container py-4 space-y-4">
            <form onSubmit={handleSearch} className="flex relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="search"
                placeholder="제품 검색..."
                className="w-full h-10 pl-9 pr-4 rounded-md border border-input bg-background text-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </form>
            <nav className="flex flex-col space-y-4">
              <Link
                to="/products"
                className="text-sm font-medium py-2"
                onClick={toggleMobileMenu}>
                제품
              </Link>
              <Link
                to="/diet-coach"
                className="text-sm font-medium py-2"
                onClick={toggleMobileMenu}>
                다이어트 코치
              </Link>
              <Link
                to="/nutrition-calculator"
                className="text-sm font-medium py-2"
                onClick={toggleMobileMenu}>
                영양 계산기
              </Link>
              <Link
                to="/about"
                className="text-sm font-medium py-2"
                onClick={toggleMobileMenu}>
                소개
              </Link>
              {user ? (
                <>
                  <Link
                    to="/profile"
                    className="text-sm font-medium py-2"
                    onClick={toggleMobileMenu}>
                    프로필
                  </Link>
                  <button
                    className="text-sm font-medium py-2 text-left text-destructive"
                    onClick={() => {
                      handleLogout();
                      toggleMobileMenu();
                    }}>
                    로그아웃
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="text-sm font-medium py-2"
                    onClick={toggleMobileMenu}>
                    로그인
                  </Link>
                  <Link
                    to="/signup"
                    className="text-sm font-medium py-2"
                    onClick={toggleMobileMenu}>
                    회원가입
                  </Link>
                </>
              )}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
