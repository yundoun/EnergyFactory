import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Filter, Search, ShoppingCart } from 'lucide-react';
import Button from '../components/common/Button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from '../components/common/Card';
import Checkbox from '../components/common/Checkbox';
import Input from '../components/common/Input';
import Label from '../components/common/Label';
import Select from '../components/common/Select';
import Separator from '../components/common/Separator';
import Badge from '../components/common/Badge';
import { ScrollArea } from '../components/common/ScrollArea';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '../components/common/Accordion';
import { Sheet, SheetContent, SheetTrigger } from '../components/common/Sheet';
import Slider from '../components/common/Slider';

// 샘플 제품 데이터
const products = [
  {
    id: 1,
    name: '유기농 그릭 요거트',
    description: '고단백, 프로바이오틱이 풍부한 유제품',
    price: 4.99,
    image: '/placeholder.svg',
    category: 'high-protein',
    tags: ['dairy', 'breakfast', 'snack'],
    nutrition: {
      calories: 120,
      protein: 22,
      carbs: 8,
      fat: 0,
    },
  },
  {
    id: 2,
    name: '자연산 연어',
    description: '오메가-3가 풍부한 생선 필레',
    price: 12.99,
    image: '/placeholder.svg',
    category: 'high-protein',
    tags: ['seafood', 'dinner', 'mediterranean'],
    nutrition: {
      calories: 180,
      protein: 25,
      carbs: 0,
      fat: 8,
    },
  },
  {
    id: 3,
    name: '엑스트라 버진 올리브 오일',
    description: '콜드 프레스 지중해 오일',
    price: 15.99,
    image: '/placeholder.svg',
    category: 'healthy-fats',
    tags: ['mediterranean', 'cooking', 'dressing'],
    nutrition: {
      calories: 120,
      protein: 0,
      carbs: 0,
      fat: 14,
    },
  },
  {
    id: 4,
    name: '퀴노아',
    description: '완전한 단백질 함유 통곡물',
    price: 6.99,
    image: '/placeholder.svg',
    category: 'complex-carbs',
    tags: ['gluten-free', 'vegan', 'side'],
    nutrition: {
      calories: 120,
      protein: 4,
      carbs: 21,
      fat: 2,
    },
  },
  {
    id: 5,
    name: '아보카도',
    description: '영양이 풍부한 건강한 지방',
    price: 1.99,
    image: '/placeholder.svg',
    category: 'healthy-fats',
    tags: ['fruit', 'breakfast', 'snack'],
    nutrition: {
      calories: 240,
      protein: 3,
      carbs: 12,
      fat: 22,
    },
  },
  {
    id: 6,
    name: '목초 사육 웨이 프로틴',
    description: '깨끗한 단백질 보충제',
    price: 29.99,
    image: '/placeholder.svg',
    category: 'high-protein',
    tags: ['supplement', 'post-workout'],
    nutrition: {
      calories: 120,
      protein: 25,
      carbs: 3,
      fat: 2,
    },
  },
  {
    id: 7,
    name: '고구마',
    description: '영양이 풍부한 복합 탄수화물',
    price: 2.49,
    image: '/placeholder.svg',
    category: 'complex-carbs',
    tags: ['vegetable', 'side', 'dinner'],
    nutrition: {
      calories: 100,
      protein: 2,
      carbs: 24,
      fat: 0,
    },
  },
  {
    id: 8,
    name: '블루베리',
    description: '항산화제가 풍부한 슈퍼푸드',
    price: 4.99,
    image: '/placeholder.svg',
    category: 'vitamin-rich',
    tags: ['fruit', 'breakfast', 'snack'],
    nutrition: {
      calories: 80,
      protein: 1,
      carbs: 20,
      fat: 0,
    },
  },
];

// 필터링용 카테고리
const categories = [
  { id: 'high-protein', label: '고단백' },
  { id: 'healthy-fats', label: '건강한 지방' },
  { id: 'complex-carbs', label: '복합 탄수화물' },
  { id: 'vitamin-rich', label: '비타민 풍부' },
  { id: 'mediterranean', label: '지중해식' },
  { id: 'low-carb', label: '저탄수화물' },
];

// 필터링용 태그
const tags = [
  { id: 'breakfast', label: '아침' },
  { id: 'lunch', label: '점심' },
  { id: 'dinner', label: '저녁' },
  { id: 'snack', label: '간식' },
  { id: 'vegan', label: '비건' },
  { id: 'gluten-free', label: '글루텐 프리' },
  { id: 'mediterranean', label: '지중해식' },
];

