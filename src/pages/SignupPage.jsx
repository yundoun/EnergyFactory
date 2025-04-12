import { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import Label from '../components/common/Label';
import Select from '../components/common/Select';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '../components/common/Tabs';
import Separator from '../components/common/Separator';
import Checkbox from '../components/common/Checkbox';
import { useToast } from '../hooks/useToast';

const SignupPage = () => {
  const [step, setStep] = useState(1);
  const { toast } = useToast(); // 토스트 기능이 구현되어 있다고 가정

  // 폼 제출 핸들러 (UI 데모용)
  const handleBasicInfoSubmit = (e) => {
    e.preventDefault();
    setStep(2);
  };

  const handlePhysicalInfoSubmit = (e) => {
    e.preventDefault();
    setStep(3);
  };

  const handleFitnessGoalsSubmit = (e) => {
    e.preventDefault();
    toast({
      title: '계정 생성 완료!',
      description: 'FitGrocery 계정이 성공적으로 생성되었습니다.',
    });
  };

  const dietaryRestrictions = [
    { id: 'vegetarian', label: '채식주의' },
    { id: 'vegan', label: '비건' },
    { id: 'gluten-free', label: '글루텐 프리' },
    { id: 'dairy-free', label: '유제품 프리' },
    { id: 'keto', label: '케토' },
    { id: 'paleo', label: '팔레오' },
  ];

  return (
    <div className="container max-w-3xl py-10">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">FitGrocery 계정 만들기</h1>
          <p className="text-muted-foreground">
            FitGrocery에 가입하여 맞춤형 영양 계획을 받고 피트니스 목표에 맞게
            쇼핑하세요.
          </p>
        </div>

        <Tabs value={`step-${step}`} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="step-1" onClick={() => setStep(1)}>
              기본 정보
            </TabsTrigger>
            <TabsTrigger value="step-2" onClick={() => step >= 2 && setStep(2)}>
              신체 정보
            </TabsTrigger>
            <TabsTrigger value="step-3" onClick={() => step >= 3 && setStep(3)}>
              피트니스 목표
            </TabsTrigger>
          </TabsList>

          <TabsContent value="step-1" className="space-y-6 pt-4">
            <form onSubmit={handleBasicInfoSubmit} className="space-y-6">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">이름</Label>
                  <Input id="name" placeholder="홍길동" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">이메일</Label>
                  <Input id="email" placeholder="example@email.com" />
                </div>
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="password">비밀번호</Label>
                  <Input id="password" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">비밀번호 확인</Label>
                  <Input id="confirmPassword" type="password" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">주소</Label>
                <Input id="address" placeholder="서울시 강남구..." />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">전화번호</Label>
                <Input id="phone" placeholder="010-1234-5678" />
              </div>
              <div className="flex justify-end">
                <Button type="submit">계속</Button>
              </div>
            </form>
            <div className="mt-4 text-center">
              <p className="text-sm text-muted-foreground">
                이미 계정이 있으신가요?{' '}
                <Link
                  to="/login"
                  className="text-primary underline underline-offset-4">
                  로그인
                </Link>
              </p>
            </div>
          </TabsContent>

          <TabsContent value="step-2" className="space-y-6 pt-4">
            <form onSubmit={handlePhysicalInfoSubmit} className="space-y-6">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="height">키 (cm)</Label>
                  <Input id="height" type="number" placeholder="175" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="weight">몸무게 (kg)</Label>
                  <Input id="weight" type="number" placeholder="70" />
                </div>
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="age">나이</Label>
                  <Input id="age" type="number" placeholder="30" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="gender">성별</Label>
                  <Select id="gender">
                    <option value="male">남성</option>
                    <option value="female">여성</option>
                    <option value="other">기타</option>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="activity">활동 수준</Label>
                <Select id="activity">
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
                <p className="text-sm text-muted-foreground mt-1">
                  이는 일일 칼로리 요구량을 계산하는 데 도움이 됩니다.
                </p>
              </div>
              <div className="flex justify-between">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setStep(1)}>
                  뒤로
                </Button>
                <Button type="submit">계속</Button>
              </div>
            </form>
          </TabsContent>

          <TabsContent value="step-3" className="space-y-6 pt-4">
            <form onSubmit={handleFitnessGoalsSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="goal">피트니스 목표</Label>
                <Select id="goal">
                  <option value="weight-loss">체중 감량</option>
                  <option value="muscle-gain">근육 증가</option>
                  <option value="maintenance">체중 유지</option>
                  <option value="athletic-performance">운동 성능 향상</option>
                  <option value="general-health">일반 건강</option>
                </Select>
                <p className="text-sm text-muted-foreground mt-1">
                  이는 영양 계획을 맞춤화하는 데 도움이 됩니다.
                </p>
              </div>

              <div>
                <Label>식이 제한</Label>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  {dietaryRestrictions.map((item) => (
                    <div key={item.id} className="flex items-center space-x-2">
                      <Checkbox id={item.id} />
                      <label htmlFor={item.id} className="text-sm font-normal">
                        {item.label}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="allergies">식품 알레르기</Label>
                <Input
                  id="allergies"
                  placeholder="예: 견과류, 조개류, 유제품"
                />
                <p className="text-sm text-muted-foreground mt-1">
                  식품 알레르기나 불내증을 나열하세요.
                </p>
              </div>

              <Separator />

              <div className="space-y-2">
                <h3 className="text-lg font-medium">영양 계산</h3>
                <p className="text-sm text-muted-foreground">
                  귀하의 정보를 바탕으로 베네딕트-해리스 방정식을 사용하여 일일
                  칼로리 요구량을 계산하고 목표에 맞는 최적의 영양소 비율을
                  추천해 드립니다.
                </p>
              </div>

              <div className="flex justify-between">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setStep(2)}>
                  뒤로
                </Button>
                <Button type="submit">계정 생성</Button>
              </div>
            </form>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default SignupPage;
