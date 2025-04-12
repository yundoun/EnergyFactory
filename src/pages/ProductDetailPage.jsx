import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Heart, Minus, Plus, ShoppingCart, Star } from 'lucide-react';
import Button from '../components/common/Button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '../components/common/Card';
import Badge from '../components/common/Badge';
import Separator from '../components/common/Separator';
import Label from '../components/common/Label';
import Input from '../components/common/Input';
import { RadioGroup, RadioGroupItem } from '../components/common/RadioGroup';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '../components/common/Tabs';

// 샘플 제품 데이터 (실제 앱에서는 API에서 가져옴)
const products = [
  {
    id: 1,
    name: '유기농 그릭 요거트',
    description: '고단백, 프로바이오틱이 풍부한 유제품',
    longDescription:
      '저희 유기농 그릭 요거트는 목초 사육 소의 우유로 만들어지며 두꺼운 크림 같은 질감을 얻기 위해 걸러집니다. 단백질, 프로바이오틱, 칼슘이 풍부하여 근육 성장, 장 건강 및 전반적인 웰빙을 지원하는 데 탁월한 선택입니다. 플레인으로 즐기거나 과일과 함께, 또는 스무디와 딥의 기본으로 사용하세요.',
    price: 4.99,
    image: '/placeholder.svg',
    category: 'high-protein',
    tags: ['dairy', 'breakfast', 'snack'],
    nutrition: {
      calories: 120,
      protein: 22,
      carbs: 8,
      fat: 0,
      servingSize: '170g (6oz)',
      vitamins: ['칼슘', '비타민 D', '비타민 B12'],
      minerals: ['인', '칼륨', '아연'],
    },
    variants: ['플레인', '바닐라', '딸기', '블루베리'],
    sizes: ['6oz', '16oz', '32oz'],
    rating: 4.8,
    reviews: 124,
    stock: 50,
    relatedProducts: [2, 5, 8],
  },
  {
    id: 2,
    name: '자연산 연어',
    description: '오메가-3가 풍부한 생선 필레',
    longDescription:
      '저희 자연산 연어는 알래스카의 깨끗한 물에서 공수됩니다. 고품질 단백질과 오메가-3 지방산이 풍부하여 심장 건강, 뇌 기능을 지원하고 염증을 줄입니다. 각 필레는 신선도와 영양가를 보존하기 위해 개별적으로 급속 냉동됩니다.',
    price: 12.99,
    image: '/placeholder.svg',
    category: 'high-protein',
    tags: ['seafood', 'dinner', 'mediterranean'],
    nutrition: {
      calories: 180,
      protein: 25,
      carbs: 0,
      fat: 8,
      servingSize: '100g (3.5oz)',
      vitamins: ['비타민 D', '비타민 B12', '나이아신'],
      minerals: ['셀레늄', '인', '칼륨'],
    },
    variants: ['소크아이', '코호', '킹'],
    sizes: ['6oz', '12oz', '1lb'],
    rating: 4.9,
    reviews: 87,
    stock: 25,
    relatedProducts: [1, 3, 6],
  },
  // 다른 제품들...
];

