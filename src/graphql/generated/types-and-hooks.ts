import { gql } from '@apollo/client'
import * as Apollo from '@apollo/client'
import { FieldPolicy, FieldReadFunction, TypePolicies, TypePolicy } from '@apollo/client/cache'
export type Maybe<T> = T | null
export type InputMaybe<T> = Maybe<T>
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] }
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> }
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> }
const defaultOptions = {} as const
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
  Any: any
  DateTime: any
  EmailAddress: any
  JWT: any
  Latitude: any
  Longitude: any
  NonEmptyString: any
  NonNegativeInt: any
  PositiveInt: any
  URL: any
  UUID: any
}

export type Cert = {
  __typename?: 'Cert'
  content?: Maybe<Scalars['String']>
  effectiveDate?: Maybe<Scalars['DateTime']>
  id: Scalars['ID']
  issueDate?: Maybe<Scalars['DateTime']>
  location?: Maybe<Scalars['String']>
  name?: Maybe<Scalars['String']>
  type: CertType
}

export type CertAgreement = {
  __typename?: 'CertAgreement'
  immunizationSince?: Maybe<Scalars['DateTime']>
  sexualCrimeSince?: Maybe<Scalars['DateTime']>
  showBirthdate: Scalars['Boolean']
  showImmunization: Scalars['Boolean']
  showLegalName: Scalars['Boolean']
  showSTDTest: Scalars['Boolean']
  showSex: Scalars['Boolean']
  showSexualCrime: Scalars['Boolean']
  stdTestSince?: Maybe<Scalars['DateTime']>
}

export type CertAgreementInput = {
  immunizationSince?: InputMaybe<Scalars['DateTime']>
  sexualCrimeSince?: InputMaybe<Scalars['DateTime']>
  showBirthdate?: InputMaybe<Scalars['Boolean']>
  showImmunization?: InputMaybe<Scalars['Boolean']>
  showLegalName?: InputMaybe<Scalars['Boolean']>
  showSTDTest?: InputMaybe<Scalars['Boolean']>
  showSex?: InputMaybe<Scalars['Boolean']>
  showSexualCrime?: InputMaybe<Scalars['Boolean']>
  stdTestSince?: InputMaybe<Scalars['DateTime']>
}

export type CertCreation = {
  birthdate: Scalars['DateTime']
  issueDate: Scalars['DateTime']
  legalName: Scalars['NonEmptyString']
  sex: Sex
  verificationCode: Scalars['NonEmptyString']
}

export enum CertType {
  ClinicalLaboratoryTest = 'CLINICAL_LABORATORY_TEST',
  Immunization = 'IMMUNIZATION',
  SexualCrime = 'SEXUAL_CRIME',
  StdTest = 'STD_TEST',
}

export type Certs = {
  __typename?: 'Certs'
  birthdate?: Maybe<Scalars['DateTime']>
  creationTime: Scalars['DateTime']
  id: Scalars['ID']
  immunizationCerts?: Maybe<Array<Cert>>
  legalName?: Maybe<Scalars['String']>
  sex?: Maybe<Sex>
  sexualCrimeCerts?: Maybe<Array<Cert>>
  stdTestCerts?: Maybe<Array<Cert>>
}

export enum Grade {
  Enterprise = 'ENTERPRISE',
  Free = 'FREE',
  Pro = 'PRO',
}

export type Mutation = {
  __typename?: 'Mutation'
  createPost?: Maybe<Post>
  deletePost?: Maybe<Post>
  disconnectFromGoogleOAuth?: Maybe<Scalars['Boolean']>
  disconnectFromKakaoOAuth?: Maybe<Scalars['Boolean']>
  disconnectFromNaverOAuth?: Maybe<Scalars['Boolean']>
  logout?: Maybe<User>
  submitCert?: Maybe<Cert>
  takeAttendance?: Maybe<User>
  toggleLikingPost?: Maybe<Post>
  unregister?: Maybe<User>
  updateCertAgreement: Scalars['JWT']
  updateMyCertAgreement?: Maybe<CertAgreement>
  updatePost?: Maybe<Post>
  updateUser?: Maybe<User>
  verifyCertJWT?: Maybe<Certs>
  verifyTown?: Maybe<User>
  wakeUser?: Maybe<User>
}

export type MutationCreatePostArgs = {
  input: PostCreationInput
}

export type MutationDeletePostArgs = {
  id: Scalars['ID']
}

export type MutationSubmitCertArgs = {
  input: CertCreation
}

export type MutationToggleLikingPostArgs = {
  id: Scalars['ID']
}

export type MutationUpdateCertAgreementArgs = {
  input: CertAgreementInput
}

export type MutationUpdateMyCertAgreementArgs = {
  input?: InputMaybe<CertAgreementInput>
}

export type MutationUpdatePostArgs = {
  input: PostUpdateInput
}

export type MutationUpdateUserArgs = {
  input: UserUpdate
}

export type MutationVerifyCertJwtArgs = {
  jwt: Scalars['JWT']
}

export type MutationVerifyTownArgs = {
  lat: Scalars['Latitude']
  lon: Scalars['Longitude']
}

export enum OAuthProvider {
  Google = 'GOOGLE',
  Kakao = 'KAKAO',
  Naver = 'NAVER',
}

/** 기본값: 내림차순 */
export enum OrderDirection {
  Asc = 'ASC',
}

export type Pagination = {
  lastId?: InputMaybe<Scalars['ID']>
  lastValue?: InputMaybe<Scalars['Any']>
  limit: Scalars['PositiveInt']
}

export type Post = {
  __typename?: 'Post'
  author?: Maybe<User>
  commentCount?: Maybe<Scalars['NonNegativeInt']>
  comments?: Maybe<Array<Post>>
  content?: Maybe<Scalars['NonEmptyString']>
  creationTime?: Maybe<Scalars['DateTime']>
  deletionTime?: Maybe<Scalars['DateTime']>
  id: Scalars['ID']
  imageUrls?: Maybe<Array<Maybe<Scalars['URL']>>>
  isLiked: Scalars['Boolean']
  likeCount?: Maybe<Scalars['NonNegativeInt']>
  parentAuthor?: Maybe<User>
  sharedCount?: Maybe<Scalars['NonNegativeInt']>
  sharingPost?: Maybe<Post>
  updateTime?: Maybe<Scalars['DateTime']>
}

