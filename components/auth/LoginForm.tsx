'use client';

import InputField from '@/components/auth/InputField';
import CommonButton from '@/components/common/CommonButton';
import { Box, Text } from '@radix-ui/themes';
import AuthFormLayout from './AuthFormLayout';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { getUserInfo } from '@/api/memberApi';
import Cookies from 'js-cookie';
import useSWR from 'swr';
import { useUserInfoStore } from '@/store/memberStore';

interface LoginFormProps {
  onLogin: (email: string, password: string) => Promise<Response>;
}

export default function LoginForm({ onLogin }: LoginFormProps) {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      alert('이메일과 비밀번호를 입력해주세요.');
      return;
    }

    const response = await onLogin(email, password);

    if (!response.ok) {
      // 응답이 정상적이지 않을 때 오류 처리
      alert('로그인에 실패했습니다.');
      throw new Error('Failed to login');
    } else {
      setEmail('');
      setPassword('');
      router.push('/study');
      alert('로그인에 성공했습니다.');
    }
  };

  // 유저정보조회
  const accessToken = Cookies.get('access_token');
  const { setUserInfo } = useUserInfoStore();
  const { data } = useSWR(accessToken ? ['userInfo'] : null, async () => {
    const result = await getUserInfo();
    const storedUserInfo = { name: result.name, course: result.course, image: result.image };
    localStorage.setItem('userInfo', JSON.stringify(storedUserInfo));
    setUserInfo(storedUserInfo);
  });

  return (
    <AuthFormLayout title="로그인">
      <form onSubmit={handleLogin}>
        <div className="input_box">
          <InputField
            label="이메일"
            id="user_email"
            placeholder="이메일을 입력해주세요."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <InputField
            label="비밀번호"
            id="user_pw"
            type="password"
            placeholder="비밀번호를 입력해주세요."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <Box mt="6" className="btn_login">
          <CommonButton type="submit" style="dark_purple">
            로그인
          </CommonButton>
          {/* <Text as="p" align="right" mt="2">
            <Link href={'/pwfind'}>비밀번호 찾기</Link>
          </Text> */}
        </Box>
      </form>
      <Box mt="6" className="btn_join">
        <Text as="p">아직 회원이 아니신가요?</Text>
        <Box mt="3">
          <CommonButton type="link" href="/join" style="light_purple">
            회원가입
          </CommonButton>
        </Box>
      </Box>
    </AuthFormLayout>
  );
}