const ProductDetailPage = () => {
  const { id } = useParams();
  const productId = parseInt(id);
  const product = products.find((p) => p.id === productId) || products[0];

  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState(
    product?.variants?.[0] || ''
  );
  const [selectedSize, setSelectedSize] = useState(product?.sizes?.[0] || '');

  const incrementQuantity = () => {
    if (quantity < product.stock) {
      setQuantity(quantity + 1);
    }
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const relatedProducts = product.relatedProducts
    .map((id) => products.find((p) => p.id === id))
    .filter(Boolean);

  return (
    <div className="container py-10">
      <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
        <div className="space-y-4">
          <div className="overflow-hidden rounded-lg border">
            <img
              src={product.image}
              alt={product.name}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="grid grid-cols-4 gap-2">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="overflow-hidden rounded-lg border">
                <img
                  src={product.image}
                  alt={`${product.name} 썸네일 ${i + 1}`}
                  className="h-full w-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <h1 className="text-3xl font-bold">{product.name}</h1>
                <p className="text-lg text-muted-foreground">
                  {product.description}
                </p>
              </div>
              <Button variant="outline" size="icon" className="h-8 w-8">
                <Heart className="h-4 w-4" />
                <span className="sr-only">위시리스트에 추가</span>
              </Button>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < Math.floor(product.rating)
                        ? 'fill-primary text-primary'
                        : 'fill-muted text-muted-foreground'
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm font-medium">{product.rating}</span>
              <span className="text-sm text-muted-foreground">
                ({product.reviews} 리뷰)
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="text-3xl font-bold">
              ${product.price.toFixed(2)}
            </div>
            <Badge variant="outline" className="text-xs">
              재고: {product.stock}
            </Badge>
          </div>

          <Separator />

          <div className="space-y-4">
            {product.variants && product.variants.length > 0 && (
              <div className="space-y-2">
                <Label htmlFor="variant">종류</Label>
                <RadioGroup
                  id="variant"
                  value={selectedVariant}
                  onValueChange={setSelectedVariant}
                  className="flex flex-wrap gap-2">
                  {product.variants.map((variant) => (
                    <div key={variant}>
                      <RadioGroupItem
                        id={`variant-${variant}`}
                        value={variant}
                        className="peer sr-only"
                      />
                      <Label
                        htmlFor={`variant-${variant}`}
                        className="flex cursor-pointer items-center justify-center rounded-md border border-muted bg-transparent px-3 py-2 text-sm font-medium ring-offset-background peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/10 peer-data-[state=checked]:text-primary">
                        {variant}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            )}

            {product.sizes && product.sizes.length > 0 && (
              <div className="space-y-2">
                <Label htmlFor="size">크기</Label>
                <RadioGroup
                  id="size"
                  value={selectedSize}
                  onValueChange={setSelectedSize}
                  className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <div key={size}>
                      <RadioGroupItem
                        id={`size-${size}`}
                        value={size}
                        className="peer sr-only"
                      />
                      <Label
                        htmlFor={`size-${size}`}
                        className="flex cursor-pointer items-center justify-center rounded-md border border-muted bg-transparent px-3 py-2 text-sm font-medium ring-offset-background peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/10 peer-data-[state=checked]:text-primary">
                        {size}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="quantity">수량</Label>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={decrementQuantity}
                  disabled={quantity <= 1}>
                  <Minus className="h-4 w-4" />
                  <span className="sr-only">수량 감소</span>
                </Button>
                <Input
                  id="quantity"
                  type="number"
                  min="1"
                  max={product.stock}
                  value={quantity}
                  onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                  className="w-16 text-center"
                />
                <Button
                  variant="outline"
                  size="icon"
                  onClick={incrementQuantity}
                  disabled={quantity >= product.stock}>
                  <Plus className="h-4 w-4" />
                  <span className="sr-only">수량 증가</span>
                </Button>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2 sm:flex-row">
            <Button className="flex-1" size="lg">
              <ShoppingCart className="mr-2 h-5 w-5" />
              장바구니에 추가
            </Button>
            <Button variant="outline" size="lg">
              바로 구매
            </Button>
          </div>

          <Separator />

          <Tabs defaultValue="nutrition">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="nutrition">영양</TabsTrigger>
              <TabsTrigger value="description">설명</TabsTrigger>
              <TabsTrigger value="reviews">리뷰</TabsTrigger>
            </TabsList>
            <TabsContent value="nutrition" className="space-y-4 pt-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle>영양 성분</CardTitle>
                    <CardDescription>
                      {product.nutrition.servingSize} 제공량 기준
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between border-b py-1">
                        <span className="font-medium">칼로리</span>
                        <span>{product.nutrition.calories}</span>
                      </div>
                      <div className="flex justify-between border-b py-1">
                        <span className="font-medium">단백질</span>
                        <span>{product.nutrition.protein}g</span>
                      </div>
                      <div className="flex justify-between border-b py-1">
                        <span className="font-medium">탄수화물</span>
                        <span>{product.nutrition.carbs}g</span>
                      </div>
                      <div className="flex justify-between border-b py-1">
                        <span className="font-medium">지방</span>
                        <span>{product.nutrition.fat}g</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle>미량 영양소</CardTitle>
                    <CardDescription>비타민 및 미네랄</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-sm font-medium">비타민</h4>
                        <div className="mt-1 flex flex-wrap gap-1">
                          {product.nutrition.vitamins.map((vitamin) => (
                            <Badge
                              key={vitamin}
                              variant="secondary"
                              className="text-xs">
                              {vitamin}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium">미네랄</h4>
                        <div className="mt-1 flex flex-wrap gap-1">
                          {product.nutrition.minerals.map((mineral) => (
                            <Badge
                              key={mineral}
                              variant="secondary"
                              className="text-xs">
                              {mineral}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>피트니스 목표 정렬</CardTitle>
                  <CardDescription>
                    이 제품이 다양한 피트니스 목표를 지원하는 방법
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 sm:grid-cols-3">
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium">근육 증가</h4>
                      <div className="flex items-center">
                        <div className="h-2 w-full rounded-full bg-muted">
                          <div
                            className="h-2 rounded-full bg-primary"
                            style={{ width: '90%' }}></div>
                        </div>
                        <span className="ml-2 text-sm">9/10</span>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        높은 단백질 함량이 근육 회복과 성장을 지원합니다.
                      </p>
                    </div>
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium">체중 감량</h4>
                      <div className="flex items-center">
                        <div className="h-2 w-full rounded-full bg-muted">
                          <div
                            className="h-2 rounded-full bg-primary"
                            style={{ width: '70%' }}></div>
                        </div>
                        <span className="ml-2 text-sm">7/10</span>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        고단백, 저지방 프로필이 포만감과 신진대사를 돕습니다.
                      </p>
                    </div>
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium">일반 건강</h4>
                      <div className="flex items-center">
                        <div className="h-2 w-full rounded-full bg-muted">
                          <div
                            className="h-2 rounded-full bg-primary"
                            style={{ width: '80%' }}></div>
                        </div>
                        <span className="ml-2 text-sm">8/10</span>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        장 건강과 뼈 건강을 위한 프로바이오틱과 칼슘이
                        풍부합니다.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="description" className="space-y-4 pt-4">
              <Card>
                <CardHeader>
                  <CardTitle>제품 설명</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm leading-relaxed">
                    {product.longDescription}
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>사용 제안</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-medium">식사 아이디어</h4>
                      <ul className="mt-2 list-inside list-disc text-sm">
                        <li>
                          단백질이 풍부한 아침 식사를 위해 신선한 베리와 꿀을
                          곁들여 섞으세요
                        </li>
                        <li>
                          단백질과 크림 같은 질감을 더하기 위해 스무디에
                          섞으세요
                        </li>
                        <li>
                          딥과 소스에 사워 크림의 더 건강한 대체품으로
                          사용하세요
                        </li>
                        <li>
                          살코기를 위한 마리네이드로 허브와 향신료와 함께
                          사용하세요
                        </li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="text-sm font-medium">타이밍 추천</h4>
                      <ul className="mt-2 list-inside list-disc text-sm">
                        <li>운동 전: 지속적인 에너지를 위해 운동 1-2시간 전</li>
                        <li>운동 후: 근육 회복을 지원하기 위해 30분 이내</li>
                        <li>
                          아침: 신진대사를 지원하기 위해 단백질로 하루를
                          시작하세요
                        </li>
                        <li>
                          저녁 간식: 야간 회복을 지원하기 위한 천천히 소화되는
                          단백질
                        </li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="reviews" className="pt-4">
              <Card>
                <CardHeader>
                  <CardTitle>고객 리뷰</CardTitle>
                  <CardDescription>
                    평균 평점 {product.rating}/5의 {product.reviews}개 리뷰
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[...Array(3)].map((_, i) => (
                      <div key={i} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="font-medium">고객 {i + 1}</div>
                            <div className="flex">
                              {[...Array(5)].map((_, j) => (
                                <Star
                                  key={j}
                                  className={`h-3 w-3 ${
                                    j < 5 - (i % 2)
                                      ? 'fill-primary text-primary'
                                      : 'fill-muted text-muted-foreground'
                                  }`}
                                />
                              ))}
                            </div>
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {new Date(
                              Date.now() - i * 7 * 24 * 60 * 60 * 1000
                            ).toLocaleDateString()}
                          </div>
                        </div>
                        <p className="text-sm">
                          {
                            [
                              '훌륭한 제품입니다! 단백질 함량이 뛰어나고 맛도 좋습니다. 운동 후 매일 사용합니다.',
                              '품질과 영양 프로필이 마음에 듭니다. 제 피트니스 목표에 완벽합니다.',
                              '맛과 질감이 훌륭합니다. 다시 구매할 것입니다!',
                            ][i]
                          }
                        </p>
                        <Separator />
                      </div>
                    ))}
                    <Button variant="outline" className="w-full">
                      모든 리뷰 보기
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <div className="mt-12 space-y-4">
        <h2 className="text-2xl font-bold">관련 제품</h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {relatedProducts.map((relatedProduct) => (
            <Card key={relatedProduct?.id} className="overflow-hidden">
              <Link to={`/products/${relatedProduct?.id}`}>
                <div className="aspect-square overflow-hidden">
                  <img
                    src={relatedProduct?.image}
                    alt={relatedProduct?.name}
                    className="h-full w-full object-cover transition-transform hover:scale-105"
                  />
                </div>
              </Link>
              <CardHeader className="p-4">
                <CardTitle className="line-clamp-1 text-lg">
                  {relatedProduct?.name}
                </CardTitle>
                <p className="line-clamp-2 text-sm text-muted-foreground">
                  {relatedProduct?.description}
                </p>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <div className="flex flex-wrap gap-1">
                  <Badge variant="secondary" className="text-xs">
                    단백질 {relatedProduct?.nutrition.protein}g
                  </Badge>
                </div>
              </CardContent>
              <div className="flex items-center justify-between p-4">
                <p className="font-medium">
                  ${relatedProduct?.price.toFixed(2)}
                </p>
                <Button size="sm" variant="secondary">
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  담기
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