export type PostCreationInput = {
  content: Scalars['NonEmptyString']
  imageUrls?: InputMaybe<Array<Scalars['URL']>>
  parentPostId?: InputMaybe<Scalars['ID']>
}

export type PostUpdateInput = {
  content: Scalars['NonEmptyString']
  id: Scalars['ID']
  imageUrls?: InputMaybe<Array<Scalars['URL']>>
}

export type Query = {
  __typename?: 'Query'
  auth?: Maybe<User>
  certs?: Maybe<Certs>
  isUniqueUsername: Scalars['Boolean']
  myCertAgreement?: Maybe<CertAgreement>
  pendingCerts?: Maybe<Array<Cert>>
  post?: Maybe<Post>
  posts?: Maybe<Array<Post>>
  sampleCertJWT: Scalars['JWT']
  user?: Maybe<User>
  verificationHistories?: Maybe<Array<Certs>>
}

export type QueryIsUniqueUsernameArgs = {
  username: Scalars['NonEmptyString']
}

export type QueryPostArgs = {
  id: Scalars['ID']
}

export type QueryPostsArgs = {
  lastId?: InputMaybe<Scalars['ID']>
}

export type QueryUserArgs = {
  name?: InputMaybe<Scalars['NonEmptyString']>
}

export type ServiceAgreement = {
  __typename?: 'ServiceAgreement'
  adAgreement: Scalars['Boolean']
  adAgreementTime?: Maybe<Scalars['DateTime']>
  locationAgreement: Scalars['Boolean']
  locationAgreementTime?: Maybe<Scalars['DateTime']>
  personalDataStoringYear: Scalars['NonNegativeInt']
  privacyAgreement: Scalars['Boolean']
  privacyAgreementTime?: Maybe<Scalars['DateTime']>
  termsAgreement: Scalars['Boolean']
  termsAgreementTime?: Maybe<Scalars['DateTime']>
}

export type ServiceAgreementInput = {
  adAgreement?: InputMaybe<Scalars['Boolean']>
  locationAgreement?: InputMaybe<Scalars['Boolean']>
  personalDataStoringYear?: InputMaybe<Scalars['NonNegativeInt']>
  privacyAgreement?: InputMaybe<Scalars['Boolean']>
  termsAgreement?: InputMaybe<Scalars['Boolean']>
}

export enum Sex {
  Female = 'FEMALE',
  Male = 'MALE',
  Other = 'OTHER',
  Unknown = 'UNKNOWN',
}

export type Town = {
  __typename?: 'Town'
  count: Scalars['NonNegativeInt']
  name?: Maybe<Scalars['String']>
}

export type User = {
  __typename?: 'User'
  bio?: Maybe<Scalars['String']>
  birthyear?: Maybe<Scalars['Int']>
  blockingEndTime?: Maybe<Scalars['DateTime']>
  blockingStartTime?: Maybe<Scalars['DateTime']>
  certAgreement?: Maybe<CertAgreement>
  cherry: Scalars['NonNegativeInt']
  creationTime: Scalars['DateTime']
  email?: Maybe<Scalars['EmailAddress']>
  grade?: Maybe<Grade>
  id: Scalars['UUID']
  imageUrl?: Maybe<Scalars['URL']>
  imageUrls?: Maybe<Array<Scalars['URL']>>
  isVerifiedBirthday: Scalars['Boolean']
  isVerifiedBirthyear: Scalars['Boolean']
  isVerifiedEmail: Scalars['Boolean']
  isVerifiedName: Scalars['Boolean']
  isVerifiedPhoneNumber: Scalars['Boolean']
  isVerifiedSex: Scalars['Boolean']
  legalName?: Maybe<Scalars['NonEmptyString']>
  logoutTime?: Maybe<Scalars['DateTime']>
  name?: Maybe<Scalars['NonEmptyString']>
  nickname?: Maybe<Scalars['String']>
  oAuthProviders?: Maybe<Array<OAuthProvider>>
  serviceAgreement?: Maybe<ServiceAgreement>
  sex?: Maybe<Sex>
  towns?: Maybe<Array<Town>>
}

export type UserUpdate = {
  bio?: InputMaybe<Scalars['NonEmptyString']>
  certAgreement?: InputMaybe<CertAgreementInput>
  email?: InputMaybe<Scalars['EmailAddress']>
  imageUrls?: InputMaybe<Array<Scalars['URL']>>
  name?: InputMaybe<Scalars['NonEmptyString']>
  nickname?: InputMaybe<Scalars['NonEmptyString']>
  serviceAgreement?: InputMaybe<ServiceAgreementInput>
  town1Name?: InputMaybe<Scalars['NonEmptyString']>
  town2Name?: InputMaybe<Scalars['NonEmptyString']>
}

export type PostCardFragment = {
  __typename?: 'Post'
  id: string
  creationTime?: any | null
  updateTime?: any | null
  deletionTime?: any | null
  content?: any | null
  imageUrls?: Array<any | null> | null
  isLiked: boolean
  likeCount?: any | null
  commentCount?: any | null
  sharedCount?: any | null
  author?: {
    __typename?: 'User'
    id: any
    name?: any | null
    nickname?: string | null
    imageUrl?: any | null
  } | null
  parentAuthor?: { __typename?: 'User'; id: any; name?: any | null } | null
}

export type AuthQueryVariables = Exact<{ [key: string]: never }>

export type AuthQuery = {
  __typename?: 'Query'
  auth?: { __typename?: 'User'; id: any; name?: any | null } | null
}

export type LogoutMutationVariables = Exact<{ [key: string]: never }>

