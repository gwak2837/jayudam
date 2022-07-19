import Image from 'next/future/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { useRecoilState } from 'recoil'
import { toastApolloError } from 'src/apollo/error'
import Checkbox from 'src/components/atoms/Checkbox'
import SingleSelectionButtons from 'src/components/atoms/SingleSelectionButtons'
import PageHead from 'src/components/PageHead'
import {
  useIsUniqueNicknameLazyQuery,
  useUpdateUserMutation,
} from 'src/graphql/generated/types-and-hooks'
import { TABLET_MIN_WIDTH } from 'src/utils/constants'
import { currentUser } from 'src/utils/recoil'
import styled from 'styled-components'

export default function RegisterPage() {
  const [{ nickname }, setCurrentUser] = useRecoilState(currentUser)

  // Form 상태 관리
  const {
    formState: { errors },
    getValues,
    handleSubmit,
    register,
    setValue,
    watch,
  } = useForm<RegisterFormValues>({
    defaultValues: {
      nickname: '',
      personalDataStoringYear: 1,
      termsAgreement: false,
      privacyAgreement: false,
      locationAgreement: false,
      adAgreement: false,
    },
  })

  const hasFormError = Object.keys(errors).length !== 0

  // 로그인 했으면 홈으로 돌려보내기
  const router = useRouter()

  useEffect(() => {
    if (nickname && !getValues('nickname')) {
      router.replace('/')
      toast.warn('이미 회원가입을 완료했어요')
    }
  }, [getValues, nickname, router])

  // Nickname 중복 검사
  const [isUniqueNickname, { loading: isUniqueNicknameLoading }] = useIsUniqueNicknameLazyQuery({
    onError: toastApolloError,
  })

  const isUniqueNicknameTimeout = useRef<any>(null)

  function checkUniqueNicknameWithDebounce() {
    return new Promise<boolean | string>((resolve, reject) => {
      clearTimeout(isUniqueNicknameTimeout.current)
      isUniqueNicknameTimeout.current = setTimeout(() => {
        isUniqueNickname({
          variables: {
            nickname: getValues('nickname'),
          },
        })
          .then(({ data, variables }) => {
            if (data?.isUniqueNickname) {
              return resolve(true)
            } else {
              return resolve(`이미 사용 중인 이름이에요. ${variables?.nickname}`)
            }
          })
          .catch((error) => reject(error))
      }, 500)
    })
  }

  // 사용자 정보 업데이트
  const [updateUserMutation, { loading: updateUserLoading }] = useUpdateUserMutation({
    onCompleted: ({ updateUser }) => {
      if (updateUser?.nickname) {
        setCurrentUser({ nickname: updateUser.nickname })

        const redirectToAfterLogin = sessionStorage.getItem('redirectToAfterLogin') ?? '/'
        sessionStorage.removeItem('redirectToAfterLogin')

        if (redirectToAfterLogin === '/@null' || redirectToAfterLogin === '/@undefined') {
          router.replace(`/@${updateUser.nickname}`)
        } else {
          router.replace(redirectToAfterLogin)
        }

        toast.success('정보 등록에 성공했어요')
      }
    },
    onError: toastApolloError,
  })

  function updateUser(input: RegisterFormValues) {
    const {
      nickname,
      personalDataStoringYear,
      termsAgreement,
      privacyAgreement,
      locationAgreement,
      adAgreement,
    } = input

    updateUserMutation({
      variables: {
        input: {
          nickname,
          serviceAgreement: {
            personalDataStoringYear,
            termsAgreement,
            privacyAgreement,
            locationAgreement,
            adAgreement,
          },
        },
      },
    })
  }

  return (
    <PageHead title="회원가입 - 자유담" description="정보를 기입해주세요">
      <FlexCenter>
        <GridMinWidth onSubmit={handleSubmit(updateUser)}>
          <GridSmallGap>
            <Link href="/">
              <PaddingImage src="/images/logo.webp" alt="jayudam logo" />
            </Link>
            <P>
              회원가입에 필요한 정보를 기입해주세요 <br />
            </P>
          </GridSmallGap>

          <GridSmallGap>
            <label htmlFor="nickname">
              <H3>이름</H3>
            </label>
            <div>
              <Input
                disabled={updateUserLoading}
                placeholder="다른 사람에게 보여질 나만의 이름을 설정해주세요"
                {...register('nickname', {
                  required: '이름을 입력해주세요',
                  minLength: {
                    value: 2,
                    message: '2자 이상 입력해주세요',
                  },
                  maxLength: {
                    value: 20,
                    message: '20자 이내로 입력해주세요',
                  },
                  pattern: {
                    value: /^[\w!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?\uAC00-\uD79D]+$/u,
                    message: '대문자,소문자,숫자,특수문자,한글만 가능합니다.',
                  },
                  validate: checkUniqueNicknameWithDebounce,
                })}
              />
              {isUniqueNicknameLoading ? (
                <H5>이름 유효성 확인 중...</H5>
              ) : errors.nickname ? (
                <WarningH5>{errors.nickname.message}</WarningH5>
              ) : (
                <H5>{watch('nickname').length} / 20</H5>
              )}
            </div>
          </GridSmallGap>

          <GridSmallGap>
            <H3>휴면계정 전환 기간</H3>
            <SingleSelectionButtons
              onClick={(e) => setValue('personalDataStoringYear', e)}
              values={[1, 3, 5, 10]}
            >
              <div>1년</div>
              <div>3년</div>
              <div>5년</div>
              <div>10년</div>
            </SingleSelectionButtons>
          </GridSmallGap>

          <GridSmallGap>
            <div>
              <Checkbox
                id="1"
                onChange={(v) => setValue('termsAgreement', v, { shouldValidate: true })}
              >
                <a
                  href="https://jayudam.notion.site/2022-07-01-a668b74717fa4b39b022610cde11911d"
                  target="_blank"
                  rel="noreferrer"
                >
                  자유담 이용약관
                </a>{' '}
                동의 <PrimarySmallBold>(필수)</PrimarySmallBold>
              </Checkbox>
              <input
                type="hidden"
                {...register('termsAgreement', {
                  validate: (value) => value === true || '자유담 이용약관에 동의해주세요',
                })}
              />
              {errors.termsAgreement && <WarningH5>{errors.termsAgreement.message}</WarningH5>}
            </div>

            <div>
              <Checkbox
                id="2"
                onChange={(v) => setValue('privacyAgreement', v, { shouldValidate: true })}
              >
                <a
                  href="https://jayudam.notion.site/2022-06-29-a393f91912884de2b9c54ce8b9ab2208"
                  target="_blank"
                  rel="noreferrer"
                >
                  개인정보처리방침
                </a>{' '}
                동의 <PrimarySmallBold>(필수)</PrimarySmallBold>
              </Checkbox>
              <input
                type="hidden"
                {...register('privacyAgreement', {
                  validate: (value) => value === true || '자유담 개인정보처리방침에 동의해주세요',
                })}
              />
              {errors.privacyAgreement && <WarningH5>{errors.privacyAgreement.message}</WarningH5>}
            </div>

            <Checkbox id="3" onChange={(v) => setValue('locationAgreement', v)}>
              <a href="https://jayudam.notion.site" target="_blank" rel="noreferrer">
                위치기반서비스 이용약관
              </a>{' '}
              동의 <LightSmallBold>(선택)</LightSmallBold>
            </Checkbox>

            <Checkbox id="4" onChange={(v) => setValue('adAgreement', v)}>
              이벤트/혜택 정보 수신 동의 <LightSmallBold>(선택)</LightSmallBold>
            </Checkbox>
            <LightSmallP>
              자유담에서 제공하는 이벤트/혜택 등 다양한 정보를 휴대전화 문자 또는 이메일로 받아보실
              수 있습니다.
            </LightSmallP>
          </GridSmallGap>

          <div>
            <H3>따뜻하고 행복하게</H3>
            <H4>일상을 채울 준비가 되셨나요?</H4>
            <SubmitButton disabled={hasFormError || updateUserLoading} type="submit">
              네, 그럼요!
            </SubmitButton>
          </div>
        </GridMinWidth>
      </FlexCenter>
    </PageHead>
  )
}

