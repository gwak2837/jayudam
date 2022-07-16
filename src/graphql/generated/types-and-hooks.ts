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
  /** Any value */
  Any: any
  /** A date string, such as 2007-12-03, compliant with the `full-date` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  Date: any
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  DateTime: any
  /** A field whose value conforms to the standard internet email address format as specified in RFC822: https://www.w3.org/Protocols/rfc822/. */
  EmailAddress: any
  /** A field whose value is a JSON Web Token (JWT): https://jwt.io/introduction. */
  JWT: any
  /** A field whose value is a valid decimal degrees latitude number (53.471): https://en.wikipedia.org/wiki/Latitude */
  Latitude: any
  /** A field whose value is a valid decimal degrees longitude number (53.471): https://en.wikipedia.org/wiki/Longitude */
  Longitude: any
  /** A string that cannot be passed as an empty value */
  NonEmptyString: any
  /** Integers that will have a value of 0 or more. */
  NonNegativeInt: any
  /** Integers that will have a value greater than 0. */
  PositiveInt: any
  /** A field whose value conforms to the standard URL format as specified in RFC3986: https://www.ietf.org/rfc/rfc3986.txt. */
  URL: any
  /** A field whose value is a generic Universally Unique Identifier: https://en.wikipedia.org/wiki/Universally_unique_identifier. */
  UUID: any
}

export type Certificate = {
  __typename?: 'Certificate'
  birthDate?: Maybe<Scalars['Date']>
  content?: Maybe<Scalars['String']>
  effectiveDate?: Maybe<Scalars['Date']>
  id: Scalars['ID']
  issueDate?: Maybe<Scalars['Date']>
  name?: Maybe<Scalars['NonEmptyString']>
  sex: Sex
}

export type CertificateAgreement = {
  __typename?: 'CertificateAgreement'
  immunizationSince?: Maybe<Scalars['Date']>
  sexualCrimeSince?: Maybe<Scalars['Date']>
  showBirthyear: Scalars['Boolean']
  showImmunizationDetails: Scalars['Boolean']
  showName: Scalars['Boolean']
  showSTDTestDetails: Scalars['Boolean']
  showSexualCrimeDetails: Scalars['Boolean']
  stdTestSince?: Maybe<Scalars['Date']>
}

export type CertificateAgreementInput = {
  immunizationSince?: InputMaybe<Scalars['Date']>
  sexualCrimeSince?: InputMaybe<Scalars['Date']>
  showBirthyear?: InputMaybe<Scalars['Boolean']>
  showImmunizationDetails?: InputMaybe<Scalars['Boolean']>
  showName?: InputMaybe<Scalars['Boolean']>
  showSTDTestDetails?: InputMaybe<Scalars['Boolean']>
  showSex?: InputMaybe<Scalars['Boolean']>
  showSexualCrimeDetails?: InputMaybe<Scalars['Boolean']>
  stdTestSince?: InputMaybe<Scalars['Date']>
}

export type CertificateCreationInput = {
  birthDate: Scalars['DateTime']
  issueDate: Scalars['DateTime']
  name: Scalars['NonEmptyString']
  sex: Sex
  verificationCode: Scalars['NonEmptyString']
}

export type Mutation = {
  __typename?: 'Mutation'
  connectToGoogleOAuth?: Maybe<Scalars['Boolean']>
  connectToKakaoOAuth?: Maybe<Scalars['Boolean']>
  connectToNaverOAuth?: Maybe<Scalars['Boolean']>
  createPost?: Maybe<Post>
  deletePost?: Maybe<Post>
  disconnectFromGoogleOAuth?: Maybe<Scalars['Boolean']>
  disconnectFromKakaoOAuth?: Maybe<Scalars['Boolean']>
  disconnectFromNaverOAuth?: Maybe<Scalars['Boolean']>
  logout?: Maybe<User>
  submitCertificateInfo?: Maybe<Scalars['Boolean']>
  takeAttendance?: Maybe<User>
  unregister?: Maybe<User>
  updatePost?: Maybe<Post>
  updateUser?: Maybe<User>
  verifyTown?: Maybe<User>
  wakeUser?: Maybe<User>
}

export type MutationCreatePostArgs = {
  input: PostCreationInput
}