export type LogoutMutation = {
  __typename?: 'Mutation'
  logout?: { __typename?: 'User'; logoutTime?: any | null } | null
}

export type UserQueryVariables = Exact<{
  name?: InputMaybe<Scalars['NonEmptyString']>
}>

export type UserQuery = {
  __typename?: 'Query'
  user?: {
    __typename?: 'User'
    id: any
    bio?: string | null
    blockingStartTime?: any | null
    blockingEndTime?: any | null
    cherry: any
    grade?: Grade | null
    imageUrls?: Array<any> | null
    isVerifiedSex: boolean
    name?: any | null
    nickname?: string | null
    sex?: Sex | null
    towns?: Array<{ __typename?: 'Town'; count: any; name?: string | null }> | null
  } | null
}

export type MyProfileQueryVariables = Exact<{ [key: string]: never }>

export type MyProfileQuery = {
  __typename?: 'Query'
  user?: { __typename?: 'User'; id: any; imageUrl?: any | null } | null
}

export type PostsQueryVariables = Exact<{ [key: string]: never }>

export type PostsQuery = {
  __typename?: 'Query'
  posts?: Array<{
    __typename?: 'Post'
    id: string
    creationTime?: any | null
    updateTime?: any | null
    deletionTime?: any | null
    content?: any | null
    imageUrls?: Array<any | null> | null
    isLiked: boolean
    likeCount?: any | null
    commentCount?: any | null
    sharedCount?: any | null
    sharingPost?: {
      __typename?: 'Post'
      id: string
      creationTime?: any | null
      updateTime?: any | null
      deletionTime?: any | null
      content?: any | null
      imageUrls?: Array<any | null> | null
      author?: {
        __typename?: 'User'
        id: any
        name?: any | null
        nickname?: string | null
        imageUrl?: any | null
      } | null
    } | null
    author?: {
      __typename?: 'User'
      id: any
      name?: any | null
      nickname?: string | null
      imageUrl?: any | null
    } | null
    parentAuthor?: { __typename?: 'User'; id: any; name?: any | null } | null
  }> | null
}

export type PostQueryVariables = Exact<{
  id: Scalars['ID']
}>

export type PostQuery = {
  __typename?: 'Query'
  post?: {
    __typename?: 'Post'
    id: string
    creationTime?: any | null
    updateTime?: any | null
    deletionTime?: any | null
    content?: any | null
    imageUrls?: Array<any | null> | null
    isLiked: boolean
    likeCount?: any | null
    commentCount?: any | null
    sharedCount?: any | null
    sharingPost?: {
      __typename?: 'Post'
      id: string
      creationTime?: any | null
      updateTime?: any | null
      deletionTime?: any | null
      content?: any | null
      imageUrls?: Array<any | null> | null
      author?: {
        __typename?: 'User'
        id: any
        name?: any | null
        nickname?: string | null
        imageUrl?: any | null
      } | null
    } | null
    comments?: Array<{
      __typename?: 'Post'
      id: string
      creationTime?: any | null
      updateTime?: any | null
      deletionTime?: any | null
      content?: any | null
      imageUrls?: Array<any | null> | null
      isLiked: boolean
      likeCount?: any | null
      commentCount?: any | null
      sharedCount?: any | null
      comments?: Array<{
        __typename?: 'Post'
        id: string
        creationTime?: any | null
        updateTime?: any | null
        deletionTime?: any | null
        content?: any | null
        imageUrls?: Array<any | null> | null
        isLiked: boolean
        likeCount?: any | null
        commentCount?: any | null
        sharedCount?: any | null
        author?: {
          __typename?: 'User'
          id: any
          name?: any | null
          nickname?: string | null
          imageUrl?: any | null
        } | null
        parentAuthor?: { __typename?: 'User'; id: any; name?: any | null } | null
      }> | null
      author?: {
        __typename?: 'User'
        id: any
        name?: any | null
        nickname?: string | null
        imageUrl?: any | null
      } | null
      parentAuthor?: { __typename?: 'User'; id: any; name?: any | null } | null
    }> | null
    author?: {
      __typename?: 'User'
      id: any
      name?: any | null
      nickname?: string | null
      imageUrl?: any | null
    } | null
    parentAuthor?: { __typename?: 'User'; id: any; name?: any | null } | null
  } | null
}

export type ToggleLikingPostMutationVariables = Exact<{
  id: Scalars['ID']
}>

export type ToggleLikingPostMutation = {
  __typename?: 'Mutation'
  toggleLikingPost?: {
    __typename?: 'Post'
    id: string
    isLiked: boolean
    likeCount?: any | null
  } | null
}

export type MyCertAgreementQueryVariables = Exact<{ [key: string]: never }>

export type MyCertAgreementQuery = {
  __typename?: 'Query'
  myCertAgreement?: {
    __typename?: 'CertAgreement'
    showBirthdate: boolean
    showLegalName: boolean
    showSex: boolean
    showSTDTest: boolean
    stdTestSince?: any | null
    showImmunization: boolean
    immunizationSince?: any | null
    showSexualCrime: boolean
    sexualCrimeSince?: any | null
  } | null
}

export type UpdateCertAgreementMutationVariables = Exact<{
  input: CertAgreementInput
}>

export type UpdateCertAgreementMutation = { __typename?: 'Mutation'; updateCertAgreement: any }

export type IsUniqueUsernameQueryVariables = Exact<{
  username: Scalars['NonEmptyString']
}>

export type IsUniqueUsernameQuery = { __typename?: 'Query'; isUniqueUsername: boolean }

export type UpdateUserMutationVariables = Exact<{
  input: UserUpdate
}>

export type UpdateUserMutation = {
  __typename?: 'Mutation'
  updateUser?: { __typename?: 'User'; id: any; name?: any | null } | null
}

export type SampleCertJwtQueryVariables = Exact<{ [key: string]: never }>

export type SampleCertJwtQuery = { __typename?: 'Query'; sampleCertJWT: any }

export type VerifyCertJwtMutationVariables = Exact<{
  jwt: Scalars['JWT']
}>

