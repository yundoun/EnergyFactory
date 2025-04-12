import { useState } from 'react';
import { Bot, Send, User } from 'lucide-react';
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
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '../components/common/Tabs';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '../components/common/Avatar';
import Badge from '../components/common/Badge';
import { ScrollArea } from '../components/common/ScrollArea';
import Separator from '../components/common/Separator';

// 샘플 메시지 데이터
const initialMessages = [
  {
    id: '1',
    role: 'assistant',
    content:
      '안녕하세요! FitGrocery 다이어트 코치입니다. 피트니스 목표에 기반한 식단 계획, 영양 조언, 쇼핑 추천을 도와드릴 수 있습니다. 오늘 어떻게 도와드릴까요?',
    timestamp: new Date(),
  },
];

const DietCoachPage = () => {
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState('');

  // 메시지 전송 처리 (UI 데모용)
  const handleSend = () => {
    if (input.trim()) {
      // 사용자 메시지 추가
      const userMessage = {
        id: Date.now().toString(),
        role: 'user',
        content: input,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, userMessage]);
      setInput('');

      // AI 응답 시뮬레이션
      setTimeout(() => {
        const responses = [
          '근육 증가라는 피트니스 목표에 따라, 체중 kg당 1.6-2.2g의 단백질 섭취를 권장합니다. 고단백 카테고리에는 그릭 요거트, 닭 가슴살, 웨이 프로틴과 같은 좋은 옵션이 있습니다.',
          '지중해식 식단 계획을 위해 올리브 오일, 생선, 견과류, 그리고 많은 채소로 시작하는 것을 추천합니다. 이 재료들을 기반으로 주간 식단 계획을 만들어 드릴까요?',
          '현재 장바구니에 필수 영양소가 부족합니다. 미량 영양소를 위한 잎채소와 매크로 균형을 위한 아보카도나 견과류와 같은 건강한 지방을 추가하는 것을 고려해보세요.',
          '프로필에 따르면, 현재 활동 수준으로 체중을 유지하기 위해 하루 약 2,400 칼로리가 필요합니다. 체중을 안전하게 감량하려면 균형 잡힌 매크로 비율로 2,000-2,200 칼로리를 목표로 하세요.',
        ];

        const aiMessage = {
          id: Date.now().toString(),
          role: 'assistant',
          content: responses[Math.floor(Math.random() * responses.length)],
          timestamp: new Date(),
        };

        setMessages((prev) => [...prev, aiMessage]);
      }, 1000);
    }
  };

  // 엔터 키 처리
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="container py-10">
      <div className="grid gap-6 lg:grid-cols-[300px_1fr]">
        <div className="hidden lg:block">
          <Card className="h-full">
            <CardHeader>
              <CardTitle>다이어트 코치</CardTitle>
              <CardDescription>AI 기반 영양 어시스턴트</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h3 className="text-sm font-medium">내 프로필</h3>
                <div className="flex items-center gap-2">
                  <Avatar>
                    <AvatarImage src="/placeholder.svg" alt="사용자" />
                    <AvatarFallback>U</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">홍길동</p>
                    <p className="text-xs text-muted-foreground">
                      hong@example.com
                    </p>
                  </div>
                </div>
              </div>
              <Separator />
              <div className="space-y-2">
                <h3 className="text-sm font-medium">피트니스 목표</h3>
                <Badge variant="outline" className="text-xs">
                  근육 증가
                </Badge>
              </div>
              <div className="space-y-2">
                <h3 className="text-sm font-medium">일일 목표</h3>
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground">칼로리</p>
                    <p className="text-sm font-medium">2,400</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground">단백질</p>
                    <p className="text-sm font-medium">180g</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground">탄수화물</p>
                    <p className="text-sm font-medium">240g</p>
                  </div>
                </div>
              </div>
              <Separator />
              <div className="space-y-2">
                <h3 className="text-sm font-medium">코치 기능</h3>
                <Tabs defaultValue="meal-planning">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="meal-planning" className="text-xs">
                      식단
                    </TabsTrigger>
                    <TabsTrigger value="nutrition" className="text-xs">
                      영양
                    </TabsTrigger>
                    <TabsTrigger value="shopping" className="text-xs">
                      쇼핑
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent value="meal-planning" className="space-y-2 pt-2">
                    <p className="text-xs text-muted-foreground">
                      목표와 선호도에 맞는 맞춤형 식단 계획을 받아보세요.
                    </p>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full text-xs">
                      식단 계획 생성
                    </Button>
                  </TabsContent>
                  <TabsContent value="nutrition" className="space-y-2 pt-2">
                    <p className="text-xs text-muted-foreground">
                      영양에 관한 질문을 하고 전문가 조언을 받아보세요.
                    </p>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full text-xs">
                      영양 FAQ
                    </Button>
                  </TabsContent>
                  <TabsContent value="shopping" className="space-y-2 pt-2">
                    <p className="text-xs text-muted-foreground">
                      식단 계획에 기반한 쇼핑 추천을 받아보세요.
                    </p>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full text-xs">
                      쇼핑 목록
                    </Button>
                  </TabsContent>
                </Tabs>
              </div>
            </CardContent>
          </Card>
        </div>
        <Card className="h-[calc(100vh-200px)] flex flex-col">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/placeholder.svg" alt="다이어트 코치" />
                <AvatarFallback>
                  <Bot className="h-4 w-4" />
                </AvatarFallback>
              </Avatar>
              <div>
                <CardTitle>다이어트 코치</CardTitle>
                <CardDescription>AI 기반</CardDescription>
              </div>
            </div>
          </CardHeader>
          <Separator />
          <CardContent className="flex-1 p-0">
            <ScrollArea className="h-[calc(100vh-350px)] p-4">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${
                      message.role === 'user' ? 'justify-end' : 'justify-start'
                    }`}>
                    <div
                      className={`flex gap-2 max-w-[80%] ${
                        message.role === 'user' ? 'flex-row-reverse' : ''
                      }`}>
                      <Avatar className="h-8 w-8 mt-0.5">
                        <AvatarFallback>
                          {message.role === 'user' ? (
                            <User className="h-4 w-4" />
                          ) : (
                            <Bot className="h-4 w-4" />
                          )}
                        </AvatarFallback>
                      </Avatar>
                      <div
                        className={`rounded-lg px-3 py-2 ${
                          message.role === 'user'
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-muted'
                        }`}>
                        <p className="text-sm">{message.content}</p>
                        <p className="text-xs opacity-50 mt-1">
                          {message.timestamp.toLocaleTimeString([], {
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
          <Separator />
          <CardFooter className="p-4">
            <div className="flex w-full items-center gap-2">
              <Input
                placeholder="영양, 식단 계획 또는 쇼핑 추천에 대해 질문하세요..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-1"
              />
              <Button size="icon" onClick={handleSend} disabled={!input.trim()}>
                <Send className="h-4 w-4" />
                <span className="sr-only">전송</span>
              </Button>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default DietCoachPage;
