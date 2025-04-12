import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Minus, Plus, ShoppingCart, Trash2 } from 'lucide-react';
import Button from '../components/common/Button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../components/common/Card';
import Input from '../components/common/Input';
import Label from '../components/common/Label';
import Separator from '../components/common/Separator';
import Badge from '../components/common/Badge';
import Progress from '../components/common/Progress';

// 샘플 장바구니 데이터
const initialCartItems = [
  {
    id: 1,
    name: '유기농 그릭 요거트',
    description: '고단백, 프로바이오틱이 풍부한 유제품',
    price: 4.99,
    image: '/placeholder.svg',
    quantity: 2,
    variant: '플레인',
    size: '16oz',
    nutrition: {
      calories: 120,
      protein: 22,
      carbs: 8,
      fat: 0,
    },
  },
  {
    id: 3,
    name: '엑스트라 버진 올리브 오일',
    description: '콜드 프레스 지중해 오일',
    price: 15.99,
    image: '/placeholder.svg',
    quantity: 1,
    variant: '클래식',
    size: '500ml',
    nutrition: {
      calories: 120,
      protein: 0,
      carbs: 0,
      fat: 14,
    },
  },
  {
    id: 6,
    name: '목초 사육 웨이 프로틴',
    description: '깨끗한 단백질 보충제',
    price: 29.99,
    image: '/placeholder.svg',
    quantity: 1,
    variant: '바닐라',
    size: '2lb',
    nutrition: {
      calories: 120,
      protein: 25,
      carbs: 3,
      fat: 2,
    },
  },
];

// 샘플 추천 제품
const recommendedProducts = [
  {
    id: 2,
    name: '자연산 연어',
    description: '오메가-3가 풍부한 생선 필레',
    price: 12.99,
    image: '/placeholder.svg',
    nutrition: {
      protein: 25,
      carbs: 0,
      fat: 8,
    },
  },
  {
    id: 4,
    name: '퀴노아',
    description: '완전한 단백질 함유 통곡물',
    price: 6.99,
    image: '/placeholder.svg',
    nutrition: {
      protein: 4,
      carbs: 21,
      fat: 2,
    },
  },
  {
    id: 8,
    name: '블루베리',
    description: '항산화제가 풍부한 슈퍼푸드',
    price: 4.99,
    image: '/placeholder.svg',
    nutrition: {
      protein: 1,
      carbs: 20,
      fat: 0,
    },
  },
];

