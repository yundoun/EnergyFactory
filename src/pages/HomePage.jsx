import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/common/Button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../components/common/Card';
import { ArrowRight, Dumbbell, Heart, Salad, ShoppingCart } from 'lucide-react';

const HomePage = () => {
  return (
    <div className="flex flex-col">
      {/* 히어로 섹션 */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-background to-muted">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                  피트니스 목표에 맞는 스마트 쇼핑
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  EnergyFactory는 식단 계획, 영양소 계산, 피트니스 목표에 맞는
                  식재료 쇼핑을 도와드립니다.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link to="/signup">
                  <Button size="lg">
                    시작하기
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link to="/products">
                  <Button size="lg" variant="outline">
                    제품 둘러보기
                  </Button>
                </Link>
              </div>
            </div>
            <div className="flex justify-center">
              <img
                src="/placeholder.svg"
                alt="EnergyFactory 히어로 이미지"
                width={550}
                height={550}
                className="rounded-lg object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 특징 섹션 */}
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                EnergyFactory 이용 방법
              </h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                저희 플랫폼은 영양 과학과 AI를 결합하여 개인 맞춤형 쇼핑 경험을
                제공합니다.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <Dumbbell className="h-10 w-10 text-primary mb-4" />
                <CardTitle>피트니스 목표 설정</CardTitle>
                <CardDescription>
                  신체 정보, 활동 수준, 피트니스 목표로 프로필을 생성하세요.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p>
                  저희 시스템은 베네딕트-해리스 방정식을 사용하여 칼로리
                  요구량과 최적의 매크로 비율을 계산합니다.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <Salad className="h-10 w-10 text-primary mb-4" />
                <CardTitle>맞춤형 식단 계획</CardTitle>
                <CardDescription>
                  AI 다이어트 코치가 영양 요구에 맞는 식단 계획을 제공합니다.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p>
                  채팅 인터페이스를 통해 질문하고, 영양 조언을 받고, 맞춤형 식단
                  계획을 받아보세요.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <ShoppingCart className="h-10 w-10 text-primary mb-4" />
                <CardTitle>자신감 있는 쇼핑</CardTitle>
                <CardDescription>
                  영양 중심 카탈로그를 둘러보고 스마트 장바구니에 상품을
                  추가하세요.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p>
                  실시간으로 영양소 총량을 추적하고 균형 잡힌 쇼핑을 위한 AI
                  추천을 받아보세요.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* 제품 카테고리 */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                영양 중심 카테고리
              </h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                전통적인 카테고리가 아닌 영양적 이점에 따라 구성된 제품을
                둘러보세요.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-8">
            {[
              { name: '고단백', icon: <Dumbbell className="h-6 w-6" /> },
              { name: '건강한 지방', icon: <Heart className="h-6 w-6" /> },
              { name: '복합 탄수화물', icon: <Salad className="h-6 w-6" /> },
              { name: '비타민 풍부', icon: <Salad className="h-6 w-6" /> },
              { name: '지중해식', icon: <Salad className="h-6 w-6" /> },
              { name: '저탄수화물', icon: <Salad className="h-6 w-6" /> },
              { name: '글루텐 프리', icon: <Salad className="h-6 w-6" /> },
              { name: '식물성', icon: <Salad className="h-6 w-6" /> },
            ].map((category) => (
              <Link
                to={`/products?category=${category.name
                  .toLowerCase()
                  .replace(' ', '-')}`}
                key={category.name}>
                <Card className="h-full transition-all hover:bg-accent hover:text-accent-foreground">
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-lg">{category.name}</CardTitle>
                    {category.icon}
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      {category.name.toLowerCase()} 식품 선택을 둘러보세요.
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full justify-start">
                      둘러보기
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* AI 다이어트 코치 */}
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="flex justify-center">
              <img
                src="/placeholder.svg"
                alt="AI 다이어트 코치"
                width={550}
                height={550}
                className="rounded-lg object-cover"
              />
            </div>
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  AI 다이어트 코치 만나기
                </h2>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  AI 기반 다이어트 코치로부터 맞춤형 영양 조언, 식단 계획, 쇼핑
                  추천을 받아보세요.
                </p>
              </div>
              <div className="space-y-4 mt-6">
                <div className="border rounded-lg p-4">
                  <h3 className="text-lg font-bold mb-2">맞춤형 식단 계획</h3>
                  <p>
                    AI가 피트니스 목표, 식이 제한, 음식 선호도에 따라 일일 및
                    주간 식단 계획을 생성합니다.
                  </p>
                </div>
                <div className="border rounded-lg p-4">
                  <h3 className="text-lg font-bold mb-2">전문 영양 가이드</h3>
                  <p>
                    영양에 관한 질문을 하고, 매크로 및 미량 영양소에 대한 설명을
                    듣고, 맞춤형 조언을 받으세요.
                  </p>
                </div>
                <div className="border rounded-lg p-4">
                  <h3 className="text-lg font-bold mb-2">스마트 쇼핑 추천</h3>
                  <p>
                    식단 계획과 영양 요구에 기반한 제품 추천을 받고, 자동 재료
                    계산 기능을 활용하세요.
                  </p>
                </div>
              </div>
              <div className="mt-4">
                <Link to="/diet-coach">
                  <Button size="lg">
                    다이어트 코치 시도하기
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA 섹션 */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-primary text-primary-foreground">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                영양 관리를 변화시킬 준비가 되셨나요?
              </h2>
              <p className="max-w-[900px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                오늘 EnergyFactory에 가입하고 피트니스 목표에 맞는 스마트한
                쇼핑을 시작하세요.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Link to="/signup">
                <Button size="lg" variant="secondary">
                  계정 만들기
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
