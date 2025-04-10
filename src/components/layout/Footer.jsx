import React from 'react';
import { Link } from 'react-router-dom';
import { Dumbbell } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t bg-background">
      <div className="container py-10 md:py-6">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* 로고 및 간략한 설명 */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <Dumbbell className="h-6 w-6 text-primary" />
              <span className="text-xl font-semibold">EnergyFactory</span>
            </Link>
            <p className="text-sm text-muted-foreground max-w-xs">
              영양 과학을 기반으로 한 건강한 식단과 피트니스 목표 달성을 위한
              최고의 선택
            </p>
          </div>

          {/* 빠른 링크 */}
          <div>
            <h3 className="mb-4 text-sm font-semibold">빠른 링크</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/products"
                  className="text-sm text-muted-foreground hover:text-foreground">
                  제품
                </Link>
              </li>
              <li>
                <Link
                  to="/diet-coach"
                  className="text-sm text-muted-foreground hover:text-foreground">
                  다이어트 코치
                </Link>
              </li>
              <li>
                <Link
                  to="/nutrition-calculator"
                  className="text-sm text-muted-foreground hover:text-foreground">
                  영양 계산기
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-sm text-muted-foreground hover:text-foreground">
                  소개
                </Link>
              </li>
            </ul>
          </div>

          {/* 고객 지원 */}
          <div>
            <h3 className="mb-4 text-sm font-semibold">고객 지원</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/faq"
                  className="text-sm text-muted-foreground hover:text-foreground">
                  자주 묻는 질문
                </Link>
              </li>
              <li>
                <Link
                  to="/shipping"
                  className="text-sm text-muted-foreground hover:text-foreground">
                  배송 정보
                </Link>
              </li>
              <li>
                <Link
                  to="/returns"
                  className="text-sm text-muted-foreground hover:text-foreground">
                  교환 및 반품
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-sm text-muted-foreground hover:text-foreground">
                  문의하기
                </Link>
              </li>
            </ul>
          </div>

          {/* 법적 정보 */}
          <div>
            <h3 className="mb-4 text-sm font-semibold">법적 정보</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/terms"
                  className="text-sm text-muted-foreground hover:text-foreground">
                  이용약관
                </Link>
              </li>
              <li>
                <Link
                  to="/privacy"
                  className="text-sm text-muted-foreground hover:text-foreground">
                  개인정보처리방침
                </Link>
              </li>
              <li>
                <Link
                  to="/cookies"
                  className="text-sm text-muted-foreground hover:text-foreground">
                  쿠키 정책
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* 저작권 정보 */}
        <div className="mt-8 border-t pt-6 text-center md:flex md:items-center md:justify-between md:text-left">
          <p className="text-sm text-muted-foreground">
            &copy; {currentYear} EnergyFactory. 모든 권리 보유.
          </p>
          <div className="mt-4 md:mt-0">
            <p className="text-sm text-muted-foreground">
              건강한 라이프스타일을 위한 최고의 선택
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