export type VerifyCertJwtMutation = {
  __typename?: 'Mutation'
  verifyCertJWT?: {
    __typename?: 'Certs'
    id: string
    birthdate?: any | null
    legalName?: string | null
    sex?: Sex | null
    stdTestCerts?: Array<{
      __typename?: 'Cert'
      id: string
      content?: string | null
      effectiveDate?: any | null
      issueDate?: any | null
      location?: string | null
      name?: string | null
    }> | null
    immunizationCerts?: Array<{
      __typename?: 'Cert'
      id: string
      content?: string | null
      effectiveDate?: any | null
      issueDate?: any | null
      location?: string | null
      name?: string | null
    }> | null
    sexualCrimeCerts?: Array<{
      __typename?: 'Cert'
      id: string
      content?: string | null
      effectiveDate?: any | null
      issueDate?: any | null
      location?: string | null
      name?: string | null
    }> | null
  } | null
}

export const PostCardFragmentDoc = gql`
  fragment postCard on Post {
    id
    creationTime
    updateTime
    deletionTime
    content
    imageUrls
    isLiked
    likeCount
    commentCount
    sharedCount
    author {
      id
      name
      nickname
      imageUrl
    }
    parentAuthor {
      id
      name
    }
  }
`
export const AuthDocument = gql`
  query Auth {
    auth {
      id
      name
    }
  }
`

/**
 * __useAuthQuery__
 *
 * To run a query within a React component, call `useAuthQuery` and pass it any options that fit your needs.
 * When your component renders, `useAuthQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAuthQuery({
 *   variables: {
 *   },
 * });
 */
export function useAuthQuery(baseOptions?: Apollo.QueryHookOptions<AuthQuery, AuthQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<AuthQuery, AuthQueryVariables>(AuthDocument, options)
}
export function useAuthLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<AuthQuery, AuthQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<AuthQuery, AuthQueryVariables>(AuthDocument, options)
}
export type AuthQueryHookResult = ReturnType<typeof useAuthQuery>
export type AuthLazyQueryHookResult = ReturnType<typeof useAuthLazyQuery>
export type AuthQueryResult = Apollo.QueryResult<AuthQuery, AuthQueryVariables>
export const LogoutDocument = gql`
  mutation Logout {
    logout {
      logoutTime
    }
  }
`
export type LogoutMutationFn = Apollo.MutationFunction<LogoutMutation, LogoutMutationVariables>

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(
  baseOptions?: Apollo.MutationHookOptions<LogoutMutation, LogoutMutationVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, options)
}
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>
export type LogoutMutationOptions = Apollo.BaseMutationOptions<
  LogoutMutation,
  LogoutMutationVariables
>
export const UserDocument = gql`
  query User($name: NonEmptyString) {
    user(name: $name) {
      id
      bio
      blockingStartTime
      blockingEndTime
      cherry
      grade
      imageUrls
      isVerifiedSex
      name
      nickname
      sex
      towns {
        count
        name
      }
    }
  }
`

/**
 * __useUserQuery__
 *
 * To run a query within a React component, call `useUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserQuery({
 *   variables: {
 *      name: // value for 'name'
 *   },
 * });
 */
export function useUserQuery(baseOptions?: Apollo.QueryHookOptions<UserQuery, UserQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<UserQuery, UserQueryVariables>(UserDocument, options)
}
export function useUserLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<UserQuery, UserQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<UserQuery, UserQueryVariables>(UserDocument, options)
}
export type UserQueryHookResult = ReturnType<typeof useUserQuery>
export type UserLazyQueryHookResult = ReturnType<typeof useUserLazyQuery>
export type UserQueryResult = Apollo.QueryResult<UserQuery, UserQueryVariables>
export const MyProfileDocument = gql`
  query MyProfile {
    user {
      id
      imageUrl
    }
  }
`

/**
 * __useMyProfileQuery__
 *
 * To run a query within a React component, call `useMyProfileQuery` and pass it any options that fit your needs.
 * When your component renders, `useMyProfileQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMyProfileQuery({
 *   variables: {
 *   },
 * });
 */
export function useMyProfileQuery(
  baseOptions?: Apollo.QueryHookOptions<MyProfileQuery, MyProfileQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<MyProfileQuery, MyProfileQueryVariables>(MyProfileDocument, options)
}
export function useMyProfileLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<MyProfileQuery, MyProfileQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<MyProfileQuery, MyProfileQueryVariables>(MyProfileDocument, options)
}
export type MyProfileQueryHookResult = ReturnType<typeof useMyProfileQuery>
export type MyProfileLazyQueryHookResult = ReturnType<typeof useMyProfileLazyQuery>
export type MyProfileQueryResult = Apollo.QueryResult<MyProfileQuery, MyProfileQueryVariables>
export const PostsDocument = gql`
  query Posts {
    posts {
      ...postCard
      sharingPost {
        id
        creationTime
        updateTime
        deletionTime
        content
        imageUrls
        author {
          id
          name
          nickname
          imageUrl
        }
      }
    }
  }
  ${PostCardFragmentDoc}
`

/**
 * __usePostsQuery__
 *
 * To run a query within a React component, call `usePostsQuery` and pass it any options that fit your needs.
 * When your component renders, `usePostsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePostsQuery({
 *   variables: {
 *   },
 * });
 */
export function usePostsQuery(
  baseOptions?: Apollo.QueryHookOptions<PostsQuery, PostsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<PostsQuery, PostsQueryVariables>(PostsDocument, options)
}
export function usePostsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<PostsQuery, PostsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<PostsQuery, PostsQueryVariables>(PostsDocument, options)
}
export type PostsQueryHookResult = ReturnType<typeof usePostsQuery>
export type PostsLazyQueryHookResult = ReturnType<typeof usePostsLazyQuery>
export type PostsQueryResult = Apollo.QueryResult<PostsQuery, PostsQueryVariables>
export const PostDocument = gql`
  query Post($id: ID!) {
    post(id: $id) {
      ...postCard
      sharingPost {
        id
        creationTime
        updateTime
        deletionTime
        content
        imageUrls
        author {
          id
          name
          nickname
          imageUrl
        }
      }
      comments {
        ...postCard
        comments {
          ...postCard
        }
      }
    }
  }
  ${PostCardFragmentDoc}
`