const ProductsPage = () => {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 30]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState('relevance');

  // 필터 변경 핸들러
  const handleCategoryChange = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const handleTagChange = (tag) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const handlePriceChange = (value) => {
    setPriceRange([value[0], value[1]]);
  };

  const handleSearch = (e) => {
    e.preventDefault();
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setSelectedTags([]);
    setPriceRange([0, 30]);
    setSearchQuery('');
    setSortOption('relevance');
  };

  // 필터 사이드바 컴포넌트
  const FilterSidebar = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">필터</h3>
        <p className="text-sm text-muted-foreground">
          영양 프로필로 제품 좁히기
        </p>
      </div>

      <div className="space-y-4">
        <Button variant="outline" size="sm" onClick={clearFilters}>
          모든 필터 지우기
        </Button>

        <Accordion
          type="multiple"
          defaultValue={['categories', 'tags', 'price']}>
          <AccordionItem value="categories">
            <AccordionTrigger>카테고리</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2">
                {categories.map((category) => (
                  <div
                    key={category.id}
                    className="flex items-center space-x-2">
                    <Checkbox
                      id={`category-${category.id}`}
                      checked={selectedCategories.includes(category.id)}
                      onChange={() => handleCategoryChange(category.id)}
                    />
                    <Label
                      htmlFor={`category-${category.id}`}
                      className="text-sm font-normal">
                      {category.label}
                    </Label>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="tags">
            <AccordionTrigger>태그</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2">
                {tags.map((tag) => (
                  <div key={tag.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={`tag-${tag.id}`}
                      checked={selectedTags.includes(tag.id)}
                      onChange={() => handleTagChange(tag.id)}
                    />
                    <Label
                      htmlFor={`tag-${tag.id}`}
                      className="text-sm font-normal">
                      {tag.label}
                    </Label>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="price">
            <AccordionTrigger>가격 범위</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4">
                <Slider
                  defaultValue={[0, 30]}
                  max={30}
                  step={1}
                  value={priceRange}
                  onValueChange={handlePriceChange}
                />
                <div className="flex items-center justify-between">
                  <p className="text-sm">${priceRange[0]}</p>
                  <p className="text-sm">${priceRange[1]}</p>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="nutrition">
            <AccordionTrigger>영양 초점</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox id="high-protein-focus" />
                  <Label
                    htmlFor="high-protein-focus"
                    className="text-sm font-normal">
                    고단백 (20g+)
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="low-carb-focus" />
                  <Label
                    htmlFor="low-carb-focus"
                    className="text-sm font-normal">
                    저탄수화물 (10g 미만)
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="low-fat-focus" />
                  <Label
                    htmlFor="low-fat-focus"
                    className="text-sm font-normal">
                    저지방 (3g 미만)
                  </Label>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );

  return (
    <div className="container py-10">
      <div className="flex flex-col space-y-6">
        <div className="flex flex-col space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">제품</h1>
          <p className="text-muted-foreground">
            영양 중심의 식료품 선택 둘러보기
          </p>
        </div>

        <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
          <div className="flex items-center space-x-2">
            <form
              onSubmit={handleSearch}
              className="relative w-full md:w-[300px]">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="제품 검색..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </form>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="md:hidden">
                  <Filter className="h-4 w-4" />
                  <span className="sr-only">필터</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left">
                <ScrollArea className="h-[calc(100vh-80px)]">
                  <FilterSidebar />
                </ScrollArea>
              </SheetContent>
            </Sheet>
          </div>

          <div className="flex items-center space-x-2">
            <Select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="w-[180px]">
              <option value="relevance">관련성</option>
              <option value="price-low">가격: 낮은순</option>
              <option value="price-high">가격: 높은순</option>
              <option value="protein-high">단백질: 높은순</option>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-[240px_1fr]">
          <div className="hidden md:block">
            <FilterSidebar />
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                <strong>{products.length}</strong>개 중{' '}
                <strong>{products.length}</strong>개 제품 표시
              </p>
              <div className="flex flex-wrap gap-2">
                {selectedCategories.map((category) => (
                  <Badge
                    key={category}
                    variant="outline"
                    className="flex items-center gap-1">
                    {categories.find((c) => c.id === category)?.label}
                    <button
                      onClick={() => handleCategoryChange(category)}
                      className="ml-1 rounded-full outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2">
                      <span className="sr-only">제거</span>
                      <span aria-hidden="true">×</span>
                    </button>
                  </Badge>
                ))}
                {selectedTags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="outline"
                    className="flex items-center gap-1">
                    {tags.find((t) => t.id === tag)?.label}
                    <button
                      onClick={() => handleTagChange(tag)}
                      className="ml-1 rounded-full outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2">
                      <span className="sr-only">제거</span>
                      <span aria-hidden="true">×</span>
                    </button>
                  </Badge>
                ))}
              </div>
            </div>

            <Separator />

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {products.map((product) => (
                <Card key={product.id} className="overflow-hidden">
                  <Link to={`/products/${product.id}`}>
                    <div className="aspect-square overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="h-full w-full object-cover transition-transform hover:scale-105"
                      />
                    </div>
                  </Link>
                  <CardHeader className="p-4">
                    <CardTitle className="line-clamp-1 text-lg">
                      {product.name}
                    </CardTitle>
                    <p className="line-clamp-2 text-sm text-muted-foreground">
                      {product.description}
                    </p>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <div className="flex flex-wrap gap-1">
                      {product.nutrition.protein >= 15 && (
                        <Badge className="bg-protein text-white text-xs">
                          단백질 {product.nutrition.protein}g
                        </Badge>
                      )}
                      {product.nutrition.carbs >= 15 && (
                        <Badge className="bg-carbs text-white text-xs">
                          탄수화물 {product.nutrition.carbs}g
                        </Badge>
                      )}
                      {product.nutrition.fat >= 10 && (
                        <Badge className="bg-fat text-white text-xs">
                          지방 {product.nutrition.fat}g
                        </Badge>
                      )}
                      <Badge variant="outline" className="text-xs">
                        {product.nutrition.calories} 칼로리
                      </Badge>
                    </div>
                  </CardContent>
                  <CardFooter className="flex items-center justify-between p-4">
                    <p className="font-medium">${product.price.toFixed(2)}</p>
                    <Button size="sm" variant="secondary">
                      <ShoppingCart className="mr-2 h-4 w-4" />
                      담기
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