type RegisterFormValues = {
  nickname: string
  personalDataStoringYear: number
  termsAgreement: boolean
  privacyAgreement: boolean
  locationAgreement: boolean
  adAgreement: boolean
}

const FlexCenter = styled.div`
  @media (min-width: ${TABLET_MIN_WIDTH}) {
    display: flex;
    justify-content: center;
  }
`

const GridMinWidth = styled.form`
  display: grid;
  padding: 2rem 1rem;
  gap: 3rem;

  @media (min-width: ${TABLET_MIN_WIDTH}) {
    min-width: ${TABLET_MIN_WIDTH};
  }
`

const GridSmallGap = styled.div`
  display: grid;
  gap: 1rem;

  > a {
    text-align: center;
  }
`

const P = styled.p`
  background: ${(p) => p.theme.background};
  border-radius: 10px;
  line-height: 2rem;
  padding: 1.5rem;
  text-align: center;
  max-width: ${TABLET_MIN_WIDTH};
`

const LightSmallP = styled(P)`
  color: ${(p) => p.theme.primaryTextAchromatic};
  font-size: 0.9rem;
`

const PrimarySmallBold = styled.span`
  color: ${(p) => p.theme.primaryText};
  font-size: 0.8rem;
  font-weight: 500;
`

const LightSmallBold = styled.span`
  color: ${(p) => p.theme.primaryTextAchromatic};
  font-size: 0.8rem;
  font-weight: 500;
`

const PaddingImage = styled(Image)`
  padding: 2rem 1rem;
  min-width: 200px;
  width: 50%;
  margin: auto;
`

const Input = styled.input`
  border: 1px solid #888;
  border-radius: 4px;
  padding: 0.7rem;
  width: 100%;

  :focus {
    outline: none;
    border-color: ${(p) => p.theme.primaryText};
  }
`

const H3 = styled.h3`
  font-weight: 500;
`

const H4 = styled.h4`
  font-weight: 500;
  margin: 0.5rem 0 2rem;
`

const H5 = styled.h5`
  font-weight: 500;
  margin: 0.5rem 0 0;
`

const WarningH5 = styled(H5)`
  color: ${(p) => p.theme.warn};
`

export const SubmitButton = styled.button`
  padding: 1rem;
  width: 100%;
  border-radius: 8px;
  background: ${(p) => (p.disabled ? p.theme.primaryAchromatic : p.theme.primary)};
  color: #fff;
  transition: background 0.2s ease-out;
  cursor: ${(p) => (p.disabled ? 'not-allowed' : 'pointer')};

  :hover {
    background: ${(p) => (p.disabled ? p.theme.primaryAchromatic : p.theme.primaryText)};
  }
`
