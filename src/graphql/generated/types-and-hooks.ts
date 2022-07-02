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
  /** A date string, such as 2007-12-03, compliant with the `full-date` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  Date: any
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  DateTime: any
  /** A field whose value conforms to the standard internet email address format as specified in RFC822: https://www.w3.org/Protocols/rfc822/. */
  EmailAddress: any
  /** A field whose value is a JSON Web Token (JWT): https://jwt.io/introduction. */
  JWT: any
  /** Last value of pagination */
  LastValue: any
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
  birthDate?: Maybe<Scalars['String']>
  certificateId?: Maybe<Scalars['String']>
  content?: Maybe<Scalars['String']>
  creationTime: Scalars['DateTime']
  effectiveDate?: Maybe<Scalars['Date']>
  issueDate?: Maybe<Scalars['Date']>
  name?: Maybe<Scalars['NonEmptyString']>
  sex?: Maybe<Sex>
  userId: Scalars['UUID']
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
  createPost?: Maybe<Post>
  deletePost?: Maybe<Post>
  logout: Scalars['Boolean']
  submitCertificateInfo?: Maybe<Scalars['Boolean']>
  unregister?: Maybe<User>
  updatePost?: Maybe<Post>
  updateUser?: Maybe<User>
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
  input: UserModificationInput
}

/** 기본값: 내림차순 */
export enum OrderDirection {
  Asc = 'ASC',
}

export type Pagination = {
  lastId?: InputMaybe<Scalars['ID']>
  lastValue?: InputMaybe<Scalars['LastValue']>
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
  isUniqueNickname: Scalars['Boolean']
  me?: Maybe<User>
  post?: Maybe<Post>
  posts?: Maybe<Array<Post>>
  userByNickname?: Maybe<User>
  verifyCertificateJWT?: Maybe<Certificate>
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

export enum Sex {
  Female = 'FEMALE',
  Male = 'MALE',
  Other = 'OTHER',
  Unknown = 'UNKNOWN',
}

export type User = {
  __typename?: 'User'
  bio?: Maybe<Scalars['String']>
  birthyear?: Maybe<Scalars['Int']>
  creationTime: Scalars['DateTime']
  id: Scalars['UUID']
  imageUrl?: Maybe<Scalars['URL']>
  nickname?: Maybe<Scalars['String']>
  sex: Sex
}

export type UserModificationInput = {
  ageRange?: InputMaybe<Scalars['NonEmptyString']>
  bio?: InputMaybe<Scalars['String']>
  birthday?: InputMaybe<Scalars['NonEmptyString']>
  email?: InputMaybe<Scalars['EmailAddress']>
  imageUrl?: InputMaybe<Scalars['URL']>
  nickname?: InputMaybe<Scalars['NonEmptyString']>
  phoneNumber?: InputMaybe<Scalars['NonEmptyString']>
  sex?: InputMaybe<Sex>
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
export type CertificateKeySpecifier = (
  | 'birthDate'
  | 'certificateId'
  | 'content'
  | 'creationTime'
  | 'effectiveDate'
  | 'issueDate'
  | 'name'
  | 'sex'
  | 'userId'
  | CertificateKeySpecifier
)[]
export type CertificateFieldPolicy = {
  birthDate?: FieldPolicy<any> | FieldReadFunction<any>
  certificateId?: FieldPolicy<any> | FieldReadFunction<any>
  content?: FieldPolicy<any> | FieldReadFunction<any>
  creationTime?: FieldPolicy<any> | FieldReadFunction<any>
  effectiveDate?: FieldPolicy<any> | FieldReadFunction<any>
  issueDate?: FieldPolicy<any> | FieldReadFunction<any>
  name?: FieldPolicy<any> | FieldReadFunction<any>
  sex?: FieldPolicy<any> | FieldReadFunction<any>
  userId?: FieldPolicy<any> | FieldReadFunction<any>
}
export type MutationKeySpecifier = (
  | 'createPost'
  | 'deletePost'
  | 'logout'
  | 'submitCertificateInfo'
  | 'unregister'
  | 'updatePost'
  | 'updateUser'
  | 'wakeUser'
  | MutationKeySpecifier
)[]
export type MutationFieldPolicy = {
  createPost?: FieldPolicy<any> | FieldReadFunction<any>
  deletePost?: FieldPolicy<any> | FieldReadFunction<any>
  logout?: FieldPolicy<any> | FieldReadFunction<any>
  submitCertificateInfo?: FieldPolicy<any> | FieldReadFunction<any>
  unregister?: FieldPolicy<any> | FieldReadFunction<any>
  updatePost?: FieldPolicy<any> | FieldReadFunction<any>
  updateUser?: FieldPolicy<any> | FieldReadFunction<any>
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
  isUniqueNickname?: FieldPolicy<any> | FieldReadFunction<any>
  me?: FieldPolicy<any> | FieldReadFunction<any>
  post?: FieldPolicy<any> | FieldReadFunction<any>
  posts?: FieldPolicy<any> | FieldReadFunction<any>
  userByNickname?: FieldPolicy<any> | FieldReadFunction<any>
  verifyCertificateJWT?: FieldPolicy<any> | FieldReadFunction<any>
}
export type UserKeySpecifier = (
  | 'bio'
  | 'birthyear'
  | 'creationTime'
  | 'id'
  | 'imageUrl'
  | 'nickname'
  | 'sex'
  | UserKeySpecifier
)[]
export type UserFieldPolicy = {
  bio?: FieldPolicy<any> | FieldReadFunction<any>
  birthyear?: FieldPolicy<any> | FieldReadFunction<any>
  creationTime?: FieldPolicy<any> | FieldReadFunction<any>
  id?: FieldPolicy<any> | FieldReadFunction<any>
  imageUrl?: FieldPolicy<any> | FieldReadFunction<any>
  nickname?: FieldPolicy<any> | FieldReadFunction<any>
  sex?: FieldPolicy<any> | FieldReadFunction<any>
}
export type StrictTypedTypePolicies = {
  Certificate?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?: false | CertificateKeySpecifier | (() => undefined | CertificateKeySpecifier)
    fields?: CertificateFieldPolicy
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
  User?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?: false | UserKeySpecifier | (() => undefined | UserKeySpecifier)
    fields?: UserFieldPolicy
  }
}
export type TypedTypePolicies = StrictTypedTypePolicies & TypePolicies