export type MutationDeletePostArgs = {
  id: Scalars['ID']
}

export type MutationSubmitCertificateInfoArgs = {
  input: CertificateCreationInput
}

export type MutationUpdatePostArgs = {
  input: PostUpdateInput
}

export type MutationUpdateUserArgs = {
  input: UserUpdate
}

export type MutationVerifyTownArgs = {
  lat: Scalars['Latitude']
  lon: Scalars['Longitude']
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
  content?: Maybe<Scalars['NonEmptyString']>
  creationTime?: Maybe<Scalars['DateTime']>
  deletionTime?: Maybe<Scalars['DateTime']>
  id: Scalars['ID']
  imageUrls?: Maybe<Array<Maybe<Scalars['URL']>>>
  likeCount?: Maybe<Scalars['NonNegativeInt']>
  modificationTime?: Maybe<Scalars['DateTime']>
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
  getCertificateJWT: Scalars['JWT']
  getMyCertificates?: Maybe<Array<Certificate>>
  isUniqueNickname: Scalars['Boolean']
  me?: Maybe<User>
  post?: Maybe<Post>
  posts?: Maybe<Array<Post>>
  userByNickname?: Maybe<User>
  verifyCertificateJWT?: Maybe<Certificate>
}

export type QueryGetCertificateJwtArgs = {
  input?: InputMaybe<CertificateAgreementInput>
}

export type QueryIsUniqueNicknameArgs = {
  nickname: Scalars['NonEmptyString']
}

export type QueryPostArgs = {
  id: Scalars['ID']
}

export type QueryUserByNicknameArgs = {
  nickname: Scalars['NonEmptyString']
}

export type QueryVerifyCertificateJwtArgs = {
  jwt: Scalars['JWT']
}

export type ServiceAgreement = {
  __typename?: 'ServiceAgreement'
  adAgreement?: Maybe<Scalars['Boolean']>
  adAgreementTime?: Maybe<Scalars['DateTime']>
  locationAgreement?: Maybe<Scalars['Boolean']>
  locationAgreementTime?: Maybe<Scalars['DateTime']>
  personalDataStoringYear?: Maybe<Scalars['NonNegativeInt']>
  privacyAgreement?: Maybe<Scalars['Boolean']>
  privacyAgreementTime?: Maybe<Scalars['DateTime']>
  termsAgreement?: Maybe<Scalars['Boolean']>
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
  name: Scalars['NonEmptyString']
}

export type User = {
  __typename?: 'User'
  bio?: Maybe<Scalars['String']>
  birthyear?: Maybe<Scalars['Int']>
  blockingEndTime?: Maybe<Scalars['DateTime']>
  blockingStartTime?: Maybe<Scalars['DateTime']>
  certificateAgreement?: Maybe<CertificateAgreement>
  cherry: Scalars['NonNegativeInt']
  creationTime: Scalars['DateTime']
  email?: Maybe<Scalars['EmailAddress']>
  id: Scalars['UUID']
  imageUrls?: Maybe<Array<Scalars['URL']>>
  isVerifiedBirthday: Scalars['Boolean']
  isVerifiedBirthyear: Scalars['Boolean']
  isVerifiedEmail: Scalars['Boolean']
  isVerifiedName: Scalars['Boolean']
  isVerifiedPhoneNumber: Scalars['Boolean']
  isVerifiedSex: Scalars['Boolean']
  nickname?: Maybe<Scalars['String']>
  serviceAgreement?: Maybe<ServiceAgreement>
  sex: Sex
  towns?: Maybe<Array<Town>>
}

export type UserUpdate = {
  bio?: InputMaybe<Scalars['NonEmptyString']>
  certificateAgreement?: InputMaybe<CertificateAgreementInput>
  email?: InputMaybe<Scalars['EmailAddress']>
  imageUrls?: InputMaybe<Array<Scalars['URL']>>
  nickname?: InputMaybe<Scalars['NonEmptyString']>
  serviceAgreement?: InputMaybe<ServiceAgreementInput>
  town1Name?: InputMaybe<Scalars['NonEmptyString']>
  town2Name?: InputMaybe<Scalars['NonEmptyString']>
}

export type CreatePostMutationVariables = Exact<{
  input: PostCreationInput
}>