/**
 * __usePostQuery__
 *
 * To run a query within a React component, call `usePostQuery` and pass it any options that fit your needs.
 * When your component renders, `usePostQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePostQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function usePostQuery(baseOptions: Apollo.QueryHookOptions<PostQuery, PostQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<PostQuery, PostQueryVariables>(PostDocument, options)
}
export function usePostLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<PostQuery, PostQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<PostQuery, PostQueryVariables>(PostDocument, options)
}
export type PostQueryHookResult = ReturnType<typeof usePostQuery>
export type PostLazyQueryHookResult = ReturnType<typeof usePostLazyQuery>
export type PostQueryResult = Apollo.QueryResult<PostQuery, PostQueryVariables>
export const ToggleLikingPostDocument = gql`
  mutation ToggleLikingPost($id: ID!) {
    toggleLikingPost(id: $id) {
      id
      isLiked
      likeCount
    }
  }
`
export type ToggleLikingPostMutationFn = Apollo.MutationFunction<
  ToggleLikingPostMutation,
  ToggleLikingPostMutationVariables
>

/**
 * __useToggleLikingPostMutation__
 *
 * To run a mutation, you first call `useToggleLikingPostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useToggleLikingPostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [toggleLikingPostMutation, { data, loading, error }] = useToggleLikingPostMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useToggleLikingPostMutation(
  baseOptions?: Apollo.MutationHookOptions<
    ToggleLikingPostMutation,
    ToggleLikingPostMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<ToggleLikingPostMutation, ToggleLikingPostMutationVariables>(
    ToggleLikingPostDocument,
    options
  )
}
export type ToggleLikingPostMutationHookResult = ReturnType<typeof useToggleLikingPostMutation>
export type ToggleLikingPostMutationResult = Apollo.MutationResult<ToggleLikingPostMutation>
export type ToggleLikingPostMutationOptions = Apollo.BaseMutationOptions<
  ToggleLikingPostMutation,
  ToggleLikingPostMutationVariables
>
export const MyCertAgreementDocument = gql`
  query MyCertAgreement {
    myCertAgreement {
      showBirthdate
      showLegalName
      showSex
      showSTDTest
      stdTestSince
      showImmunization
      immunizationSince
      showSexualCrime
      sexualCrimeSince
    }
  }
`

/**
 * __useMyCertAgreementQuery__
 *
 * To run a query within a React component, call `useMyCertAgreementQuery` and pass it any options that fit your needs.
 * When your component renders, `useMyCertAgreementQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMyCertAgreementQuery({
 *   variables: {
 *   },
 * });
 */
export function useMyCertAgreementQuery(
  baseOptions?: Apollo.QueryHookOptions<MyCertAgreementQuery, MyCertAgreementQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<MyCertAgreementQuery, MyCertAgreementQueryVariables>(
    MyCertAgreementDocument,
    options
  )
}
export function useMyCertAgreementLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<MyCertAgreementQuery, MyCertAgreementQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<MyCertAgreementQuery, MyCertAgreementQueryVariables>(
    MyCertAgreementDocument,
    options
  )
}
export type MyCertAgreementQueryHookResult = ReturnType<typeof useMyCertAgreementQuery>
export type MyCertAgreementLazyQueryHookResult = ReturnType<typeof useMyCertAgreementLazyQuery>
export type MyCertAgreementQueryResult = Apollo.QueryResult<
  MyCertAgreementQuery,
  MyCertAgreementQueryVariables
>
export const UpdateCertAgreementDocument = gql`
  mutation UpdateCertAgreement($input: CertAgreementInput!) {
    updateCertAgreement(input: $input)
  }
`
export type UpdateCertAgreementMutationFn = Apollo.MutationFunction<
  UpdateCertAgreementMutation,
  UpdateCertAgreementMutationVariables
>

/**
 * __useUpdateCertAgreementMutation__
 *
 * To run a mutation, you first call `useUpdateCertAgreementMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCertAgreementMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCertAgreementMutation, { data, loading, error }] = useUpdateCertAgreementMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateCertAgreementMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateCertAgreementMutation,
    UpdateCertAgreementMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<UpdateCertAgreementMutation, UpdateCertAgreementMutationVariables>(
    UpdateCertAgreementDocument,
    options
  )
}
export type UpdateCertAgreementMutationHookResult = ReturnType<
  typeof useUpdateCertAgreementMutation
>
export type UpdateCertAgreementMutationResult = Apollo.MutationResult<UpdateCertAgreementMutation>
export type UpdateCertAgreementMutationOptions = Apollo.BaseMutationOptions<
  UpdateCertAgreementMutation,
  UpdateCertAgreementMutationVariables
>
export const IsUniqueUsernameDocument = gql`
  query isUniqueUsername($username: NonEmptyString!) {
    isUniqueUsername(username: $username)
  }
`

/**
 * __useIsUniqueUsernameQuery__
 *
 * To run a query within a React component, call `useIsUniqueUsernameQuery` and pass it any options that fit your needs.
 * When your component renders, `useIsUniqueUsernameQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useIsUniqueUsernameQuery({
 *   variables: {
 *      username: // value for 'username'
 *   },
 * });
 */