const CartPage = () => {
  const [cartItems, setCartItems] = useState(initialCartItems);
  const [promoCode, setPromoCode] = useState('');

  // 장바구니 총액 계산
  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const shipping = subtotal > 50 ? 0 : 5.99;
  const tax = subtotal * 0.08; // 8% 세율
  const total = subtotal + shipping + tax;

  // 영양소 총량 계산
  const nutritionTotals = cartItems.reduce(
    (totals, item) => {
      return {
        calories: totals.calories + item.nutrition.calories * item.quantity,
        protein: totals.protein + item.nutrition.protein * item.quantity,
        carbs: totals.carbs + item.nutrition.carbs * item.quantity,
        fat: totals.fat + item.nutrition.fat * item.quantity,
      };
    },
    { calories: 0, protein: 0, carbs: 0, fat: 0 }
  );

  // 사용자의 일일 목표 (실제 앱에서는 사용자 프로필에서 가져옴)
  const dailyTargets = {
    calories: 2400,
    protein: 180,
    carbs: 240,
    fat: 80,
  };

  // 일일 목표 대비 백분율 계산
  const targetPercentages = {
    calories: (nutritionTotals.calories / dailyTargets.calories) * 100,
    protein: (nutritionTotals.protein / dailyTargets.protein) * 100,
    carbs: (nutritionTotals.carbs / dailyTargets.carbs) * 100,
    fat: (nutritionTotals.fat / dailyTargets.fat) * 100,
  };

  // 수량 업데이트 핸들러
  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;

    setCartItems(
      cartItems.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  // 아이템 제거 핸들러
  const removeItem = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  // 프로모 코드 적용 핸들러
  const applyPromoCode = () => {
    // 실제 앱에서는 백엔드에서 프로모 코드 검증
    alert(`프로모 코드 "${promoCode}" 적용됨!`);
  };

  // 추천 제품 추가 핸들러
  const addRecommendedProduct = (product) => {
    // 이미 장바구니에 있는지 확인
    const existingItem = cartItems.find((item) => item.id === product.id);

    if (existingItem) {
      // 이미 장바구니에 있으면 수량 증가
      updateQuantity(product.id, existingItem.quantity + 1);
    } else {
      // 새 아이템 장바구니에 추가
      setCartItems([
        ...cartItems,
        {
          ...product,
          quantity: 1,
          variant: '기본',
          size: '표준',
        },
      ]);
    }
  };

  return (
    <div className="container py-10">
      <div className="space-y-10">
        <div>
          <h1 className="text-3xl font-bold">장바구니</h1>
          <p className="text-muted-foreground">
            상품을 검토하고 준비되면 결제하세요.
          </p>
        </div>

        {cartItems.length > 0 ? (
          <div className="grid gap-6 lg:grid-cols-[1fr_400px]">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>장바구니 상품 ({cartItems.length})</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="divide-y">
                    {cartItems.map((item) => (
                      <div key={item.id} className="flex items-start gap-4 p-4">
                        <div className="h-20 w-20 overflow-hidden rounded-md">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div className="flex-1 space-y-1">
                          <div className="flex items-start justify-between">
                            <div>
                              <h3 className="font-medium">{item.name}</h3>
                              <p className="text-sm text-muted-foreground">
                                {item.description}
                              </p>
                            </div>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => removeItem(item.id)}>
                              <Trash2 className="h-4 w-4" />
                              <span className="sr-only">제거</span>
                            </Button>
                          </div>
                          <div className="flex items-center text-sm text-muted-foreground">
                            <span>종류: {item.variant}</span>
                            <span className="mx-2">•</span>
                            <span>크기: {item.size}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() =>
                                  updateQuantity(item.id, item.quantity - 1)
                                }
                                disabled={item.quantity <= 1}>
                                <Minus className="h-3 w-3" />
                                <span className="sr-only">수량 감소</span>
                              </Button>
                              <span className="w-8 text-center">
                                {item.quantity}
                              </span>
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() =>
                                  updateQuantity(item.id, item.quantity + 1)
                                }>
                                <Plus className="h-3 w-3" />
                                <span className="sr-only">수량 증가</span>
                              </Button>
                            </div>
                            <div className="font-medium">
                              ${(item.price * item.quantity).toFixed(2)}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="justify-between">
                  <Button variant="outline" asChild>
                    <Link to="/products">
                      <ShoppingCart className="mr-2 h-4 w-4" />
                      쇼핑 계속하기
                    </Link>
                  </Button>
                  <Button variant="ghost" onClick={() => setCartItems([])}>
                    장바구니 비우기
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>영양 요약</CardTitle>
                  <CardDescription>장바구니 상품의 영양 분석</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label>칼로리</Label>
                      <span className="text-sm">
                        {nutritionTotals.calories} / {dailyTargets.calories}{' '}
                        kcal
                      </span>
                    </div>
                    <Progress
                      value={targetPercentages.calories}
                      max={100}
                      className="h-2"
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label>단백질</Label>
                      <span className="text-sm">
                        {nutritionTotals.protein} / {dailyTargets.protein} g
                      </span>
                    </div>
                    <Progress
                      value={targetPercentages.protein}
                      max={100}
                      className="bg-protein-light h-2">
                      <div className="h-full bg-protein"></div>
                    </Progress>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label>탄수화물</Label>
                      <span className="text-sm">
                        {nutritionTotals.carbs} / {dailyTargets.carbs} g
                      </span>
                    </div>
                    <Progress
                      value={targetPercentages.carbs}
                      max={100}
                      className="bg-carbs-light h-2">
                      <div className="h-full bg-carbs"></div>
                    </Progress>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label>지방</Label>
                      <span className="text-sm">
                        {nutritionTotals.fat} / {dailyTargets.fat} g
                      </span>
                    </div>
                    <Progress
                      value={targetPercentages.fat}
                      max={100}
                      className="bg-fat-light h-2">
                      <div className="h-full bg-fat"></div>
                    </Progress>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>추천 제품</CardTitle>
                  <CardDescription>
                    장바구니와 영양 목표에 기반함
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 sm:grid-cols-3">
                    {recommendedProducts.map((product) => (
                      <div key={product.id} className="space-y-2">
                        <div className="overflow-hidden rounded-md">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="h-24 w-full object-cover"
                          />
                        </div>
                        <div>
                          <h4 className="font-medium">{product.name}</h4>
                          <p className="text-xs text-muted-foreground">
                            {product.description}
                          </p>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">
                            ${product.price.toFixed(2)}
                          </span>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => addRecommendedProduct(product)}>
                            추가
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>주문 요약</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">소계</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">배송비</span>
                    <span>
                      {shipping === 0 ? (
                        <Badge variant="outline" className="text-xs">
                          무료
                        </Badge>
                      ) : (
                        `$${shipping.toFixed(2)}`
                      )}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">세금</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between font-medium">
                    <span>합계</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="promo">프로모션 코드</Label>
                    <div className="flex space-x-2">
                      <Input
                        id="promo"
                        placeholder="코드 입력"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                      />
                      <Button onClick={applyPromoCode} disabled={!promoCode}>
                        적용
                      </Button>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" size="lg">
                    결제하기
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>영양 균형</CardTitle>
                  <CardDescription>장바구니의 영양 프로필 분석</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="rounded-lg border bg-muted/50 p-4">
                    <h3 className="font-medium">AI 다이어트 코치 분석</h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                      장바구니가 단백질이 높습니다(근육 형성에 좋음)만 지속적인
                      에너지를 위한 복합 탄수화물이 더 필요할 수 있습니다.
                      통곡물이나 과일을 추가하는 것을 고려해보세요.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-sm font-medium">매크로 영양소 비율</h3>
                    <div className="flex h-4 w-full overflow-hidden rounded-full">
                      <div
                        className="bg-protein"
                        style={{
                          width: `${
                            ((nutritionTotals.protein * 4) /
                              (nutritionTotals.protein * 4 +
                                nutritionTotals.carbs * 4 +
                                nutritionTotals.fat * 9)) *
                            100
                          }%`,
                        }}></div>
                      <div
                        className="bg-carbs"
                        style={{
                          width: `${
                            ((nutritionTotals.carbs * 4) /
                              (nutritionTotals.protein * 4 +
                                nutritionTotals.carbs * 4 +
                                nutritionTotals.fat * 9)) *
                            100
                          }%`,
                        }}></div>
                      <div
                        className="bg-fat"
                        style={{
                          width: `${
                            ((nutritionTotals.fat * 9) /
                              (nutritionTotals.protein * 4 +
                                nutritionTotals.carbs * 4 +
                                nutritionTotals.fat * 9)) *
                            100
                          }%`,
                        }}></div>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-protein">단백질</span>
                      <span className="text-carbs">탄수화물</span>
                      <span className="text-fat">지방</span>
                    </div>
                  </div>

                  <Button variant="outline" className="w-full" asChild>
                    <Link to="/diet-coach">맞춤형 조언 받기</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center space-y-4 rounded-lg border border-dashed p-10 text-center">
            <ShoppingCart className="h-12 w-12 text-muted-foreground" />
            <div className="space-y-2">
              <h2 className="text-xl font-semibold">
                장바구니가 비어 있습니다
              </h2>
              <p className="text-muted-foreground">
                시작하려면 영양가 있는 제품을 장바구니에 추가하세요.
              </p>
            </div>
            <Button asChild>
              <Link to="/products">
                <ShoppingCart className="mr-2 h-4 w-4" />
                제품 둘러보기
              </Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