export type CreatePostMutation = {
  __typename?: 'Mutation'
  createPost?: { __typename?: 'Post'; id: string } | null
}

export type MeQueryVariables = Exact<{ [key: string]: never }>

export type MeQuery = {
  __typename?: 'Query'
  me?: { __typename?: 'User'; id: any; nickname?: string | null } | null
}

export type GetCertificateJwtQueryVariables = Exact<{
  input: CertificateAgreementInput
}>

export type GetCertificateJwtQuery = { __typename?: 'Query'; getCertificateJWT: any }

export type GetMySettingsQueryVariables = Exact<{ [key: string]: never }>

export type GetMySettingsQuery = {
  __typename?: 'Query'
  me?: {
    __typename?: 'User'
    id: any
    certificateAgreement?: {
      __typename?: 'CertificateAgreement'
      showBirthyear: boolean
      showName: boolean
      showSTDTestDetails: boolean
      stdTestSince?: any | null
      showImmunizationDetails: boolean
      immunizationSince?: any | null
      showSexualCrimeDetails: boolean
      sexualCrimeSince?: any | null
    } | null
  } | null
}

export type IsUniqueNicknameQueryVariables = Exact<{
  nickname: Scalars['NonEmptyString']
}>

export type IsUniqueNicknameQuery = { __typename?: 'Query'; isUniqueNickname: boolean }

export type UpdateUserMutationVariables = Exact<{
  input: UserUpdate
}>

export type UpdateUserMutation = {
  __typename?: 'Mutation'
  updateUser?: { __typename?: 'User'; id: any; nickname?: string | null } | null
}

export type VerifyCertificateJwtQueryVariables = Exact<{
  jwt: Scalars['JWT']
}>

export type VerifyCertificateJwtQuery = {
  __typename?: 'Query'
  verifyCertificateJWT?: {
    __typename?: 'Certificate'
    id: string
    birthDate?: any | null
    content?: string | null
    effectiveDate?: any | null
    issueDate?: any | null
    name?: any | null
    sex: Sex
  } | null
}

export const CreatePostDocument = gql`
  mutation CreatePost($input: PostCreationInput!) {
    createPost(input: $input) {
      id
    }
  }
`
export type CreatePostMutationFn = Apollo.MutationFunction<
  CreatePostMutation,
  CreatePostMutationVariables
>

