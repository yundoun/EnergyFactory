import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Dumbbell } from 'lucide-react';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import Label from '../components/common/Label';
import Checkbox from '../components/common/Checkbox';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../components/common/Card';
import Separator from '../components/common/Separator';
import { useToast } from '../hooks/useToast';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const { toast } = useToast(); // 토스트 기능이 구현되어 있다고 가정

  // 로그인 핸들러 (UI 데모용)
  const handleLogin = (e) => {
    e.preventDefault();

    // 실제 구현에서는 여기서 인증 로직을 처리합니다
    if (email && password) {
      toast({
        title: '로그인 성공!',
        description: 'FitGrocery에 오신 것을 환영합니다.',
      });

      // 로그인 성공 후 홈페이지로 리디렉션 (실제 구현 시)
      // navigate("/")
    } else {
      toast({
        title: '로그인 실패',
        description: '이메일과 비밀번호를 모두 입력해주세요.',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="container flex h-screen max-w-md items-center justify-center py-10">
      <Card className="w-full">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-center mb-2">
            <Dumbbell className="h-10 w-10 text-primary" />
          </div>
          <CardTitle className="text-2xl text-center">
            FitGrocery 로그인
          </CardTitle>
          <CardDescription className="text-center">
            계정에 로그인하여 맞춤형 영양 계획을 확인하세요
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">이메일</Label>
              <Input
                id="email"
                type="email"
                placeholder="example@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">비밀번호</Label>
                <Link
                  to="/forgot-password"
                  className="text-xs text-primary underline-offset-4 hover:underline">
                  비밀번호 찾기
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="remember"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <label
                htmlFor="remember"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                로그인 상태 유지
              </label>
            </div>
            <Button type="submit" className="w-full">
              로그인
            </Button>
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <Separator className="w-full" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-muted-foreground">또는</span>
            </div>
          </div>

          <div className="grid gap-2">
            <Button variant="outline" className="w-full">
              소셜 계정으로 로그인
            </Button>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
          <div className="text-center text-sm">
            아직 계정이 없으신가요?{' '}
            <Link
              to="/signup"
              className="text-primary underline-offset-4 hover:underline">
              회원가입
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default LoginPage;