export function useIsUniqueUsernameQuery(
  baseOptions: Apollo.QueryHookOptions<IsUniqueUsernameQuery, IsUniqueUsernameQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<IsUniqueUsernameQuery, IsUniqueUsernameQueryVariables>(
    IsUniqueUsernameDocument,
    options
  )
}
export function useIsUniqueUsernameLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<IsUniqueUsernameQuery, IsUniqueUsernameQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<IsUniqueUsernameQuery, IsUniqueUsernameQueryVariables>(
    IsUniqueUsernameDocument,
    options
  )
}
export type IsUniqueUsernameQueryHookResult = ReturnType<typeof useIsUniqueUsernameQuery>
export type IsUniqueUsernameLazyQueryHookResult = ReturnType<typeof useIsUniqueUsernameLazyQuery>
export type IsUniqueUsernameQueryResult = Apollo.QueryResult<
  IsUniqueUsernameQuery,
  IsUniqueUsernameQueryVariables
>
export const UpdateUserDocument = gql`
  mutation UpdateUser($input: UserUpdate!) {
    updateUser(input: $input) {
      id
      name
    }
  }
`
export type UpdateUserMutationFn = Apollo.MutationFunction<
  UpdateUserMutation,
  UpdateUserMutationVariables
>

/**
 * __useUpdateUserMutation__
 *
 * To run a mutation, you first call `useUpdateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserMutation, { data, loading, error }] = useUpdateUserMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateUserMutation(
  baseOptions?: Apollo.MutationHookOptions<UpdateUserMutation, UpdateUserMutationVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<UpdateUserMutation, UpdateUserMutationVariables>(
    UpdateUserDocument,
    options
  )
}
export type UpdateUserMutationHookResult = ReturnType<typeof useUpdateUserMutation>
export type UpdateUserMutationResult = Apollo.MutationResult<UpdateUserMutation>
export type UpdateUserMutationOptions = Apollo.BaseMutationOptions<
  UpdateUserMutation,
  UpdateUserMutationVariables
>
export const SampleCertJwtDocument = gql`
  query SampleCertJWT {
    sampleCertJWT
  }
`

/**
 * __useSampleCertJwtQuery__
 *
 * To run a query within a React component, call `useSampleCertJwtQuery` and pass it any options that fit your needs.
 * When your component renders, `useSampleCertJwtQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSampleCertJwtQuery({
 *   variables: {
 *   },
 * });
 */
export function useSampleCertJwtQuery(
  baseOptions?: Apollo.QueryHookOptions<SampleCertJwtQuery, SampleCertJwtQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<SampleCertJwtQuery, SampleCertJwtQueryVariables>(
    SampleCertJwtDocument,
    options
  )
}
export function useSampleCertJwtLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<SampleCertJwtQuery, SampleCertJwtQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<SampleCertJwtQuery, SampleCertJwtQueryVariables>(
    SampleCertJwtDocument,
    options
  )
}
export type SampleCertJwtQueryHookResult = ReturnType<typeof useSampleCertJwtQuery>
export type SampleCertJwtLazyQueryHookResult = ReturnType<typeof useSampleCertJwtLazyQuery>
export type SampleCertJwtQueryResult = Apollo.QueryResult<
  SampleCertJwtQuery,
  SampleCertJwtQueryVariables
>
export const VerifyCertJwtDocument = gql`
  mutation VerifyCertJWT($jwt: JWT!) {
    verifyCertJWT(jwt: $jwt) {
      id
      birthdate
      legalName
      sex
      stdTestCerts {
        id
        content
        effectiveDate
        issueDate
        location
        name
      }
      immunizationCerts {
        id
        content
        effectiveDate
        issueDate
        location
        name
      }
      sexualCrimeCerts {
        id
        content
        effectiveDate
        issueDate
        location
        name
      }
    }
  }
`
export type VerifyCertJwtMutationFn = Apollo.MutationFunction<
  VerifyCertJwtMutation,
  VerifyCertJwtMutationVariables
>

/**
 * __useVerifyCertJwtMutation__
 *
 * To run a mutation, you first call `useVerifyCertJwtMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useVerifyCertJwtMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [verifyCertJwtMutation, { data, loading, error }] = useVerifyCertJwtMutation({
 *   variables: {
 *      jwt: // value for 'jwt'
 *   },
 * });
 */
export function useVerifyCertJwtMutation(
  baseOptions?: Apollo.MutationHookOptions<VerifyCertJwtMutation, VerifyCertJwtMutationVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<VerifyCertJwtMutation, VerifyCertJwtMutationVariables>(
    VerifyCertJwtDocument,
    options
  )
}
export type VerifyCertJwtMutationHookResult = ReturnType<typeof useVerifyCertJwtMutation>
export type VerifyCertJwtMutationResult = Apollo.MutationResult<VerifyCertJwtMutation>
export type VerifyCertJwtMutationOptions = Apollo.BaseMutationOptions<
  VerifyCertJwtMutation,
  VerifyCertJwtMutationVariables