/**
 * __useCreatePostMutation__
 *
 * To run a mutation, you first call `useCreatePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPostMutation, { data, loading, error }] = useCreatePostMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreatePostMutation(
  baseOptions?: Apollo.MutationHookOptions<CreatePostMutation, CreatePostMutationVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<CreatePostMutation, CreatePostMutationVariables>(
    CreatePostDocument,
    options
  )
}
export type CreatePostMutationHookResult = ReturnType<typeof useCreatePostMutation>
export type CreatePostMutationResult = Apollo.MutationResult<CreatePostMutation>
export type CreatePostMutationOptions = Apollo.BaseMutationOptions<
  CreatePostMutation,
  CreatePostMutationVariables
>
export const MeDocument = gql`
  query Me {
    me {
      id
      nickname
    }
  }
`

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options)
}
export function useMeLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options)
}
export type MeQueryHookResult = ReturnType<typeof useMeQuery>
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>
export const GetCertificateJwtDocument = gql`
  query GetCertificateJWT($input: CertificateAgreementInput!) {
    getCertificateJWT(input: $input)
  }
`

/**
 * __useGetCertificateJwtQuery__
 *
 * To run a query within a React component, call `useGetCertificateJwtQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCertificateJwtQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCertificateJwtQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetCertificateJwtQuery(
  baseOptions: Apollo.QueryHookOptions<GetCertificateJwtQuery, GetCertificateJwtQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetCertificateJwtQuery, GetCertificateJwtQueryVariables>(
    GetCertificateJwtDocument,
    options
  )
}
export function useGetCertificateJwtLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetCertificateJwtQuery, GetCertificateJwtQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetCertificateJwtQuery, GetCertificateJwtQueryVariables>(
    GetCertificateJwtDocument,
    options
  )
}
export type GetCertificateJwtQueryHookResult = ReturnType<typeof useGetCertificateJwtQuery>
export type GetCertificateJwtLazyQueryHookResult = ReturnType<typeof useGetCertificateJwtLazyQuery>
export type GetCertificateJwtQueryResult = Apollo.QueryResult<
  GetCertificateJwtQuery,
  GetCertificateJwtQueryVariables
>
export const GetMySettingsDocument = gql`
  query GetMySettings {
    me {
      id
      certificateAgreement {
        showBirthyear
        showName
        showSTDTestDetails
        stdTestSince
        showImmunizationDetails
        immunizationSince
        showSexualCrimeDetails
        sexualCrimeSince
      }
    }
  }
`

/**
 * __useGetMySettingsQuery__
 *
 * To run a query within a React component, call `useGetMySettingsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMySettingsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMySettingsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetMySettingsQuery(
  baseOptions?: Apollo.QueryHookOptions<GetMySettingsQuery, GetMySettingsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetMySettingsQuery, GetMySettingsQueryVariables>(
    GetMySettingsDocument,
    options
  )
}
export function useGetMySettingsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetMySettingsQuery, GetMySettingsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetMySettingsQuery, GetMySettingsQueryVariables>(
    GetMySettingsDocument,
    options
  )
}
export type GetMySettingsQueryHookResult = ReturnType<typeof useGetMySettingsQuery>
export type GetMySettingsLazyQueryHookResult = ReturnType<typeof useGetMySettingsLazyQuery>
export type GetMySettingsQueryResult = Apollo.QueryResult<
  GetMySettingsQuery,
  GetMySettingsQueryVariables
>
export const IsUniqueNicknameDocument = gql`
  query IsUniqueNickname($nickname: NonEmptyString!) {
    isUniqueNickname(nickname: $nickname)
  }
`

/**
 * __useIsUniqueNicknameQuery__
 *
 * To run a query within a React component, call `useIsUniqueNicknameQuery` and pass it any options that fit your needs.
 * When your component renders, `useIsUniqueNicknameQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useIsUniqueNicknameQuery({
 *   variables: {
 *      nickname: // value for 'nickname'
 *   },
 * });
 */
export function useIsUniqueNicknameQuery(
  baseOptions: Apollo.QueryHookOptions<IsUniqueNicknameQuery, IsUniqueNicknameQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<IsUniqueNicknameQuery, IsUniqueNicknameQueryVariables>(
    IsUniqueNicknameDocument,
    options
  )
}
export function useIsUniqueNicknameLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<IsUniqueNicknameQuery, IsUniqueNicknameQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<IsUniqueNicknameQuery, IsUniqueNicknameQueryVariables>(
    IsUniqueNicknameDocument,
    options
  )
}
export type IsUniqueNicknameQueryHookResult = ReturnType<typeof useIsUniqueNicknameQuery>
export type IsUniqueNicknameLazyQueryHookResult = ReturnType<typeof useIsUniqueNicknameLazyQuery>
export type IsUniqueNicknameQueryResult = Apollo.QueryResult<
  IsUniqueNicknameQuery,
  IsUniqueNicknameQueryVariables
>
export const UpdateUserDocument = gql`
  mutation UpdateUser($input: UserUpdate!) {
    updateUser(input: $input) {
      id
      nickname
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
export const VerifyCertificateJwtDocument = gql`
  query VerifyCertificateJWT($jwt: JWT!) {
    verifyCertificateJWT(jwt: $jwt) {
      id
      birthDate
      content
      effectiveDate
      issueDate
      name
      sex
    }
  }
`

/**
 * __useVerifyCertificateJwtQuery__
 *
 * To run a query within a React component, call `useVerifyCertificateJwtQuery` and pass it any options that fit your needs.
 * When your component renders, `useVerifyCertificateJwtQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useVerifyCertificateJwtQuery({
 *   variables: {
 *      jwt: // value for 'jwt'
 *   },
 * });
 */
