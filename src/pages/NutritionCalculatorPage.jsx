import { useState } from 'react';
import Button from '../components/common/Button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from '../components/common/Card';
import Input from '../components/common/Input';
import Label from '../components/common/Label';
import Progress from '../components/common/Progress';
import Select from '../components/common/Select';
import Separator from '../components/common/Separator';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '../components/common/Tabs';
import { BarChart, LineChart, PieChart } from 'lucide-react';

const NutritionCalculatorPage = () => {
  // 사용자 신체 정보 상태 관리
  const [gender, setGender] = useState('male');
  const [age, setAge] = useState(30);
  const [weight, setWeight] = useState(70); // kg
  const [height, setHeight] = useState(175); // cm
  const [activityLevel, setActivityLevel] = useState('moderate');
  const [goal, setGoal] = useState('maintain');

  // 샘플 계산 결과 (실제로는 입력값에 따라 계산 필요)
  const calculationResults = {
    bmr: 1700,
    tdee: 2635,
    targetCalories: 2635,
    macros: {
      protein: 198,
      carbs: 264,
      fat: 88,
      proteinCalories: 792,
      carbCalories: 1056,
      fatCalories: 792,
    },
  };

  // 샘플 차트 데이터
  const sampleChartData = {
    calories: {
      target: 2635,
      actual: [2500, 2700, 2400, 2800, 2600, 2900, 2500],
    },
    macros: {
      protein: {
        target: 198,
        actual: [190, 205, 185, 210, 195, 220, 192],
      },
      carbs: {
        target: 264,
        actual: [240, 280, 230, 290, 250, 300, 245],
      },
      fat: {
        target: 88,
        actual: [80, 90, 75, 95, 85, 100, 80],
      },
    },
  };

  return (
    <div className="container py-10">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">영양 계산기</h1>
          <p className="text-muted-foreground">
            피트니스 목표에 따른 일일 칼로리 요구량과 최적의 영양소 비율을
            계산하세요.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>내 정보</CardTitle>
              <CardDescription>
                영양 요구량을 계산하기 위해 신체 통계와 목표를 입력하세요.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="gender">성별</Label>
                  <Select
                    id="gender"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}>
                    <option value="male">남성</option>
                    <option value="female">여성</option>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="age">나이</Label>
                  <Input
                    id="age"
                    type="number"
                    value={age}
                    onChange={(e) =>
                      setAge(Number.parseInt(e.target.value) || 0)
                    }
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="height">키 (cm)</Label>
                  <Input
                    id="height"
                    type="number"
                    value={height}
                    onChange={(e) =>
                      setHeight(Number.parseInt(e.target.value) || 0)
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="weight">몸무게 (kg)</Label>
                  <Input
                    id="weight"
                    type="number"
                    value={weight}
                    onChange={(e) =>
                      setWeight(Number.parseInt(e.target.value) || 0)
                    }
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="activity">활동 수준</Label>
                <Select
                  id="activity"
                  value={activityLevel}
                  onChange={(e) => setActivityLevel(e.target.value)}>
                  <option value="sedentary">좌식 생활 (거의 운동 안함)</option>
                  <option value="light">
                    가벼운 활동 (주 1-3일 가벼운 운동)
                  </option>
                  <option value="moderate">
                    중간 활동 (주 3-5일 중간 강도 운동)
                  </option>
                  <option value="active">
                    활발한 활동 (주 6-7일 강도 높은 운동)
                  </option>
                  <option value="very-active">
                    매우 활발한 활동 (매우 강도 높은 운동 및 육체 노동)
                  </option>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="goal">피트니스 목표</Label>
                <Select
                  id="goal"
                  value={goal}
                  onChange={(e) => setGoal(e.target.value)}>
                  <option value="lose-fast">
                    빠른 체중 감량 (-500 칼로리)
                  </option>
                  <option value="lose">체중 감량 (-250 칼로리)</option>
                  <option value="maintain">체중 유지</option>
                  <option value="gain">근육 증가 (+250 칼로리)</option>
                  <option value="gain-fast">
                    빠른 체중 증가 (+500 칼로리)
                  </option>
                </Select>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">다시 계산</Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>결과</CardTitle>
              <CardDescription>
                베네딕트-해리스 방정식과 피트니스 목표에 기반함.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <h3 className="text-lg font-medium">일일 칼로리 요구량</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-lg border p-3 text-center">
                    <p className="text-sm text-muted-foreground">기초 대사량</p>
                    <p className="text-2xl font-bold">
                      {calculationResults.bmr}
                    </p>
                    <p className="text-xs text-muted-foreground">칼로리/일</p>
                  </div>
                  <div className="rounded-lg border p-3 text-center">
                    <p className="text-sm text-muted-foreground">
                      총 에너지 소비량
                    </p>
                    <p className="text-2xl font-bold">
                      {calculationResults.tdee}
                    </p>
                    <p className="text-xs text-muted-foreground">칼로리/일</p>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <h3 className="text-lg font-medium">목표 섭취량</h3>
                <div className="rounded-lg border bg-muted/50 p-3 text-center">
                  <p className="text-sm text-muted-foreground">일일 목표</p>
                  <p className="text-3xl font-bold">
                    {calculationResults.targetCalories}
                  </p>
                  <p className="text-xs text-muted-foreground">칼로리/일</p>
                </div>

                <div className="grid grid-cols-3 gap-2 pt-2">
                  <div className="rounded-lg border p-2 text-center">
                    <p className="text-sm font-medium text-protein">단백질</p>
                    <p className="text-xl font-bold">
                      {calculationResults.macros.protein}g
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {Math.round(calculationResults.macros.proteinCalories)}{' '}
                      칼로리
                    </p>
                  </div>
                  <div className="rounded-lg border p-2 text-center">
                    <p className="text-sm font-medium text-carbs">탄수화물</p>
                    <p className="text-xl font-bold">
                      {calculationResults.macros.carbs}g
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {Math.round(calculationResults.macros.carbCalories)}{' '}
                      칼로리
                    </p>
                  </div>
                  <div className="rounded-lg border p-2 text-center">
                    <p className="text-sm font-medium text-fat">지방</p>
                    <p className="text-xl font-bold">
                      {calculationResults.macros.fat}g
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {Math.round(calculationResults.macros.fatCalories)} 칼로리
                    </p>
                  </div>
                </div>
              </div>

              <div className="h-[200px] flex items-center justify-center">
                <div className="w-full max-w-[200px] aspect-square rounded-full border-8 border-muted relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <p className="text-xs text-muted-foreground">
                        매크로 비율
                      </p>
                      <p className="text-lg font-bold">균형 잡힘</p>
                    </div>
                  </div>
                  <div
                    className="absolute top-0 left-0 w-1/3 h-full bg-protein opacity-70"
                    style={{
                      clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
                    }}></div>
                  <div
                    className="absolute top-0 right-0 w-1/3 h-full bg-carbs opacity-70"
                    style={{
                      clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
                    }}></div>
                  <div
                    className="absolute bottom-0 left-0 right-0 w-full h-1/3 bg-fat opacity-70"
                    style={{
                      clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
                    }}></div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>영양 추적</CardTitle>
            <CardDescription>
              목표 대비 일일 섭취량을 추적하세요.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="calories">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="calories">
                  <LineChart className="mr-2 h-4 w-4" />
                  칼로리
                </TabsTrigger>
                <TabsTrigger value="macros">
                  <BarChart className="mr-2 h-4 w-4" />
                  매크로
                </TabsTrigger>
                <TabsTrigger value="distribution">
                  <PieChart className="mr-2 h-4 w-4" />
                  분포
                </TabsTrigger>
              </TabsList>
              <TabsContent value="calories" className="pt-4">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label>일일 칼로리 목표</Label>
                      <span className="text-sm">
                        {calculationResults.targetCalories} 칼로리
                      </span>
                    </div>
                    <Progress value={95} max={100} className="h-2" />
                  </div>

                  <div className="grid grid-cols-7 gap-2">
                    {sampleChartData.calories.actual.map((cal, index) => (
                      <div key={index} className="space-y-2">
                        <div className="h-32 bg-muted rounded-md relative">
                          <div
                            className="absolute bottom-0 left-0 right-0 bg-primary rounded-md"
                            style={{
                              height: `${
                                (cal / calculationResults.targetCalories) * 100
                              }%`,
                              maxHeight: '100%',
                            }}></div>
                        </div>
                        <p className="text-xs text-center">
                          {['월', '화', '수', '목', '금', '토', '일'][index]}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="macros" className="pt-4">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label>단백질</Label>
                      <span className="text-sm">
                        {calculationResults.macros.protein}g 목표
                      </span>
                    </div>
                    <Progress
                      value={98}
                      max={100}
                      className="bg-protein-light h-2">
                      <div className="h-full bg-protein"></div>
                    </Progress>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label>탄수화물</Label>
                      <span className="text-sm">
                        {calculationResults.macros.carbs}g 목표
                      </span>
                    </div>
                    <Progress
                      value={92}
                      max={100}
                      className="bg-carbs-light h-2">
                      <div className="h-full bg-carbs"></div>
                    </Progress>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label>지방</Label>
                      <span className="text-sm">
                        {calculationResults.macros.fat}g 목표
                      </span>
                    </div>
                    <Progress value={95} max={100} className="bg-fat-light h-2">
                      <div className="h-full bg-fat"></div>
                    </Progress>
                  </div>

                  <div className="grid grid-cols-7 gap-2 mt-4">
                    {[0, 1, 2, 3, 4, 5, 6].map((day) => (
                      <div key={day} className="space-y-1">
                        <div className="flex flex-col gap-1">
                          <div
                            className="bg-protein rounded-sm h-8"
                            style={{ opacity: 0.7 + (day % 3) * 0.1 }}></div>
                          <div
                            className="bg-carbs rounded-sm h-12"
                            style={{ opacity: 0.7 + (day % 4) * 0.1 }}></div>
                          <div
                            className="bg-fat rounded-sm h-6"
                            style={{ opacity: 0.7 + (day % 2) * 0.1 }}></div>
                        </div>
                        <p className="text-xs text-center">
                          {['월', '화', '수', '목', '금', '토', '일'][day]}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="distribution" className="pt-4">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div>
                    <h3 className="mb-2 text-lg font-medium">권장 분포</h3>
                    <div className="h-[200px] flex items-center justify-center">
                      <div className="w-full max-w-[200px] aspect-square rounded-full overflow-hidden">
                        <div className="flex h-full">
                          <div className="bg-protein w-1/3 h-full"></div>
                          <div className="bg-carbs w-1/3 h-full"></div>
                          <div className="bg-fat w-1/3 h-full"></div>
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-between text-xs mt-2">
                      <span className="text-protein">단백질 30%</span>
                      <span className="text-carbs">탄수화물 40%</span>
                      <span className="text-fat">지방 30%</span>
                    </div>
                  </div>
                  <div>
                    <h3 className="mb-2 text-lg font-medium">내 평균 분포</h3>
                    <div className="h-[200px] flex items-center justify-center">
                      <div className="w-full max-w-[200px] aspect-square rounded-full overflow-hidden">
                        <div className="flex h-full">
                          <div className="bg-protein w-[35%] h-full"></div>
                          <div className="bg-carbs w-[38%] h-full"></div>
                          <div className="bg-fat w-[27%] h-full"></div>
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-between text-xs mt-2">
                      <span className="text-protein">단백질 35%</span>
                      <span className="text-carbs">탄수화물 38%</span>
                      <span className="text-fat">지방 27%</span>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>영양 추천</CardTitle>
            <CardDescription>
              목표와 프로필에 기반한 맞춤형 추천
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-lg border p-4">
              <h3 className="text-lg font-medium text-protein">
                단백질 공급원
              </h3>
              <p className="text-sm text-muted-foreground">
                일일 단백질 목표 {calculationResults.macros.protein}g를 충족하기
                위해 다음과 같은 고품질 공급원에 집중하세요:
              </p>
              <ul className="mt-2 list-inside list-disc text-sm">
                <li>살코기 (닭 가슴살, 칠면조, 살코기 소고기)</li>
                <li>생선 (연어, 참치, 틸라피아)</li>
                <li>그릭 요거트와 코티지 치즈</li>
                <li>계란과 계란 흰자</li>
                <li>식물성 옵션 (두부, 템페, 콩류)</li>
              </ul>
            </div>

            <div className="rounded-lg border p-4">
              <h3 className="text-lg font-medium text-carbs">
                탄수화물 공급원
              </h3>
              <p className="text-sm text-muted-foreground">
                일일 탄수화물 목표 {calculationResults.macros.carbs}g를 위해
                복합 탄수화물을 우선시하세요:
              </p>
              <ul className="mt-2 list-inside list-disc text-sm">
                <li>통곡물 (현미, 퀴노아, 귀리)</li>
                <li>전분질 채소 (고구마, 호박)</li>
                <li>과일 (베리류, 사과, 바나나)</li>
                <li>콩류 (콩, 렌틸콩, 병아리콩)</li>
              </ul>
            </div>

            <div className="rounded-lg border p-4">
              <h3 className="text-lg font-medium text-fat">
                건강한 지방 공급원
              </h3>
              <p className="text-sm text-muted-foreground">
                일일 지방 목표 {calculationResults.macros.fat}g에 도달하기 위해
                다음과 같은 건강한 공급원을 포함하세요:
              </p>
              <ul className="mt-2 list-inside list-disc text-sm">
                <li>아보카도</li>
                <li>견과류와 씨앗 (아몬드, 호두, 치아씨드)</li>
                <li>올리브 오일과 코코넛 오일</li>
                <li>지방이 많은 생선 (연어, 고등어)</li>
                <li>견과류 버터 (아몬드, 땅콩)</li>
              </ul>
            </div>

            <div className="rounded-lg border p-4">
              <h3 className="text-lg font-medium">식사 타이밍</h3>
              <p className="text-sm text-muted-foreground">
                {goal} 목표에 따라 다음과 같은 식사 타이밍 전략을 고려하세요:
              </p>
              <ul className="mt-2 list-inside list-disc text-sm">
                <li>
                  에너지 수준을 유지하기 위해 하루 종일 4-6회 소량의 식사를
                  하세요
                </li>
                <li>
                  근육 유지 및 성장을 지원하기 위해 각 식사에 단백질을
                  섭취하세요
                </li>
                <li>
                  운동 후 1-2시간 이내에 단백질과 탄수화물이 풍부한 식사를
                  하세요
                </li>
                <li>
                  취침 전 천천히 소화되는 단백질 공급원(예: 카제인, 코티지
                  치즈)을 섭취하세요
                </li>
              </ul>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
              맞춤형 식단 계획 받기
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default NutritionCalculatorPage;