>
export type CertKeySpecifier = (
  | 'content'
  | 'effectiveDate'
  | 'id'
  | 'issueDate'
  | 'location'
  | 'name'
  | 'type'
  | CertKeySpecifier
)[]
export type CertFieldPolicy = {
  content?: FieldPolicy<any> | FieldReadFunction<any>
  effectiveDate?: FieldPolicy<any> | FieldReadFunction<any>
  id?: FieldPolicy<any> | FieldReadFunction<any>
  issueDate?: FieldPolicy<any> | FieldReadFunction<any>
  location?: FieldPolicy<any> | FieldReadFunction<any>
  name?: FieldPolicy<any> | FieldReadFunction<any>
  type?: FieldPolicy<any> | FieldReadFunction<any>
}
export type CertAgreementKeySpecifier = (
  | 'immunizationSince'
  | 'sexualCrimeSince'
  | 'showBirthdate'
  | 'showImmunization'
  | 'showLegalName'
  | 'showSTDTest'
  | 'showSex'
  | 'showSexualCrime'
  | 'stdTestSince'
  | CertAgreementKeySpecifier
)[]
export type CertAgreementFieldPolicy = {
  immunizationSince?: FieldPolicy<any> | FieldReadFunction<any>
  sexualCrimeSince?: FieldPolicy<any> | FieldReadFunction<any>
  showBirthdate?: FieldPolicy<any> | FieldReadFunction<any>
  showImmunization?: FieldPolicy<any> | FieldReadFunction<any>
  showLegalName?: FieldPolicy<any> | FieldReadFunction<any>
  showSTDTest?: FieldPolicy<any> | FieldReadFunction<any>
  showSex?: FieldPolicy<any> | FieldReadFunction<any>
  showSexualCrime?: FieldPolicy<any> | FieldReadFunction<any>
  stdTestSince?: FieldPolicy<any> | FieldReadFunction<any>
}
export type CertsKeySpecifier = (
  | 'birthdate'
  | 'creationTime'
  | 'id'
  | 'immunizationCerts'
  | 'legalName'
  | 'sex'
  | 'sexualCrimeCerts'
  | 'stdTestCerts'
  | CertsKeySpecifier
)[]
export type CertsFieldPolicy = {
  birthdate?: FieldPolicy<any> | FieldReadFunction<any>
  creationTime?: FieldPolicy<any> | FieldReadFunction<any>
  id?: FieldPolicy<any> | FieldReadFunction<any>
  immunizationCerts?: FieldPolicy<any> | FieldReadFunction<any>
  legalName?: FieldPolicy<any> | FieldReadFunction<any>
  sex?: FieldPolicy<any> | FieldReadFunction<any>
  sexualCrimeCerts?: FieldPolicy<any> | FieldReadFunction<any>
  stdTestCerts?: FieldPolicy<any> | FieldReadFunction<any>
}
export type MutationKeySpecifier = (
  | 'createPost'
  | 'deletePost'
  | 'disconnectFromGoogleOAuth'
  | 'disconnectFromKakaoOAuth'
  | 'disconnectFromNaverOAuth'
  | 'logout'
  | 'submitCert'
  | 'takeAttendance'
  | 'toggleLikingPost'
  | 'unregister'
  | 'updateCertAgreement'
  | 'updateMyCertAgreement'
  | 'updatePost'
  | 'updateUser'
  | 'verifyCertJWT'
  | 'verifyTown'
  | 'wakeUser'
  | MutationKeySpecifier
)[]
export type MutationFieldPolicy = {
  createPost?: FieldPolicy<any> | FieldReadFunction<any>
  deletePost?: FieldPolicy<any> | FieldReadFunction<any>
  disconnectFromGoogleOAuth?: FieldPolicy<any> | FieldReadFunction<any>
  disconnectFromKakaoOAuth?: FieldPolicy<any> | FieldReadFunction<any>
  disconnectFromNaverOAuth?: FieldPolicy<any> | FieldReadFunction<any>
  logout?: FieldPolicy<any> | FieldReadFunction<any>
  submitCert?: FieldPolicy<any> | FieldReadFunction<any>
  takeAttendance?: FieldPolicy<any> | FieldReadFunction<any>
  toggleLikingPost?: FieldPolicy<any> | FieldReadFunction<any>
  unregister?: FieldPolicy<any> | FieldReadFunction<any>
  updateCertAgreement?: FieldPolicy<any> | FieldReadFunction<any>
  updateMyCertAgreement?: FieldPolicy<any> | FieldReadFunction<any>
  updatePost?: FieldPolicy<any> | FieldReadFunction<any>
  updateUser?: FieldPolicy<any> | FieldReadFunction<any>
  verifyCertJWT?: FieldPolicy<any> | FieldReadFunction<any>
  verifyTown?: FieldPolicy<any> | FieldReadFunction<any>
  wakeUser?: FieldPolicy<any> | FieldReadFunction<any>
}
export type PostKeySpecifier = (
  | 'author'
  | 'commentCount'
  | 'comments'
  | 'content'
  | 'creationTime'
  | 'deletionTime'
  | 'id'
  | 'imageUrls'
  | 'isLiked'
  | 'likeCount'
  | 'parentAuthor'
  | 'sharedCount'
  | 'sharingPost'
  | 'updateTime'
  | PostKeySpecifier
)[]
export type PostFieldPolicy = {
  author?: FieldPolicy<any> | FieldReadFunction<any>
  commentCount?: FieldPolicy<any> | FieldReadFunction<any>
  comments?: FieldPolicy<any> | FieldReadFunction<any>
  content?: FieldPolicy<any> | FieldReadFunction<any>
  creationTime?: FieldPolicy<any> | FieldReadFunction<any>
  deletionTime?: FieldPolicy<any> | FieldReadFunction<any>
  id?: FieldPolicy<any> | FieldReadFunction<any>
  imageUrls?: FieldPolicy<any> | FieldReadFunction<any>
  isLiked?: FieldPolicy<any> | FieldReadFunction<any>
  likeCount?: FieldPolicy<any> | FieldReadFunction<any>
  parentAuthor?: FieldPolicy<any> | FieldReadFunction<any>
  sharedCount?: FieldPolicy<any> | FieldReadFunction<any>
  sharingPost?: FieldPolicy<any> | FieldReadFunction<any>
  updateTime?: FieldPolicy<any> | FieldReadFunction<any>
}
export type QueryKeySpecifier = (
  | 'auth'
  | 'certs'
  | 'isUniqueUsername'
  | 'myCertAgreement'
  | 'pendingCerts'
  | 'post'
  | 'posts'
  | 'sampleCertJWT'
  | 'user'
  | 'verificationHistories'
  | QueryKeySpecifier
)[]
export type QueryFieldPolicy = {
  auth?: FieldPolicy<any> | FieldReadFunction<any>
  certs?: FieldPolicy<any> | FieldReadFunction<any>
  isUniqueUsername?: FieldPolicy<any> | FieldReadFunction<any>
  myCertAgreement?: FieldPolicy<any> | FieldReadFunction<any>
  pendingCerts?: FieldPolicy<any> | FieldReadFunction<any>
  post?: FieldPolicy<any> | FieldReadFunction<any>
  posts?: FieldPolicy<any> | FieldReadFunction<any>
  sampleCertJWT?: FieldPolicy<any> | FieldReadFunction<any>
  user?: FieldPolicy<any> | FieldReadFunction<any>
  verificationHistories?: FieldPolicy<any> | FieldReadFunction<any>
}
export type ServiceAgreementKeySpecifier = (
  | 'adAgreement'
  | 'adAgreementTime'
  | 'locationAgreement'
  | 'locationAgreementTime'
  | 'personalDataStoringYear'
  | 'privacyAgreement'
  | 'privacyAgreementTime'
  | 'termsAgreement'
  | 'termsAgreementTime'
  | ServiceAgreementKeySpecifier
)[]
export type ServiceAgreementFieldPolicy = {
  adAgreement?: FieldPolicy<any> | FieldReadFunction<any>
  adAgreementTime?: FieldPolicy<any> | FieldReadFunction<any>
  locationAgreement?: FieldPolicy<any> | FieldReadFunction<any>
  locationAgreementTime?: FieldPolicy<any> | FieldReadFunction<any>
  personalDataStoringYear?: FieldPolicy<any> | FieldReadFunction<any>
  privacyAgreement?: FieldPolicy<any> | FieldReadFunction<any>
  privacyAgreementTime?: FieldPolicy<any> | FieldReadFunction<any>
  termsAgreement?: FieldPolicy<any> | FieldReadFunction<any>
  termsAgreementTime?: FieldPolicy<any> | FieldReadFunction<any>
}
export type TownKeySpecifier = ('count' | 'name' | TownKeySpecifier)[]
export type TownFieldPolicy = {
  count?: FieldPolicy<any> | FieldReadFunction<any>
  name?: FieldPolicy<any> | FieldReadFunction<any>
}
export type UserKeySpecifier = (
  | 'bio'
  | 'birthyear'
  | 'blockingEndTime'
  | 'blockingStartTime'
  | 'certAgreement'
  | 'cherry'
  | 'creationTime'
  | 'email'
  | 'grade'
  | 'id'
  | 'imageUrl'
  | 'imageUrls'
  | 'isVerifiedBirthday'
  | 'isVerifiedBirthyear'
  | 'isVerifiedEmail'
  | 'isVerifiedName'
  | 'isVerifiedPhoneNumber'
  | 'isVerifiedSex'
  | 'legalName'
  | 'logoutTime'
  | 'name'
  | 'nickname'
  | 'oAuthProviders'
  | 'serviceAgreement'
  | 'sex'
  | 'towns'
  | UserKeySpecifier
)[]
export type UserFieldPolicy = {
  bio?: FieldPolicy<any> | FieldReadFunction<any>
  birthyear?: FieldPolicy<any> | FieldReadFunction<any>
  blockingEndTime?: FieldPolicy<any> | FieldReadFunction<any>
  blockingStartTime?: FieldPolicy<any> | FieldReadFunction<any>
  certAgreement?: FieldPolicy<any> | FieldReadFunction<any>
  cherry?: FieldPolicy<any> | FieldReadFunction<any>
  creationTime?: FieldPolicy<any> | FieldReadFunction<any>
  email?: FieldPolicy<any> | FieldReadFunction<any>
  grade?: FieldPolicy<any> | FieldReadFunction<any>
  id?: FieldPolicy<any> | FieldReadFunction<any>
  imageUrl?: FieldPolicy<any> | FieldReadFunction<any>
  imageUrls?: FieldPolicy<any> | FieldReadFunction<any>
  isVerifiedBirthday?: FieldPolicy<any> | FieldReadFunction<any>
  isVerifiedBirthyear?: FieldPolicy<any> | FieldReadFunction<any>
  isVerifiedEmail?: FieldPolicy<any> | FieldReadFunction<any>
  isVerifiedName?: FieldPolicy<any> | FieldReadFunction<any>
  isVerifiedPhoneNumber?: FieldPolicy<any> | FieldReadFunction<any>
  isVerifiedSex?: FieldPolicy<any> | FieldReadFunction<any>
  legalName?: FieldPolicy<any> | FieldReadFunction<any>
  logoutTime?: FieldPolicy<any> | FieldReadFunction<any>
  name?: FieldPolicy<any> | FieldReadFunction<any>
  nickname?: FieldPolicy<any> | FieldReadFunction<any>
  oAuthProviders?: FieldPolicy<any> | FieldReadFunction<any>
  serviceAgreement?: FieldPolicy<any> | FieldReadFunction<any>
  sex?: FieldPolicy<any> | FieldReadFunction<any>
  towns?: FieldPolicy<any> | FieldReadFunction<any>
}
export type StrictTypedTypePolicies = {
  Cert?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?: false | CertKeySpecifier | (() => undefined | CertKeySpecifier)
    fields?: CertFieldPolicy
  }
  CertAgreement?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?: false | CertAgreementKeySpecifier | (() => undefined | CertAgreementKeySpecifier)
    fields?: CertAgreementFieldPolicy
  }
  Certs?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?: false | CertsKeySpecifier | (() => undefined | CertsKeySpecifier)
    fields?: CertsFieldPolicy
  }
  Mutation?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?: false | MutationKeySpecifier | (() => undefined | MutationKeySpecifier)
    fields?: MutationFieldPolicy
  }
  Post?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?: false | PostKeySpecifier | (() => undefined | PostKeySpecifier)
    fields?: PostFieldPolicy
  }
  Query?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?: false | QueryKeySpecifier | (() => undefined | QueryKeySpecifier)
    fields?: QueryFieldPolicy
  }
  ServiceAgreement?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | ServiceAgreementKeySpecifier
      | (() => undefined | ServiceAgreementKeySpecifier)
    fields?: ServiceAgreementFieldPolicy
  }
  Town?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?: false | TownKeySpecifier | (() => undefined | TownKeySpecifier)
    fields?: TownFieldPolicy
  }
  User?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?: false | UserKeySpecifier | (() => undefined | UserKeySpecifier)
    fields?: UserFieldPolicy
  }
}
export type TypedTypePolicies = StrictTypedTypePolicies & TypePolicies