export function useVerifyCertificateJwtQuery(
  baseOptions: Apollo.QueryHookOptions<
    VerifyCertificateJwtQuery,
    VerifyCertificateJwtQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<VerifyCertificateJwtQuery, VerifyCertificateJwtQueryVariables>(
    VerifyCertificateJwtDocument,
    options
  )
}
export function useVerifyCertificateJwtLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    VerifyCertificateJwtQuery,
    VerifyCertificateJwtQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<VerifyCertificateJwtQuery, VerifyCertificateJwtQueryVariables>(
    VerifyCertificateJwtDocument,
    options
  )
}
export type VerifyCertificateJwtQueryHookResult = ReturnType<typeof useVerifyCertificateJwtQuery>
export type VerifyCertificateJwtLazyQueryHookResult = ReturnType<
  typeof useVerifyCertificateJwtLazyQuery
>
export type VerifyCertificateJwtQueryResult = Apollo.QueryResult<
  VerifyCertificateJwtQuery,
  VerifyCertificateJwtQueryVariables
>
export type CertificateKeySpecifier = (
  | 'birthDate'
  | 'content'
  | 'effectiveDate'
  | 'id'
  | 'issueDate'
  | 'name'
  | 'sex'
  | CertificateKeySpecifier
)[]
export type CertificateFieldPolicy = {
  birthDate?: FieldPolicy<any> | FieldReadFunction<any>
  content?: FieldPolicy<any> | FieldReadFunction<any>
  effectiveDate?: FieldPolicy<any> | FieldReadFunction<any>
  id?: FieldPolicy<any> | FieldReadFunction<any>
  issueDate?: FieldPolicy<any> | FieldReadFunction<any>
  name?: FieldPolicy<any> | FieldReadFunction<any>
  sex?: FieldPolicy<any> | FieldReadFunction<any>
}
export type CertificateAgreementKeySpecifier = (
  | 'immunizationSince'
  | 'sexualCrimeSince'
  | 'showBirthyear'
  | 'showImmunizationDetails'
  | 'showName'
  | 'showSTDTestDetails'
  | 'showSexualCrimeDetails'
  | 'stdTestSince'
  | CertificateAgreementKeySpecifier
)[]
export type CertificateAgreementFieldPolicy = {
  immunizationSince?: FieldPolicy<any> | FieldReadFunction<any>
  sexualCrimeSince?: FieldPolicy<any> | FieldReadFunction<any>
  showBirthyear?: FieldPolicy<any> | FieldReadFunction<any>
  showImmunizationDetails?: FieldPolicy<any> | FieldReadFunction<any>
  showName?: FieldPolicy<any> | FieldReadFunction<any>
  showSTDTestDetails?: FieldPolicy<any> | FieldReadFunction<any>
  showSexualCrimeDetails?: FieldPolicy<any> | FieldReadFunction<any>
  stdTestSince?: FieldPolicy<any> | FieldReadFunction<any>
}
export type MutationKeySpecifier = (
  | 'connectToGoogleOAuth'
  | 'connectToKakaoOAuth'
  | 'connectToNaverOAuth'
  | 'createPost'
  | 'deletePost'
  | 'disconnectFromGoogleOAuth'
  | 'disconnectFromKakaoOAuth'
  | 'disconnectFromNaverOAuth'
  | 'logout'
  | 'submitCertificateInfo'
  | 'takeAttendance'
  | 'unregister'
  | 'updatePost'
  | 'updateUser'
  | 'verifyTown'
  | 'wakeUser'
  | MutationKeySpecifier
)[]
export type MutationFieldPolicy = {
  connectToGoogleOAuth?: FieldPolicy<any> | FieldReadFunction<any>
  connectToKakaoOAuth?: FieldPolicy<any> | FieldReadFunction<any>
  connectToNaverOAuth?: FieldPolicy<any> | FieldReadFunction<any>
  createPost?: FieldPolicy<any> | FieldReadFunction<any>
  deletePost?: FieldPolicy<any> | FieldReadFunction<any>
  disconnectFromGoogleOAuth?: FieldPolicy<any> | FieldReadFunction<any>
  disconnectFromKakaoOAuth?: FieldPolicy<any> | FieldReadFunction<any>
  disconnectFromNaverOAuth?: FieldPolicy<any> | FieldReadFunction<any>
  logout?: FieldPolicy<any> | FieldReadFunction<any>
  submitCertificateInfo?: FieldPolicy<any> | FieldReadFunction<any>
  takeAttendance?: FieldPolicy<any> | FieldReadFunction<any>
  unregister?: FieldPolicy<any> | FieldReadFunction<any>
  updatePost?: FieldPolicy<any> | FieldReadFunction<any>
  updateUser?: FieldPolicy<any> | FieldReadFunction<any>
  verifyTown?: FieldPolicy<any> | FieldReadFunction<any>
  wakeUser?: FieldPolicy<any> | FieldReadFunction<any>
}
export type PostKeySpecifier = (
  | 'author'
  | 'content'
  | 'creationTime'
  | 'deletionTime'
  | 'id'
  | 'imageUrls'
  | 'likeCount'
  | 'modificationTime'
  | PostKeySpecifier
)[]
export type PostFieldPolicy = {
  author?: FieldPolicy<any> | FieldReadFunction<any>
  content?: FieldPolicy<any> | FieldReadFunction<any>
  creationTime?: FieldPolicy<any> | FieldReadFunction<any>
  deletionTime?: FieldPolicy<any> | FieldReadFunction<any>
  id?: FieldPolicy<any> | FieldReadFunction<any>
  imageUrls?: FieldPolicy<any> | FieldReadFunction<any>
  likeCount?: FieldPolicy<any> | FieldReadFunction<any>
  modificationTime?: FieldPolicy<any> | FieldReadFunction<any>
}
export type QueryKeySpecifier = (
  | 'getCertificateJWT'
  | 'getMyCertificates'
  | 'isUniqueNickname'
  | 'me'
  | 'post'
  | 'posts'
  | 'userByNickname'
  | 'verifyCertificateJWT'
  | QueryKeySpecifier
)[]
export type QueryFieldPolicy = {
  getCertificateJWT?: FieldPolicy<any> | FieldReadFunction<any>
  getMyCertificates?: FieldPolicy<any> | FieldReadFunction<any>
  isUniqueNickname?: FieldPolicy<any> | FieldReadFunction<any>
  me?: FieldPolicy<any> | FieldReadFunction<any>
  post?: FieldPolicy<any> | FieldReadFunction<any>
  posts?: FieldPolicy<any> | FieldReadFunction<any>
  userByNickname?: FieldPolicy<any> | FieldReadFunction<any>
  verifyCertificateJWT?: FieldPolicy<any> | FieldReadFunction<any>
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
  | 'certificateAgreement'
  | 'cherry'
  | 'creationTime'
  | 'email'
  | 'id'
  | 'imageUrls'
  | 'isVerifiedBirthday'
  | 'isVerifiedBirthyear'
  | 'isVerifiedEmail'
  | 'isVerifiedName'
  | 'isVerifiedPhoneNumber'
  | 'isVerifiedSex'
  | 'nickname'
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
  certificateAgreement?: FieldPolicy<any> | FieldReadFunction<any>
  cherry?: FieldPolicy<any> | FieldReadFunction<any>
  creationTime?: FieldPolicy<any> | FieldReadFunction<any>
  email?: FieldPolicy<any> | FieldReadFunction<any>
  id?: FieldPolicy<any> | FieldReadFunction<any>
  imageUrls?: FieldPolicy<any> | FieldReadFunction<any>
  isVerifiedBirthday?: FieldPolicy<any> | FieldReadFunction<any>
  isVerifiedBirthyear?: FieldPolicy<any> | FieldReadFunction<any>
  isVerifiedEmail?: FieldPolicy<any> | FieldReadFunction<any>
  isVerifiedName?: FieldPolicy<any> | FieldReadFunction<any>
  isVerifiedPhoneNumber?: FieldPolicy<any> | FieldReadFunction<any>
  isVerifiedSex?: FieldPolicy<any> | FieldReadFunction<any>
  nickname?: FieldPolicy<any> | FieldReadFunction<any>
  serviceAgreement?: FieldPolicy<any> | FieldReadFunction<any>
  sex?: FieldPolicy<any> | FieldReadFunction<any>
  towns?: FieldPolicy<any> | FieldReadFunction<any>
}
export type StrictTypedTypePolicies = {
  Certificate?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?: false | CertificateKeySpecifier | (() => undefined | CertificateKeySpecifier)
    fields?: CertificateFieldPolicy
  }
  CertificateAgreement?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | CertificateAgreementKeySpecifier
      | (() => undefined | CertificateAgreementKeySpecifier)
    fields?: CertificateAgreementFieldPolicy
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